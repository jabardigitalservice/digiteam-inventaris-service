import Joi from 'joi';
import { status } from '../../common/helpers/status';

const emptyAllow = ['', null];
const sortByAllow = ['created_at', 'division', 'status', 'request_type'];
const sort = ['asc', 'desc'];

const setStatusWhenOption = (status: number[]): Joi.WhenOptions => {
  return {
    is: Joi.equal(...status),
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  };
};

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
  status: Joi.number().strict().required(),
  notes: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.REJECTED, status.READY]),
  ),
  filename: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.APPROVED]),
  ),
  item_name: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.REQUESTED]),
  ),
  item_brand: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.REQUESTED]),
  ),
  item_number: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.REQUESTED]),
  ),
  pickup_signing: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.RECEIVED]),
  ),
  pickup_evidence: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.RECEIVED]),
  ),
  pickup_bast: Joi.alternatives().conditional(
    'status',
    setStatusWhenOption([status.RECEIVED]),
  ),
});
