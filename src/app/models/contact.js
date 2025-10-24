import { Model, DataTypes } from 'sequelize';

class Contact extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        isEmail: true,
                    },
                },
            },
            {
                sequelize,
                tableName: 'contacts',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    }
}

export default Contact;
