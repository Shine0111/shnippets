// error.tsx must be a client component
"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void; // to automatically refresh a route
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
