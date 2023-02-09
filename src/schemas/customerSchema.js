import Joi from "joi";

const schemaCustomer = Joi.object({
  name: Joi.string().required().min(1),
  phone: Joi.string().required().min(10).max(11),
  cpf: Joi.number().required().min(11),
  birthday: Joi.date().required(),
});

export default schemaCustomer;
