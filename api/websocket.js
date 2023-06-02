import moment from "moment";
import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*"
  }
});

const userList = []

io.on("connect", (socket) => {

  const userId = socket.handshake.query.id
  if (!userId) return;

  const userInfo = userList.find(user => user.userId === userId)
  if (userInfo) {
    userInfo.id = socket.id
  } else {
    userList.push({
      id: socket.id,
      userId
    })
  }
  //online事件
  socket.emit("online", {
    userList
  })
  //send事件
  socket.on('send', ({ fromUserId, message, targetId }) => {
    const targetSocket = io.sockets.sockets.get(targetId)
    const toUser = userList.find(user => user.id === targetId)

    targetSocket.emit('receive', {
      fromUserId,
      toUserId: toUser.userId,
      message: message,
      sendTime: moment().format("YYYY-MM-DD")
    })
  })
});

io.on("disconnect", (socket) => {
  console.log("disconnect")
})
