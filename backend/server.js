const dotenv = require('dotenv')
const express = require ('express');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require("./routes/projectRoutes");
const sessionRoutes = require("./routes/sessionRoutes")


const app = express();
dotenv.config();

connectDB()
app.use(express.json())




app.get('/', (req,res) => {
    res.send('API is running...')
});


app.use('/api/users', userRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/sessions", sessionRoutes)
app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
