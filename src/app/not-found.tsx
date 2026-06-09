import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-gold-400 mb-4">404</div>
        <h1 className="text-3xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black rounded-xl transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
