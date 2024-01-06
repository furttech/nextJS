import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Router from "next/router"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import { useSession } from "next-auth/react"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: post,
  };
};

async function publishPost(id:String): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: String): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if(status === 'loading'){
    return <div>Authenticating ...</div>
  }

  const validUserSession = Boolean(session);
  const postedByUser = session?.user?.email === props.author?.email;
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {
          !props.published && validUserSession && postedByUser && (
            <button onClick={()=> publishPost(props.id)}>Publish</button>
          )
        }
        {
          validUserSession && postedByUser && (
            <button onClick={ () => deletePost(props.id)}>Delete</button>
          )
        }

      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
