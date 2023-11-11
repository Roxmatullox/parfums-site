import axios from "axios";

const request = axios.create({
  baseURL:"https://ap-vodiy-parfum-backend.up.railway.app/api/v1",
  timeout:10000,
  headers:{ Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2Q2NGM0ZDdhNGM1MTAzYzFmZTM2YiIsImlhdCI6MTY5OTYxMTcwNCwiZXhwIjoxNjk5Njk4MTA0fQ.SX_HSJ30pTM_jxYimedkC3OtxQsY3stdSCGMmfGxLPA`}
})

export default request