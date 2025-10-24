import { Model, DataTypes } from 'sequelize';

class Customer extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                status: {
                    type: DataTypes.ENUM('active', 'inactive'),
                    defaultValue: 'active',
                },
            },
            {
                sequelize,
                tableName: 'customers',
            }
        );
    }
}

export default Customer;
