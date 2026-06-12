"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
    

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (data.success) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.data)
    );

    if (data.data.role === "WORKER") {
      router.push("/worker/dashboard");
    } else {
      router.push("/employer/dashboard");
    }

  } else {
    alert(data.message);
  }

};
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-[#F5F5F7]">

      {/* Left Side */}

      <div className="hidden md:flex flex-col justify-center px-20 bg-[#1D1D1F] text-white">

        <h1 className="text-6xl font-bold">
          Welcome
          <br />
          Back.
        </h1>

        <p className="mt-8 text-gray-300 text-xl leading-9">
          Connect with skilled workers,
          discover opportunities,
          and grow your network.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center">

        <div className="bg-white w-[450px] p-10 rounded-3xl shadow-xl">

          <h2 className="text-4xl font-bold text-[#1D1D1F]">
            Login
          </h2>

          <p className="mt-3 text-gray-500">
            Access your Joblynk account.
          </p>

          <div className="mt-8">

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
            />

          </div>

          <div className="mt-5">

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-[#0071E3]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button className="w-full mt-8 bg-[#0071E3] text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#005BB5]" onClick={handleLogin}
  disabled={loading}>
           {loading ? 'Loading...' : 'Login'}
          </button>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account?
          </p>

          <button className="w-full mt-3 border border-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-100">
            Register
          </button>

        </div>

      </div>

    </main>
  );
}