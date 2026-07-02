import ProtectedRoute from "@/app/components/ProtectedRoute";
import LogoutButton from "@/app/components/Logout";

export default function WorkerLayout({
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

            <LogoutButton />

          </div>

        </nav>

        {children}

      </main>

    </ProtectedRoute>
  );
}