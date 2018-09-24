const http = require('http')
const app = require('./app')

// Set PORT for project
const port = process.env.PORT || 3000

// create server
// express app qualifies as an request handler
const server = http.createServer(app)

// Start the server and listen on port
server.listen(port)