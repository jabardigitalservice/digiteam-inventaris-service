import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import Joi, { ObjectSchema } from 'joi';
import lang from '../lang/config';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(values: Record<string, any>) {
    const { error, value } = this.schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      cache: true,
    });

    if (!error) return value;

    const errors = this.validateError(error.details);

    throw new UnprocessableEntityException(errors);
  }

  private validateError = (details: Joi.ValidationErrorItem[]) => {
    const rules: any = {};

    for (const item of details) {
      const { context, type, path } = item;

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
