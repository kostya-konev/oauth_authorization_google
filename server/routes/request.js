import Router from 'express';
import dotenv from 'dotenv';
dotenv.config();
import pkg from "google-auth-library";
const { OAuth2Client } = pkg;

const router = Router();

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://127.0.0.1:3000/oauth';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent'
  });

  res.json({url: authorizeUrl});
});

export default router;
