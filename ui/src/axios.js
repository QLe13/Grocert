import a from 'axios';

export const axios = a.create({
    baseURL: 'http://localhost:9000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});