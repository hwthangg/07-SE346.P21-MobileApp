import Chapter from "../models/chapter.model.js";
import Member from "../models/member.model.js";
import TransferLog from "../models/transfer_log.model.js";

const MemberController = () => {
  // Tạo đoàn viên mới
  const createMember = async (req, res) => {
    try {
      const inputMember = req.body;
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      // Kiểm tra mã số đoàn viên đã tồn tại
      const isExisting = await Member.findOne({ cardId: inputMember.cardId });

      if (isExisting) {
        return res.status(409).send({
          status: "error",
          message: "Member already exists",
        });
      }

      // Tạo và lưu đoàn viên mới
      const newMember = new Member({
        ...inputMember,
        chapterId,
      });

      await newMember.save();

      res.status(201).send({
        status: "success",
        message: "Creating member successfully",
        data: { member: newMember },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Lấy danh sách đoàn viên theo chapter từ cookie
  const getAllMembersWithFilter = async (req, res) => {
    try {
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      const inputFilter = { ...req.query, chapterId };
      const members = await Member.find(inputFilter);

      if (members.length === 0) {
        return res.status(404).send({
          status: "error",
          message: "No members found",
        });
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving members successfully",
        data: { members },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Lấy thông tin đoàn viên theo ID và chapterId
  const getMemberById = async (req, res) => {
    try {
      const { memberId } = req.params;
      const chapterId = req.cookies.chapterId;

      const member = await Member.findOne({ _id: memberId, chapterId });

      if (!member) {
        return res.status(404).send({
          status: "error",
          message: "Member not found in your chapter",
        });
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving member successfully",
        data: { member },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Cập nhật thông tin đoàn viên nếu thuộc chapter
  const updateMemberById = async (req, res) => {
    try {
      const inputMemberId = req.params.memberId;
      const inputUpdatingMember = req.body;
      const chapterId = req.cookies.chapterId;

      const currentMember = await Member.findOne({ _id: inputMemberId, chapterId });

      if (!currentMember) {
        return res.status(404).send({
          status: "error",
          message: "Member not found in your chapter",
        });
      }

      const isModifiedCardId = currentMember.cardId != inputUpdatingMember.cardId;

      if (isModifiedCardId) {
        const isCardIdTaken = await Member.findOne({
          cardId: inputUpdatingMember.cardId,
        });

        if (isCardIdTaken) {
          return res.status(409).send({
            status: "error",
            message: "Card ID is already used",
          });
        }
      }

      const updatedMember = await Member.findByIdAndUpdate(
        inputMemberId,
        inputUpdatingMember,
        { new: true }
      );

      res.status(200).send({
        status: "success",
        message: "Updating member successfully",
        data: { member: updatedMember },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Xóa mềm đoàn viên nếu thuộc chapter
  const deleteMemberById = async (req, res) => {
    try {
      const memberId = req.params.memberId;
      const chapterId = req.cookies.chapterId;

      const member = await Member.findOne({ _id: memberId, chapterId });

      if (!member) {
        return res.status(404).send({
          status: "error",
          message: "Member not found in your chapter",
        });
      }

      member.status = "deleted";
      await member.save();

      res.status(200).send({
        status: "success",
        message: "Deleting member successfully",
        data: { member: member },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  const requestTransfer = async(req,res)=>{
    try {
      const inputMemberId = req.params.memberId
      const inputChapterId = req.params.chapterId

      const member = await Member.findById(inputMemberId)
      if(!member){
        return res.status(404).send({
          status: "error",
          message: "Member not found",
        });
      }

      const chapter = await Chapter.findById(inputChapterId)
      if(!chapter){
        return res.status(404).send({
          status: "error",
          message: "Chapter not found",
        });
      }

      const request = await new TransferLog({memberId: member._id, chapterId:chapter._id}).save()
      console.log(request)
      res.status(201).send({
        status: "success",
        message: "Requesting successfully",
        data: { log: request },
      });
      

    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  }

  const acceptTransfer = async(req,res)=>{
    try {
      const inputMemberId = req.params.memberId

      const log = await TransferLog.findOne({memberId: inputMemberId, status: "pending"})
      log.status = "accepted"
      log.save()

      const member = await Member.findById(inputMemberId)
      member.chapterId = log.chapterId
      member.save()

      res.status(200).send({ status: "success",
        message: "Accepting member successfully",
        data: { member: member },
      })
      
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  }


  return {
    createMember,
    getAllMembersWithFilter,
    getMemberById,
    updateMemberById,
    deleteMemberById, requestTransfer, acceptTransfer
  };
};

export default MemberController();
