// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
  })
  
  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser)
  server.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      if (['POST'].includes(req.method)) {
        req.body.createdAt = Date.now()
      }
      else if (['PUT'].includes(req.method)) {
        req.body.updatedAt = Date.now()
      } if (new Date(req.body.publishDate).getTime() < new Date().getTime()) {
        return res.status(422).send({
          error: {
            publishDate: 'Không được published vào ngày nhỏ hơn ngày hiện tại'
          }
        })
      }
    }
    next()
  })
  
server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
