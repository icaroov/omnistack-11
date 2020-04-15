// Conexão com bando de dados
const connection = require('../database/connection');

module.exports = {
  async index (req, res) {
    const { page = 1 } = req.query;

    // Retorna quantidade total de Incidents
    const [count] = await connection('incidents').count();

    // Paginação de 5
    const incidents = await connection('incidents')
    .join('ongs', 'ong_id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp', 
      'ongs.city', 
      'ongs.uf'
  ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async create (req, res) {
    const { title, description, value } = req.body;

    // Pegar id da ONG logada
    const ong_id = req.headers.auth;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id })
  },

  async delete (req, res) {
    // Pegar id das rotas
    const { id } = req.params;

    // Pegar id da ONG logada
    const ong_id = req.headers.auth;

    // Pegar um Incident de dentro da tabela
    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permited.' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
};