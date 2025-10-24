import { Router } from 'express';
import customers from './app/controllers/CustomerController.js';
// import contacts from './app/controllers/ContactController';
const routes = Router();

// Customer routes
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.delete);


//Contact routes
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.delete);



routes.get("/", (req, res) => {
    return res.json({ message: "API is running" });
});

export default routes;