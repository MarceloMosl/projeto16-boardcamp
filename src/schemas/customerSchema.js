import Joi from "joi";

const schemaCustomer = Joi.object({
  name: Joi.string().required().min(1),
  phone: Joi.string().required().min(10).max(11),
  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  birthday: Joi.date().required(),
});

export default schemaCustomer;
