import express from "express";
import bodyParser from "body-parser";
import RazorPay from "razorpay";

const app = express();
app.use(bodyParser.json);

app.get("/", (req, res) => {
  res.send({
    working: true,
  });
});

app.post("/payment", async (req, res) => {
  try {
    let instance = new RazorPay({
      key_id: "rzp_test_GXwGCmJSauvS0K",
      key_secret: "pUkwnf9aqqatfAqCvxKdzHdv",
    });

    instance.orders.create({
      amount: req.body.amount,
      currency: "INR",
    });

    await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic cnpwX3R1c3RfR1h3R0NtS1NhdXZTMEs6cFVed25mOWFxcWF0ZkFxQ3Z4S2R6SGR2",
      },
      body: JSON.stringify({
        amount: req.body.amount,
        currency: "INR",
      }),
    })
      .then((resp) => resp.json())
      .then((json) => res.json({ order_id: json._id }));
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server Running at 3000");
});
