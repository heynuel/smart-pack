"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Lock, User, Car } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentRaw = localStorage.getItem("smartpark_current_user");
    if (!currentRaw) {
      router.push("/login");
      return;
    }

    const currentUser = JSON.parse(currentRaw);
    const allUsers = JSON.parse(
      localStorage.getItem("smartpark_users") || "[]"
    );

    const latestRecord =
      allUsers.find((u) => u.id === currentUser.id) || currentUser;
    setUser(latestRecord);
  }, [router]);

  const handleUnlock = (e) => {
    e.preventDefault();
    setError("");

    if (!passwordInput.trim()) {
      setError("Please enter your password to unlock your pass.");
      return;
    }

    if (passwordInput !== user.password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    setIsUnlocked(true);
  };

  const handlePrint = () => {
    if (!isUnlocked) return;
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("smartpark_current_user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F3F4F6] text-[#111827] flex flex-col font-sans antialiased">
      <header className="bg-[#FFFFFF] border-b border-[#E5E7EB] w-full print:hidden">
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

          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <span className="text-[13px] sm:text-[15px] font-medium text-[#111827] truncate max-w-[110px] sm:max-w-none">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] text-[13px] sm:text-[14px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1120px] w-full mx-auto px-4 sm:px-10 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-xs">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                {user.personImage ? (
                  <img
                    src={user.personImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#6B7280]" />
                )}
              </div>
              <div className="space-y-1.5 min-w-0">
                <h2 className="text-[19px] sm:text-[22px] font-bold text-[#111827] leading-tight truncate">
                  {user.name}
                </h2>
                <span className="inline-block bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="divide-y divide-[#E5E7EB] text-[13px] sm:text-[14px]">
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
                <span className="text-[#6B7280] shrink-0">Email</span>
                <span className="font-semibold text-[#111827] text-right break-all">
                  {user.email}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
                <span className="text-[#6B7280] shrink-0">Phone</span>
                <span className="font-semibold text-[#111827] text-right">
                  {user.phone}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
                <span className="text-[#6B7280] shrink-0">Address</span>
                <span className="font-semibold text-[#111827] text-right">
                  {user.address}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-3">
                <span className="text-[#6B7280] shrink-0">Plate number</span>
                <span className="font-semibold text-[#111827] text-right uppercase">
                  {user.plateNumber}
                </span>
              </div>
            </div>

            <div className="w-full h-40 sm:h-44 rounded-xl bg-[#E5E7EB]/70 flex items-center justify-center overflow-hidden">
              {user.vehicleImage ? (
                <img
                  src={user.vehicleImage}
                  alt="Registered Vehicle"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Car className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B7280]" />
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#111827]">
                Your access pass
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#4B5563]">
                {isUnlocked
                  ? "Your access pass is unlocked and ready to print."
                  : "Your access pass is protected. Enter your password to unlock it."}
              </p>
            </div>

            <div className="w-full bg-[#F3F4F6] rounded-xl p-6 sm:p-8 flex items-center justify-center relative min-h-[220px] sm:min-h-[240px]">
              <div
                className={`bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl shadow-xs transition-all duration-300 ${
                  !isUnlocked ? "blur-md select-none opacity-60" : ""
                }`}
              >
                <QRCodeSVG
                  value={JSON.stringify({
                    id: user.id,
                    name: user.name,
                    plateNumber: user.plateNumber,
                    role: user.role,
                  })}
                  size={155}
                  bgColor="#FFFFFF"
                  fgColor="#111827"
                  level="M"
                />
              </div>

              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#111827] border-2 border-[#D97706] flex items-center justify-center shadow-md">
                    <Lock className="w-6 h-6 text-[#FFFFFF]" />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="text-xs font-medium text-[#B91C1C]">{error}</p>
            )}

            <form onSubmit={handleUnlock} className="space-y-2 print:hidden">
              <label className="block text-[14px] font-semibold text-[#111827]">
                Password
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
                <button
                  type="submit"
                  className="bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Unlock pass
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={handlePrint}
              disabled={!isUnlocked}
              className={`w-full py-3.5 rounded-lg text-[14px] sm:text-[15px] font-semibold border transition-colors print:hidden ${
                isUnlocked
                  ? "bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border-[#111827] cursor-pointer"
                  : "bg-[#FFFFFF] text-[#6B7280] border-[#9CA3AF] cursor-not-allowed"
              }`}
            >
              Print pass
            </button>

            <p className="text-center text-[12px] sm:text-[13px] text-[#4B5563]">
              Present this card to security for verification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}