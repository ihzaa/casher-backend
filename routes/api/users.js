import UserController from "../../controllers/api/ProductController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import ProductValidator from "../../middlewares/validators/api/product.js";
import paginateResult from "../../middlewares/paginateResult.js";
import user from '../../models/User.js';

const baseRoute = "/api/users";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        (req, res, next) => {
            let search = req.query.search;
            let where = [];
            if (search) {
                let select = 'full_name email role'.split(" ");
                select.forEach(s => {
                    let obj = {};
                    obj[s] = { '$regex': search }
                    where.push(obj);
                });
            }
            req.where = where;
            next();
        },
        paginateResult(user, {
            select: '_id full_name email role',
        }));
    // app.get(baseRoute + "/",
    //     ProductController.index);

    // STORE
    // app.post(baseRoute + "/",
    //     ProductValidator.store,
    //     returnOnError,
    //     UserController.store);


};
