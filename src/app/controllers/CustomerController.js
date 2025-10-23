import Customer from "../models/Customer";

class CustomerController {
    async index(req, res) {
        const { name, email, status, createdBefore, createdAfter, UpdatedBefore, UpdatedAfter, Sort } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        return res.json(await Customer.findAll());
    }
    async show(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customer.findByPk(id);
        const status = customer ? 200 : 404;
        return res.status(status).json(customer);
    }
    async create(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().oneOf(['active', 'inactive']).required(),
            site: Yup.string().url()
        })
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const newCustomer = await Customer.create(req.body);

        return res.status(201).json(newCustomer);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().oneOf(['active', 'inactive']),
            site: Yup.string().url()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const updatedCustomer = await customer.update(req.body);
        return res.json(updatedCustomer);
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);

        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        return res.status(204).send();
    }
}
export default new CustomerController();