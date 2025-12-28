module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin@mail.com",
        password:
          "$2b$10$AFeTp32AF67nnXcrtTNk8umYarvgfG5qIEfhNS4pwt.8NDGGm6l/G",
        first_name: "Admin",
        last_name: "Admin",
        profile_pic: "",
        plan_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("user_roles", [
      {
        user_id: 1,
        role_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete("user_roles", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
