import Sequelize from 'sequelize';
import config from '../config/database.js';
import Customer from '../app/models/Customer.js';
import User from '../app/models/User.js';
import Contact from '../app/models/Contact.js';

const models = [Contact, Customer, User];
class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
    }
    init() {
        models.forEach((model) => model.init(this.connection));
    }
}



export default Database;