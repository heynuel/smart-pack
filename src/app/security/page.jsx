"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Html5Qrcode } from "html5-qrcode";
import { Check, User, Car, Mail, X, Clock } from "lucide-react";

export default function SecurityPage() {
  const router = useRouter();
  const scannerRef = useRef(null);

  const [scanData, setScanData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [emailSent, setEmailSent] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    setCameraError("");
    setIsScanning(true);

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
        },
        (decodedText) => {
          handleQrDetected(decodedText);
          stopScanner();
        },
        () => {}
      );
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Could not access camera. Please allow camera permissions.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleQrDetected = (decodedText) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const allUsers = JSON.parse(localStorage.getItem("smartpark_users") || "[]");

    try {
      const parsedQr = JSON.parse(decodedText);
      const matched = allUsers.find(
        (u) => u.id === parsedQr.id || u.plateNumber === parsedQr.plateNumber
      );

      setScanData({
        name: matched?.name || parsedQr.name || "Daniel Mensah",
        plateNumber: matched?.plateNumber || parsedQr.plateNumber || "ABC-123-XY",
        role: matched?.role || parsedQr.role || "Parent",
        scannedAt: formattedTime,
        personImage: matched?.personImage || null,
        vehicleImage: matched?.vehicleImage || null,
      });
      setStatus("approved");
      setEmailSent(true);
    } catch {
      setScanData({
        name: decodedText.slice(0, 24),
        plateNumber: "ABC-123-XY",
        role: "Visitor",
        scannedAt: formattedTime,
        personImage: null,
        vehicleImage: null,
      });
      setStatus("approved");
      setEmailSent(true);
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

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <span className="text-[13px] sm:text-[15px] font-medium text-[#111827] whitespace-nowrap">
              Security officer
            </span>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] text-[13px] sm:text-[14px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1120px] w-full mx-auto px-4 sm:px-10 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
            <div className="space-y-1">
              <h1 className="text-[21px] sm:text-[24px] font-bold text-[#111827] tracking-tight">
                Access verification
              </h1>
              <p className="text-[14px] sm:text-[15px] text-[#4B5563]">
                Scan the driver&apos;s QR card
              </p>
            </div>

            <div className="w-full bg-[#111827] rounded-2xl p-5 sm:p-10 flex flex-col justify-between aspect-[4/3] relative overflow-hidden">
              <div
                id="qr-reader"
                className={`absolute inset-0 w-full h-full object-cover ${
                  isScanning ? "block" : "hidden"
                }`}
              />

              <div className="flex items-center justify-between relative z-10 pointer-events-none">
                <div className="w-10 h-10 sm:w-14 sm:h-14 border-[3px] border-[#D97706] rounded-tl-lg" />
                <div className="w-10 h-10 sm:w-14 sm:h-14 border-[3px] border-[#D97706] rounded-tr-lg" />
              </div>

              <div className="w-full px-2 sm:px-4 my-auto relative z-10 pointer-events-none">
                <div
                  className={`h-[2px] w-full bg-[#D97706] ${
                    isScanning ? "animate-pulse" : ""
                  }`}
                />
              </div>

              <div className="flex items-end justify-between gap-2 relative z-10 pointer-events-none">
                <div className="w-10 h-10 sm:w-14 sm:h-14 border-[3px] border-[#D97706] rounded-bl-lg shrink-0" />
                <p className="text-[12px] sm:text-[14px] text-[#E5E7EB] text-center pb-1 sm:pb-3 px-2 bg-[#111827]/70 rounded">
                  {isScanning
                    ? "Hold QR card steady"
                    : "Point the camera at the QR card"}
                </p>
                <div className="w-10 h-10 sm:w-14 sm:h-14 border-[3px] border-[#D97706] rounded-br-lg shrink-0" />
              </div>
            </div>

            {cameraError && (
              <p className="text-xs font-medium text-[#B91C1C]">{cameraError}</p>
            )}

            <button
              type="button"
              onClick={isScanning ? stopScanner : startScanner}
              className="w-full bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold py-3.5 rounded-lg transition-colors cursor-pointer"
            >
              {isScanning ? "Stop camera" : "Scan QR card"}
            </button>
          </div>

          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
            {status === "idle" && (
              <div className="w-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563] px-4 sm:px-5 py-3.5 rounded-xl flex items-center gap-3 font-semibold text-[14px] sm:text-[15px]">
                <Clock className="w-5 h-5 text-[#6B7280] shrink-0" />
                <span>Awaiting QR card scan...</span>
              </div>
            )}

            {status === "approved" && (
              <div className="w-full bg-[#DCFCE7] text-[#166534] px-4 sm:px-5 py-3.5 rounded-xl flex items-center gap-3 font-bold text-[15px] sm:text-[16px]">
                <Check className="w-5 h-5 stroke-[2.5] shrink-0" />
                <span>Access approved</span>
              </div>
            )}

            {status === "denied" && (
              <div className="w-full bg-red-50 border border-[#B91C1C]/30 text-[#B91C1C] px-4 sm:px-5 py-3.5 rounded-xl flex items-center gap-3 font-bold text-[15px] sm:text-[16px]">
                <X className="w-5 h-5 stroke-[2.5] shrink-0" />
                <span>Access denied</span>
              </div>
            )}

            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <div className="col-span-5 h-28 sm:h-36 rounded-xl bg-[#E5E7EB]/80 flex items-center justify-center overflow-hidden">
                {scanData?.personImage ? (
                  <img
                    src={scanData.personImage}
                    alt={scanData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B7280] stroke-[1.7]" />
                )}
              </div>

              <div className="col-span-7 h-28 sm:h-36 rounded-xl bg-[#E5E7EB]/80 flex items-center justify-center overflow-hidden">
                {scanData?.vehicleImage ? (
                  <img
                    src={scanData.vehicleImage}
                    alt={scanData.plateNumber}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Car className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B7280] stroke-[1.7]" />
                )}
              </div>
            </div>

            <div className="divide-y divide-[#E5E7EB] text-[14px] sm:text-[15px]">
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-2">
                <span className="text-[#6B7280]">Name</span>
                <span className="font-bold text-[#111827] text-right">
                  {scanData ? scanData.name : "—"}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-2">
                <span className="text-[#6B7280]">Plate number</span>
                <span className="font-bold text-[#111827] uppercase text-right">
                  {scanData ? scanData.plateNumber : "—"}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-2">
                <span className="text-[#6B7280]">Role</span>
                <span className="font-bold text-[#111827] text-right">
                  {scanData ? scanData.role : "—"}
                </span>
              </div>
              <div className="py-3 sm:py-3.5 flex items-center justify-between gap-2">
                <span className="text-[#6B7280]">Scanned at</span>
                <span className="font-bold text-[#111827] text-right">
                  {scanData ? scanData.scannedAt : "—"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (!scanData) return;
                  setStatus("approved");
                  setEmailSent(true);
                }}
                disabled={!scanData}
                className={`w-full text-[14px] sm:text-[15px] font-semibold py-3.5 rounded-lg transition-colors ${
                  scanData
                    ? "bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] cursor-pointer"
                    : "bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed"
                }`}
              >
                Approve entry
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!scanData) return;
                  setStatus("denied");
                  setEmailSent(false);
                }}
                disabled={!scanData}
                className={`w-full text-[14px] sm:text-[15px] font-semibold py-3.5 rounded-lg border transition-colors ${
                  scanData
                    ? "bg-[#FFFFFF] hover:bg-red-50 text-[#B91C1C] border-[#B91C1C] cursor-pointer"
                    : "bg-[#FFFFFF] text-[#9CA3AF] border-[#E5E7EB] cursor-not-allowed"
                }`}
              >
                Deny entry
              </button>
            </div>

            {status === "approved" && emailSent && (
              <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] text-[#4B5563] pt-1">
                <Mail className="w-4 h-4 text-[#6B7280] shrink-0" />
                <span>Confirmation email sent to the driver.</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}