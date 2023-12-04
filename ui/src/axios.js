import a from 'axios';

export const axios = a.create({
    baseURL: '/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});
