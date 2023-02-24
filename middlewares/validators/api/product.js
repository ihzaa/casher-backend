import { body } from "express-validator";

const store = [
    body("title").notEmpty().withMessage('is required.'),
    body("price").notEmpty().withMessage('is required.').isNumeric(),
    body("thumbnail").notEmpty().withMessage('is required.'),
    body("categoryId").notEmpty().withMessage('is required.'),
];

export default { store, }
