"use client";
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/clerk-react";
import Image from "next/image";
import { assets } from "../assets/assets";

const ClientProfileButton = ({ user, openSignIn }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <div className="w-7 h-7 bg-gray-300 rounded-full animate-pulse"></div>
    );

  return user ? (
    <UserButton />
  ) : (
    <Image src={assets.profile_icon} alt="profile_icon" className="w-7" />
  );
};

export default ClientProfileButton;
