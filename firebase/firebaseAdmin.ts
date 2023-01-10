import admin from 'firebase-admin'
import { DataSnapshot, getDatabase } from 'firebase-admin/database'
/**
 * @description Firebaseの管理画面から取得した管理者アカウント情報
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

/**
 * @description Firebase Admin SDKを扱うためのオブジェクト
 * @note バックエンドのみで使用可能
 */
export const firebaseAdmin =
  admin.apps[0] ||
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
    databaseURL: "https://reactumleditor-default-rtdb.asia-southeast1.firebasedatabase.app"
  })

export const adminDB = getDatabase(firebaseAdmin)
