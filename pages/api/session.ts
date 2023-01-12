import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { firebaseAdmin } from '../../firebase/firebaseAdmin'
import nookies from 'nookies'
import { setCookie } from 'cookies-next'
import Cookies from 'js-cookie'

export default async function sessionApi(req: Req, res: Res) {
  // "POST"以外は、"404 Not Found"を返す
  try {
    if (req.method !== 'POST') return res.status(404).send('Not Found')

    const auth = firebaseAdmin.auth()

    // Tokenの有効期限
    const expiresIn = 60 * 60 * 24 * 1000 // 5日

    // セッションCookieを作成するためのIDを取得
    const id = JSON.parse(req.body).id.toString()
    const uid = JSON.parse(req.body).uid.toString()
    // Cookieに保存するセッションIDを作成する
    const sessionCookie = await auth.createSessionCookie(id, { expiresIn })

    // Cookieのオプション
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: '/',
    }

    console.log(typeof sessionCookie)
    console.log(typeof uid)
    console.log(uid)

    //Cookies.set('session', sessionCookie, options)
    //Cookies.set('uid', uid, options)
    // セッションIDをCookieに設定する
    nookies.set({ res }, 'session', sessionCookie, options)
    nookies.set({ res }, 'uid', uid, options)
    //setCookie('session',sessionCookie,{req,res,...options})
    res.send(JSON.stringify({ status: 'success' }))
  } catch (e) {
    console.log(e)
  }
}
