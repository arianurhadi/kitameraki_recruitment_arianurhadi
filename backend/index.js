// Import packages
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

// App
const app = express()

// Cors
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

// Morgan
app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index'))

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

// Starting server
app.listen('1337')