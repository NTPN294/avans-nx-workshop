import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import {environment} from '@avans-nx-workshop/shared/util-env'
import {ConfigModule} from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({}),
        Neo4jModule.forRoot({
            scheme: 'bolt+s',
            host: environment.NEO4J_DB_HOST,
            port: environment.NEO4J_DB_PORT,
            username: environment.NEO4J_DB_USER,
            password: environment.NEO4J_DB_PASSWORD
        }),
        Neo4jBackendModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
