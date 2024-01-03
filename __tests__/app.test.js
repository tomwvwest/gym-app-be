const { getUsers, postUser } = require('../src/app/api/users/route')
const { fetchPosts } = require('../src/app/api/posts/route')
const seedDatabase = require('../seed/seed')

beforeEach(async () => {
    await seedDatabase() 
})

afterAll(async () => {
    prisma.$disconnect()
})

describe('/api/users', () => {
    test('returns a list of users', async () => {

        const response = await getUsers();
        expect(response.status).toBe(200)

        const users = await response.json()
        users.forEach((user) => {
            expect(user).toEqual({
                image_url: null,
                password: expect.any(String),
                user_id: expect.any(Number),
                username: expect.any(String)
            })
        })
    })
})

describe('post user', () => {
    test('returns status 201 with correct user object', async () => {
        const newUser = {username: 'newUser', password: 'password'};

        const response = await postUser(newUser)
        expect(response.status).toBe(201)

        const newResponse = await response.json()
        expect(newResponse.newUser).toEqual({
            user_id: 6,
            username: 'newUser',
            password: 'password',
            image_url: null
        })
    })
})

describe('Gets all Posts', ()=>{
    test('200 - Gets all posts', async ()=>{
        const response = await fetchPosts();
        expect(response.status).toBe(200)

        const posts = await response.json()
            expect(posts).toHaveLength(2)
            posts.forEach(post => {
                expect(post).toMatchObject({
                    post_id: expect.any(Number),
                    likes: expect.any(Number),
                    session_name: expect.any(String),
                    description: expect.any(String),
                    session_id: expect.any(Number),
                    user_id: expect.any(Number)
                })
            })
        })
    })

// const { createMocks } = require('node-mocks-http')

// describe('/api/users', () => {
//     test('returns a list of users', async () => {
//         const {req, res} = createMocks({
//             method: 'GET',
//         })

//         const response = await getUsers()
//         expect(response.status).toBe(200)

//         const users = await response.json()
//         users.forEach((user) => {
//             expect(user).toEqual({
//                 image_url: null,
//                 password: expect.any(String),
//                 user_id: expect.any(Number),
//                 username: expect.any(String)
//             })
//         });
//     })
// })