import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi';
import lang from '../lang/config';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | StringSchema | NumberSchema) {}

  transform(values: Record<string, any>, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      cache: true,
    });

    if (!error) return value;

    const errors = this.validateError(error.details, metadata);

    throw new UnprocessableEntityException(errors);
  }

  private validateError = (
    details: Joi.ValidationErrorItem[],
    metadata: ArgumentMetadata,
  ) => {
    const rules: any = {};

    for (const item of details) {
      const { context, type, path } = item;

      if (path.length === 0) path.push(metadata.data);

      const key = path.join('.');
      const label = path[path.length - 1].toString();

      rules[key] = this.message(
        type,
        label,
        context?.limit,
        context?.valids,
        item.message,
      );
    }

    return rules;
  };

  private message = (
    type: string,
    label: string,
    limit?: string,
    valids?: string[],
    messageDefault?: string,
  ) => {
    const valid = valids?.filter((e) => e)?.join(', ');

    return lang.__(`validation.${type}`, {
      attribute: label,
      limit,
      valid,
      message: messageDefault,
    });
  };
}
