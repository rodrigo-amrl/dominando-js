export default {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '1234',
    database: 'dominando_js',
    define: {
        timestamps: true,       // Cria created_at e updated_at
        underscored: true,      // Converte nomeDeCampo → nome_de_campo
        underscoredAll: true,   // Garante padrão snake_case em tudo
    },
};