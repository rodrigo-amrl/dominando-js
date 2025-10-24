import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';

import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
import Contact from '../app/models/Contact.js';

const models = [Customer, User, Contact];

class Database {
    constructor() {
        this.connection = new Sequelize(databaseConfig);
        this.init();
        this.associate();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (typeof model.associate === 'function') {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();
