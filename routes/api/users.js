import UserController from "../../controllers/api/UserController.js";
import returnOnError from "../../middlewares/validators/api/apiValidation.js";
import paginateResult from "../../middlewares/paginateResult.js";
import user from '../../models/User.js';
import userValidation from '../../middlewares/validators/api/users.js';
import findOrFail from '../../middlewares/findOrFail.js'
import validateToken from '../../middlewares/JWTAuthMiddleware.js';

const baseRoute = "/api/users";

export default function (app) {
    // GET
    app.get(baseRoute + "/",
        validateToken,
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

    app.put(
        baseRoute + '/:id',
        userValidation.update,
        returnOnError,
        UserController.update
    );

    app.get(
        baseRoute + '/:id',
        findOrFail(user, {
            select: '_id full_name email role status',
        }),
        UserController.show
    );

    app.delete(
        baseRoute + '/:id',
        findOrFail(user, {
            select: '_id',
        }),
        UserController.destroy
    );
};
