import { loadEnvFile } from 'node:process'
loadEnvFile('.env');

export default {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,       // Cria created_at e updated_at
        underscored: true,      // Converte nomeDeCampo → nome_de_campo
        underscoredAll: true,   // Garante padrão snake_case em tudo
    },

};