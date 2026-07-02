"use client"
import { loadBindings } from "next/dist/build/swc";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    }
    return(
         <button onClick={handleLogout} className="text-red-500 font-semibold">
            Logout
          </button>
    );
}