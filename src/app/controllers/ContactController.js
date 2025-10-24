import Contact from "../models/Contact.js";
import * as Yup from "yup";
import { validateYup } from "../../helpers/validate.js";

class ContactController {
  // Listagem de contatos de um cliente
  async index(req, res) {
    try {
      const { customerId } = req.params;
      const { name, email, status, sort } = req.query;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const where = { customer_id: customerId };
      if (name) where.name = name;
      if (email) where.email = email;
      if (status) where.status = status;

      const contacts = await Contact.findAll({
        where,
        limit,
        offset,
        order: sort ? [[sort, "ASC"]] : [["id", "ASC"]],
      });

      return res.json(contacts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Buscar contato específico de um cliente
  async show(req, res) {
    try {
      const { customerId, id } = req.params;

      const contact = await Contact.findOne({ where: { id, customer_id: customerId } });

      if (!contact) return res.status(404).json({ error: "Contact not found" });
      return res.json(contact);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Criar novo contato para um cliente
  async create(req, res) {
    const { customerId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().oneOf(["active", "inactive"]).required(),
      site: Yup.string().url(),
    });

    const validation = await validateYup(req.body, schema);
    if (!validation.valid) return res.status(400).json({ errors: validation.errors });

    try {
      const newContact = await Contact.create({
        ...req.body,
        customer_id: customerId,
      });
      return res.status(201).json(newContact);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Atualizar contato de um cliente
  async update(req, res) {
    const { customerId, id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().oneOf(["active", "inactive"]),
      site: Yup.string().url(),
    });

    const validation = await validateYup(req.body, schema);
    if (!validation.valid) return res.status(400).json({ errors: validation.errors });

    try {
      const contact = await Contact.findOne({
        where: { id, customer_id: customerId },
      });
      if (!contact) return res.status(404).json({ error: "Contact not found" });

      const updatedContact = await contact.update(req.body);
      return res.json(updatedContact);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Deletar contato de um cliente
  async delete(req, res) {
    const { customerId, id } = req.params;

    try {
      const contact = await Contact.findOne({
        where: { id, customer_id: customerId },
      });

      if (!contact) return res.status(404).json({ error: "Contact not found" });

      await contact.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new ContactController();
