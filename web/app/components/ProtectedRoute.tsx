"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

    } else {

      setAuthorized(true);

    }

  }, [router]);

  if (!authorized) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return <>{children}</>;
}