import Router from 'express';
import dotenv from 'dotenv';
dotenv.config();
import pkg from "google-auth-library";
const { OAuth2Client } = pkg;

const router = Router();

async function getUserData(accessToken) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
  const data = await response.json();
  console.log('data', data);
}

router.get('/', async function(req, res, next) {
  const code = req.query.code;

  try {
    const redirectUrl = 'http://127.0.0.1:3000/oauth'

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);
    console.log('Tokens acquired');

    const user = oAuth2Client.credentials;
    console.log('user', user);
    await getUserData(user.access_token);

    res.json({response: 'hello'});
  } catch (e) {
    console.log('error', e);
  }
});

export default router;
