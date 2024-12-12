import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer';
import { Request, Response } from 'express';

@Injectable()
export class UploadService {
  saveFile(file: Express.Multer.File, id: string): string {
    const assetPath = path.resolve(__dirname);
    let filePathSplit = assetPath.split("\\");
    filePathSplit.pop();
    filePathSplit.pop();
    filePathSplit.pop();

    let uploadPath = filePathSplit.join("\\") + "\\apps\\my-app\\src\\assets\\" + id;
    console.log(uploadPath);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    return filePath;
    // return "null";
  }
}
