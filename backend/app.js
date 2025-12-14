import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js'

const app = express()
const PORT = process.env.PORT || 3001

// Only connect to DB if not in test mode
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

export default app
