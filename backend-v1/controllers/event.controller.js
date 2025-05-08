import Event from "../models/event.model.js";
import Favorite from "../models/favorite.model.js";
import Member from "../models/member.model.js";
import Participation from "../models/participation.model.js";

const EventController = () => {
  // Tạo sự kiện mới
  const createEvent = async (req, res) => {
    try {
      const inputEvent = req.body;
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      const newEvent = new Event({
        ...inputEvent,
        chapterId,
      });

      await newEvent.save();

      res.status(201).send({
        status: "success",
        message: "Creating event successfully",
        data: { event: newEvent },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Lấy tất cả sự kiện theo chapter (và bộ lọc nếu có)
  const getAllEventsWithFilter = async (req, res) => {
    try {
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      const inputFilter = { ...req.query, chapterId };
      const events = await Event.find(inputFilter);

      if (events.length === 0) {
        return res.status(404).send({
          status: "error",
          message: "No events found",
        });
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving events successfully",
        data: { events },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Lấy chi tiết sự kiện theo ID
  const getEventById = async (req, res) => {
    try {
      const { eventId } = req.params;
      const chapterId = req.cookies.chapterId;

      const event = await Event.findOne({ _id: eventId, chapterId });

      if (!event) {
        return res.status(404).send({
          status: "error",
          message: "Event not found in your chapter",
        });
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving event successfully",
        data: { event },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Cập nhật sự kiện
  const updateEventById = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const chapterId = req.cookies.chapterId;
      const inputUpdatingEvent = req.body;

      const currentEvent = await Event.findOne({ _id: eventId, chapterId });

      if (!currentEvent) {
        return res.status(404).send({
          status: "error",
          message: "Event not found in your chapter",
        });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        inputUpdatingEvent,
        { new: true }
      );

      res.status(200).send({
        status: "success",
        message: "Updating event successfully",
        data: { event: updatedEvent },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // Xóa mềm sự kiện
  const deleteEventById = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const chapterId = req.cookies.chapterId;

      const event = await Event.findOne({ _id: eventId, chapterId });

      if (!event) {
        return res.status(404).send({
          status: "error",
          message: "Event not found in your chapter",
        });
      }

      event.status = "deleted";
      await event.save();

      res.status(200).send({
        status: "success",
        message: "Deleting event successfully",
        data: { event },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  const checkinEvent = async (req, res) => {
    try {
      const inputEventId = req.params.eventId;
      const inputMemberCardIdAndFullname = req.body;

      const member = await Member.findOne(inputMemberCardIdAndFullname);

      const log = await new Participation({
        memberId: member._id,
        eventId: inputEventId,
      }).save();

      res.status(200).send({
        status: "success",
        message: "Checkin event successfully",
        data: { log: log },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  const likeEvent = async (req, res) => {
    try {
      const chapterId = req.cookies.chapterId;
      const inputEventId = req.params.eventId;
      const event = await Event.findById(inputEventId);
      event.likes += 1;
      await event.save();

      const log = await new Favorite({
        chapterId: chapterId,
        eventId: inputEventId,
      }).save();

      res.status(200).send({
        status: "success",
        message: "Checkin event successfully",
        data: { log: log },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // 1. Tạo bình luận mới cho sự kiện
  const createComment = async (req, res) => {
    try {
      const { eventId } = req.params;
      const { content } = req.body; // Đặt default là 'activated'
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      const newComment = new Comment({
        chapterId,
        eventId,
        content,
      });

      await newComment.save();

      res.status(201).send({
        status: "success",
        message: "Comment added successfully",
        data: { comment: newComment },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // 2. Lấy tất cả bình luận của sự kiện
  const getCommentsByEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const chapterId = req.cookies.chapterId;

      if (!chapterId) {
        return res.status(400).send({
          status: "error",
          message: "Chapter ID not provided in cookies",
        });
      }

      const comments = await Comment.find({
        eventId,
        chapterId,
        status: "activated",
      }); // Lọc chỉ những bình luận activated

      if (comments.length === 0) {
        return res.status(404).send({
          status: "error",
          message: "No comments found for this event",
        });
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving comments successfully",
        data: { comments },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // 3. Cập nhật bình luận
  const updateCommentById = async (req, res) => {
    try {
      const { commentId } = req.params;
      const inputUpdatingComment = req.body;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).send({
          status: "error",
          message: "Comment not found",
        });
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        inputUpdatingComment,
        { new: true }
      );

      res.status(200).send({
        status: "success",
        message: "Updating comment successfully",
        data: { comment: updatedComment },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  // 4. Xóa bình luận
  const deleteCommentById = async (req, res) => {
    try {
      const { commentId } = req.params;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).send({
          status: "error",
          message: "Comment not found",
        });
      }

      comment.status = "deleted"; // Đổi trạng thái thành deleted
      await comment.save();

      res.status(200).send({
        status: "success",
        message: "Deleting comment successfully",
        data: { comment },
      });
    } catch (error) {
      console.log(`Error code: ${error.code}\nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };

  return {
    createEvent,
    getAllEventsWithFilter,
    getEventById,
    updateEventById,
    deleteEventById,
    checkinEvent,
    likeEvent,
    createComment,
    getCommentsByEvent,
    updateCommentById,
    deleteCommentById,
  };
};

export default EventController();
