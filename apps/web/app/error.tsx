'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E3E0]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <h1 className="text-2xl font-bold text-[#141414] mb-4">
          {error.status === 500 ? 'Server Error' : 'Something went wrong'}
        </h1>
        <p className="text-gray-600 mb-6">
          {error.status === 500
            ? 'We apologize for the inconvenience. Our team has been notified and is working to resolve this issue.'
            : 'We apologize for the inconvenience. Please try again or contact support if the problem persists.'
          }
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#6366f1] text-white rounded-xl hover:bg-[#5558e0] transition-colors font-medium"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="block mt-4 text-[#6366f1] hover:text-[#5558e0] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
