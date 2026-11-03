"use client";

import Link from "next/link";
import { User } from "lucide-react";

export default function ContributorsPage() {
  const contributors = [
    { name: "[Full name]", role: "UI/UX Designer", image: "" },
    { name: "[Full name]", role: "Project Lead", image: "" },
    { name: "[Full name]", role: "Front-end Developer", image: "" },
    { name: "[Full name]", role: "Back-end Developer", image: "" },
    { name: "[Full name]", role: "Database Developer", image: "" },
    { name: "[Full name]", role: "Quality Tester", image: "" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F3F4F6] text-[#111827] flex flex-col justify-between font-sans antialiased">
      <header className="bg-[#FFFFFF] border-b border-[#E5E7EB] w-full">
        <div className="max-w-[1180px] mx-auto px-3.5 sm:px-10 h-16 sm:h-20 flex items-center justify-between gap-2">
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

          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <Link
              href="/login"
              className="text-[13px] sm:text-[15px] font-medium text-[#111827] hover:text-[#92400E] transition-colors whitespace-nowrap"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[13px] sm:text-[15px] font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1180px] w-full mx-auto px-4 sm:px-10 py-10 sm:py-20 space-y-10 sm:space-y-14 flex-1">
        <div className="text-center space-y-3 max-w-[580px] mx-auto">
          <div className="inline-flex items-center bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[12px] sm:text-[13px] font-semibold px-4 py-1 rounded-full">
            The team
          </div>
          <h1 className="text-[28px] sm:text-[44px] font-bold text-[#111827] tracking-tight leading-tight">
            Meet the contributors
          </h1>
          <p className="text-[14px] sm:text-[16px] text-[#4B5563] leading-relaxed">
            The people behind SmartPark, who planned, designed, and built the
            access pass system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {contributors.map((member, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] border border-[#E5E7EB] border-b-[5px] border-b-[#D97706] rounded-2xl p-7 sm:p-10 flex flex-col items-center text-center space-y-4 sm:space-y-5 shadow-xs"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#E5E7EB]/80 border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] overflow-hidden shrink-0">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.6]" />
                )}
              </div>

              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111827]">
                {member.name}
              </h3>

              <span className="inline-block bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[12px] sm:text-[13px] font-semibold px-4 py-1 rounded-full">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[#E5E7EB] bg-[#F3F4F6] py-6 sm:py-8 px-4 text-center text-[12px] sm:text-[13px] text-[#6B7280]">
        SmartPark. Secure access for every driver.
      </footer>
    </div>
  );
}