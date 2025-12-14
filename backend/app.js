import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import sweetRoutes from './routes/sweetRoutes.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', sweetRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
