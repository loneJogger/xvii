import dotenv from "dotenv";

const development = {
  url: "postgres://dev:password@127.0.0.1:5432/dev_db",
  dialect: "postgres",
};

const production = {
  url: "postgres://dev:password@127.0.0.1:5432/dev_db",
  dialect: "postgres",
};

export default { development, production };
