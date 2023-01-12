import admin from 'firebase-admin'
import { DataSnapshot, getDatabase } from 'firebase-admin/database'
/**
 * @description Firebaseの管理画面から取得した管理者アカウント情報
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
/*const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}*/

/**
 * @description Firebase Admin SDKを扱うためのオブジェクト
 * @note バックエンドのみで使用可能
 */
const apiadmin = {
  type: 'service_account',
  project_id: 'reactumleditor',
  private_key_id: 'f202f44a84d94ffb34bda0bbec84d19ce6542e81',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJkHtK8ESB6Kvl\nxYnPyZ5+i/ZLVKqxyjDCow6TzT0D8opH4LJjGx6rjfCrL6JQ7+oRL5IOqqrfFjU/\nk1Cx4YbwK9gDHFlXwrm+vXwmpDz3IrHMYuT/6HDpEhCmf6ziCr5xMDAPaus2Jc1A\n95dHfQWcMZkU80YwYwbW3WRebvNED2Rlb88jG04UiG6lqWV3J1vvZZhG2iTtyrUw\nahX3P4Dn3igpGVDKoW3RT5lML/ayueThGNvxe3Iso1wWzGiUxB/RKQSSF2nwgIqr\nvOhAZgjQ6bjARwQc7Z3pZeWu4JIBu6i8EQmv9S+Db19tWTfwxXpQQE8Gndtp5/Yj\n9wA5cdbrAgMBAAECggEARyW9r2UB+Y0EaDWDAJpdXLPQuyRmoB0LexiNQ7SVTfhl\nwRtaPEtNVybiBbrpo4Ib7/cHqi+p4tb28rrwJ+nAdLQ1KlvuWWD9qYs+8HDWqDFR\n6yAZTw9gE5Tx1aOJhbxfHprwy/BkmBddzQnYFz7VJR4It/FrHBdISb2Z+Q9WxPW8\nuabyhrXNJzUQk+oURKWSv3ZbgrsT07GqtcMAAMXmJe5yi/gX+D27h9uYj1Hgezti\n4YZUkQLpeBpSMJqfR+ciCDG19glGQHLJqOh1/WpV4GDDSYswC7zDOgmg//qSy69s\nM1EYd5Vca5Q/eoQ8Dm0Llzv6qFVqz3auQMdZbyVyoQKBgQD7lncXNLN6NqG9YAez\nXePgLyDzba74siff7LXylLIJg5epSm3rdt3M6kV8AmOvI4VGQkC6DXAcqtcCNcbD\nMLH45/C4xSmAx6DGczeV17APqsWRPP6XdgYw4lLcGsX5ZnYixryUjzD5c6ZltGqS\n6Z9pjWQwh017wHXVGTMlF9Ok0QKBgQDNGW4hpxynn4GR1/HhkNDuJ9DP0X47OC2J\nDmOFlHxH86VGPPtRfhA7o1Vn5i8gj199YLyvxRYNVN7trBI62TRhl72UH1xUG9wJ\nMLIK41LK5PmV4AOx/sBlGzSwpydp3r3C7R2GrtQJQRnN240cGHSalF0IhuebKApc\nt+G+fGLe+wKBgDNs6iLgLt+IUz82ZdyQEIg+memoPd+v6t6mr/pJ0qqHL3T3Nciv\nn17HdDSI+H9QL2nRGRHutT/m29Qj0eEMDxTltBrQkk80fvSRkIccc2yAZ6nsYc3r\n3hAX8v/yqQz1mKg7H0jujAAxV43qdu5YurEEqboRrhDhojRQ1ld6q1RBAoGAKmOs\nIGZyhK5x0BvKkS0mEWLHRHxu03x75MzFgvE6coCH0yl9Y81jO4A5gZzQdrFLMhWR\nSd64/Q5ieMrMhb8olVcQRpHoujV716Zp1dg/31FNyE0hVmNpjjv+OtiBS99OZwAs\nzw5JIpSC6coLsxfW2a/6Pm3rZmTzJ1CV5pG8uYsCgYEAt58uMYkcJdce3UKLvQoF\nKkXGHj9Up+K5DJQ4CcKGBJE+ncuIjhxJA0FdxKZ08IX64L5TMjyw0C54VArDrd4A\nRV/oqsL1+I3PCat3aGXtqSgnER7PZkxu6dpPFZFir8VTC0obAV+0rIFR00XsRh3C\nyKGiiTCSvho1hJS/v1XpSRw=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-i2p96@reactumleditor.iam.gserviceaccount.com',
  client_id: '103887248658700299158',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i2p96%40reactumleditor.iam.gserviceaccount.com',
}
export const firebaseAdmin =
  admin.apps[0] ||
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY as string)),
    databaseURL: "https://reactumleditor-default-rtdb.asia-southeast1.firebasedatabase.app"
  })

export const adminDB = getDatabase(firebaseAdmin)
