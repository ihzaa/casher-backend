import { body } from "express-validator";
import product from '../../../models/Product.js';

const store = [
    body("title").notEmpty().withMessage('is required.')
        .custom(async (value) => {
            const isExist = await product.find({
                title: value
            }).count();
            if (isExist > 0) {
                return Promise.reject('is already exist!')
            }
        }),
    body("price").notEmpty().withMessage('is required.').isNumeric(),
    body("thumbnail").notEmpty().withMessage('is required.'),
    body("categoryId").notEmpty().withMessage('is required.'),
];

export default { store, }
