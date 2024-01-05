const { fetchPosts, postPost } = require('../src/app/api/posts/route')
const { getUsers, postUser } = require("../src/app/api/users/route");
const { fetchPostById } = require(`../src/app/api/posts/[id]/route`)
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("/api/users", () => {
  test("returns a list of users", async () => {
    const response = await getUsers();
    expect(response.status).toBe(200);

    const users = await response.json();
    users.forEach((user) => {
      expect(user).toEqual({
        image_url: null,
        password: expect.any(String),
        user_id: expect.any(Number),
        username: expect.any(String),
      });
    });
  });
});

describe.only("post user", () => {
  test.only("returns status 201 with correct user object", async () => {
    const newUser = { username: "newUser", password: "password" };

    const response = await postUser(newUser);
    expect(response.status).toBe(201);

    const newResponse = await response.json();
    expect(newResponse.newUser).toEqual({
      user_id: 6,
      username: "newUser",
      password: "sha1$bd5af880$1$c2d0672c920128ad489f907aed4debb4eb9a1f6b",
      image_url: null,
    });
  });
});

describe("Gets a post by id", () => {
  test("200 - Gets the correct Post", async () => {
    const response = await fetchPostById(1);
    expect(response.status).toBe(200);

    const posts = await response.json();
    expect(posts).toMatchObject({
      post_id: 1,
      likes: 3,
      session_name: "afternoon pump baby!!",
      description: "feeling huge now",
      session_id: 1,
      user_id: 1,
    });
  });
  test("400 - Incorrect data type for post id", async () => {
    const response = await fetchPostById("Banana")
    expect(response.status).toBe(400)

    const err = await response.json()
    expect(err).toBe('Incorrect Data Type')
  })
  test('400 - Post doesnt exists', async ()=>{
    const response = await fetchPostById(99)
    expect(response.status).toBe(400)

    const err = await response.json()
    expect(err).toBe('No posts found')
  })
});

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
