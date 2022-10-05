import * as Joi from 'joi';

export const RequestPayloadSchema = Joi.object({
  division: Joi.string().required(),
  phone_number: Joi.string().required(),
  request_type: Joi.number().strict().required(),
  item_name: Joi.string().required(),
  purpose: Joi.string().required(),
  priority: Joi.number().strict().required(),
});
