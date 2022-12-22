import { randomUUID } from 'crypto';
import { extname } from 'path';

export const allowExtension = 'jpg|png|pdf|docx|xlsx';

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
