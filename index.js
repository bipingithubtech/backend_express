// import productController from "./src/controller/Controller.js";
// import express from "express";
// import path from "path";
// import ValidationMiddelWare from "./src/MiddleWare/Validation.js";
// const server = express();
// server.set("view engine", "ejs");
// server.set("views", path.join(path.resolve(), "src", "views"));

// server.use(express.static("src/views"));
// server.use(express.urlencoded({ extended: true }));
// server.use(express.static("public"))
// const ProductController = new productController();

// server.get("/", ProductController.getProduct);
// server.get("/new", ProductController.getNewProduct);
// server.post("/", ValidationMiddelWare, ProductController.getAddProduct);

// server.get("/update/:id", ProductController.getUpdateForm);

// server.post("/updateProduct", ProductController.updateProduct);
// server.post("/delete/:id", ProductController.deleteItem);
// // Start the server and listen on port 3001
//
import express from "express";
import path from "path";
import productController from "./src/controller/Controller.js";
import ValidationMiddelWare from "./src/MiddleWare/Validation.js";
import { upload } from "./src/MiddleWare/fileUploadMulter.js";
import session from "express-session";

import usercontroller from "./src/controller/userController.js";
import uservalidation from "./src/MiddleWare/userValidation.js";

const controller = new productController();
const usercontrol = new usercontroller();
const server = express();
server.use(express.urlencoded({ extended: true }));
// server.use(bodyParser.json());
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(express.static(path.join(path.resolve(), "public")));
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.get("/", controller.getProduct);
server.get("/new", controller.getAddForm);
server.get("/updatecontent/:id", controller.updatePage);
server.post(
  "/",
  upload.single("imageUrl"),
  ValidationMiddelWare,
  controller.getAddProduct
);
server.post("/updateProduct", controller.updateProduct);
server.post("/delete/:id", controller.deleteProduct);
server.get("/register", usercontrol.registrationForm);
server.get("/login", usercontrol.gotologin);
server.post("/login", usercontrol.postlogin);
server.post("/register", uservalidation, usercontrol.postRegistration);
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
