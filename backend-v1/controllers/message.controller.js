import Message from "../models/message.model.js";


const MessageController = ()=>{

  const getConversation = async(req, res) =>{

    const ownerId = req.params.chapterId
    const messages = await Message.find({
      $or: [
        { sender: ownerId},
        {receiver: ownerId}
      ]
    }).sort({ createdAt: -1 }); // sắp xếp theo thời gian gửi

    res.json(messages)
  }

  const getMessages = async(req, res) =>{
    console.log(req.params.chapterId, req.cookies.chapterId)
    let messages = []
    if(req.params.chapterId != req.cookies.chapterId){
    messages = await Message.find({members: { $all: [req.params.chapterId, req.cookies.chapterId] }
     
    }) }; // sắp xếp theo thời gian gửi

    res.json(messages)
  }


  return {getConversation, getMessages}

  
}

export default MessageController()