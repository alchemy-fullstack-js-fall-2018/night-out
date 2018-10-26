

const request = require('superagent');
const HOST = 'http://localhost:7980';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImtleXdvcmRzIjpbXSwiX2lkIjoiNWJkMjcwNjk0NzQ2MDRmMGZkYTM2NjY1IiwibmFtZSI6Ik1hY2siLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ6aXBjb2RlIjoiOTcyMDkifSwiaWF0IjoxNTQwNTE4MDQwLCJleHAiOjE1NDA1MjE2NDB9.K5or-7O_sSlzVSWf82nhsp7BjNR6bmOamLpE7apeXFM';


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
