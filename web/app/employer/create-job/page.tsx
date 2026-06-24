"use client";

import { useState } from "react";
import { verifyToken } from "@/app/lib/jwt";

export default function CreateJobPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [skill, setSkill] = useState("");
    const [budget, setBudget] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [workDate, setWorkDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateJob = async () =>{
        try{
            setLoading(true)
            const token = localStorage.getItem("token")
            const response = await fetch(
                "/api/employer/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                        title,
                        description,
                        skill,
                        budget: Number(budget),
                        address,
                        pincode,
                        district,
                        state,
                        workDate,
                        }),
                }
            );
            const data = await response.json();

    if (data.success) {

      alert("Job Created Successfully");

      // Optional: clear form

      setTitle("");
      setDescription("");
      setSkill("");
      setBudget("");
      setAddress("");
      setPincode("");
      setDistrict("");
      setState("");
      setWorkDate("");

    } else {

      alert(data.message);

    }
        }catch(error){
            console.log(error);
            alert("Something went wrong");

        }finally{
            setLoading(false)
        } 
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

      {/* Page Content */}

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-[#1D1D1F]">
          Create New Job
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Post work and find skilled workers nearby.
        </p>

        {/* Job Details */}

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Job Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Job Description"
              rows={4}
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value = {description}>Select Skill</option>
              <option value = {description}>Electrician</option>
              <option value = {description}>Plumber</option>
              <option value = {description}>Painter</option>
              <option value = {description}>Carpenter</option>
              <option value = {description}>Mason</option>
              <option value = {description}>Welder</option>
              <option value = {description}>Driver</option>
              <option value = {description}>Helper</option>
            </select>

            <input
              type="number"
              placeholder="Budget (₹)"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {budget}
              onChange={(e) => setBudget(e.target.value)}
            />

          </div>

        </div>

        {/* Location Details */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Location Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Pincode"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <input
              type="text"
              placeholder="District"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <input
              type="text"
              placeholder="State"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value = {state}
              onChange={(e) => setState(e.target.value)}
            />

          </div>

        </div>

        {/* Work Schedule */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Work Schedule
          </h2>

          <input
            type="date"
            className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
            value = {workDate}
            onChange={(e) => setWorkDate(e.target.value)}
          />

        </div>

        {/* Submit Button */}

        <button
          className="w-full mt-10 bg-[#0071E3] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-[#005BB5] transition-all duration-300 hover:scale-[1.02]" onClick={handleCreateJob} disabled={loading}
        >
          {loading ? "Creating..." : "Create Job"}
        </button>

      </div>

    </main>
  );
}