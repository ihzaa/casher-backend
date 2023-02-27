import product from '../../models/Product.js';

async function index(req, res) {
    try {
        let data = await product.find({});
        res.json({
            status: true,
            data
        });
    } catch (err) {
        res.status(err.code ?? 500).json({
            status: false,
            message: err.message,
        });
    }

}

async function store(req, res) {
    try {
        const { title, price, thumbnail, categoryId } = req.body;
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

export default { store, index }