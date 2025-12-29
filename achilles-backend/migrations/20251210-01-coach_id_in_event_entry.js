const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("events", "coach_id");
    await queryInterface.addColumn("event_entries", "coach_id", {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("events", "coach_id", {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    });
    await queryInterface.removeColumn("event_entries", "coach_id");
  },
};
