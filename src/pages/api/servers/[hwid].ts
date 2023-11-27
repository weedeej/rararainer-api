import { adminDb } from "@/firebaseConfig";
import { RANUser } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {hwid} = req.query;

  const user = await adminDb.collection("users").doc(hwid as string).get();
  if (!user.exists) return res.status(400).json({err: "No such user"});

  const userData: RANUser = user.data() as RANUser;
  const serverNames = userData.servers.map((server) => server.split("_").slice(1).join("_"));
  res.send({servers: serverNames})
}