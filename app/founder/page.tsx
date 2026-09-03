import Founder from "@/components/Founder";

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Back to Home */}
      <div className="px-6 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <span className="mr-2">←</span>
            Back to Home
          </a>
        </div>
      </div>

      <Founder />
    </main>
  );
}