import Sequelize from 'sequelize';
import config from '../config/database.js';
import Customer from '../app/models/Customer.js';
import User from '../app/models/user.js';
import Contact from '../app/models/contact.js';

const models = [Contact, Customer, User];
class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }
    init() {
        models.forEach((model) => model.init(this.connection));
    }
    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}



export default Database;