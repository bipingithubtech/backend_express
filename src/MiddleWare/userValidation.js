import { body, validationResult } from "express-validator";

const uservalidation = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name field is required"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a strong password with at least 5 characters"),
  ];

  // Await all the validation rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  const result = validationResult(req);

  if (!result.isEmpty()) {
    const firstError = result.array()[0];
    return res.render("registration", {
      errorMessage: firstError ? firstError.msg : "Unknown validation error",
    });
  }

  next();
};

export default uservalidation;
