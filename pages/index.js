import { useSession, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl">
          You are not logged in. <a href="/auth/login" className="text-blue-500">Login here</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name}!</h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
