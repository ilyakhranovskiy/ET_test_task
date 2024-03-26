import { model, Schema } from "mongoose";
import { DrugModel } from "./drug.model.js";

// export const LatLngSchema = new Schema(
//   {
//     lat: { type: String, required: true },
//     lng: { type: String, required: true },
//   },
//   {
//     _id: false,
//   }
// );

export const OrderItemSchema = new Schema(
  {
    drug: { type: DrugModel.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre("validate", function (next) {
  this.price = this.drug.price * this.quantity;
  next();
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    // addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", orderSchema);
