'use client';

import Link from 'next/link';
import { useUser } from '@/app/context/UserProvider';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-4 py-3 fixed 
                w-full top-0 left-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🎸 GuitarPractice
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/practice" className="text-gray-700 hover:text-blue-600">
                Practice
              </Link>
              <span className="text-sm text-gray-600">Hi, {user.name?.split(' ')[0] || 'Guitarist'}</span>
              <a
                href="/auth/logout"
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
              >
                Logout
              </a>
            </>
          ) : (
            !isLoading && (
              <a
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
              >
                Login
              </a>
            )
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4">
          {user ? (
            <>
              <Link href="/dashboard" className="block py-1 text-gray-700">
                Dashboard
              </Link>
              <Link href="/practice" className="block py-1 text-gray-700">
                Practice
              </Link>
              <a href="/auth/logout" className="block py-1 text-red-600">
                Logout
              </a>
            </>
          ) : (
            !isLoading && (
              <a href="/auth/login" className="block py-1 text-blue-600">
                Login
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}
