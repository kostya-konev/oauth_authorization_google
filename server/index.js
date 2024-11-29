import dotenv from 'dotenv';
dotenv.config();import express from 'express';
import cors from 'cors';
import authRouter from "./routes/oauth.js";
import requestRouter from "./routes/request.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.options('*', function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

app.use(cors());
app.use(express.json());
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
