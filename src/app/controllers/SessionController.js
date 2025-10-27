import User from "../models/user.js";
import jwt from "jsonwebtoken";
import loadEnvFile from 'process';
loadEnvFile('.env')

class SessionController {

    async create(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const passwordValid = await user.checkPassword(password);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.json({
            user: { id: user.id, name: user.name, email: user.email }, token: jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        });
    }
}

export default new SessionController();