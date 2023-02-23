import { body } from "express-validator";

const store = [
    body("title").notEmpty().withMessage('is required.'),
];

export default { store,  }
