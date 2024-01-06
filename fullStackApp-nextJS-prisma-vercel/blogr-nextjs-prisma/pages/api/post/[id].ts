import prisma from "../../../lib/prisma";

// DELETE method for /api/post/[id]
export default async function handle(req,res){
    const pId = req.query.id;
    if(req.method === "DELETE") {
        const post = await prisma.post.delete({
            where: { id : pId },
        });
        res.json(post);
    }else{
        throw Error(
            `The HTTP Request Method : ${req.method} : is not supported at this route`,
        );
    }
}