const http = require('./config/server');


http.on('listening',function(){
    console.log('ok, server is running');
});

http.listen(8080, function(){
	const date = new Date;
	console.log(`Server listening - port 8080 @ ${date.toTimeString()}`);
});
