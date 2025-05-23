import { populate } from "dotenv";
import { Event, Chapter, Account, EventRegistration, Comment, EventFavorite, Member } from "../models/index.js";
import { response, verifyToken } from "../utils/index.js";

const EventController = () => {
  /**
   * Create new event
   * POST /events
   * Request body: { name, startedAt, location, requirement, description, tags, scope, images }
   */
  const createEvent = async (req, res) => {
    const logPrefix = "[EventController][createEvent]";
    console.log(`${logPrefix} Start with data:`, req.body, req.files);

    try {
      const input = req.body;
      
      const decode = verifyToken(req.cookies.token);
      const accountId = decode.id;
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;

      if(
        !input.name ||
        !input.startedAt ||
        !input.location ||
        !input.requirement ||
        !input.description ||
        !input.tags ||
        !input.scope
      ){
        return response(res, 409, "MISSING_EVENT_DATA");
      }

 // Check for duplicate docId within the same chapter
      const existingDoc = await Event.findOne({ 
        chapterId: chapterId,
        name: input.name,
        startedAt: input.startedAt
      });
      if (existingDoc) {
        console.warn(`${logPrefix} Event ${input.name} starts at ${input.startedAt} already exists in this chapter`);
        return response(res, 409, "EVENT_EXISTS");
      }

      const inputImages = req.files.map(file => file.path)
      console.log(inputImages)
      // Create new event
      const newEvent = new Event({
        chapterId: chapterId,
        name: input.name,
        startedAt: new Date(input.startedAt),
        location: input.location,
        requirement: input.requirement,
        description: input.description,
        tags: input.tags.trim().split(",") || [],
        scope: input.scope || 'chapter',
        images: inputImages
      });

      console.log(newEvent)
      const savedEvent = await newEvent.save();
      console.log(`${logPrefix} Event created successfully`, savedEvent._id);
      
      return response(res, 201, "EVENT_CREATED", savedEvent);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Get paginated events with chapter info
   * GET /events?page=1&limit=10&search=...&scope=...&status=...&sortBy=...&sortOrder=...
   */
  const getEventsInPage = async (req, res) => {
    const logPrefix = "[EventController][getEventsInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      // Get user's chapter info from token
      const decode = verifyToken(req.cookies.token);
      const accountId = decode.id;
      const account = await Account.findById(accountId).populate('infoMember');
      const userChapterId = account.role === 'member' ? account.infoMember?.chapterId : account.managerOf;

      const {
        page = 1,
        limit = 10,
        search = "",
        scope,
        sortBy = "startedAt",
        sortOrder = "asc",
      } = req.query;

      // Build filter to get:
      // 1. All public events (scope = 'public') OR
      // 2. Events from user's chapter (chapterId = userChapterId)
      const filter = {
        $or: [
          { scope: 'public' },
          { chapterId: userChapterId }
        ]
      };

      // Additional filters
      if (search) {
        filter.$and = [{
          $or: [
            { name: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ]
        }];
      }

      if (scope) filter.scope = scope;
      filter.status = 'active';

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
        populate: { path: 'chapterId', select: 'name' },
        lean: true
      };

      // Execute query
      const result = await Event.paginate(filter, options);
      console.log(`${logPrefix} Found ${result.docs.length} events`);

      return response(res, 200, "EVENTS_FETCHED", {
        events: result.docs,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit
        }
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Get event by ID with chapter info
   * GET /events/:eventId
   */
  const getEventById = async (req, res) => {
    const logPrefix = "[EventController][getEventById]";
    console.log(`${logPrefix} Request for event:`, req.params.eventId);

    try {
      const event = await Event.findById(req.params.eventId)
        .populate('chapterId', 'name affiliated');

      if (!event) {
        console.warn(`${logPrefix} Event not found`);
        return response(res, 404, "EVENT_NOT_FOUND");
      }

      console.log(`${logPrefix} Event found`);
      return response(res, 200, "EVENT_FETCHED", event);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Update event
   * PUT /events/:eventId
   */
  const updateEventById = async (req, res) => {
    const logPrefix = "[EventController][updateEventById]";
    console.log(`${logPrefix} Start update for:`, req.params.eventId, req.body);

    try {
      const input = req.body;
      const decode = verifyToken(req.cookies.token);
      const accountId = decode.id;
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;
      const eventId = req.params.eventId

      if(
        !input.name ||
        !input.startedAt ||
        !input.location ||
        !input.requirement ||
        !input.description ||
        !input.tags ||
        !input.scope
      ){
        return response(res, 409, "MISSING_EVENT_DATA");
      }

 // Check for duplicate docId within the same chapter
      const existingDoc = await Event.findOne({ 
        chapterId: chapterId,
        name: input.name,
        startedAt: input.startedAt
      });
      if (existingDoc && existingDoc._id.toString() != eventId.toString()) {
        console.warn(`${logPrefix} Event ${input.name} starts at ${input.startedAt} already exists in this chapter`);
        return response(res, 409, "EVENT_EXISTS");
      }

      const inputImages = req.files.map(file => file.path)
      console.log(inputImages)
      // Create new event
      const updatingEvent = new Event({
        chapterId: chapterId,
        name: input.name,
        startedAt: new Date(input.startedAt),
        location: input.location,
        requirement: input.requirement,
        description: input.description,
        tags: input.tags.trim().split(",") || [],
        scope: input.scope || 'chapter',
      });


      const currentEvent = await Event.findById(eventId)
      const allowedFields = ['name', 'startedAt', 'location', 'requirement', 'description', 'tags', 'scope']
for(const field of allowedFields){
  currentEvent[field] = updatingEvent[field]
}
      if(inputImages.length > 0){
        currentEvent.images = inputImages
      }

      const savedEvent = (await currentEvent.save());
      console.log(`${logPrefix} Event created successfully`, savedEvent._id);
      
      return response(res, 201, "EVENT_CREATED", savedEvent);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Change event status
   * PATCH /events/:eventId/status
   */
  const changeEventStatus = async (req, res) => {
    const logPrefix = "[EventController][changeEventStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { eventId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'cancelled'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find event
      const event = await Event.findById(eventId);
      if (!event) {
        console.warn(`${logPrefix} Event not found`);
        return response(res, 404, "EVENT_NOT_FOUND");
      }

      // Update status
      const previousStatus = event.status;
      event.status = status;
      await event.save();

      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: event.updatedAt
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Like an event
   * POST /events/:eventId/like
   */
  const likeEvent = async (req, res) => {
    const logPrefix = "[EventController][likeEvent]";
    console.log(`${logPrefix} Like event:`, req.params.eventId);
const decode = verifyToken(req.cookies.token);
      const accountId = decode.id;
    try {
      const event = await Event.findById(req.params.eventId)

      if (!event) {
        return response(res, 404, "EVENT_NOT_FOUND");
      }
      const existingFavor = await EventFavorite.findOne({accountId: accountId, eventId: event._id})
      if(!existingFavor){
const favorite = new EventFavorite({accountId: accountId, eventId: event._id})
      await favorite.save()

      event.likes += 1
      await event.save()
      }
      
      return response(res, 200, "EVENT_LIKED", {
        likes: event.likes
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

 const registerEvent = async (req, res) => {
  const logPrefix = "[EventController][registerEvent]";
  console.log(`${logPrefix} Start registration for event:`, req.params.eventId);

  try {
    // 1. Verify authentication and get account info
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    const account = await Account.findById(accountId).populate('infoMember');
    
    if (!account || account.role !== 'member') {
      return response(res, 403, "FORBIDDEN", { error: "Only members can register for events" });
    }

    // 2. Validate member has a chapter
    const userChapterId = account.infoMember?.chapterId;
    if (!userChapterId) {
      return response(res, 400, "NO_CHAPTER_ASSIGNED", { error: "Member is not assigned to any chapter" });
    }

    // 3. Check if event exists and belongs to same chapter
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return response(res, 404, "EVENT_NOT_FOUND");
    }

    if (event.chapterId.toString() !== userChapterId.toString() && event.scope !== 'public') {
      return response(res, 403, "FORBIDDEN", { error: "Event is not available for your chapter" });
    }

    // 4. Check if already registered
    const existingRegistration = await EventRegistration.findOne({
      eventId: req.params.eventId,
      memberId: accountId
    });

    if (existingRegistration) {
      return response(res, 409, "ALREADY_REGISTERED");
    }

    // 5. Create new registration
    const registration = new EventRegistration({
      eventId: req.params.eventId,
      memberId: accountId,
      chapterId: userChapterId,
      registeredAt: new Date() 
    });

    await registration.save();

    // 6. Update event participants count
    await Event.findByIdAndUpdate(req.params.eventId, {
      $inc: { participantsCount: 1 }
    });

    // 7. Return success response
    return response(res, 201, "REGISTRATION_SUCCESS", {
      registrationId: registration._id,
      eventId: registration.eventId,
      memberId: registration.memberId,
      registeredAt: registration.registeredAt
    });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    
    if (error.name === 'CastError') {
      return response(res, 400, "INVALID_ID_FORMAT");
    }
    
    return response(res, 500, "SERVER_ERROR");
  }
};

const getRegistrationsInPage = async (req, res) => {
    const logPrefix = "[RegistrationController][getRegistrationsInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            status,
            eventId,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build filter
        const filter = {};
        
        if (eventId) filter.eventId = eventId;
        if (status) filter.status = status;

        if (search) {
            filter.$or = [
                { 'memberId.fullname': { $regex: search, $options: "i" } },
                { 'memberId.email': { $regex: search, $options: "i" } }
            ];
        }

        // Pagination options
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
            populate:{path:'memberId'},
            lean: true
        };

        // Execute query
        const result = await EventRegistration.paginate(filter, options);
        console.log(`${logPrefix} Found ${result.docs.length} registrations`);

     
       const registrations = await Promise.all(
  result.docs.map(async (item) => {
    const registration = { _id: item._id, status: item.status };

    const account = await Account.findById(item.memberId);
    const infoMember = await Member.findById(account.infoMember).populate('chapterId', '_id name position');

          
          registration['memberName'] = account.fullname
          registration['memberAvatar'] = account.avatar
          registration['memberCardId'] = infoMember.cardId
          registration['memberPosition'] = infoMember.position
          registration['memberAvatar'] = account.avatar
          registration['memberChapter'] = infoMember.chapterId.name

          return registration
        }))
       console.log(registrations)
   

        return response(res, 200, "REGISTRATIONS_FETCHED", {
            registrations: registrations,
            pagination: {
                currentPage: result.page,
                totalPages: result.totalPages,
                totalItems: result.totalDocs,
                itemsPerPage: result.limit
            }
        });

    } catch (error) {
        console.error(`${logPrefix} Error:`, error);
        return response(res, 500, "SERVER_ERROR");
    }
};

const checkin = async (req, res) => {
  const logPrefix = "[RegistrationController][checkin]";
  console.log(`${logPrefix} Start with body:`, req.body);
  
  try {
    const { registerId } = req.params;
    
    // Validate input
    if (!registerId) {
      console.log(`${logPrefix} Missing registerId`);
      return response(res, 400, "MISSING_REGISTER_ID");
    }

    // Find and update registration
    const registration = await EventRegistration.findByIdAndUpdate(
      registerId,
      { status: 'attended' }, // Sử dụng 'attended' thay vì 'checkin' để phù hợp với enum trong schema
      { new: true } // Trả về document sau khi update
    ).populate('memberId', 'name email'); // Populate thông tin member nếu cần

    if (!registration) {
      console.log(`${logPrefix} Registration not found with id: ${registerId}`);
      return response(res, 404, "REGISTRATION_NOT_FOUND");
    }

    console.log(`${logPrefix} Successfully checked in registration:`, registration);
    return response(res, 200, "CHECKIN_SUCCESSFUL", { registration });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    
    // Xử lý lỗi cụ thể
    if (error.name === 'CastError') {
      return response(res, 400, "INVALID_REGISTER_ID_FORMAT");
    }
    
    return response(res, 500, "SERVER_ERROR");
  }
};

const postComment = async (req, res) => {
  const logPrefix = "[CommentController][postComment]";
  console.log(`${logPrefix} Start with body:`, req.body);
  
  try {
    const {comment } = req.body;
    const eventId = req.params.eventId
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;

    // Validate input
    if (!accountId || !eventId || !comment) {
      console.log(`${logPrefix} Missing required fields`);
      return response(res, 400, "MISSING_REQUIRED_FIELDS");
    }

    // Create new comment
    const newComment = await Comment.create({
      accountId,
      eventId,
      comment,
      status: 'waiting' // Mặc định theo schema
    });

    // Populate thông tin cần thiết
    const populatedComment = await Comment.findById(newComment._id)
      .populate('accountId', 'fullname')

    console.log(`${logPrefix} Comment created successfully`);
    return response(res, 201, "COMMENT_CREATED_SUCCESSFULLY", { comment: populatedComment });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    
    if (error.name === 'ValidationError') {
      return response(res, 400, "VALIDATION_ERROR", { error: error.message });
    }
    
    return response(res, 500, "SERVER_ERROR");
  }
};

const getComments = async (req, res) => {
  const logPrefix = "[CommentController][getComments]";
  console.log(`${logPrefix} Start with query:`, req.query);

  try {
    const { 
      status = 'active',
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const eventId = req.params.eventId
    
    // Validate input
    if (!eventId) {
      console.log(`${logPrefix} Missing eventId`);
      return response(res, 400, "MISSING_EVENT_ID");
    }

    // Build filter
    const filter = { eventId, status };
    console.log(filter)
    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
      populate: [
        { path: 'accountId', select: 'fullname' },
      
      ],
      lean: true
    };

    // Execute query
    const result = await Comment.paginate(filter, options);
    console.log(result.docs)
    console.log(`${logPrefix} Found ${result.docs.length} comments`);

    return response(res, 200, "COMMENTS_FETCHED_SUCCESSFULLY", {
      comments: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
        itemsPerPage: result.limit
      }
    });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    return response(res, 500, "SERVER_ERROR");
  }
};

const changeCommentStatus = async (req, res) => {
  const logPrefix = "[CommentController][changeCommentStatus]";
  console.log(`${logPrefix} Start with body:`, req.body);
  
  try {
    const { status } = req.body;
    const commentId = req.params.commentId

    // Validate input
    if (!commentId || !status) {
      console.log(`${logPrefix} Missing required fields`);
      return response(res, 400, "MISSING_REQUIRED_FIELDS");
    }

    if (!['active', 'banned', 'waiting'].includes(status)) {
      console.log(`${logPrefix} Invalid status`);
      return response(res, 400, "INVALID_STATUS_VALUE");
    }

    // Update comment status
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { status: status },
      { new: true }
    )
    .populate('accountId', 'fullname')


    if (!updatedComment) {
      console.log(`${logPrefix} Comment not found`);
      return response(res, 404, "COMMENT_NOT_FOUND");
    }

    console.log(`${logPrefix} Comment status updated successfully`);
    return response(res, 200, "COMMENT_STATUS_UPDATED", { comment: updatedComment });

  } catch (error) {
    console.error(`${logPrefix} Error:`, error);
    
    if (error.name === 'CastError') {
      return response(res, 400, "INVALID_COMMENT_ID_FORMAT");
    }
    
    return response(res, 500, "SERVER_ERROR");
  }
};

  return {
    createEvent,
    getEventsInPage,
    getEventById,
    updateEventById,
    changeEventStatus,
    likeEvent,
    registerEvent,
    getRegistrationsInPage,
    checkin,
     postComment,
     changeCommentStatus,
     getComments,
     changeEventStatus
  };
};

export default EventController();