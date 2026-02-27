import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E3E0]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#141414] mb-4">404</h1>
        <p className="text-xl text-[#141414]/60 mb-8">Page not found</p>
        <Link 
          href="/"
          className="px-6 py-3 bg-[#6366f1] text-white rounded-lg hover:bg-[#5558e0] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
