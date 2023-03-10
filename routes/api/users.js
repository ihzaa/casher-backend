import UserController from "../../controllers/api/ProductController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import ProductValidator from "../../middlewares/validators/api/product.js";
import paginateResult from "../../middlewares/paginateResult.js";
import user from '../../models/User.js';

const baseRoute = "/api/users";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        paginateResult(user));
    // app.get(baseRoute + "/",
    //     ProductController.index);

    // STORE
    // app.post(baseRoute + "/",
    //     ProductValidator.store,
    //     returnOnError,
    //     UserController.store);


};
