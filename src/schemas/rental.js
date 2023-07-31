import Joi from "joi";

const schemaRental = Joi.object({
  customerId: Joi.number().integer().required(),
  gameId: Joi.number().integer().required(),
  daysRented: Joi.number().integer().greater(0).required(),
});

export default schemaRental;
