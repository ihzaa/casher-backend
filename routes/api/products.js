import ProductController from "../../controllers/api/ProductController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import ProductValidator from "../../middlewares/validators/api/product.js";
import paginateResult from "../../middlewares/paginateResult.js";
import category from '../../models/Category.js';
import validateToken from '../../middlewares/JWTAuthMiddleware.js';
import validateRole from '../../middlewares/roleMiddleware.js';

const baseRoute = "/api/products";

export default function (app) {
    // GET
    // app.get(baseRoute + "/",
    //     paginateResult(category, { select: "_id title status createdAt" }));
    app.get(baseRoute + "/",
        validateToken,
        validateRole(['admin', 'casher', 'employee']),
        ProductController.index);

    // STORE
    app.post(baseRoute + "/",
        validateToken,
        validateRole(['admin', 'casher', 'employee']),
        ProductValidator.store,
        returnOnError,
        ProductController.store);


};
