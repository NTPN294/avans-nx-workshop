import { IUser } from '@avans-nx-workshop/shared/api';
import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import {queries} from './queries';

@Injectable()
export class Neo4JUserService {
    private readonly logger: Logger = new Logger(Neo4JUserService.name);

    constructor(private readonly neo4jService: Neo4jService) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        const results = await this.neo4jService.read(
            queries.getAllUsers
        );
        return results.records.map((record) => record.get(0).properties);
    }

    async createUser(user: IUser): Promise<any> {
        this.logger.log('create user');
        const result = await this.neo4jService.write(
            queries.createUser(user)
        );
        return result.records[0].get(0).properties;
    }

    async updateUser(user: IUser): Promise<any>{
        this.logger.log('update user');
        const result = await this.neo4jService.write(
            queries.updateUser(user)
        );
        return user
    }

    async deleteUser(mongoDbId: string): Promise<any>{
        this.logger.log('delete user');
        const result = await this.neo4jService.write(
            queries.deleteUser(mongoDbId)
        );
        return result.records[0].get(0);
    }

    async follow(id: string, followId: string): Promise<any>{
        this.logger.log('follow user');
        const result = await this.neo4jService.write(
            queries.follow(id, followId)
        );
        return result.records[0].get(0).properties;
    }

    async unfollow(id: string, followId: string): Promise<any>{
        this.logger.log('unfollow user');
        const result = await this.neo4jService.write(
            queries.unfollow(id, followId)
        );
        return result.records[0].get(0).properties;
    }
}
