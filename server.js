import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http'; 
import { Server } from 'socket.io'; 
import router from './src/routes/index.js';
import connectDB from './database.js';
import { checkUserStatus } from './src/controllers/admin.js';


dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/betta', router);
app.use(express.json())


app.get('/restricted', checkUserStatus(['Active']), (req, res) => {
    res.send('Access granted');
});




io.on('connection', (socket) => {
    console.log('A user connected');
});

export default {
   server,
   io
};



const startServer = async () => {
    const PORT = process.env.PORT || 5505;
    connectDB();
    try {
        server.listen(PORT, () => {
            console.log(`APP IS RUNNING ON PORT: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});
