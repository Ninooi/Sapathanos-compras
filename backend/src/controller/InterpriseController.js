const connection = require('../database/connection');

module.exports = {
    async index(req,res){
        const incidents = await connection('interprise').select('*');

        return res.json(incidents);
    },


    async create(req,res){
        const {title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('interprise').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({id})
    },

    async delete(req,res){
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('interprise')
        .where('id',id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error: "Operation not permited. "});
        }

        await connection('interprise').where('id',id).delete();
        return res.status(204).send();
    }
}