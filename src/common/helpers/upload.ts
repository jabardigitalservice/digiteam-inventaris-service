import { randomUUID } from 'crypto';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

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

export const multerOptions: MulterOptions = {
  fileFilter: (req, file: Express.Multer.File, callback) => {
    if (file.mimetype !== MIME_TYPE) {
      return callback(null, false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
};
