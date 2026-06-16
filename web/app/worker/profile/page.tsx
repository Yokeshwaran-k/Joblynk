"use client";

import { useEffect, useState } from "react";
interface WorkerProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  skill: string;
  dailyWage: number;
  experience: number;
  address: string;
  pincode: string;
  district: string;
  state: string;
  isAvailable: boolean;
}

export default function WorkerProfilePage() {
    const [profile, setProfile] =
  useState<WorkerProfile | null>(null);

  const [loading, setLoading] =
  useState(true);
  const getProfile = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "/api/worker/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setProfile(data.data);
    }

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};
useEffect(() => {
  getProfile();
}, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
if (!profile) {
  return (
    <div>
      Profile not found
    </div>
  );
}
  return (
    <main className="min-h-screen bg-[#F5F5F7]">

      {/* Navbar */}

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <h1 className="text-3xl font-bold text-[#1D1D1F]">
            Joblynk
          </h1>

          <button className="text-red-500 font-semibold">
            Logout
          </button>

        </div>
      </nav>

      {/* Profile */}

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white rounded-3xl shadow-lg p-10">

          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full bg-[#0071E3] flex items-center justify-center text-white text-5xl font-bold">
              K
            </div>

            <h1 className="mt-6 text-4xl font-bold text-[#1D1D1F]">
              {profile?.name}
            </h1>

            <p className="mt-2 text-xl text-gray-500">
              {profile?.skill}
            </p>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            <div className="bg-[#F5F5F7] p-8 rounded-2xl">

              <p className="text-gray-500">
                Experience
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {profile?.experience} Years
              </h2>

            </div>

            <div className="bg-[#F5F5F7] p-8 rounded-2xl">

              <p className="text-gray-500">
                Daily Wage
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹{profile?.dailyWage}
              </h2>

            </div>

          </div>

          {/* Address */}

          <div className="mt-8 bg-[#F5F5F7] rounded-2xl p-8">

            <h2 className="text-2xl font-bold">
              Address
            </h2>

            <p className="mt-4 text-gray-600">
              {profile?.address}
            </p>

            <p className="text-gray-600">
              {profile?.district} - {profile?.pincode}
            </p>

            <p className="text-gray-600">
              {profile?.state}
            </p>

          </div>

          {/* Availability */}

          <div className="mt-8 bg-[#F5F5F7] rounded-2xl p-8">

            <h2 className="text-2xl font-bold">
              Availability
            </h2>

            <p className="mt-4 text-green-600 font-semibold text-lg">
              {
                profile?.isAvailable
                  ? "🟢 Available for Work"
                  : "🔴 Not Available"
              }
            </p>

          </div>

          {/* Button */}

          <button className="w-full mt-10 bg-[#0071E3] text-white py-4 rounded-2xl font-semibold hover:bg-[#005BB5] transition-all duration-300 hover:scale-105">

            Edit Profile

          </button>

        </div>

      </div>

    </main>
  );
}