import mongoose, { Schema, Document, models } from "mongoose";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface IOrder extends Document {
  user: string; // User ID or email
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  shippingAddress: Address;
  email: string;
  phone: string;
  paymentStatus: string; // 'Pending' | 'Completed'
}

const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zip: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: AddressSchema, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default models.Order || mongoose.model<IOrder>("Order", OrderSchema);
