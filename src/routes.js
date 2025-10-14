const { Router } = require('express');
const routes = Router();
const customers = require('./controllers/CustomerController');

routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.delete);

routes.get("/", (req, res) => {
    return res.json({ message: "API is running" });
});

module.exports = routes;