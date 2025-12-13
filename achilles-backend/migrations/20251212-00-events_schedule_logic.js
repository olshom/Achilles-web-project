const {DataTypes} = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.dropTable('event_groups')
        await queryInterface.dropTable('event_entries')
        await queryInterface.dropTable('events')
        await queryInterface.createTable('schedules', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            monday: DataTypes.BOOLEAN,
            tuesday: DataTypes.BOOLEAN,
            wednesday: DataTypes.BOOLEAN,
            thursday: DataTypes.BOOLEAN,
            friday: DataTypes.BOOLEAN,
            saturday: DataTypes.BOOLEAN,
            sunday: DataTypes.BOOLEAN,
            start: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }
        })

        await queryInterface.createTable('events', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            coach_id: {
                type: DataTypes.INTEGER,
                references: {model: 'users', key: 'id'},
            },
            uniform: {
                type: DataTypes.STRING,
            },
            start: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
            },
            schedule_id: {
                type: DataTypes.INTEGER,
                references: {model: 'schedules', key: 'id'},
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }
        })
        await queryInterface.createTable('event_groups', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            schedule_id: {
                type: DataTypes.INTEGER,
                references: {model: 'events', key: 'id'},
                allowNull: false
            },
            group_id: {
                type: DataTypes.INTEGER,
                references: {model: 'groups', key: 'id'},
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('events_groups')
        await queryInterface.dropTable('events')
        await queryInterface.dropTable('schedules')
    }
}