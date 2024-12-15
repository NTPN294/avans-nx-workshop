export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;

    NEO4J_ROOT_DOMAIN_URL: string;
    NEO4J_dataApiUrl: string;

    NEO4J_DB_HOST: string;
    NEO4J_DB_PORT: number;
    NEO4J_DB_USER: string;
    NEO4J_DB_PASSWORD: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
