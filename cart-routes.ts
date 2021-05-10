import express from "express";
import Cart from "./Cart";

const routes = express.Router();

const items: Cart[] = [
  { id: 1, product: "Stratocaster", price: 400, quantity: 8 },
  { id: 2, product: "Les Paul", price: 800, quantity: 2 },
  { id: 3, product: "Mustang", price: 600, quantity: 3 },
  { id: 4, product: "Telecaster", price: 300, quantity: 11 },
  { id: 5, product: "Jagstang", price: 900, quantity: 1 },
];

let nextId: number = 5;

routes.get("/items", (req, res) => {
  let product = req.query.product as string;
  let maxPrice: number = parseInt(req.query.maxPrice as string);
  let results = items;
  if (product) {
    product = product.toLowerCase();
    results = results.filter((item) =>
      item.product.toLowerCase().includes(product)
    );
  }
  if (maxPrice) {
    results = results.filter((item) => item.price <= maxPrice);
  }
  res.json(items);
});

routes.get("/items/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const item: Cart | undefined = items.find((item) => item.id === id);
  if (item) {
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`ID Not Found`);
  }
});

routes.post("/items", (req, res) => {
    let item: Cart = req.body;
    item.id = nextId;
    nextId++;
    items.push(item);
    res.status(201);
    res.json(item);
  });

routes.put("/items/:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  let item: Cart = req.body;
  item.id = id;
  const index: number = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = item;
    item.id = nextId;
    nextId++;
    res.status(200);
    res.json(item);
  }
});

routes.delete("/items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const index: number = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
    }
    res.status(204);
    res.send();
  });

export default routes;
