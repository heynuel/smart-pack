"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailLower = formData.email.trim().toLowerCase();

    if (emailLower === "admin@smartpark.com") {
      router.push("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("smartpark_users") || "[]");
    const matchedUser = users.find(
      (u) =>
        u.email.toLowerCase() === emailLower &&
        u.password === formData.password
    );

    if (!matchedUser) {
      setError("Invalid email or password. Please register an account first.");
      return;
    }

    localStorage.setItem("smartpark_current_user", JSON.stringify(matchedUser));

    if (matchedUser.role === "Security") {
      router.push("/security");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F3F4F6] text-[#111827] flex flex-col font-sans antialiased">
      <header className="bg-[#FFFFFF] border-b border-[#E5E7EB] w-full">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-10 h-16 sm:h-20 flex items-center justify-between gap-2">
          <Link href="/landing" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2L4 6.2V13.4C4 19.8 8.26 25.68 14 27.2C19.74 25.68 24 19.8 24 13.4V6.2L14 2Z"
                fill="#111827"
                stroke="#D97706"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M10 14.2L12.7 16.9L18.5 11.1"
                stroke="#D97706"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[17px] sm:text-[20px] font-bold text-[#111827] tracking-tight whitespace-nowrap">
              SmartPark
            </span>
          </Link>

          <Link
            href="/register"
            className="bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[13px] sm:text-[15px] font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[440px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="space-y-1.5 mb-6 sm:mb-7">
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
              Welcome back
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#4B5563]">
              Log in to view your access pass.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-[#B91C1C] text-[#B91C1C] text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[14px] font-semibold text-[#111827]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827] transition-colors"
              />
            </div>

            <div className="flex justify-end pt-0.5">
              <Link
                href="#"
                className="text-[13px] sm:text-[14px] font-medium text-[#92400E] underline hover:opacity-80"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[15px] font-semibold py-3.5 rounded-lg transition-colors cursor-pointer"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-[14px] text-[#4B5563] mt-6">
            New driver?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#92400E] underline hover:opacity-80"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}