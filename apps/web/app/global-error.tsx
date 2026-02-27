'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E3E0]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <h1 className="text-2xl font-bold text-[#141414] mb-4">
          Critical Error
        </h1>
        <p className="text-gray-600 mb-6">
          A critical error has occurred. Please refresh the page or contact support.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#6366f1] text-white rounded-xl hover:bg-[#5558e0] transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
