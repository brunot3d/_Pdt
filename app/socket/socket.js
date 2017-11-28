module.exports = function(db, io){
  const paginas = db.collection('paginas')

  io.on('connect', function(socket){

    socket.on('hit', function(hit){
      paginas.findOne({pagina: hit.slice(1, hit.length)}, function(err, result){
        if(err) return
        // console.log(result)
        socket.broadcast.emit('acesso', result)
      })
    });

    socket.on('clear-views', function(data){
      paginas.remove({}, function(err, rmv){
        if(err) {
          console.log(err)
          return socket.emit('clear-views-done', err)
        }
        socket.emit('clear-views-done', null, rmv)
      })
    })

    socket.on('clear-hitCounter', function(data){
      paginas.updateMany({}, {$set:{acessos: 0}}, function(err, rmv){
        if(err) {
          console.log(err)
          return socket.emit('clear-counter-done', err)
        }
        // console.log('clear-views')
        socket.emit('clear-counter-done', null, rmv)
      })
    })

  })
};
