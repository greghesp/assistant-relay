const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { initializeServer } = require('./helpers/server.js');



app.prepare()
    .then(async() => {

        await initializeServer();

        const server = express();
        //Handle all get requests in Next
        server.get('/', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })