"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
interface WorkerProfile {
  id: number;
  name: string;
  phone: string;
  skill: string;
  dailyWage: number;
  experience: number;
  district: string;
  state: string;
  address: string;
  isAvailable: boolean;
}
export default function WorkerDetailPage() {
    const [worker, setWorker] =
useState<WorkerProfile | null>(null);

const [loading, setLoading] =
useState(true);
const params = useParams();
const getWorker = async () => {

  try {

    const response = await fetch(
      `/api/employer/worker/${params.id}`
    );

    const data = await response.json();

    if (data.success) {
      setWorker(data.data);
    }

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};
useEffect(() => {
  getWorker();
},[]);
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

      {/* Profile Card */}

      <div className="max-w-4xl mx-auto p-8">

        <div className="bg-white rounded-3xl shadow-lg p-10">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold">
                👷 {worker?.name}
              </h1>

              <p className="mt-3 text-2xl text-gray-500">
                {worker?.skill}
              </p>

            </div>

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
              🟢 Available
            </span>

          </div>

          <div className="mt-10 space-y-5 text-xl">

            <p>
              💰 <span className="font-semibold">Daily Wage:</span> ₹{worker?.dailyWage}
            </p>

            <p>
              ⭐ <span className="font-semibold">Experience:</span> {worker?.experience} Years
            </p>

            <p>
              📞 <span className="font-semibold">Phone:</span> {worker?.phone}
            </p>

            <p>
              📍 <span className="font-semibold">District:</span> {worker?.district}, {worker?.state}
            </p>

            <p>
              🏠 <span className="font-semibold">Address:</span> {worker?.address}
            </p>

          </div>

          <button
            className="w-full mt-10 bg-[#0071E3] text-white py-4 rounded-2xl text-xl font-semibold hover:bg-[#005BB5]"
          >
            Contact Worker
          </button>

        </div>

      </div>

    </main>
  );
}