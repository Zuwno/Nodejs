
import Product from "../models/product";
import productSchema from "../schemas/product";






export const getAll = async (req, res) => {
    // const { data } = await axios.get("http://localhost:3002/products");
    const data = await Product.find();
    return res.json(data);
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3002/products/${id}`);
        const data = await Product.findOne({_id: id})
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
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
        const {error} = productSchema.validate(body)
        if(error)
        {
            return res.json(
                {
                    message: error.details[0].message,
                }
            );
        }

        // const { data } = await axios.post(`http://localhost:3002/products`, body);
        const data = await Product.create(body)
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
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
        const data = await Product.deleteOne({_id: id})
        return res.json({
            message: "Xóa sản phẩm thành công",
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
        const {error} = productSchema.validate(body)
        if ( error)
        {
            return res.json(
                {
                    message: error.details[0].message
                }
            )
        }
        // const { data } = await axios.patch(`http://localhost:3002/products/${req.params.id}`,body);
        const data = await product.updateOne({_id: id }, body, {new: true})
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
