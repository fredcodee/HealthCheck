require('dotenv').config();
const express = require('express')
const cors =  require('cors')
const appRoutes = require('./routes/appRoutes')
const userRoutes = require('./routes/useRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
const stripeWebHook = require('./controllers/stripeController')
const connectToMongoDB = require('./configs/database')
const bodyParser = require('body-parser');
const allowedOrigins = require('./configs/allowedOrigins')


//connect to db
connectToMongoDB()

const app = express()


app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.json())
app.use(express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith('/api/stripe/webhook')) {
        req.rawBody = buf.toString();
      }
    },
     }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors({origin: allowedOrigins, credentials: true }));

app.use('/api', appRoutes)
app.use('/api/user', userRoutes)
app.use('/api/stripe', stripeRoutes)
//app.use('/api/stripe/webhook', stripeWebHook.webhook, express.raw({ type: 'application/json' }))
app.use('/images', express.static('images')); //get static images

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;