const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
let customers = [{
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
}

]
server.get('/customers', (req, res) => {
    console.log('asdfasdf')
    return res.json(customers);
});
server.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);
    const status = customer ? 200 : 404;
    return res.status(status).json(customer);
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});