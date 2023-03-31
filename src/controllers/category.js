
import Category from "../models/category";
import categorySchema from "../schemas/category";






export const getAll = async (req, res) => {
    // const { data } = await axios.get("http://localhost:3002/products");
    const data = await Category.find();
    return res.json(data);
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/products/${id}`);
        const data = await Category.findOne({_id: id})
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có danh mục",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        const {error} = categorySchema.validate(body)
        if(error)
        {
            return res.json(
                {
                    message: error.details.map((item) => item.message)
                }
            );
        }

        // const { data } = await axios.post(`http://localhost:3002/products`, body);
        const data = await Category.create(body)
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm danh mục thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        // await axios.delete(`http://localhost:3002/products/${req.params.id}`);
        const data = await Category.deleteOne({_id: id})
        return res.json({
            message: "Xóa danh mục thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id;
        const {error} = categorySchema.validate(body)
        if ( error)
        {
            return res.json(
                {
                    message: error.details[0].message
                }
            )
        }
        // const { data } = await axios.patch(`http://localhost:3002/products/${req.params.id}`,body);
        const data = await Category.updateOne({_id: id }, body, {new: true})
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật danh mục thất bại",
            });
        }
        return res.json({
            message: "Cập nhật danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
