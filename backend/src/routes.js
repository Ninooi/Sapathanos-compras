const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');
const InterpriseController = require('./controller/InterpriseController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}),OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index)

routes.get('/incidents/', IncidentController.index)

routes.get('/incidents/filtered/:type', IncidentController.indexFiltered)

routes.post('/incidents',IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete);

routes.get('/interprise',InterpriseController.index)

routes.post('/interprise',InterpriseController.create)

routes.delete('/interprise/:id',InterpriseController.delete)


module.exports = routes;