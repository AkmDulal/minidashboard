"use client";

import { GoogleIcon } from "@/assets/icons";
import { doSocialLogin } from "@/app/actions";
import { useState } from "react";
import GoogleSignInModal from "@/components//Modal/GoogleSignInModal";

export default function GoogleSigninButton({ text }: { text: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGoogleLogin = async () => {
    setShowModal(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "google");
    
    try {
      await doSocialLogin(formData);
    } catch (error) {
      console.error("Google login error:", error);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50 disabled:opacity-50"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-t-transparent" />
        ) : (
          <GoogleIcon />
        )}
        {isLoading ? "Signing in..." : `${text} with Google`}
      </button>
      
      <GoogleSignInModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </>
  );
}