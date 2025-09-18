"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "../FormElements/InputGroup";

import { useAuth } from "@/services/AuthProvider";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(data.email, data.password);
    
    if (success) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputGroup
              type="email"
              label="Email"
              className="mb-4 [&_input]:py-[15px]"
              placeholder="Enter your email"
              name="email"
              handleChange={handleChange}
              value={data.email}
              icon={<EmailIcon />}
            />

            <InputGroup
              type="password"
              label="Password"
              className="mb-5 [&_input]:py-[15px]"
              placeholder="Enter your password"
              name="password"
              handleChange={handleChange}
              value={data.password}
              icon={<PasswordIcon />}
            />
          </div>

  

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  Signing In...
                  <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        
        {process.env.NEXT_PUBLIC_DEMO_USER_MAIL && process.env.NEXT_PUBLIC_DEMO_USER_PASS && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700  text-center">
              Demo credentials pre-filled. Click Sign In to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}