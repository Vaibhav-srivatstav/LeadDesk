"use client";

import { useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  budgetRange: "",
  message: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.budgetRange) {
      newErrors.budgetRange = "Please select a budget range";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess(false);
    setServerError("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }

        throw new Error(
          data.message || "Something went wrong"
        );
      }

      setForm(initialForm);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold">
          Tell us about your project
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Fill out the form and we&apos;ll be in touch.
        </p>
      </div>

      {success && (
        <div className="mb-6 flex gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
          <CheckCircle2
            className="shrink-0"
            size={20}
          />

          <div>
            <p className="font-semibold">
              Lead submitted successfully!
            </p>

            <p className="mt-1 text-green-300/80">
              Thank you. We&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      )}

      {serverError && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}
        <FormField
          label="Name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Email */}
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Budget */}
        <div>
          <label
            htmlFor="budgetRange"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Budget Range
          </label>

          <select
            id="budgetRange"
            name="budgetRange"
            value={form.budgetRange}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 ${
              errors.budgetRange
                ? "border-red-500"
                : "border-white/10"
            }`}
          >
            <option value="">
              Select your budget
            </option>

            <option value="Under $1,000">
              Under $1,000
            </option>

            <option value="$1,000 - $5,000">
              $1,000 - $5,000
            </option>

            <option value="$5,000 - $10,000">
              $5,000 - $10,000
            </option>

            <option value="$10,000+">
              $10,000+
            </option>
          </select>

          {errors.budgetRange && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.budgetRange}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={handleChange}
            className={`w-full resize-none rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 ${
              errors.message
                ? "border-red-500"
                : "border-white/10"
            }`}
          />

          <div className="mt-1.5 flex justify-between">
            {errors.message ? (
              <p className="text-xs text-red-400">
                {errors.message}
              </p>
            ) : (
              <span />
            )}

            <span className="text-xs text-slate-600">
              {form.message.length}/2000
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="animate-spin"
                size={18}
              />

              Submitting...
            </>
          ) : (
            <>
              Submit Lead
              <Send size={17} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 ${
          error
            ? "border-red-500"
            : "border-white/10"
        }`}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}