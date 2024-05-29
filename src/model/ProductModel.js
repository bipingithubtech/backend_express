export default class ProductModel {
  constructor(id, name, description, price, imageUrl) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.price = price),
      (this.imageUrl = imageUrl);
  }

  static async get() {
    return prductObject;
  }

  static async addProduct(name, desc, price, imageUrl) {
    try {
      const newProduct = new ProductModel(
        prductObject.length + 1,
        name,
        desc,
        price,
        imageUrl
      );

      prductObject.push(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  static async update(id) {
    return prductObject.find((p) => p.id == id);
  }
  static async updatepro(objId) {
    const index = prductObject.findIndex((p) => p.id == objId.id);
    const { name, decs, price, imageUrl } = objId;
    (prductObject[index] = name), decs, price, imageUrl;
  }

  static async deleteItem(id) {
    const index = prductObject.findIndex((p) => p.id == id);
    prductObject.splice(index, 1);
  }
}
var prductObject = [
  new ProductModel(
    1,
    "Balidan",
    "desc 1",
    300,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPTyuaxzPNPJ17OpciLUWQbvYklOTM9oceqlgqjEmJ4J6zvzHjHAHO-agJdDubSYYbks&usqp=CAU"
  ),
  new ProductModel(
    2,
    "can't hurt me",
    "desc 2",
    250,
    "https://m.media-amazon.com/images/I/51c4H3VBciL.jpg"
  ),
  new ProductModel(
    3,
    "why i'm an athesisit",
    "desc 3",
    200,
    "https://cdn.kobo.com/book-images/997659fa-b462-427d-a330-0038e2bf785f/353/569/90/False/why-i-am-an-atheist-2.jpg"
  ),
];
