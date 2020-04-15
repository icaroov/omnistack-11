const crypto = require('crypto');

// Conexão com bando de dados
const connection = require('../database/connection');

module.exports = {

   /* LISTAR */
  async index (req, res) {
    const ongs = await connection('ongs').select('*');
  
    return res.json(ongs);
  },

  /* CRIAR */
  async create(req, res) {
  const { name, email, whatsapp, city, uf } = req.body;

  // Gerar ID
  const id = crypto.randomBytes(4).toString('HEX');

  // Cadastrar ONG
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })

  return res.json({ id });
  }
};