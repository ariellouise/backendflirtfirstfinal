const Sequelize = require("sequelize");

const db = new Sequelize("postgres://arielmurphy@localhost:5432/messages3");

(async () => {
  await db.authenticate();
  require("./Message")(db);
  db.sync();
})();

module.exports = { db };
