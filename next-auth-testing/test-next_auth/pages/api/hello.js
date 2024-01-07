// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";

export default function handler(req, res) {
  const session = getSession({req})
  if (session) {
    res.status(200).json({ message: 'Access allowed, you can access this content because you are signed in' })
  } else {
    res.status(403).json({ error: 'Access Denied, You must sign in to get access'})
  }
}

