import "dotenv/config";
const secret = process.env.SECRET;
if (!secret) {
    throw new Error("Must have secret");
}
export const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: parseInt(process.env.PORT || "3003"),
    SECRET: secret,
};
