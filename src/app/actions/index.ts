"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string;
  
  try {
    await signIn(action, { 
      redirectTo: "/"
    });
  } catch (error) {
    console.error("Social login error:", error);
    throw error;
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/auth/sign-in" });
}