import { Router } from "express";
import { sample_med, sample_shops } from "../data.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_med);
});

router.get("/shops", (req, res) => {
  res.send(sample_shops);
});

router.get("/shop/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const drugs = sample_med.filter((item) =>
    item.shops.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(drugs)
});
export default router;
