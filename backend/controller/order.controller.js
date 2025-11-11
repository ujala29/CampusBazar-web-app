import Order from "../model/order.schema.js";
import Product from "../model/product.schema.js";
import User from "../model/user.schema.js";
import { sendEmail } from "../config/sendmail.js";

export const createOrder = async (req, res) => {
  try {
    const buyerId = req.userID;
    const { productId } = req.body;

    const product = await Product.findById(productId).populate("seller");
    const buyer = await User.findById(buyerId);

    const order = await Order.create({
      productId,
      buyerId,
    });

    // Email to Seller
    await sendEmail(
      product.seller.email,
      "Someone wants to buy your product!",
      `
      <h3>New Purchase Request</h3>
      <p>Your product <b>${product.title}</b> received a buy request.</p>
      <h4>Buyer Details:</h4>
      <p>Name: ${buyer.name}</p>
      <p>Email: ${buyer.email}</p>
      <p>Phone: ${buyer.phone}</p>
      <p>Address: ${buyer.address}</p>
      `
    );

    // Email to Buyer
    await sendEmail(
      buyer.email,
      "Order placed successfully!",
      `
      <h3>Your Order is Confirmed</h3>
      <p>You requested to buy <b>${product.title}</b>.</p>
      <h4>Seller Details:</h4>
      <p>Name: ${product.seller.name}</p>
      <p>Email: ${product.seller.email}</p>
      <p>Phone: ${product.seller.phone}</p>
      <p>Address: ${product.seller.address}</p>
      `
    );

    return res.json({
      success: true,
      message: "Order placed and notification sent!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};
