import { FileTypeValidator } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';

export const MulterConfig = {
  storage: diskStorage({
    destination: join(process.cwd(), 'uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
};
