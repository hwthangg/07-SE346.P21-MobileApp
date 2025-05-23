import { Account } from "../../models/index.js"

export const validateAccount = async (input, isUpdate = false, accountId = null) => {
  try {
    // 1. Kiểm tra email và phone là duy nhất (trừ trường hợp update chính nó)
    const emailFilter = { email: input.account.email };
    const phoneFilter = { phone: input.account.phone };
    
    if (isUpdate && accountId) {
      emailFilter._id = { $ne: accountId };
      phoneFilter._id = { $ne: accountId };
    }

    const existingAccount = await Account.findOne({
      $or: [emailFilter, phoneFilter],
    });

    if (existingAccount) {
      if (existingAccount.email === input.account.email) {
        console.log("Validation Error: Email đã tồn tại");
        return false;
      }
      if (existingAccount.phone === input.account.phone) {
        console.log("Validation Error: Số điện thoại đã tồn tại");
        return false;
      }
    }

    // 2. Kiểm tra logic theo role
    switch (input.account.role) {
      case "admin":
        if (input.member || input.manager) {
          console.log("Validation Error: Admin không được có infoMember hoặc managerOf");
          return false;
        }
        break;

      case "member":
        if (!input.member) {
          console.log("Validation Error: Member phải có infoMember");
          return false;
        }
        if (input.manager) {
          console.log("Validation Error: Member không được có managerOf");
          return false;
        }
        break;

      case "manager":
        if (!input.manager) {
          console.log("Validation Error: Manager phải có managerOf");
          return false;
        }
        if (input.member) {
          console.log("Validation Error: Manager không được có infoMember");
          return false;
        }
        break;

      default:
        console.log("Validation Error: Role không hợp lệ");
        return false;
    }

    // 3. Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.account.email)) {
      console.log("Validation Error: Email không hợp lệ");
      return false;
    }

    return true;
  } catch (error) {
    console.log("Validation Error:", error.message);
    return false;
  }
};

