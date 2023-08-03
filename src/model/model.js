const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'practice_gql',
});

// Check the connection status
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4(),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'User',
    }
);

class Category extends Model {}
Category.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4(),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'Category',
    }
);

class Club extends Model {}
Club.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4(),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        joined_member: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_member: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'Club',
    }
);

class Club_member extends Model {}
Club_member.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4(),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        clubId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Club,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['member', 'owner']],
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'Club_member',
    }
);

/**
 * Setting Up Database Models
 * @returns {Promise<void>}
 */
const InitSetup = async () => {
    try {
        await sequelize.sync({ alter: true });
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const DbModel = {
    User: User,
    Club_member: Club_member,
    Category: Category,
    Club: Club,
};

// Set up the association between Club_member and User
Club_member.belongsTo(User, { foreignKey: 'userId' });
Club_member.belongsTo(Club, { foreignKey: 'clubId' });
User.hasMany(Club_member, { foreignKey: 'userId' });
Club.hasMany(Club, { foreignKey: 'clubId' });
Club.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Club, { foreignKey: 'categoryId' });

module.exports = {
    DbModel,
    InitSetup,
};
