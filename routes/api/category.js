import CategoryController from "../../controllers/api/CategoryController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import CategoryValidator from "../../middlewares/validators/api/category.js";
import paginateResult from "../../middlewares/paginateResult.js";
import category from '../../models/Category.js';

const baseRoute = "/api/categories";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        paginateResult(category, { select: "_id title status createdAt" }));

    // STORE
    app.post(baseRoute + "/",
        CategoryValidator.store,
        returnOnError,
        CategoryController.store);


};
