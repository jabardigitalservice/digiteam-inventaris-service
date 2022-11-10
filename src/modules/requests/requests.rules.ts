import Joi from 'joi';
import { status } from '../../common/helpers/status';

const emptyAllow = ['', null];
const sortByAllow = ['created_at', 'division', 'status', 'request_type'];
const sort = ['asc', 'desc'];

export const CreatePayloadSchema = Joi.object({
  division: Joi.string().required(),
  phone_number: Joi.string().required(),
  request_type: Joi.number().strict().required(),
  requested_item: Joi.string().required(),
  purpose: Joi.string().required(),
  priority: Joi.number().strict().required(),
  replacement_evidence: Joi.string().allow(...emptyAllow),
});

export const FindAllPayloadSchema = Joi.object({
  limit: Joi.number().allow(...emptyAllow),
  page: Joi.number().allow(...emptyAllow),
  sort_by: Joi.string().equal(...sortByAllow),
  sort: Joi.string().equal(...sort),
  request_type: Joi.string().allow(...emptyAllow),
  division: Joi.string().allow(...emptyAllow),
  status: Joi.string().allow(...emptyAllow),
  q: Joi.string().allow(...emptyAllow),
});

export const UpdatePayloadSchema = Joi.object({
  status: Joi.number().strict().equal(),
  notes: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.REJECTED, status.CHECKED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  filename: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.APPROVED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  item_name: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.REQUESTED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  item_brand: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.REQUESTED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  item_number: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.REQUESTED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  pickup_signing: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.RECEIVED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  pickup_evidence: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.RECEIVED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  pickup_bast: Joi.alternatives().conditional('status', {
    is: Joi.equal(status.RECEIVED),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});

export const UpdateStatusPayloadSchema = Joi.object({
  status: Joi.number().strict().required(),
});

export const UpdateItemPayloadSchema = Joi.object({
  item_name: Joi.string().required(),
  item_brand: Joi.string().required(),
  item_number: Joi.string().required(),
});

export const UpdateNotesPayloadSchema = Joi.object({
  status: Joi.number().strict().equal(status.REJECTED, status.READY).required(),
  notes: Joi.string().required(),
});

export const UpdatePickupPayloadSchema = Joi.object({
  pickup_signing: Joi.string().required(),
  pickup_evidence: Joi.string().required(),
  pickup_bast: Joi.string().required(),
});

export const UpdateFilenamePayloadSchema = Joi.object({
  filename: Joi.string().required(),
});
