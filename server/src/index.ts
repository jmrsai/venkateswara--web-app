import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Venkathadri Pendurthi API Running');
});

// Seva Booking Endpoint (Mock)
app.get('/api/sevas', (req, res) => {
    res.json([
        { id: 1, name: 'Suprabhatam', time: '03:00 AM', slots: 50 },
        { id: 2, name: 'Thomala Seva', time: '04:30 AM', slots: 20 },
        { id: 3, name: 'Archana', time: '05:30 AM', slots: 100 },
    ]);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
