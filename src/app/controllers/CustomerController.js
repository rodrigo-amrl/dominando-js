import Customer from "../models/Customer.js";
import * as Yup from "yup";
import { validateYup } from "../../helpers/validate.js";

class CustomerController {
    // Listagem de clientes com paginação e filtros simples
    async index(req, res) {
        try {
            const { name, email, status, sort } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;

            const where = {};
            if (name) where.name = name;
            if (email) where.email = email;
            if (status) where.status = status;

            const customers = await Customer.findAll({
                where,
                limit,
                offset,
                order: sort ? [[sort, "ASC"]] : [["id", "ASC"]],
            });

            return res.json(customers);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Buscar cliente por ID
    async show(req, res) {
        try {
            const id = parseInt(req.params.id);
            const customer = await Customer.findByPk(id);

            if (!customer) return res.status(404).json({ error: "Customer not found" });
            return res.json(customer);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Criar cliente
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().oneOf(["active", "inactive"]).required(),
            site: Yup.string().url(),
        });

        const validation = await validateYup(req.body, schema);
        if (!validation.valid) return res.status(400).json({ errors: validation.errors });

        try {
            const newCustomer = await Customer.create(req.body);
            return res.status(201).json(newCustomer);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Atualizar cliente
    async update(req, res) {
        const id = parseInt(req.params.id);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().oneOf(["active", "inactive"]),
            site: Yup.string().url(),
        });

        const validation = await validateYup(req.body, schema);
        if (!validation.valid) return res.status(400).json({ errors: validation.errors });

        try {
            const customer = await Customer.findByPk(id);
            if (!customer) return res.status(404).json({ error: "Customer not found" });

            const updatedCustomer = await customer.update(req.body);
            return res.json(updatedCustomer);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Deletar cliente
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            const customer = await Customer.findByPk(id);

            if (!customer) return res.status(404).json({ error: "Customer not found" });

            await customer.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new CustomerController();
