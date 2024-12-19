import NextAuth from 'next-auth'; // 인증 엔드포인트를 자동으로 생성
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongodb'; // MongoDB 연결 함수
import User from '../../../models/User'; // 사용자 모델

export default NextAuth({
  providers: [
    CredentialsProvider({
      // authorize 메서드: 사용자 인증 처리
      async authorize(credentials) {
        // MongoDB 연결
        await connectToDatabase();

        // 사용자 인증 로직
        const user = await User.findOne({ email: credentials.email });
        if (user && user.password === credentials.password) { // 유효한 사용자라면 객체를 반환
          return { id: user._id, name: user.name, email: user.email }; // 세션 정보에 포함됨
        }

        // 인증 실패 시 예외 발생
        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {
    // 세션에 사용자 정보 추가
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };
      return session;
    },
    // JWT에 사용자 정보 추가
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  // 세션 관리 방식 설정
  session: {
    strategy: 'jwt', // JWT(JSON Web Token) 기반 세션 - 서버가 사용자 세션 정보를 별도의 데이터베이스에 저장할 필요 없이 클라이언트 측에서 안전하게 상태를 유지
  },
  secret: process.env.NEXTAUTH_SECRET, // 세션 데이터 암호화, 무결성 확인
});
