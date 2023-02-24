import ProductController from "../../controllers/api/ProductController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import ProductValidator from "../../middlewares/validators/api/product.js";
import paginateResult from "../../middlewares/paginateResult.js";
import category from '../../models/Category.js';

const baseRoute = "/api/products";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        paginateResult(category, { select: "_id title status createdAt" }));

    // STORE
    app.post(baseRoute + "/",
        ProductValidator.store,
        returnOnError,
        ProductController.store);


};
