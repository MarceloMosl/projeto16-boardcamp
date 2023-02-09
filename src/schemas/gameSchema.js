import Joi from "joi";

const schemaGame = Joi.object({
  name: Joi.string().required().min(1),
  image: Joi.string().required(),
  stockTotal: Joi.number().required(),
  pricePerDay: Joi.number().required(),
});

export default schemaGame;
