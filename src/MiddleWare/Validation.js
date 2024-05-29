// const ValidationMiddelWare = (req, res, next) => {
//   const { name, price, imageUrl } = req.body;

//   let error = [];

//   if (!name || name.trim() === "") {
//     error.push("Name is required");
//   }
//   if (!price || parseFloat(price) < 1) {
//     error.push("price must be positive value");
//   }

//   try {
//     const ValidUrl = new URL(imageUrl);
//   } catch (err) {
//     error.push("URL is in valid");
//   }

//   if (error.length > 0) {
//     return res.render("Form", { errorMessage: error[0] });
//   }
//   next();
// };

// va;idation from express-validator

// import { body, validationResult } from "express-validator";

// const ValidationMiddelWare = async (req, res, next) => {
//   const rules = [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("price").isFloat({ gt: 0 }).withMessage("price should be positive"),
//     body("imageUrl").isURL().withMessage("invalid URL"),
//   ];

//   await Promise.all(rules.map((rule) => rule.run(req)));

//   let result = validationResult(req);

//   if (!result.isEmpty()) {
//     res.render("Form", { errorMessage: result.array()[0].msg });
//   }

//   next();
// };

// export default ValidationMiddelWare;

import { body, validationResult } from "express-validator";
const ValidationMiddelWare = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("invalidi price"),
    // body("imageUrl").isURL().withMessage("invalid url"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("image is required");
      }
      return true;
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  let result = validationResult(req);
  if (!result.isEmpty()) {
    const firstError = result.array()[0];
    return res.render("Form", {
      errorMessage: firstError ? firstError.msg : "Unknown validation error",
    });
  }
  next();
};

export default ValidationMiddelWare;
