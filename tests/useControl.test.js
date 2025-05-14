const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');
const Order = require('../src/models/orderModel');

describe('GET /users/:id/orders/count', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ name: 'John Doe', email: 'john@example.com', password: '123456' });
    });

    afterEach(async () => {
        await User.deleteMany({});
        await Order.deleteMany({});
    });

    it('count orders of user', async () => {
        await Order.create({ user: user._id, product: 'Product A', price: 100 });
        await Order.create({ user: user._id, product: 'Product B', price: 150 });

        const res = await request(app).get(`/users/${user._id}/orders/count`);
        expect(res.statusCode).toBe(200);
        expect(res.body.count).toBe(2);
    });

    it('0 orders ', async () => {
        const res = await request(app).get(`/users/${user._id}/orders/count`);
        expect(res.statusCode).toBe(200);
        expect(res.body.count).toBe(0);
    });

    it(' 404 ', async () => {
        const res = await request(app).get('/users/nonexistent-id/orders/count');
        expect(res.statusCode).toBe(404);
    });
});
