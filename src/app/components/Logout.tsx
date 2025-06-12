"use client";
import { signOut } from "@/actions/auth";
import React, { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    await signOut();

    setLoading(false);
  };

  return (
    <div className="bg-accentt text-dark  px-3 py-1 rounded-md cursor-pointer">
      <form onSubmit={handleLogout}>
        <button type="submit" className="font-stopsn" disabled={loading}>
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </div>
  );
};

export default Logout;
