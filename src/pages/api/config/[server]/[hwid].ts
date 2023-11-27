import { adminDb } from "@/firebaseConfig";
import { RANUser, ServerConfig } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  let {server, hwid} = req.query;
  server = `SERVER_${server}`;

  const userSnap = await adminDb.collection("users").doc(hwid as string).get();
  if (!userSnap.exists) return res.status(400).json({err: "No such user"});

  const serverConfig = await adminDb.collection("servers").doc(server).get();
  if (!serverConfig.exists) return res.status(400).json({err: "Invalid Server"});

  const userData = userSnap.data() as RANUser;
  if (!userData.servers.includes(server)) return res.status(403).json({err: "No Subscription for this server"});
  if (userData.expiry_dates[server].toMillis() < Date.now()) return res.status(403).json({err: "Subscription Expired"});

  const config: ServerConfig = serverConfig.data() as ServerConfig;
  return res.status(200).json(config)
}