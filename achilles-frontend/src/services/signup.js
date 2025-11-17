import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/signup'

const signup = async credentials => {
    console.log(credentials)
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { signup }