import * as Joi from 'joi';

export const CreateRequestPayloadSchema = Joi.object({
  division: Joi.string().required(),
  phone_number: Joi.string().required(),
  request_type: Joi.number().strict().required(),
  item_name: Joi.string().required(),
  purpose: Joi.string().required(),
  priority: Joi.number().strict().required(),
});

export const GetRequestsSchema = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
});

export const ChangeRequestPayloadSchema = Joi.object({
  status: Joi.number().strict().required(),
});

export const PatchRequestItemPayloadSchema = Joi.object({
  available_item_name: Joi.string().strict().required(),
});
