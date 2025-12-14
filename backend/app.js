import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3001

// Only connect to DB if not in test mode
if (process.env.NODE_ENV !== 'test') {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Calling connectDB...');
  connectDB();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

export default app
