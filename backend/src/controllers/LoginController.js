// Conexão com bando de dados
const connection = require('../database/connection');

module.exports = {
  async create (req, res) {

    // Verificar se a ONG existe
    const { id } = req.body;

    // Buscar ONG do bando de dados
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

    if (!ong ) {
      return res.status(400).json({ error: 'No ONG found with this ID.' });
    }

    return res.json(ong);
  }
};