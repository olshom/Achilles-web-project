module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert("roles", [
      {
        name: "member",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "coach",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async ({ context: queryInterface }) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
