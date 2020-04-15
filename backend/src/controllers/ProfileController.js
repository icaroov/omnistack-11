// Conexão com bando de dados
const connection = require('../database/connection');

/** Esse controller lista todos os Incidents
 * criados por uma única ONG.
 */

module.exports = {
  async index (req, res) {

     // Pegar id da ONG logada
     const ong_id = req.headers.auth;

    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');

    return res.json(incidents);
  }
};