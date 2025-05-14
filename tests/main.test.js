jest.setTimeout(10000);
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../src/models/userModel');

let mongoServer;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

const createUser = async (userData) => {
    const res = await request(app).post('/users').send(userData);
    return res.body;
};
const loginUser = async (loginData) => {
    const res = await request(app).post('/users/login').send(loginData);
    return res.body.token;
};

describe('Full Authorization', () => {

    it('Create user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };
        const res = await createUser(userData);
        expect(res).toHaveProperty('_id');
    });

    it('Login take token', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };
        await createUser(userData);

        const token = await loginUser({
            email: 'john@example.com',
            password: '123456',
        });

        expect(token).toBeDefined();
    });

    it('Access to /profile with token', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: '123456',
        };
        await createUser(userData);
        const token = await loginUser({
            email: 'john@example.com',
            password: '123456',
        });

        const res = await request(app)
            .get('/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userId');
    });

    it('Без токена возвращает 401', async () => {
        const res = await request(app).get('/users/profile');
        expect(res.statusCode).toBe(401);
    });
});
