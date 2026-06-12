import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1D1D1F]">
          Joblynk
        </h1>

        <button className="text-[#0071E3] font-semibold hover:underline">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 flex flex-col items-center justify-center text-center pt-20">

        <span className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
          🇮🇳 Connecting Skilled Workers & Employers
        </span>

        <h1 className="mt-8 text-6xl md:text-7xl font-bold text-[#1D1D1F] leading-tight">
          Find Trusted
          <br />
          Skilled Workers
          <br />
          Near You.
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-gray-500 leading-9">
          Hire verified local workers or discover
          new job opportunities through a secure,
          simple and modern platform.
        </p>

        <div className="mt-12 flex gap-5">

          <button className="bg-[#0071E3] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#005BB5] shadow-lg">
            Hire Worker
          </button>

          <button className="border border-[#D2D2D7] bg-white text-[#1D1D1F] px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105">
            Find Work
          </button>

        </div>

      </section>

      {/* Stats Section */}

      <section className="max-w-6xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 px-10">

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-[#1D1D1F]">
            500+
          </h2>
          <p className="mt-2 text-gray-500">
            Skilled Workers
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-[#1D1D1F]">
            100+
          </h2>
          <p className="mt-2 text-gray-500">
            Employers
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-[#1D1D1F]">
            Fast
          </h2>
          <p className="mt-2 text-gray-500">
            Local Hiring
          </p>
        </div>

      </section>

    </main>
  );
}