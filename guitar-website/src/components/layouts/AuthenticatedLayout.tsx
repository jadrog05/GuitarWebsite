// components/layouts/AuthenticatedLayout.tsx
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-black text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto">🎸 Guitar App Navigation</div>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </div>
    );
  }
  