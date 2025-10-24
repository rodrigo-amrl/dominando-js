import User from "../models/User.js";
import * as Yup from "yup";
import { validateYup } from "../../helpers/validate.js";

class UserController {
    async index(req, res) {
        try {
            const { name, email, sort } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;

            const where = {};
            if (name) where.name = name;
            if (email) where.email = email;

            const users = await User.findAll({
                where,
                limit,
                offset,
                order: sort ? [[sort, "ASC"]] : [["id", "ASC"]],
                attributes: { exclude: ["password"] }, 
            });

            return res.json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required(),
            provider: Yup.boolean().default(false),
        });

        const validation = await validateYup(req.body, schema);
        if (!validation.valid) return res.status(400).json({ errors: validation.errors });

        try {
            const newUser = await User.create(req.body);
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        const id = parseInt(req.params.id);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string(),
            provider: Yup.boolean(),
        });

        const validation = await validateYup(req.body, schema);
        if (!validation.valid) return res.status(400).json({ errors: validation.errors });

        try {
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: "User not found" });

            const updatedUser = await user.update(req.body);
            return res.json(updatedUser);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        const id = parseInt(req.params.id);

        try {
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: "User not found" });

            await user.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new UserController();
