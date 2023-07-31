import Joi from "joi";

const schemaGame = Joi.object({
  name: Joi.string().trim().required(),
  image: Joi.string().uri().trim().required(),
  stockTotal: Joi.number().integer().greater(0).required(),
  pricePerDay: Joi.number().integer().greater(0).required(),
});

export default schemaGame;
