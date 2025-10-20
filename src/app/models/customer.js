import { Model, Sequelize } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                status: Sequelize.ENUM('active', 'inactive')
            }, { sequelize }
        );

    }
}

export default Customer;