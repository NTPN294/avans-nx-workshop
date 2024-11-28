import { Module } from '@nestjs/common';
import { BackendFeaturesMealModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Logger } from '@nestjs/common';


@Module({
    imports: [
        BackendFeaturesMealModule,
        AuthModule,
        MongooseModule.forRoot("mongodb+srv://ntpn294:Avans1234@ntpnavans.g3clv.mongodb.net/avans", {
            connectionFactory: (connection) => {
              connection.on('connected', () => {
                Logger.verbose(
                  `Mongoose connected to ${"mongodb+srv://ntpn294:Avans1234@ntpnavans.g3clv.mongodb.net/avans"}` 
                );
              });
              connection.on('error', (err) => {
                Logger.error('Mongoose connection error:', err);
              });
              connection.on('disconnected', () => {
                Logger.warn('Mongoose disconnected.');
              });
              return connection;
            },
          }),
          
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
