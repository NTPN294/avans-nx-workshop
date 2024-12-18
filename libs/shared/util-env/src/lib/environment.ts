import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'dummy',

    MONGO_DB_CONNECTION_STRING: 'dummy',

    NEO4J_ROOT_DOMAIN_URL: 'dummy',
    NEO4J_dataApiUrl: 'dummy',

    NEO4J_DB_HOST: 'dummy',
    NEO4J_DB_PORT: 0,
    NEO4J_DB_USER: 'dummy',
    NEO4J_DB_PASSWORD: 'dummy'
};
