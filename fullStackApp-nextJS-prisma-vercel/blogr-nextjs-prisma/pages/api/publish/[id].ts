import prisma from "../../../lib/prisma";

// PUT method for /api/publish/:id
export default async function handle(req, res){
    const pID = req.query.id;
    const post = await prisma.post.update({
        where: { id: pID },
        data: { published: true },
    });
    res.json(post);
}
