import UserController from "../../controllers/api/UserController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import paginateResult from "../../middlewares/paginateResult.js";
import user from '../../models/User.js';
import userValidation from '../../middlewares/validators/api/users.js';

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

    app.post(
        baseRoute,
        userValidation.store,
        returnOnError,
        UserController.store
    );
};
