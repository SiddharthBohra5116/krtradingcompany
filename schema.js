const Joi = require('joi');
const Certificate = require('./models/certificate');

module.exports.ownerSchema = Joi.object({
    owner: Joi.object({
        name:Joi.string().required(),
        image: Joi.string().allow("", null),
    }).required(),
});


module.exports.certificateSchema = Joi.object({
    certificate: Joi.object({
      name: Joi.string().required(),
      image: Joi.string().allow("", null),
    }).required()
  });

module.exports.productSchema = Joi.object({
    product: Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image: Joi.string().allow("", null),
    }).required(),
});