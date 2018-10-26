

const request = require('superagent');
// const HOST = 'https://alchemy-night-out.herokuapp.com';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImtleXdvcmRzIjpbImNoZWFwIl0sIl9pZCI6IjViZDM0NWVhZWQzMGI2MDAxNWJkZmM3NSIsIm5hbWUiOiJSeWFuIiwiZW1haWwiOiJyeWFuQG1haWwuY29tIiwiemlwY29kZSI6Ijk3MjAyIn0sImlhdCI6MTU0MDU3NDkzMywiZXhwIjoxNTQwNzQ3NzMzfQ.H_wXjICwF1qYRGB1uDn5LVOGhQeHpNq9x6lWzIJgPyo';


const createEvening = () => {
    request.post(`${HOST}/api/evenings`)
        .send({ zipcode: 97209, keywords: ['cheap'] })
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
