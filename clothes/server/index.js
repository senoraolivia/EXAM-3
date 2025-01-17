const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
const { Schema } = mongoose;

const DB_URL = "mongodb+srv://ulviyyaetazmp202:ulviya123@cluster0.yy1te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const ClothesSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const ProductModel = mongoose.model("Clothes", ClothesSchema);


app.get("/api/clothes", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ data: products, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.get("/api/clothes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "product not found!" });
    }

    res.status(200).json({ data: product, message: "success!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.delete("/api/clothes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    const products = await ProductModel.find({});
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "failed to delete! | product not found!" });
    }
    res.status(200).json({
      deletedProduct: deletedProduct,
      message: "deleted successfully!",
      products: products,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/api/clothes", async (req, res) => {
  const { title, price,  } = req.body;

  if (!title || !price ) {
    return res
      .status(400)
      .json({ message: "Bad Request! All fileds should be add!" });
  }
  try {
    const newProduct = ProductModel({ ...req.body });
    await newProduct.save();
    res.status(201).json({
      message: "product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/clothes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "product not found!",
      });
    }

    res.status(200).json({
      message: "updated successfully!",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(
        `Example app listening on port ${PORT}, url is http://localhost:${PORT}`
      );
    });
  });