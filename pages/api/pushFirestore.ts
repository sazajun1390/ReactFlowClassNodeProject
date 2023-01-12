import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { ref, onValue, set } from 'firebase/database'
import { realDB, auth } from '../../firebase/firebaseCallFunctions'

export default async function realTimeDBApi(req: Req, res: Res) {
  try {
    if (req.method !== 'POST') return res.status(404).send('Not Found')
    const user = auth.currentUser
    if (user !== null) {
      const uid = user.uid
      const adressRef = ref(realDB, 'users/' + uid)

      set(adressRef, {})

      res.send(JSON.stringify({ status: 'success' }))
    }
  } catch (e) {}
}
