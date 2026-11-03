"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    plateNumber: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [personPreview, setPersonPreview] = useState(null);
  const [vehiclePreview, setVehiclePreview] = useState(null);
  const [personFileName, setPersonFileName] = useState("");
  const [vehicleFileName, setVehicleFileName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "person") {
        setPersonPreview(reader.result);
        setPersonFileName(file.name);
      } else {
        setVehiclePreview(reader.result);
        setVehicleFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("smartpark_users") || "[]"
    );

    const emailTaken = existingUsers.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (emailTaken) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      plateNumber:
        formData.role === "Security"
          ? "N/A"
          : formData.plateNumber.toUpperCase(),
      role: formData.role,
      status: "Active",
      password: formData.password,
      personImage: personPreview,
      vehicleImage: vehiclePreview,
    };

    const updatedUsers = [newUser, ...existingUsers];
    localStorage.setItem("smartpark_users", JSON.stringify(updatedUsers));
    localStorage.setItem("smartpark_current_user", JSON.stringify(newUser));

    if (newUser.role === "Security") {
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

          <div className="flex items-center gap-3 text-[13px] sm:text-[14px] shrink-0">
            <span className="text-[#4B5563] hidden sm:inline">
              Already registered?
            </span>
            <Link
              href="/login"
              className="bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] font-semibold px-3.5 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[760px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-5 sm:p-10 shadow-xs">
          <div className="space-y-1.5 mb-6 sm:mb-8">
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
              Create your access profile
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#4B5563]">
              Register once to get your secure access pass.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-[#B91C1C] text-[#B91C1C] text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  required
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/[^0-9+ ]/g, ""),
                    })
                  }
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Street, city"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Plate number
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  required={formData.role !== "Security"}
                  placeholder="ABC-123-XY"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] uppercase focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Role
                </label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] focus:outline-none focus:border-[#111827] ${
                    formData.role ? "text-[#111827]" : "text-[#6B7280]"
                  }`}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                  <option value="Student">Student</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3.5 sm:px-4 py-3 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] sm:text-[15px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-1">
              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Upload a clear photo of yourself
                </label>
                <label className="flex flex-col items-center justify-center border border-dashed border-[#9CA3AF] rounded-xl p-5 sm:p-6 text-center cursor-pointer hover:border-[#111827] transition-colors bg-[#FFFFFF]">
                  {personPreview ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={personPreview}
                        alt="Person preview"
                        className="w-16 h-16 rounded-lg object-cover border border-[#E5E7EB]"
                      />
                      <span className="text-xs font-medium text-[#166534] flex items-center gap-1 break-all">
                        <Check className="w-3.5 h-3.5 shrink-0" /> {personFileName}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-[#6B7280] mb-2" />
                      <span className="text-[13px] text-[#6B7280] mb-3">
                        JPG or PNG, up to 5 MB
                      </span>
                      <span className="px-4 py-1.5 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[13px] font-semibold text-[#111827]">
                        Choose file
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    required
                    onChange={(e) => handleImageUpload(e, "person")}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#111827]">
                  Upload a photo of your vehicle
                </label>
                <label className="flex flex-col items-center justify-center border border-dashed border-[#9CA3AF] rounded-xl p-5 sm:p-6 text-center cursor-pointer hover:border-[#111827] transition-colors bg-[#FFFFFF]">
                  {vehiclePreview ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={vehiclePreview}
                        alt="Vehicle preview"
                        className="w-24 h-16 rounded-lg object-cover border border-[#E5E7EB]"
                      />
                      <span className="text-xs font-medium text-[#166534] flex items-center gap-1 break-all">
                        <Check className="w-3.5 h-3.5 shrink-0" /> {vehicleFileName}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-[#6B7280] mb-2" />
                      <span className="text-[13px] text-[#6B7280] mb-3">
                        JPG or PNG, up to 5 MB
                      </span>
                      <span className="px-4 py-1.5 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[13px] font-semibold text-[#111827]">
                        Choose file
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    required={formData.role !== "Security"}
                    onChange={(e) => handleImageUpload(e, "vehicle")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#111827] hover:bg-[#1f2937] text-[#FFFFFF] text-[15px] font-semibold py-3.5 rounded-lg transition-colors cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="text-center text-[14px] text-[#4B5563] mt-6">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#92400E] underline hover:opacity-80"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}