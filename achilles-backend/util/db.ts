import { Sequelize } from "sequelize";
import { config } from "./config";
import { Umzug, SequelizeStorage } from "umzug";

if (!config.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export const sequelize = new Sequelize(config.DATABASE_URL, {
  ssl: true
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to database");
  } catch (err) {
    console.log("failed to connect to the database", err);
    return process.exit(1);
  }
  return 0;
};

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

export const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export default connectToDatabase;
