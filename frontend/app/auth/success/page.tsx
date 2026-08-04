'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
          <svg
            className="h-8 w-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Account Created Successfully!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Redirecting you to the dashboard...
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}