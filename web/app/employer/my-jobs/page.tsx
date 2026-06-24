"use client";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  district: string;
  workDate: string;
  status: string;

  worker?: {
    name: string;
    phone: string;
    skill: string;
  };
}
export default function MyJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const handleMyJob = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "/api/employer/jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setJobs(data.data);
    }

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
useEffect(() => {
  handleMyJob();
}, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
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

      {/* Page Header */}

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-[#1D1D1F]">
          My Jobs
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Track all jobs you have posted.
        </p>

        {/* Job Card 2 */}
        <div className="mt-10 space-y-6">

  {jobs.map((job) => (

    <div
      key={job.id}
      className="bg-white rounded-3xl shadow-lg p-8"
    >

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-3xl font-bold">
            ⚡ {job.title}
          </h2>

          <p className="mt-3 text-gray-500">
            {job.description}
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full font-semibold ${
            job.status === "OPEN"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {job.status}
        </span>

      </div>

      <div className="mt-6 space-y-3 text-lg">

        <p>
          💰 <span className="font-semibold">Budget:</span>
          ₹{job.budget}
        </p>

        <p>
          📍 <span className="font-semibold">Location:</span>
          {job.district}
        </p>

        <p>
          📅 <span className="font-semibold">Work Date:</span>
          {new Date(job.workDate).toLocaleDateString()}
        </p>

      </div>

      {job.worker && (

        <div className="mt-8 border-t pt-6">

          <h3 className="text-2xl font-bold mb-4">
            Assigned Worker
          </h3>

          <div className="space-y-2">

            <p>
              👷 {job.worker.name}
            </p>

            <p>
              📞 {job.worker.phone}
            </p>

            <p>
              ⭐ {job.worker.skill}
            </p>

          </div>

        </div>

      )}

    </div>

  ))}

</div>
        

      </div>

    </main>
  );
}