import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Inside');
    return axios.create({
        headers: {
            Authorization: token
        }
    });
};