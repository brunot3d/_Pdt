const mongoose = require('mongoose');

const PaginaSchema = new mongoose.Schema({
	pagina : String,
	acessos: Number
});	

module.exports = mongoose.model('Pagina', PaginaSchema);
