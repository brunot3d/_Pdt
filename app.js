const http = require('./config/server');


http.listen(8080, function(){
	const date = new Date;
	console.log('Server listening - port '+ 8080 +' @ '+date.toTimeString());
});
