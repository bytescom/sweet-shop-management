import express from 'express'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = 3001

app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

export default app
