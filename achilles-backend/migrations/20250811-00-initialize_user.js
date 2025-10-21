const {DataTypes} = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('plans', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: DataTypes.STRING
        })
        await queryInterface.createTable('roles', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
        await queryInterface.createTable('groups', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        })
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profile_pic: {
                type: DataTypes.STRING,
            },
            group_id: {
                type: DataTypes.INTEGER,
                references: {model: 'groups', key: 'id'},
            },
            belt: {
                type: DataTypes.STRING,
                defaultValue: 'white'
            },
            plan_id: {
                type: DataTypes.INTEGER,
                references: {model: 'plans', key: 'id'},
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }
        })
        await queryInterface.createTable('user_roles', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {model: 'users', key: 'id'},
            },
            role_id: {
                type: DataTypes.INTEGER,
                references: {model: 'roles', key: 'id'},
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            }

        })
        await queryInterface.createTable('achievements', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {model: 'users', key: 'id'},
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        })
        await queryInterface.createTable('events', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            event_type: {
                type: DataTypes.STRING,
                allowNull: false
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
            event_id: {
                type: DataTypes.INTEGER,
                references: {model: 'events', key: 'id'}

            },
            group_id: {
                type: DataTypes.INTEGER,
                references: {model: 'groups', key: 'id'},
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
        await queryInterface.dropTable('users', {cascade: true})
        await queryInterface.dropTable('user_roles', {cascade: true})
        await queryInterface.dropTable('plans', {cascade: true})
        await queryInterface.dropTable('roles', {cascade: true})
        await queryInterface.dropTable('groups', {cascade: true})

        await queryInterface.dropTable('achievements', {cascade: true})
        await queryInterface.dropTable('events', {cascade: true})
        await queryInterface.dropTable('event_groups', {cascade: true})
    },
}