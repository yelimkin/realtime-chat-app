import { getServerSession } from 'next-auth/next';
import { connectToDatabase } from '../../../lib/mongodb';
import ChatRoom from '../../../models/ChatRoom';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  // MongoDB 연결
  await connectToDatabase();

  // 사용자 인증 확인
  const session = await getServerSession(req, res, authOptions); // 요청한 사용자의 세션을 확인
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 현재 사용자 ID
  const userId = session.user.id;

  if (req.method === 'GET') {
    // 자신이 참가한 채팅방만 조회
    const rooms = await ChatRoom.find({ participants: userId });
    return res.json(rooms);
  }

  if (req.method === 'POST') {
    const { name, participants } = req.body;

    // 새로운 채팅방 생성 (현재 사용자 포함)
    const newRoom = await ChatRoom.create({ name, participants: [...participants, userId] });
    return res.status(201).json(newRoom);
  }

  // 허용되지 않은 메서드
  res.status(405).end();
}
