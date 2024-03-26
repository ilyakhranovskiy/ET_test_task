import express from 'express';
import handler from "express-async-handler";
import { OrderModel } from "../models/order.model.js";

const router = express.Router();

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    await OrderModel.deleteOne({
      user: req.user.id,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });

    await newOrder.save();
    res.send(newOrder);
  })
);
export default router;
