const Sequelize = require("sequelize");

let db;
let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
  db = new Sequelize("postgres://arielmurphy@localhost:5432/messages3");
} else {
  db = new Sequelize(dbURL, {
    logging: false,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // very important
      },
    },
  });
}

(async () => {
  await db.authenticate();
  require("./Message")(db);
  db.sync();
})();

module.exports = { db };
