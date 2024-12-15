import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://3diceapi-f0cwe4d7fqgefxc8.germanywestcentral-01.azurewebsites.net',
    dataApiUrl: 'https://3diceapi-f0cwe4d7fqgefxc8.germanywestcentral-01.azurewebsites.net/api', 

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://ntpn294:Avans1234@ntpnavans.g3clv.mongodb.net/avans',

    NEO4J_ROOT_DOMAIN_URL: 'http://localhost:3100',
    NEO4J_dataApiUrl: 'http://localhost:3100/api',

    NEO4J_DB_HOST: '4e5b2d8a.databases.neo4j.io',
    NEO4J_DB_PORT: 7687,
    NEO4J_DB_USER: 'neo4j',
    NEO4J_DB_PASSWORD: 'tw1ilJ6dP8YNY6y5ntrP-6vOBmy16FLvHKYSSgBiA1o' 
};
