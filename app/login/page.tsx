"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push(next);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-zinc-900/80 p-5 shadow-xl border border-zinc-800">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-orange-500 shadow-sm">
            <img
              src="/logo.jpg"
              alt="Delhi Fresto logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Delhi Fresto Admin</h1>
            <p className="text-[11px] text-zinc-400">Owner login</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="block text-zinc-300">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-9 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs text-zinc-50 outline-none focus:border-orange-400"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-9 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-xs text-zinc-50 outline-none focus:border-orange-400"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-900/40 px-2 py-1 text-[11px] text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-9 w-full rounded-full bg-orange-500 text-xs font-semibold text-white shadow disabled:cursor-not-allowed disabled:bg-orange-400"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
