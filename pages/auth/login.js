import LoginForm from '../../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <LoginForm />
      
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link href="/auth/signup" >
          <span className="text-blue-500 underline cursor-pointer">
            Sign up here
          </span>
        </Link>
      </p>
    </div>
  );
}
