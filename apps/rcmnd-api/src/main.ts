/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiResponseInterceptor } from '@avans-nx-workshop/backend/dto';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import {environment} from '@avans-nx-workshop/shared/util-env'
import * as bodyParser from 'body-parser';

async function bootstrap() {
    Logger.log(
        environment.NEO4J_DB_HOST,
    )
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const corsOptions: CorsOptions = {};
    app.enableCors(corsOptions);

    app.use(bodyParser.json({ limit: '50mb' })); // Adjust the size as needed
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.useGlobalInterceptors(new ApiResponseInterceptor());

    const port = process.env.PORT || 3100;
    await app.listen(port);
    Logger.log(
        `🚀 RCMND server is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
