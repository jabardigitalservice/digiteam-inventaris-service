import Joi from 'joi';

export const CreateRequestPayloadSchema = Joi.object({
  division: Joi.string().required(),
  phone_number: Joi.string().required(),
  request_type: Joi.number().strict().required(),
  item_name: Joi.string().required(),
  purpose: Joi.string().required(),
  priority: Joi.number().strict().required(),
});

const emptyAllow = ['', null];

export const GetRequestsSchema = Joi.object({
  limit: Joi.number().allow(...emptyAllow),
  page: Joi.number().allow(...emptyAllow),
});

export const ChangeRequestPayloadSchema = Joi.object({
  status: Joi.number().strict().required(),
});

export const PatchRequestItemPayloadSchema = Joi.object({
  item_name: Joi.string().required(),
  item_brand: Joi.string().required(),
  item_number: Joi.string().required(),
});
