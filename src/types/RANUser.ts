import { Timestamp } from "firebase-admin/firestore"

export type RANUser = {
  _hwid: string,
  expiry_dates: {[server: string]: Timestamp};
  servers: string[]
}