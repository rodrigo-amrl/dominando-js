import Contact from "../models/Contact.js";

class ContactController {
    async index(req, res) {
        const { name, email, status, createdBefore, createdAfter, UpdatedBefore, UpdatedAfter, Sort } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        return res.json(await Contact.findAll());
    }
    async show(req, res) {
        const id = parseInt(req.params.id);
        const contact = await Contact.findByPk(id);
        const status = contact ? 200 : 404;
        return res.status(status).json(contact);
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

        const newContact = await Contact.create(req.body);

        return res.status(201).json(newContact);
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
        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        const updatedContact = await contact.update(req.body);
        return res.json(updatedContact);
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);

        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        await contact.destroy();
        return res.status(204).send();
    }
}
export default new ContactController();