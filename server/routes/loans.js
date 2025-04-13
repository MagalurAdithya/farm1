import express from "express";
const router = express.Router();
import { auth, checkRole } from "../middleware/auth.js";
import Loan from "../models/Loan.js";
import Farm from "../models/Farm.js";
import Transaction from "../models/Transaction.js";
import path from "path";
import Document from "../models/Document.js";

router.get("/my-loans", auth, async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate("farm")
      .populate("investors.investor");

    res.json(loans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// router.get(
//   "/my-investments",
//   [auth, checkRole(["investor"])],
//   async (req, res) => {
//     try {
//       const loans = await Loan.find({ "investors.investor": req.user.userId })
//         .populate("farm")
//         .populate("investors.investor");
//       res.json(loans,{farmer:req.userId.farm});
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );
router.get(
  "/my-investments",
  [auth, checkRole(["investor"])],
  async (req, res) => {
    try {
      const loans = await Loan.find({ "investors.investor": req.user.userId })
        .populate("farm")
        .populate("investors.investor");

      res.json({ loans, farmer: req.user.farm }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.get("/available", [auth, checkRole(["investor","admin"])], async (req, res) => {
  try {
    const loans = await Loan.find({ status: "pending" })
      .populate("farm")
      .populate("investors.investor");
      
    res.json({ loans, investorId: req.user.userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/loans/pending-approval", [auth, checkRole(["admin"])], async (req, res) => {
  try {
    const loans = await Loan.find({ status: { $in: ["pending", "processing"] } }).populate("farm")
    res.status(200).json({ loans });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending loans", error });
  }
});



router.post("/", async (req, res) => {
  try {
    const { farmId,name, amount, interestRate, duration } = req.body;

  
    if (!farmId) {
      return res.status(400).json({ message: "Farm ID is required" });
    }
    if (!amount) {
      return res.status(400).json({ message: "Loan amount is required" });
    }
    if (!interestRate) {
      return res.status(400).json({ message: "Interest rate is required" });
    }
    if (!duration) {
      return res.status(400).json({ message: "Loan duration is required" });
    }

    const loan = new Loan({
      farm: farmId,
      name,
      amount, 
      interestRate,
      duration,
      repaymentSchedule: generateRepaymentSchedule(amount, interestRate, duration),
    })

    await loan.save();
    res.status(201).json({ message: "Loan created successfully", loan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post(
  "/:id/invest",
  [auth, checkRole(["investor"])],
  async (req, res) => {
    try {
      const { amount, fromUserId, toUserId } = req.body;
      // const { amount} = req.body;
      const loan = await Loan.findById(req.params.id)
   

      // const transaction = new Transaction({
      //   type: "investment",
      //   amount: amount,
      //   loan: loan,
      //   from: fromUserId,
      //   to: toUserId,
      // });

      // await transaction.save();

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      if (loan.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Loan is not available for investment" });
      }

      const totalInvested =
        loan.investors.reduce((sum, inv) => sum + inv.amount, 0) + amount;
      if (totalInvested > loan.amount) {
        return res
          .status(400)
          .json({ message: "Investment amount exceeds loan requirement" });
      }

      loan.investors.push({
        investor: req.user.userId,
        amount,
      });

      if (totalInvested === loan.amount) {
        loan.status = "pending";
      }
        const document =await Document.findOne({owner: req.user.userId })
            if (!document) {
              return res.status(400).json({ message: "upload document for verification" });
            }
            if (document.isVerified === false) {
              return res.status(400).json({ message: "Verification document not found" });
            }
            

      await loan.save();
      res.json({
        message: "Investment successful",
        loan,
        // transaction,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


// router.post("/credit/:id", [auth, checkRole(["admin"])], async (req, res) => {
//   try {
//     const { amount, fromUserId, toUserId } = req.body;

 
//     const loan = await Loan.find(req.params.id).populate("farm");
//     console.log("Loan Data:", loan);
//     if (!loan || !["processing", "pending"].includes(loan.status)) {
//       return res.status(404).json({ message: "No active loan found" });
//     }
//     loan.status = "active"
//     await loan.save()
    
//     const transaction = new Transaction({
//       type: "investment",
//       amount,
//       loan: loan._id,  
//       from: fromUserId,
//       to: toUserId,
//       status: "pending",  
//     });

//     await transaction.save();

//     res.status(200).json({ message: "Loan credited successfully", transaction });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


router.post("/credit/:id", [auth, checkRole(["admin"])], async (req, res) => {
  try {
    const { amount, fromUserId, toUserId } = req.body;

    console.log("Received request body:", req.body);

   
    if (!amount || !fromUserId || !toUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const loan = await Loan.findById(req.params.id).populate("farm");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    if (!["processing", "pending"].includes(loan.status)) {
      return res.status(400).json({ message: "Loan is not in a valid status" });
    }

    
    loan.status = "active";
    await loan.save();

    
    const transaction = new Transaction({
      type: "investment",
      amount,
      loan: loan._id,
      from: fromUserId,
      to: toUserId,
      status: "pending",
    });

    await transaction.save();

    res.status(200).json({ message: "Loan credited successfully", transaction });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





router.post("/:id/repay", [auth, checkRole(["farmer"])], async (req, res) => {
  try {
    const { amount, toUserId } = req.body;
    console.log(req.user)
 const fromUserId=req.user.userId
    const loan = await Loan.findById(req.params.id).populate("farm");
    console.log(loan)
    const transaction = new Transaction({
      type: "repayment",
      amount: amount,
      loan: loan._id,
      from: fromUserId,
      to: toUserId,
    });
console.log(transaction)
    await transaction.save();

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }


  
    const unpaidPayment = loan.repaymentSchedule.find( 
      (p) => p.status === "pending"
    );
    if (!unpaidPayment) {
      return res.status(400).json({ message: "No pending payments found" });
    }


    // if (amount !== unpaidPayment.amount) {
    //   return res
    //     .status(400)
    //     .json({ message: "Payment amount must match the scheduled amount" });
    // }

    unpaidPayment.status = "paid";

    const allPaid = loan.repaymentSchedule.every((p) => p.status === "paid");
    if (allPaid) {
      loan.status = "completed";
    }


    console.log(allPaid)

    await loan.save();

    res.json({
      message: "Repayment successful and transaction recorded",
      loan,
      transaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




router.get("/:id/schedule", auth, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("farm");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const isAuthorized =
      loan.farm.farmer.toString() === req.user.userId ||
      loan.investors.some((inv) => inv.investor.toString() === req.user.userId);

    if (!isAuthorized) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(loan.repaymentSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

function generateRepaymentSchedule(amount, interestRate, duration) {
  const monthlyInterest = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
    (Math.pow(1 + monthlyInterest, duration) - 1);

  const schedule = [];
  let remainingBalance = amount;

  for (let i = 1; i <= duration; i++) {
    const interest = remainingBalance * monthlyInterest;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
      amount: monthlyPayment,
      status: "pending",
    });
  }

  return schedule;
}

export default router;

