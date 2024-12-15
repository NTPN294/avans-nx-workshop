import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JUserController } from './neo4j.controller';
import { Neo4JUserService } from './neo4j-users.service';
import { Neo4JPostController } from './neo4jPost.controller';
import { Neo4JPostService } from './neo4j-posts.service';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JUserController,Neo4JPostController],
    providers: [Neo4JUserService,Neo4JPostService],
    exports: []
})
export class Neo4jBackendModule {}
