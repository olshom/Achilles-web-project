module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert("plans", [
      {
        type: "inactive",
        price: 0,
        description: "Inactive",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "twice_a_week",
        price: 60,
        description: "2 times a week",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "full",
        price: 70,
        description: "Full time",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async ({ context: queryInterface }) => {
    return queryInterface.bulkDelete("plans", null, {});
  },
};
