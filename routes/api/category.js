import CategoryController from "../../controllers/api/CategoryController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import CategoryValidator from "../../middlewares/validators/api/category.js";

const baseRoute = "/api/category";

export default function (app) {
    app.post(baseRoute + "/",
        CategoryValidator.store,
        returnOnError,
        CategoryController.store);
};
