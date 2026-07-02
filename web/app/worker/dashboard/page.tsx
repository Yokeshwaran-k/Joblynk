
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logout from "@/app/components/Logout";

export default function WorkerDashboard() {
  const router = useRouter();
  useEffect(() => {

  const token = localStorage.getItem("token");
console.log(token)
  if (!token) {
    router.push("/login");
  }

}, []);
  return (
    <main className="min-h-screen bg-[#F5F5F7]">

      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-4xl font-bold text-[#1D1D1F]">
          Welcome 👋
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your profile and jobs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition">
            <h3 className="text-2xl font-semibold">
              My Profile
            </h3>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition">
            <h3 className="text-2xl font-semibold">
              Available Jobs
            </h3>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition">
            <h3 className="text-2xl font-semibold">
              Accepted Jobs
            </h3>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition">
            <h3 className="text-2xl font-semibold">
              Settings
            </h3>
          </div>

        </div>

      </div>

    </main>
  );
}