import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tại một đối tượng taskflowDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let taskflowDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để kết nối với MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: Cái serverApi có từ phiên bản MongoDB 5.0 trở lên, có thể không cần dùng nó, còn nếu dùng nó là chúng ta sẽ chỉ định một cái Stable API version của MongoDB
  // Đọc thêm ở đây: https://www.mongodb.com/docs/manual/reference/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đẫ được khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì chúng ta lấy ra Database theo tên và gán ngược nó lại vào biến taskflowDatabaseInstance ở trên của chúng ta
  taskflowDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Function GET_DB (không async) này có nhiệm vụ export ra cái Taskflow Database Instance sau khi đã connect thành công tới MongoDB để chugns ta sử dụng ở nhiều nơi khác nhau trong code.
// Lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB sau khi kết nối thành công với MongoDB
export const GET_DB = () => {
  if (!taskflowDatabaseInstance) {
    throw new Error('Must connect to database first!')
  }
  return taskflowDatabaseInstance
}

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
  taskflowDatabaseInstance = null
}
