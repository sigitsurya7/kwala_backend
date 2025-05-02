import app from './src/app.js'

const PORT = process.env.PORT || 3000

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})