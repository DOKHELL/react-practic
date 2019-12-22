import axios from 'axios';

export default axios.create({
    baseURL: 'https://engaged-code-186318.firebaseio.com/'
})