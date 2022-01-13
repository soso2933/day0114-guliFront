import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001',
  timeout: 12000 // 请求超时时间
})





export default service
