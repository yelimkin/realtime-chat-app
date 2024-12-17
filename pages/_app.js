import { SessionProvider } from 'next-auth/react'; // NextAuth 세션 관리
import '../styles/globals.css'; // Tailwind CSS 스타일

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // NextAuth 세션 관리 Provider
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
