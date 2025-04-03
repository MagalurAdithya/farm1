import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from '../API'
import { toast } from "react-toastify";
// import '../farmerFillProfile.css'

const CreateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.document[0]) {
      formData.append("document", data.document[0]);
    }

    try {
      const response = await API.post("/profile/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

        setSuccessMessage(response.data.message);
        toast.success("Profile Uploaded Succesfully")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while creating the profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>

      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="borderp-21"
            {...register("fullName", { required: "Full Name is required" })}
          />
          {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}

          <input
            type="email"
            placeholder="Email Address"
            className="borderp-21"
            {...register("EmailAddress", { required: "Email Address is required" })}
          />
          {errors.EmailAddress && <p className="text-red-600">{errors.EmailAddress.message}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            className="borderp-21"
            {...register("PhoneNumber", { required: "Phone Number is required" })}
          />
          {errors.PhoneNumber && <p className="text-red-600">{errors.PhoneNumber.message}</p>}

          <input
            type="text"
            placeholder="Country"x
            className="borderpp-21"
            {...register("Country", { required: "Country is required" })}
          />

          <input
            type="text"
            placeholder="State"
            className="borderp-21"
            {...register("State", { required: "State is required" })}
          />

          <input
            type="text"
            placeholder="City"
            className="borderp-21"
            {...register("City", { required: "City is required" })}
          />

          <input
            type="text"
            placeholder="Postal Code"
            className="borderp-21"
            {...register("PostalCode", { required: "Postal Code is required" })}
          />

          <input
            type="text"
            placeholder="Address"
            className="borderp-21"
            {...register("Address", { required: "Address is required" })}
          />

          <input
            type="date"
            placeholder="Date of Birth"
            className="borderp-21"
            {...register("DateofBirth", { required: "Date of Birth is required" })}
          />

          <select
            className="borderp-21"
            {...register("Gender", { required: "Gender is required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            className="borderp-21"
            {...register("title", { required: "Title is required" })}
          />

          <select
            className="borderp-21"
            {...register("type", { required: "Type is required" })}
          >
            <option value="">Select Type</option>
            <option value="farm_certificate">Farm Certificate</option>
            <option value="loan_agreement">Loan Agreement</option>
            <option value="identity_proof">Identity Proof</option>
            <option value="other">Other</option>
          </select>

          <input
            type="file"
            className="borderp-21"
            {...register("document", { required: "Document is required" })}
          />
          {errors.document && <p className="text-red-600">{errors.document.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;