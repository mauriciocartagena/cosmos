declare namespace NodeJS {
  interface ProcessEnv {
    USER: string;
    PASSWORD: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    EMAIL: string;
    EMAILPASSWORD: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}