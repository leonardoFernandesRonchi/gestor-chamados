import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  validateFile(file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const maxSize = 5 * 1024 * 1024;

    if (file?.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande');
    }

    return file;
  }

  getFileUrl(file: Express.Multer.File) {
    return `/uploads/${file.filename}`;
  }
}
