"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
export default function EmployerDashboardPage() {

  return (
    <ProtectedRoute>
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

      {/* Content */}

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-[#1D1D1F]">
          Welcome 👋
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Manage your jobs and workers.
        </p>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* Create Job */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition cursor-pointer">

            <div className="text-5xl">
              📝
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              Create Job
            </h2>

            <p className="mt-3 text-gray-500">
              Post new work opportunities.
            </p>

          </div>

          {/* My Jobs */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition cursor-pointer">

            <div className="text-5xl">
              📋
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              My Jobs
            </h2>

            <p className="mt-3 text-gray-500">
              Track job status and assigned workers.
            </p>

          </div>

          {/* Find Workers */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition cursor-pointer">

            <div className="text-5xl">
              👷
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              Find Workers
            </h2>

            <p className="mt-3 text-gray-500">
              Search skilled workers nearby.
            </p>

          </div>

          {/* Settings */}

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition cursor-pointer">

            <div className="text-5xl">
              ⚙️
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              Settings
            </h2>

            <p className="mt-3 text-gray-500">
              Manage your account preferences.
            </p>

          </div>

        </div>

      </div>

    </main>
    </ProtectedRoute>
  );
}