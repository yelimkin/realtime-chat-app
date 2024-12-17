import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
      <p className="mt-4">
        Don't have an account?{' '}
        <Link href="/auth/signup">
          <a className="text-blue-500 underline">Sign up here</a>
        </Link>
      </p>
    </div>
  );
}
