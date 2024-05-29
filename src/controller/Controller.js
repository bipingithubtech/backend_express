import ProductModel from "../model/ProductModel.js";

export default class ProductController {
  async getProduct(req, res) {
    try {
      const products = await ProductModel.get();
      console.log(products); // Add this line to verify the data
      res.render("index", { products }); // Correctly pass the products array
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getAddForm(req, res) {
    try {
      res.render("Form", { errorMessage: null });
    } catch (error) {
      console.error("Error while rendering the add product form:", error);
    }
  }

  async getAddProduct(req, res) {
    try {
      const { name, desc, price } = req.body;
      const imageUrl = "images/" + req.file.filename;
      ProductModel.addProduct(name, desc, price, imageUrl);

      const products = await ProductModel.get();
      res.render("index", { products });
    } catch {}
  }
  async updatePage(req, res) {
    try {
      const id = req.params.id;
      const productFound = await ProductModel.update(id);
      if (productFound) {
        console.log("Product found:", productFound);
        res.render("updateproduct", {
          product: productFound, // Use `product` instead of `products`
          errorMessage: null,
        });
      } else {
        res.status(401).send("Page not found");
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, desc, price } = req.body;
      const imageUrl = "images/" + req.file.filename;
      ProductModel.updatepro(name, desc, price, imageUrl);

      const product = await ProductModel.get();
      res.render("index", { product });
    } catch {}
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      ProductModel.deleteItem(id);
      const products = await ProductModel.get();
      res.render("index", { products });
    } catch {
      console.log("error while calling delete function");
    }
  }
}
