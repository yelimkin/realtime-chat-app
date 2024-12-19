import { getServerSession } from 'next-auth/next';
import { connectToDatabase } from '../../../lib/mongodb';
import ChatMessage from '../../../models/ChatMessage';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  // MongoDB 연결
  await connectToDatabase();

  // 사용자 인증 확인
  const session = await getServerSession(req, res, authOptions); // 요청한 사용자의 세션을 확인
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 인증된 사용자 ID
  const userId = session.user.id;

  if (req.method === 'GET') {
    const { roomId } = req.query; // roomId를 기준으로 해당 채팅방의 메시지를 반환

    // 현재 사용자가 속한 방의 메시지만 반환
    const messages = await ChatMessage.find({ roomId })
      .populate('sender', 'name') // 메시지 작성자의 이름을 함께 반환
      .exec();

    return res.json(messages);
  }

  if (req.method === 'POST') {
    const { roomId, message } = req.body;

    // 새로운 메시지 생성 (현재 사용자가 작성자)
    const newMessage = await ChatMessage.create({ // 인증된 사용자의 ID(userId)를 sender로 저장
      roomId,
      sender: userId,
      message,
    });

    return res.status(201).json(newMessage);
  }

  // 허용되지 않은 메서드
  res.status(405).end();
}
