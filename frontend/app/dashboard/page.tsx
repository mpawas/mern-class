'use client';

import { useState, useEffect } from 'react';

interface User {
  _id: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData && userData !== 'undefined') {
          const parsedUser = JSON.parse(userData);
          if (parsedUser && typeof parsedUser === 'object') {
            const userId = parsedUser._id || parsedUser.id;
            if (userId) {
              const response = await fetch(`/api/user/user/${userId}`);
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
              const result = await response.json();
              setUser(result.data?.user || parsedUser);
            } else {
              setUser(parsedUser);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; max-age=0';
    window.location.href = '/auth/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-lg text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="bg-white dark:bg-zinc-900 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to your Dashboard!
                </h2>
                {user && (
                  <div className="mt-4 space-y-2">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">User ID:</span> {user._id}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Member since:</span>{' '}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div className="mt-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    This is your personal dashboard. More features coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}