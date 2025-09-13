import React, { useState } from "react";
 import { ToastContainer, toast } from 'react-toastify';
const AdmissionForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required.";
    if (!form.email.match(/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/))
      newErrors.email = "Please enter a valid email (e.g., student@gmail.com).";
    if (!form.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter a 10-digit mobile number.";
    return newErrors;
  };

  // 🔹 Submit to PHP API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost/erp/admission.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.status === "success") {
        toast.success( result.message);
        setForm({ name: "", email: "", phone: "" }); // Reset form
      } else {
        toast.error( result.message);
      }
    } catch (error) {
      toast.error("⚠️ Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card container p-3" style={{ width: "500px" }}>
      <form className="container mt-4" onSubmit={handleSubmit}>
        <h1 className="text-center text-primary text-xl p-1">Admission Form</h1>
        <hr />
        <br />

        {/* 🔹 Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger p-4">
            Please correct errors in: {Object.keys(errors).join(", ")}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>


 
          <ToastContainer />
    </div>
  );
};

export default AdmissionForm;
