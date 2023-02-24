import product from '../../models/Product.js';

async function store(req, res) {
    try {
        const { title, price, thumbnail, categoryId } = req.body;
        let isExist = await product.find({
            title
        }).count();
        if (isExist > 0) {
            throw { code: 422, message: 'Product is already exist!' }
        }
        let createdData = await product.create({
            title,
            price,
            thumbnail,
            categoryId
        });
        res.status(201).json({
            message: "Data Successfully Created!",
            status: true,
            data: {
                id: createdData.id,
            },
        });
    } catch (err) {
        res.status(err.code ?? 500).json({
            status: false,
            message: err.message,
        });
    }

}

export default { store }