const { getUsers, postUser } = require('../src/app/api/users/route')
const { postPost } = require('../src/app/api/posts/route')
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

describe('Post a new Post', ()=>{
    test('201 - Creates a new Post', async ()=>{
        const newPost = {
            session_name: 'Friday JIMDay',
            description: 'Feeling the Friyay Burn',
            session_id: 1,
            user_id: 2
        }
        const response = await postPost(newPost)
        expect(response.status).toBe(201)

        const posts = await response.json()
        expect(posts).toMatchObject({
            post_id: 3,
            likes: 0,
            session_name: 'Friday JIMDay',
            description: 'Feeling the Friyay Burn',
            session_id: 1,
            user_id: 2
        })
    })
    test('400 - Missing Data', async () => {
        const newPost = {
            session_name: 'Friday JIMDay',
            description: 'Feeling the Friyay Burn',
            session_id: 1,
        }
        const response = await postPost(newPost)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Missing Data')
    })
    test('400 - Incorrect Data Type', async () => {
        const newPost = {
            session_name: 'Friday JIMDay',
            description: 'Feeling the Friyay Burn',
            session_id: 1,
            user_id: "Banana"
        }
        const response = await postPost(newPost)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Incorrect Data Type')
    })
    test('404 - User not found', async ()=>{
        const newPost = {
            session_name: 'Friday JIMDay',
            description: 'Feeling the Friyay Burn',
            session_id: 1,
            user_id: 6
        }
        const response = await postPost(newPost)
        expect(response.status).toBe(404)

        const err = await response.json()
        expect(err).toBe('User not found')
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