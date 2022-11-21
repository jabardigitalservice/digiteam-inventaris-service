import { randomUUID } from 'crypto';
import path, { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileFilterCallback } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import lang from '../lang/config';

export const createFileObject = (file: Express.Multer.File) => {
  const name = randomUUID();
  const extension = extname(file.originalname);

  const fileName = `${name}${extension}`;
  const fileBuffer = file.buffer;
  const metaData = {
    'Content-Type': file.mimetype,
  };

  return {
    fileName,
    fileBuffer,
    metaData,
  };
};

const allowFileSize = 1 * 1024 * 1024;

const allowExtension = 'jpeg|png|pdf|docx|xlsx';

const allowMimeTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'image/png',
  'image/jpeg',
];

const formatError = (fieldName: string, message: string): HttpException => {
  const error: Record<string, string> = {};
  error[fieldName] = message;

  return new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
};

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const regex = new RegExp(allowExtension);
  const extname = regex.test(path.extname(file.originalname).toLowerCase());

  const mimeType = allowMimeTypes.includes(file.mimetype);

  if (extname && mimeType) return cb(null, true);

  const customMessage = {
    attribute: file.fieldname,
    values: allowExtension.split('|').join(', '),
  };

  cb(
    formatError(
      file.fieldname,
      lang.__('validation.file.mimetypes', customMessage),
    ),
  );
};

export const multerOptions: MulterOptions = {
  limits: { fileSize: allowFileSize },
  fileFilter: (_req, file: Express.Multer.File, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  },
};
