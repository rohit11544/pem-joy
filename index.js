import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import pemRoutes from "./routes/pem.js";
import customerRoutes from "./routes/customer.js";
import shopRoutes from "./routes/shop.js";

// Payment Imports
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

// creating app
const app = express();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());

app.use("/pem", pemRoutes);
app.use("/customer", customerRoutes);
app.use("/shop", shopRoutes);
// -------------------------------PAYMENT ROUT----------------------------------
app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "PEM",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

const CONNECTION_URL =
  "mongodb+srv://rohit11544:rohit123@cluster0.qmciq.mongodb.net/fsd?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

// connecting mongoDB to server
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
