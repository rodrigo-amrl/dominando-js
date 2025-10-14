class CustomerController {
    constructor() {
        this.customers = [{
            id: 1,
            name: 'Rodrigo',
            age: 24,
            site: "www.rodrigo.com"
        },
        {
            id: 2,
            name: 'Maria',
            age: 30,
            site: "www.maria.com"
        }]
    }

    index(req, res) {
        return res.json(customers);
    }
    show(req, res) {
        const id = parseInt(req.params.id);
        const customer = customers.find(c => c.id === id);
        const status = customer ? 200 : 404;
        return res.status(status).json(customer);
    }
    create(req, res) {
        const { name, age, site } = req.body;

        const nextId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        const newCustomer = { id: nextId, name, age, site };
        customers.push(newCustomer);
        return res.status(201).json(newCustomer);
    }
    update(req, res) {
        const id = parseInt(req.params.id);
        const { name, age, site } = req.body;
        const customerIndex = customers.findIndex(c => c.id === id);
        customers[customerIndex] = { id, name, age, site };
        return res.json(customers[customerIndex]);
    }
    delete(req, res) {
        const id = parseInt(req.params.id);
        const customerIndex = customers.findIndex(c => c.id === id);
        delete customers[customerIndex];
        return res.status(204).send();
    }
}