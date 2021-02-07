module.exports = app => {

  app.post('/pets', (req, res) => {
    res.status(201).end('ok');
  })

}