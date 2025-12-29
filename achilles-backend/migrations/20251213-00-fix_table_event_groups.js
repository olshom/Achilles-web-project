const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn(
      "event_groups",
      "schedule_id",
      "event_id",
    );
  },
};
