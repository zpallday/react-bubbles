import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('inside');
    return axios.create({
        headers: {
            Authorzation: token
        }
    })
}