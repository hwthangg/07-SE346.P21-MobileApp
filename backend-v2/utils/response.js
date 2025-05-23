/**
 * Hàm hỗ trợ gửi phản hồi (response) cho client theo chuẩn JSON
 * 
 * @param {object} res - Đối tượng response của Express
 * @param {number} status - Mã trạng thái HTTP (vd: 200, 400, 404, 500...)
 * @param {string} message - Thông điệp trả về cho client
 * @param {any} [data=null] - Dữ liệu bổ sung gửi kèm (nếu có)
 * 
 * @returns {object} Gửi về cho client một JSON với cấu trúc:
 * {
 *   success: true nếu status từ 200 đến 299, ngược lại false,
 *   message: thông điệp,
 *   data: dữ liệu bổ sung (nếu có)
 * }
 */
export const response = (res, status, message, data = null) => {
  return res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};
