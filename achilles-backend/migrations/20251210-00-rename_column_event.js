const {DataTypes} = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.renameColumn( 'events', 'coach', 'coach_id')

    },
    down: async ({context: queryInterface}) => {
        await queryInterface.renameColumn( 'events', 'coach_id', 'coach')
    }
}