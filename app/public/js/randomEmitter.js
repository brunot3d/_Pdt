var room = $("#paginaNome");
	socket = io();
	socket.on('connect', function(){
		socket.emit('hit', room.text());
	})
