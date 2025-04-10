'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminLogin = () => {
  const router = useRouter();
  const [hash, setHash] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hash }),
    });

    if (response.ok) {
      router.push('/admin');
      return;
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="hash"
              className="block text-sm font-medium text-gray-700"
            >
              Hash
            </label>
            <input
              type="text"
              id="hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              required
              autoComplete="off"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
