"use client";

import Link from "next/link";

export default function LandingPage() {
  const steps = [
    {
      num: "1",
      title: "Register",
      desc: "Add your details, your photo, and your vehicle photo.",
    },
    {
      num: "2",
      title: "Unlock your pass",
      desc: "Log in and re-enter your password to reveal your QR card.",
    },
    {
      num: "3",
      title: "Print the card",
      desc: "Print your access pass and keep it with you.",
    },
    {
      num: "4",
      title: "Scan and verify",
      desc: "Security scans the card and confirms the driver and vehicle.",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F3F4F6] text-[#111827] flex flex-col justify-between font-sans antialiased">
 
      <header className="bg-[#FFFFFF] border-b border-[#E5E7EB] w-full">
        <div className="max-w-[1120px] mx-auto px-3.5 sm:px-10 h-16 sm:h-20 flex items-center justify-between gap-2">
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

          <div className="flex items-center gap-2.5 sm:gap-6 shrink-0">
            <Link
              href="/contributors"
              className="text-[13px] sm:text-[15px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors whitespace-nowrap"
            >
              The team
            </Link>
            <Link
              href="/login"
              className="text-[13px] sm:text-[15px] font-medium text-[#111827] hover:text-[#92400E] transition-colors whitespace-nowrap"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[13px] sm:text-[15px] font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              Register
            </Link>
          </div>
        </div>
      </header>


      <main className="max-w-[1120px] w-full mx-auto px-4 sm:px-10 py-8 sm:py-20 space-y-14 sm:space-y-24 flex-1">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[12px] sm:text-[13px] font-semibold px-3.5 py-1.5 rounded-full">
              Campus access, simplified
            </div>

            <h1 className="text-[32px] sm:text-[52px] font-bold text-[#111827] leading-[1.14] tracking-tight">
              Secure access, one
              <br className="hidden sm:inline" /> scan at a time.
            </h1>

            <p className="text-[#4B5563] text-[15px] sm:text-[18px] leading-relaxed max-w-[520px]">
              Register once, unlock your access pass, and show it to security.
              Every entry is verified in seconds.
            </p>

            <div className="flex items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/register"
                className="bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] text-[14px] sm:text-[15px] font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[380px] bg-[#111827] rounded-2xl overflow-hidden shadow-xl border border-[#111827]">
              <div className="h-2.5 w-full bg-[#D97706]" />
              <div className="p-5 sm:p-7 space-y-5 sm:space-y-6">
                <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#D97706]">
                  SMARTPARK ACCESS PASS
                </p>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#E5E7EB] flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#6B7280]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" />
                    </svg>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-[16px] sm:text-[18px] font-bold text-[#FFFFFF] leading-tight truncate">
                      Daniel Peters
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-[#9CA3AF] font-medium tracking-wide">
                      ABC-123-XY
                    </p>
                    <div className="pt-0.5">
                      <span className="inline-block bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[11px] font-semibold px-3 py-0.5 rounded-full">
                        Parent
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] rounded-xl p-4 sm:p-6 flex items-center justify-center">
                  <svg
                    viewBox="0 0 140 140"
                    className="w-32 h-32 sm:w-40 sm:h-40 text-[#111827]"
                    fill="currentColor"
                  >
                    <path d="M10 10h38v38H10V10zm6 6v26h26V16H16zm6 6h14v14H22V22z" />
                    <path d="M92 10h38v38H92V10zm6 6v26h26V16H98zm6 6h14v14h-14V22z" />
                    <path d="M10 92h38v38H10V92zm6 6v26h26V98H16zm6 6h14v14H22v-14z" />
                    <rect x="56" y="10" width="8" height="8" />
                    <rect x="72" y="10" width="8" height="16" />
                    <rect x="56" y="26" width="8" height="16" />
                    <rect x="72" y="34" width="12" height="8" />
                    <rect x="10" y="56" width="16" height="8" />
                    <rect x="34" y="56" width="8" height="16" />
                    <rect x="10" y="72" width="8" height="12" />
                    <rect x="26" y="76" width="16" height="8" />
                    <rect x="50" y="50" width="16" height="8" />
                    <rect x="74" y="50" width="8" height="16" />
                    <rect x="50" y="66" width="8" height="16" />
                    <rect x="66" y="74" width="16" height="8" />
                    <rect x="92" y="56" width="16" height="8" />
                    <rect x="116" y="56" width="14" height="8" />
                    <rect x="100" y="72" width="16" height="8" />
                    <rect x="122" y="68" width="8" height="16" />
                    <rect x="56" y="92" width="8" height="16" />
                    <rect x="72" y="96" width="16" height="8" />
                    <rect x="56" y="116" width="16" height="14" />
                    <rect x="80" y="112" width="8" height="18" />
                    <rect x="96" y="92" width="16" height="16" />
                    <rect x="120" y="92" width="10" height="8" />
                    <rect x="96" y="116" width="8" height="14" />
                    <rect x="112" y="116" width="18" height="14" />
                  </svg>
                </div>

                <p className="text-center text-[11px] sm:text-[12px] text-[#9CA3AF]">
                  Valid only for the registered driver and vehicle.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 sm:space-y-7">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#111827] tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-3 sm:space-y-4 shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#FFFBEB] border border-[#D97706] text-[#92400E] flex items-center justify-center text-[14px] font-bold">
                  {step.num}
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5E7EB] bg-[#F3F4F6] py-6 sm:py-8 px-4 text-center text-[12px] sm:text-[13px] text-[#6B7280]">
        SmartPark. Secure access for every driver.
      </footer>
    </div>
  );
}