import ProtectedRoute from "@/app/components/ProtectedRoute";
import LogoutButton from "@/app/components/Logout";
import Link from "next/link";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#F5F5F7]">

        {/* Navbar */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

            <h1 className="text-3xl font-bold text-[#1D1D1F]">
              Joblynk
            </h1>

            <div className="flex items-center gap-8">

              <Link
                href="/employer/dashboard"
                className="font-medium hover:text-[#0071E3]"
              >
                Dashboard
              </Link>

              <Link
                href="/employer/create-job"
                className="font-medium hover:text-[#0071E3]"
              >
                Create Job
              </Link>

              <Link
                href="/employer/my-jobs"
                className="font-medium hover:text-[#0071E3]"
              >
                My Jobs
              </Link>

              <Link
                href="/employer/find-workers"
                className="font-medium hover:text-[#0071E3]"
              >
                Find Workers
              </Link>

              <LogoutButton />

            </div>

          </div>
        </nav>

        {children}

      </main>
    </ProtectedRoute>
  );
}