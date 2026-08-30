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

    return file;
  }

  getFileUrl(file: Express.Multer.File) {
    return `/uploads/${file.filename}`;
  }
}
