"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      router.push(callbackUrl);
    } catch (err) {
      console.error("登录错误:", err);
      setError("邮箱或密码错误");
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      console.error("GitHub 登录错误:", err);
      setError("GitHub 登录失败");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>登录</h1>

      {error && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#fee",
            color: "#c00",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleEmailSignIn}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            邮箱
            <input
              name="email"
              type="email"
              required
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            密码
            <input
              name="password"
              type="password"
              required
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: isLoading ? "#999" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {isLoading ? "登录中..." : "登录"}
        </button>
      </form>

      <div style={{ margin: "20px 0", textAlign: "center", color: "#999" }}>
        或
      </div>

      <button
        onClick={handleGithubSignIn}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isLoading ? "#999" : "#24292e",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        使用 GitHub 登录
      </button>
    </div>
  );
}
