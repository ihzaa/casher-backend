import category from '../../models/Category.js';

async function index(req, res) {
    try {
        let data = await category.find({});
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
        const { title } = req.body;
        let createdData = await category.create({ title });
        res.status(201).json({
            message: "Data Successfully Created!",
            status: true,
            data: {
                id: createdData.id,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }

}

export default { store, index }