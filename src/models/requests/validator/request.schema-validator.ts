import { JoiValidationPipe } from 'src/common/validator/joi-validation.pipe';
import * as Joi from 'joi';

export const RequestPayloadSchema = new JoiValidationPipe(
  Joi.object({
    user_name: Joi.string().required(),
    user_division: Joi.string().required(),
    user_phone_number: Joi.string().required(),
    request_type: Joi.number().strict().required(),
    item_name: Joi.string().required(),
    purpose: Joi.string().required(),
    priority: Joi.number().strict().required(),
  }),
);
