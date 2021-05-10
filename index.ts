import express from "express";
import cartRoutes from "./cart-routes";
import cors from "cors";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", cartRoutes);
app.listen(port, () => console.log(`Listening on port: ${port}.`));
