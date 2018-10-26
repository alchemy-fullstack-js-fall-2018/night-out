

const request = require('superagent');
const HOST = 'https://alchemy-night-out.herokuapp.com/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImtleXdvcmRzIjpbXSwiX2lkIjoiNWJkMGIxODFmZTQ4ZmEwMDE1MjdiMjdjIiwiaW5pdGlhbFByZWZlcmVuY2VzIjpbInJlc3RhdXJhbnQiXSwibmFtZSI6InJ5YW4iLCJlbWFpbCI6InJ5YW5AbWFpbGluYXRvci5jb20iLCJ6aXBjb2RlIjoiOTcyMjkifSwiaWF0IjoxNTQwNTIxMjUxLCJleHAiOjE1NDA1MjQ4NTF9.l8nJ9ya6t7puVICUd2RekDwsKhLD6fC7wIjmnMpsQq0';


const createEvening = () => {
    request.post(`${HOST}/api/evenings`)
        .send({ zipcode: 97209 })
        .set('Authorization', `Bearer ${token}`)
        .then(res =>  res.body._id)
        .then(id => {
            return request.put(`${HOST}/api/evenings/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ rating: 'liked' });
        })
        .then(res => console.log(res.body._id));
};
Promise.all(Array.apply(null, { length: 20 }).map(createEvening));
