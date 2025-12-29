const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("schedule_groups", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        references: { model: "schedules", key: "id" },
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: { model: "groups", key: "id" },
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("schedule_groups");
  },
};
