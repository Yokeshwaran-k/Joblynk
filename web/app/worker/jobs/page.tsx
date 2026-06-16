"use client";

import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  district: string;
  state: string;
  workDate: string;
}

export default function WorkerJobsPage() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {

      const token = localStorage.getItem("token");
      const response = await fetch(
        "/api/worker/jobs",
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
    getJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Jobs...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] p-8">

      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      {jobs.map((job) => (

        <div
          key={job.id}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >

          <h2 className="text-3xl font-bold">
            {job.title}
          </h2>

          <p className="mt-4 text-gray-600">
            {job.description}
          </p>

          <p className="mt-4">
            💰 ₹{job.budget}
          </p>

          <p className="mt-2">
            📍 {job.district}, {job.state}
          </p>

          <p className="mt-2">
            📅 {job.workDate}
          </p>

          <button className="w-full mt-6 bg-[#0071E3] text-white py-4 rounded-2xl">
            Accept Job
          </button>

        </div>

      ))}

    </main>
  );
}