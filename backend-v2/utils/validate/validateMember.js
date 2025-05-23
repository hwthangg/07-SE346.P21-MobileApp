import { Member, Chapter } from "../../models/index.js";

export const validateMember = async (input, isUpdate = false, memberId = null) => {
  if (!input.cardId) return true; // Bỏ qua nếu không có cardId

  const existingMember = await Member.findOne({ cardId: input.cardId });
  const member = await Member.findById(memberId)
  console.log(member, '12099999999912', memberId.toString())
  
  // Nếu tìm thấy member có cardId trùng
  if (existingMember) {
    // Trường hợp tạo mới => Lỗi
    if (!isUpdate) return false;
    
    // Trường hợp cập nhật nhưng khác ID => Lỗi
    if (existingMember._id.toString() !== memberId?.toString()) {
      console.log('Conflict detected:', {
        existingId: existingMember._id.toString(),
        currentId: memberId?.toString()
      });
      return false;
    }
  }
  
  return true;
};
