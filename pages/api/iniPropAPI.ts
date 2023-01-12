import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'

import { parseCookies } from 'nookies'
import { firebaseAdmin, adminDB } from '../../firebase/firebaseAdmin'
import { db, analytics, realDB, auth, logout } from '../../firebase/firebaseCallFunctions'
import type { Edge, Connection, Node as FlowNodes } from 'reactflow'
import { testEdge, TestNode, userMapTestNode } from '../../store/TestNode'
import Router from 'next/router'
import { getDatabase } from 'firebase/database'

export default async function meApi(req: Req, res: Res) {
  // Cookieに保存されているセッションIDを取得する
  const sessionId = parseCookies({ req }).session
  const userId = parseCookies({ req }).uid

  if (req.method !== 'GET') return res.status(404).send('Not Found')
  if (!sessionId && !userId) return res.json({})

  console.log(sessionId)
  console.log(userId)

  const adminAuth = firebaseAdmin.auth()

  const { ref } = adminDB

  // セッションIDから認証情報を取得する
  const user = await adminAuth.verifySessionCookie(sessionId, true).catch(() => null)
  //const dbRef()

  //const users = user?.uid
  //const currentUserUid = Router.query.userid
  //console.log(userId)
  const dbRef = adminDB.ref('users/' + userId + '/room1')
  const snapshot = await dbRef.once('value')
  //const snapshot = await get(child(dbRef,'users/'+currentUserUid+'/room1/Nodes'))
  console.log(snapshot.exists())
  const nodes = snapshot.exists() ? (snapshot.val().Nodes as FlowNodes[]) : userMapTestNode

  res.json(user ? { user: { email: user.email, Nodes: nodes } } : {})
}
