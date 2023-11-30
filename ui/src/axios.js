import a from 'axios';

export const axios = a.create({
    baseURL: 'http://localhost:9000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});