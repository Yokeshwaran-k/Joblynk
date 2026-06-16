"use client"
import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  budget: number;
  district: string;
  state: string;
  workDate: string;
  status: string;
  employer: {
    name: string;
    phone: string;
  };
}
export default function AcceptedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const getAcceptedJobs = async () => {

   const token = localStorage.getItem("token");

   const response = await fetch(
      "/api/worker/accepted-jobs",
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );

   const data = await response.json();

   if(data.success){
      setJobs(data.data);
   }

   setLoading(false);
};
useEffect(() => {
  getAcceptedJobs();
}, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
if (jobs.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      No accepted jobs found.
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

      {/* Page Title */}

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-[#1D1D1F]">
          My Accepted Jobs
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Track all your active work assignments.
        </p>

        {/* Card */}

        <div className="mt-10 space-y-6">

  {jobs.map((job) => (

    <div
      key={job.id}
      className="bg-white rounded-3xl shadow-lg p-8"
    >

      <h2 className="text-3xl font-bold">
        ⚡ {job.title}
      </h2>

      <div className="mt-6 space-y-3 text-lg">

        <p>
          🏢 <span className="font-semibold">Employer:</span>{" "}
          {job.employer.name}
        </p>

        <p>
          📞 <span className="font-semibold">Phone:</span>{" "}
          {job.employer.phone}
        </p>

        <p>
          📍 <span className="font-semibold">Location:</span>{" "}
          {job.district}, {job.state}
        </p>

        <p>
          💰 <span className="font-semibold">Budget:</span>{" "}
          ₹{job.budget}
        </p>

        <p>
          📅 <span className="font-semibold">Work Date:</span>{" "}
          {new Date(job.workDate).toLocaleDateString()}
        </p>

      </div>

      <div className="mt-8 flex justify-between items-center">

        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          🟢 {job.status}
        </span>

        <button className="bg-[#0071E3] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#005BB5] transition-all duration-300 hover:scale-105">
          View Details
        </button>

      </div>

    </div>

  ))}

</div>

      </div>

    </main>
  );
}