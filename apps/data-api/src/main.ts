
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    AllExceptionsFilter,
    HttpExceptionFilter,
    ApiResponseInterceptor
} from '@avans-nx-workshop/backend/dto';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { environment } from '@avans-nx-workshop/shared/util-env';
import multer from 'multer';
import * as express from 'express';

async function bootstrap() {
    console.log("ENVIROMENT: " + environment);
    console.log("DB STRING: " + environment.MONGO_DB_CONNECTION_STRING);


    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const corsOptions: CorsOptions = {};
    app.enableCors(corsOptions);

    const upload = multer({
        limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
        // Add other multer options here if needed
    });

    app.useGlobalInterceptors(new ApiResponseInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 DATA-API server is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
