"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Worker {
    id: number;
    name: string;
    skill: string;
    dailyWage: number;
    experience: number;
    district: string;
    state: string;
    isAvailable: boolean;
}
export default function FindWorkersPage() {
    const [workers, setWorkers] = useState<Worker[]>([]);
const [skill, setSkill] = useState("");
const [loading, setLoading] = useState(false);

const handleSearch = async () => {
    try{
        setLoading(true)
        const response = await fetch(
            `/api/employer/search?skill=${skill}`,
        );
        const data = await response.json();
        console.log(data);
        if(data.success){
            setWorkers(data.data);
        }
    }catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
};
if(loading){
    return(
        <div className='min-h-screen flex items-center justify-center'>Loading...</div>
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

      {/* Header */}

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-[#1D1D1F]">
          Find Skilled Workers
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Search and hire skilled workers nearby.
        </p>

        {/* Search Section */}

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by skill (Electrician, Plumber...)"
              className="flex-1 border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {skill}
              onChange={(e) => setSkill(e.target.value)}
            />

            <button className="bg-[#0071E3] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#005BB5] transition" onClick={handleSearch} >
              {loading ? "Searching..." : "Search"}
            </button>

          </div>

        </div>

        {/* Worker Card 1 */}
        { workers.map((worker) => (
        <div key={worker.id} className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-3xl font-bold">
                👷 {worker.name}
              </h2>

              <p className="mt-2 text-gray-500">
                {worker.skill}
              </p>

            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
             {worker.isAvailable ? "🟢 Available" : "🔴 Busy"}
            </span>

          </div>

          <div className="mt-6 space-y-3 text-lg">

            <p>
              💰 <span className="font-semibold">Daily Wage:</span> {worker.dailyWage}
            </p>

            <p>
              📍 <span className="font-semibold">Location:</span> {worker.district}
            </p>

            <p>
              ⭐ <span className="font-semibold">Experience:</span>{worker.experience}
            </p>

          </div>

          
            <Link
  href={`/employer/worker/${worker.id}`}
  className="w-full block text-center bg-[#0071E3] text-white py-4 rounded-2xl font-semibold"
>
  View Profile
</Link>
        </div>
        ))}
        
      </div>

    </main>
  );
}