"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");

const [loading, setLoading] = useState(false);

const handleRegister = async () => {

  try {

    setLoading(true);

    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Registration Successful!");

      router.push("/login");

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  } finally {

    setLoading(false);

  }

};
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-[#F5F5F7]">

      {/* Left Side */}

      <div className="hidden md:flex flex-col justify-center px-20 bg-[#1D1D1F] text-white">

        <h1 className="text-6xl font-bold">
          Join
          <br />
          Joblynk.
        </h1>

        <p className="mt-8 text-gray-300 text-xl leading-9">
          Find skilled workers,
          discover local jobs,
          and build trusted connections.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center py-10">

        <div className="bg-white w-[500px] p-10 rounded-3xl shadow-xl">

          <h2 className="text-4xl font-bold text-[#1D1D1F]">
            Create Account
          </h2>

          <p className="mt-3 text-gray-500">
            Start your Joblynk journey.
          </p>

          {/* Name */}

          <div className="mt-8">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>

          {/* Email */}

          <div className="mt-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}

          <div className="mt-5">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password */}

          <div className="mt-5">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role */}

          <div className="mt-6">

            <p className="text-gray-700 font-semibold mb-3">
              Select Role
            </p>

            <div className="flex gap-6">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="WORKER"
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>Worker</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  onChange={(e) => setRole(e.target.value)}
                />
                <span>Employer</span>
              </label>

            </div>

          </div>

          {/* Register Button */}

          <button className="w-full mt-8 bg-[#0071E3] text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#005BB5]" onClick={handleRegister}
  disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Login */}

          <p className="text-center mt-8 text-gray-500">
            Already have an account?
          </p>

          <button className="w-full mt-3 border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300">
            Login
          </button>

        </div>

      </div>

    </main>
  );
  
}
