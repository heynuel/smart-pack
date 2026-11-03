"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, User, Car, X } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(
      localStorage.getItem("smartpark_users") || "[]"
    );
    setRecords(savedUsers);
  }, []);

  const filteredRecords = records.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id) => {
    const updated = records.filter((item) => item.id !== id);
    setRecords(updated);
    localStorage.setItem("smartpark_users", JSON.stringify(updated));

    const currentRaw = localStorage.getItem("smartpark_current_user");
    if (currentRaw) {
      const current = JSON.parse(currentRaw);
      if (current.id === id) {
        localStorage.removeItem("smartpark_current_user");
      }
    }
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const updated = records.map((item) =>
      item.id === editingDriver.id ? editingDriver : item
    );
    setRecords(updated);
    localStorage.setItem("smartpark_users", JSON.stringify(updated));

    const currentRaw = localStorage.getItem("smartpark_current_user");
    if (currentRaw) {
      const current = JSON.parse(currentRaw);
      if (current.id === editingDriver.id) {
        localStorage.setItem(
          "smartpark_current_user",
          JSON.stringify(editingDriver)
        );
      }
    }

    setEditingDriver(null);
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

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-[13px] sm:text-[15px] font-medium text-[#111827]">
              Admin
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

      <main className="max-w-[1120px] w-full mx-auto px-4 sm:px-10 py-8 sm:py-12 space-y-6 flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[22px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
              Registered drivers and vehicles
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#4B5563]">
              View, search, and manage every record.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or plate number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#9CA3AF] rounded-lg text-[14px] text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#111827]"
            />
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-[#F3F4F6] border-b border-[#E5E7EB] text-[12px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <th className="py-4 px-5 sm:px-6">Driver</th>
                  <th className="py-4 px-5 sm:px-6">Plate Number</th>
                  <th className="py-4 px-5 sm:px-6">Role</th>
                  <th className="py-4 px-5 sm:px-6">Status</th>
                  <th className="py-4 px-5 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[14px]">
                {filteredRecords.map((driver) => (
                  <tr
                    key={driver.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-4 px-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                          {driver.personImage ? (
                            <img
                              src={driver.personImage}
                              alt={driver.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-[#6B7280]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#111827] leading-snug truncate">
                            {driver.name}
                          </p>
                          <p className="text-[13px] text-[#6B7280] truncate">
                            {driver.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 sm:px-6 font-bold text-[#111827] uppercase whitespace-nowrap">
                      {driver.plateNumber}
                    </td>

                    <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                      <span className="inline-block bg-[#FFFBEB] border border-[#D97706] text-[#92400E] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                        {driver.role}
                      </span>
                    </td>

                    <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                      {driver.status === "Active" ? (
                        <span className="inline-block bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDriver(driver)}
                          className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingDriver({ ...driver })}
                          className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-gray-50 text-[#111827] border border-[#9CA3AF] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(driver.id)}
                          className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-red-50 text-[#B91C1C] border border-[#B91C1C] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 px-4 text-center text-[#6B7280] text-[14px]"
                    >
                      No registered drivers yet. Register a new account at{" "}
                      <Link
                        href="/register"
                        className="text-[#92400E] font-semibold underline"
                      >
                        /register
                      </Link>{" "}
                      to see it appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-[#E5E7EB] text-[13px] text-[#6B7280]">
            Showing all {filteredRecords.length} records
          </div>
        </div>
      </main>

      {/* View Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-[#111827]/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#111827]">
                Driver Details
              </h3>
              <button
                onClick={() => setSelectedDriver(null)}
                className="text-[#6B7280] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="h-28 rounded-xl bg-[#E5E7EB] flex items-center justify-center overflow-hidden">
                {selectedDriver.personImage ? (
                  <img
                    src={selectedDriver.personImage}
                    alt={selectedDriver.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-[#6B7280]" />
                )}
              </div>
              <div className="h-28 rounded-xl bg-[#E5E7EB] flex items-center justify-center overflow-hidden">
                {selectedDriver.vehicleImage ? (
                  <img
                    src={selectedDriver.vehicleImage}
                    alt={selectedDriver.plateNumber}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Car className="w-10 h-10 text-[#6B7280]" />
                )}
              </div>
            </div>

            <div className="divide-y divide-[#E5E7EB] text-[13px] sm:text-[14px]">
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Name</span>
                <span className="font-bold text-[#111827] text-right">
                  {selectedDriver.name}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Email</span>
                <span className="font-semibold text-[#111827] text-right break-all">
                  {selectedDriver.email}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Phone</span>
                <span className="font-semibold text-[#111827] text-right">
                  {selectedDriver.phone}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Address</span>
                <span className="font-semibold text-[#111827] text-right">
                  {selectedDriver.address}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Plate number</span>
                <span className="font-bold text-[#111827] text-right">
                  {selectedDriver.plateNumber}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Role</span>
                <span className="font-semibold text-[#92400E] text-right">
                  {selectedDriver.role}
                </span>
              </div>
              <div className="py-2.5 flex justify-between gap-2">
                <span className="text-[#6B7280]">Status</span>
                <span className="font-semibold text-[#111827] text-right">
                  {selectedDriver.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDriver(null)}
              className="w-full bg-[#111827] text-[#FFFFFF] font-semibold py-2.5 rounded-lg text-[14px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingDriver && (
        <div className="fixed inset-0 bg-[#111827]/50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleEditSave}
            className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#111827]">
                Edit Driver Record
              </h3>
              <button
                type="button"
                onClick={() => setEditingDriver(null)}
                className="text-[#6B7280] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#111827]">
                Full name
              </label>
              <input
                type="text"
                required
                value={editingDriver.name}
                onChange={(e) =>
                  setEditingDriver({ ...editingDriver, name: e.target.value })
                }
                className="w-full px-3.5 py-2 border border-[#9CA3AF] rounded-lg text-[14px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold text-[#111827]">
                Plate number
              </label>
              <input
                type="text"
                required
                value={editingDriver.plateNumber}
                onChange={(e) =>
                  setEditingDriver({
                    ...editingDriver,
                    plateNumber: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-3.5 py-2 border border-[#9CA3AF] rounded-lg text-[14px] uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-[#111827]">
                  Role
                </label>
                <select
                  value={editingDriver.role}
                  onChange={(e) =>
                    setEditingDriver({ ...editingDriver, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#9CA3AF] rounded-lg text-[14px]"
                >
                  <option value="Parent">Parent</option>
                  <option value="Staff">Staff</option>
                  <option value="Student">Student</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-[#111827]">
                  Status
                </label>
                <select
                  value={editingDriver.status}
                  onChange={(e) =>
                    setEditingDriver({
                      ...editingDriver,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-[#9CA3AF] rounded-lg text-[14px]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#111827] text-[#FFFFFF] font-semibold py-2.5 rounded-lg text-[14px] cursor-pointer"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setEditingDriver(null)}
                className="flex-1 bg-[#FFFFFF] border border-[#9CA3AF] text-[#111827] font-semibold py-2.5 rounded-lg text-[14px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}