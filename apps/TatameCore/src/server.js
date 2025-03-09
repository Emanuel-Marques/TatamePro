import 'dotenv/config';
import { app } from './app.js';
import './jobs/cronJobs.js';

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});