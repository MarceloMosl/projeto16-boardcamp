import Joi from "joi";

const schemaRental = Joi.object({
  customerId: Joi.number().required().min(1),
  gameId: Joi.number().required().min(1),
  daysRented: Joi.number().required().min(1),
});

export default schemaRental;
