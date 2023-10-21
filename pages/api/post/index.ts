import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { title, content } = req.body;

    const session = await getServerSession(req, res, options);
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } }
        }
    })
    res.json(result);
}