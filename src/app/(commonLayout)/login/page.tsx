// app/login/page.tsx
"use client";


import { Github, LogIn,  } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {


 

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google",{
                callbackUrl: "/dashboard",
  
            })}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("github",{
                callbackUrl: "/dashboard",
            })}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-gray-600">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}