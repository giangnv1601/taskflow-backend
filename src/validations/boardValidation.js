import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom messages ở phía BE làm gì vì để cho FE tự validation và custom messages phía FE cho đẹp
   * BE chỉ cần validate đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được.
   * Quan trọng: Việc Validation dữ liệu BẮT BUỘC phải có ở phía BE vì đây là điểm cuối để lưu trữ dữ liệu vào Database.
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validation dữ liệu ở cả BE và FE nhé.
   */
  const correctCodition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (NVG)',
      'string.empty': 'Title is not allowed to be empty (NVG)',
      'string.min': 'Title must be at least 3 characters long (NVG)',
      'string.max': 'Title length must be less than or equal to 50 characters long (NVG)',
      'string.trim': 'Title must not have leading or trailing whitespace (NVG)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict()
  })

  try {
    console.log('req.body: ', req.body)
    // Chỉ đinh abortEarly: false để trường hợp có nhiều lỗi validatiohn thì trả về tất cả lỗi
    await correctCodition.validateAsync(req.body, { abortEarly: false })
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board' })
    // next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}