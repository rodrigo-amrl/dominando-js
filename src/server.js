import { loadEnvFile } from 'node:process'
loadEnvFile('.env');
import app from './app.js';

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT || 3000}`);
});


