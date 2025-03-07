import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/test", (req, res)=> {
    res.status(200).json({ messae: "its working!" });
})

export {
    app
}