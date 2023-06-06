import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileSizeValidationPipe } from './upload.dto';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: 'mongodb://mongo:HkDjSpSV5b4qD1mXcQq9@containers-us-west-89.railway.app:7075',
  file: (req, file) => {
    return { bucketName: 'photos' };
  },
});

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    res.send(file);
  }
}
