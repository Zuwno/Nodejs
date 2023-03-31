import Joi from "joi";

const categorySchema = Joi.object(
    {
        name: Joi.string().required().messages({
            "string.empty": "Tên không được để trống",
            "any.required": 'Trường "Tên" là bắt buộc',
        })
    }
)
export default categorySchema;