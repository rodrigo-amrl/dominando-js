import { Sequelize, Model } from "sequelize";

class Contact extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: {
                    type: Sequelize.STRING
                },
            }, { sequelize }
        );
    }
    static assossiete(models) {
        this.hasMany(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
    }
}