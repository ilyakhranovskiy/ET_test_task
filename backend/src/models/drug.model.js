import { model, Schema } from "mongoose";

export const DrugSchema = new Schema(
  {
    name: { type: String, requaired: true },
    price: { type: Number, requaired: true },
    shops: { type: String, required: true },
    dataAdded: { type: Date, requaired: true },
    isFavorite: { type: Boolean, default: false },
    imageUrl: { type: String, requaired: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
export const DrugModel = model("drug", DrugSchema);
