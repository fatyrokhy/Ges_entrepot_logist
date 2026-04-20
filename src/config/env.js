import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  HOST: isProd ? (process.env.HOST || "") : "localhost",
};
