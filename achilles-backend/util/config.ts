import "dotenv/config";

interface Config {
  DATABASE_URL: string | undefined,
  PORT: number,
  SECRET: string
}

const secret = process.env.SECRET;

if (!secret) {
    throw new Error("Must have secret")
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: parseInt(process.env.PORT || "3003"),
  SECRET: secret
};