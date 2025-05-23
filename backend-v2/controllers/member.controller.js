import { Member, Chapter, Account } from "../models/index.js";
import { response, validateMember, verifyToken } from "../utils/index.js";

const MemberController = () => {
  /**
   * Lấy danh sách member phân trang
   * Endpoint: GET /members?page=1&limit=10&chapterId=...&position=...&status=...&search=...
   */
  const getMembersInPage = async (req, res) => {
    const logPrefix = "[MemberController][getMembersInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      const decode = verifyToken(req.cookies.token);
      const accountId = decode.id;
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;

      const {
        page = 1,
        limit = 10,
        position,
        status,
        search = "",
        sortBy = "_id",
        sortOrder = "desc",
      } = req.query;

      // Build filter
      const filter = {};
      filter.chapterId = chapterId;
      if (position) filter.position = position;
      if (status) filter.status = status;

      if (search) {
        filter.$or = [
          { address: { $regex: search, $options: "i" } },
          { hometown: { $regex: search, $options: "i" } },
          { ethnicity: { $regex: search, $options: "i" } },
          { religion: { $regex: search, $options: "i" } },
          { eduLevel: { $regex: search, $options: "i" } },
        ];
      }

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
        select: "_id",
        lean: true,
      };

      // Execute query
      const members = await Member.paginate(filter, options);
      console.log(members);

      const result = await Account.find({ infoMember: { $in: members.docs } })
        .populate("infoMember")
        .select("-password");

      return response(res, 200, "MEMBERS_FETCHED", {
        members: result,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit,
        },
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Lấy thông tin member bằng ID
   * Endpoint: GET /members/:memberId
   */
  const getMemberById = async (req, res) => {
    const logPrefix = "[MemberController][getMemberById]";
    console.log(`${logPrefix} Request for member:`, req.params.memberId);

    try {
      const member = await Member.findById(req.params.memberId).populate(
        "chapterId"
      );

      if (!member) {
        console.warn(`${logPrefix} Member not found`);
        return response(res, 404, "MEMBER_NOT_FOUND");
      }
      const account = await Account.findOne({ infoMember: member._id });
      console.log(`${logPrefix} Member found`);
      return response(res, 200, "MEMBER_FETCHED", { account, member });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const updateMemberById = async (req, res) => {
    const logPrefix = "[MemberController][updateMemberById]";
    console.log(`${logPrefix} Start update for:`, req.params.memberId);

    try {
      const { memberId } = req.params;
      const input = req.body.member;

      // Find and update member
      const currentMember = await Member.findById(memberId);
      if (!currentMember) {
        console.warn(`${logPrefix} Member not found`);
        return response(res, 404, "MEMBER_NOT_FOUND");
      }
      const existingMember = await Member.findOne({ cardId: input.cardId });
      if (
        existingMember &&
        existingMember._id.toString() != currentMember._id.toString()
      ) {
        console.warn(`${logPrefix} Validation failed: cardId has duplicated`);
        return response(res, 400, "INVALID_MEMBER_DATA");
      }

      const updatingMember = new Member({
        cardId: input.cardId,
        position: input.position,
        joinedAt: new Date(input.joinedAt),
        address: input.address,
        hometown: input.hometown,
        ethnicity: input.ethnicity,
        religion: input.religion,
        eduLevel: input.eduLevel,
      });

      // Apply updates
      const updateFields = [
        "cardId",
        "position",
        "joinedAt",
        "address",
        "hometown",
        "ethnicity",
        "religion",
        "eduLevel",
      ];

      updateFields.forEach((field) => {
        currentMember[field] = updatingMember[field];
      });

      await currentMember.save();
      console.log(`${logPrefix} Member updated successfully`);

      return response(res, 200, "MEMBER_UPDATED", currentMember);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Thay đổi trạng thái member
   * Endpoint: PATCH /members/:memberId/status
   */
  const changeMemberStatus = async (req, res) => {
    const logPrefix = "[MemberController][changeMemberStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { memberId } = req.params;
      const { status } = req.body;

      // Find member
      const member = await Member.findById(memberId);
      if (!member) {
        console.warn(`${logPrefix} Member not found`);
        return response(res, 404, "MEMBER_NOT_FOUND");
      }

      // Check if status changed
      if (member.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Update status
      const previousStatus = member.status;
      member.status = status;
      if (member.status == "unknow") {
        member.chapterId = null;
      }
      await member.save();

      console.log(
        `${logPrefix} Status changed from ${previousStatus} to ${status}`
      );
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === "CastError") {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    getMembersInPage,
    getMemberById,
    updateMemberById,
    changeMemberStatus,
  };
};

export default MemberController();
