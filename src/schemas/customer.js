import Joi from "joi";

const schemaCustomer = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string().trim().min(10).max(11).pattern(/^\d+$/).required(),
  cpf: Joi.string().trim().length(11).pattern(/^\d+$/).required(),
  birthday: Joi.date().required(),
});

export default schemaCustomer;
