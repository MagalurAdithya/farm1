import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbaradmin from "../dashbord/Navbaradmin";
import API from "../API";
import "./Verify.css";

function Verify() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const { data } = await API.get("/loans/available");
                console.log("API Response:", data);
                setLoans(data.loans);
            } catch (error) {
                console.error("Error fetching loans:", error);
                toast.error("Failed to fetch loans.");
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    const handleVerify = async (id) => {
        setActionLoading(id);
        try {
            const response = await API.put(`/admin/loans/${id}/verify`);
            if (response.status === 200) {
                setLoans(
                    loans.map((loan) =>
                        loan._id === id ? { ...loan, isVerified: true } : loan
                    )
                );
                toast.success("Loan verified successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error verifying loan.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this loan?");
        if (!confirmDelete) return;

        setActionLoading(id);
        try {
            const response = await API.delete(`/admin/loans/${id}/delete`);
            if (response.status === 200) {
                setLoans(loans.filter((loan) => loan._id !== id));
                toast.success("Loan deleted successfully!");
            } else {
                toast.error("Failed to delete loan.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting loan.");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div>
            <Navbaradmin />
            <div className="verify-container">
                {loading ? (
                    <p className="verify-loading"><b>Loading loans...</b></p>
                ) : (
                    <div className="verify-card-container">
                        {loans.length > 0 ? (
                            loans.map((loan) => (
                                <div key={loan._id} className="verify-card">
                                    <h2><b>Status:</b> {loan?.status || "Unknown"}</h2>
                                    <p><b>Name:</b> {loan?.name}</p>
                                    <p><b>Amount:</b> Rs {loan?.amount ? loan.amount.toLocaleString() : "0"}</p>
                                    <p><b>Requested Interest Rate:</b> {loan?.interestRate || "N/A"}</p>
                                    <p><b>Duration:</b> {loan?.duration || "N/A"}</p>
                                    <p><b>Verification Status:</b> 
                                        <span className={loan.isVerified ? "verify-status-approved" : "verify-status-pending"}>
                                            {loan.isVerified ? " ✅ Verified" : " ⛔ Not Verified"}
                                        </span>
                                    </p>
                                    <div className="verify-button-group">
                                        {!loan.isVerified && (
                                            <button 
                                                className="verify-action-button verify-approve"
                                                onClick={() => handleVerify(loan._id)}
                                                disabled={actionLoading === loan._id}
                                            >
                                                {actionLoading === loan._id ? "Verifying..." : "Verify"}
                                            </button>
                                        )}
                                        <button 
                                            className="verify-action-button verify-delete"
                                            onClick={() => handleDelete(loan._id)}
                                            disabled={loan.isVerified || actionLoading === loan._id}
                                        >
                                            {actionLoading === loan._id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="verify-no-loans">No loans available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Verify;
