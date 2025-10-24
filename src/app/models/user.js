import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
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
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                provider: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                tableName: 'users',
                hooks: {
                    beforeSave: async (user) => {
                        if (user.changed('password')) {
                            user.password = await bcrypt.hash(user.password, 8);
                        }
                    },
                },
            }
        );
    }

    // Método de instância para verificar senha
    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

export default User;
