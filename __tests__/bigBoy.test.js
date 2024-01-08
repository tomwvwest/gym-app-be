const { deletePostsById, patchPostById, fetchCommentsByPostId } = require("../src/app/api/posts/[id]/route");
const { deleteCommentById, } = require("../src/app/api/comments/[id]/route");
const { fetchUserById } = require("../src/app/api/users/[id]/route");
const { loginUser, fetchUserByUsername, patchUserByName } = require("../src/app/api/users/route");
const { postComment } = require("../src/app/api/comments/route");
const seedDatabase = require("../seed/seed");
const {postUser } = require("../src/app/api/users/route");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("Delete a Jimmy", () => {
  test("204 - Deletes a jimmy and returns nothing", async () => {
    const response = await deletePostsById(1);
    expect(response.status).toBe(200);

    const deletePost = await response.json();
    expect(deletePost).toEqual({});
  });

  test("400 - Incorrect Data Type", async () => {
    const response = await deletePostsById("Banana");
    expect(response.status).toBe(400);

    const err = await response.json();
    expect(err).toBe("Incorrect Data Type");
  });

  test("404 - No Post Found", async () => {
    const response = await deletePostsById(99);
    expect(response.status).toBe(404);

    const err = await response.json();
    expect(err).toBe("No posts found");
  });
});

describe('Patching a post By Id', ()=>{
    test('200 - Patches Post and return updated post', async ()=>{
        const response = await patchPostById(1)
        expect(response.status).toBe(200)

        const post = await response.json()
        expect(post.posts).toMatchObject({
            post_id: 1,
            likes: 4,
            session_name: 'afternoon pump baby!!',
            description: 'feeling huge now',
            session_id: 1,
            user_id: 1
        })
    })

    test('400 - Incorrect Data Type', async ()=>{
        const response = await patchPostById("Banana");
        expect(response.status).toBe(400);

        const err = await response.json();
        expect(err).toBe('Incorrect Data Type');
    })

    test('404 - Post not found', async ()=>{
        const response = await patchPostById(99);
        expect(response.status).toBe(404);

        const err = await response.json();
        expect(err).toBe('No posts found');
    })
})

describe('Get comments by post', ()=>{
    test('200 - Gets all comments by post', async ()=>{
        const response = await fetchCommentsByPostId(2)
        expect(response.status).toBe(200)

        const comments = await response.json()
        expect(comments).toHaveLength(1)
        comments.forEach(comment => {
            expect(comment).toMatchObject({
                post_id: 2,
                user_id: 1,
                comment_id: 1,
                body: 'wtf is wrong with you'
            })
        })
    })
    test('400 - Incorrect Data Type', async ()=>{
        const response = await fetchCommentsByPostId("Banana");
        expect(response.status).toBe(400);

        const err = await response.json();
        expect(err).toBe('Incorrect Data Type');
    })

    test('404 - Post not found', async ()=>{
        const response = await fetchCommentsByPostId(99);
        expect(response.status).toBe(404);

        const err = await response.json();
        expect(err).toBe('No posts found');
    })

    test('200 - No Comments with post', async ()=>{
        const response = await fetchCommentsByPostId(1);
        expect(response.status).toBe(200);

        const comments = await response.json()
        expect(comments).toHaveLength(0)
        expect(comments).toEqual([])
    })
})

describe('Posting a new Comment', ()=>{
    test('201 - Create new comment returns the new comment', async ()=>{
        const postData = {user_id: 1, post_id: 1, body: "hello"}
        const response = await postComment(postData)
        expect(response.status).toBe(201)

        const comments = await response.json()
            expect(comments).toMatchObject({
                post_id: 1,
                user_id: 1,
                comment_id: 2,
                body: 'hello'
            })
    })
    test('400 - Missing Data', async ()=>{
        const postData = {user_id: 1, body: "hello"}
        const response = await postComment(postData);
        expect(response.status).toBe(400);

        const err = await response.json();
        expect(err).toBe('Missing Data');
    })
    test('400 - Incorrect Data Type', async ()=>{
        const postData = {user_id: 1, post_id: 1, body: 1}
        const response = await postComment(postData);
        expect(response.status).toBe(400);

        const err = await response.json();
        expect(err).toBe('Incorrect Data Type');
    })
    test('404 - No user found', async ()=>{
        const postData = {user_id: 99, post_id: 1, body: "Hello"}
        const response = await postComment(postData);
        expect(response.status).toBe(404);

        const err = await response.json();
        expect(err).toBe('No users found');
    })
    test('404 - No post found', async ()=>{
        const postData = {user_id: 1, post_id: 99, body: "Hello"}
        const response = await postComment(postData);
        expect(response.status).toBe(404);

        const err = await response.json();
        expect(err).toBe('No posts found');
    })
})

describe('Deleting Comment By Id', ()=>{
    test('200 - deletes and returns with and empty object', async()=>{
            const response = await deleteCommentById(1)
            expect(response.status).toBe(200)
    
            const comments = await response.json()
            expect(comments).toEqual({})
    })
    test('400 - Incorrect Data Type ID', async ()=>{
        const response = await deleteCommentById("String")
            expect(response.status).toBe(400)
    
            const comments = await response.json()
            expect(comments).toBe('Incorrect Data Type')
    })

    test('404 - No comment found', async ()=>{
        const response = await deleteCommentById(99)
        expect(response.status).toBe(404)

        const comments = await response.json()
        expect(comments).toBe('No comments found')
    })
})

describe('Logging in a user', ()=>{
    test('200 - Logs in user', async ()=>{
        const loginData = {
            username: 'willprice',
            password: 'welovetom'
        }
        const response = await loginUser(loginData);
        expect(response.status).toBe(200)

        const users = await response.json()
        expect(users).toMatchObject({
            user_id: 4,
            username: 'willprice',
            password: 'welovetom',
            image_url: null
        })
    })
    test('404 - Incorrect Password', async ()=>{
        const loginData = {
            username: 'willprice',
            password: 'google'
        }
        const response = await loginUser(loginData);
        expect(response.status).toBe(404)

        const err = await response.json()
        expect(err).toBe('Incorrect Password')
    })

    test('404 - Incorrect Username', async ()=>{
        const loginData = {
            username: 'willprice1',
            password: 'google'
        }
        const response = await loginUser(loginData);
        expect(response.status).toBe(404)

        const err = await response.json()
        expect(err).toBe('Incorrect Username')
    })
    test('400 - Incorrect Data Type', async ()=>{
        const loginData = {
            username: 1,
            password: 1
        }
        const response = await loginUser(loginData);
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Incorrect Data Type')
    })
    test('400 - Missing Data', async ()=>{
        const loginData = {
            username: 1,
        }
        const response = await loginUser(loginData);
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Missing Data')
    })
})

describe('Gets a user by username', ()=>{
    test("200 - Gets users", async ()=>{
        const response = await fetchUserByUsername('willprice')
        expect(response.status).toBe(200)

        const users = await response.json()
        expect(users).toMatchObject({
            user_id: 4,
            username: 'willprice',
            password: 'welovetom',
            image_url: null
        })
    })
    test('400 - Incorrect Data type', async ()=>{
        const response = await fetchUserByUsername(1)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Incorrect Data Type')
    })
    test('404 - No user found', async ()=>{
        const response = await fetchUserByUsername('bigBoy')
        expect(response.status).toBe(404)

        const err = await response.json()
        expect(err).toBe('No users found')
    })
})

describe('Patch a user', ()=>{
    test('200 - Patches a user', async()=>{
        const patchData = {password: 'ihatetom', image_url: 'https://example.com/images/willprice'}
        const response = await patchUserByName('willprice', patchData)
        expect(response.status).toBe(200)

        const users = await response.json()
        expect(users).toMatchObject({
            user_id: 4,
            username: 'willprice',
            password: 'ihatetom',
            image_url: 'https://example.com/images/willprice'
        })
    })
    test('400 - Missing Data', async()=>{
        const patchData = {}
        const response = await patchUserByName('willprice', patchData)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Missing Data')
    })
    test('400 - Incorrect Data Type', async()=>{
        const patchData = {password: 1, image_url: 1}
        const response = await patchUserByName('willprice', patchData)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Incorrect Data Type')
    })

    test('404 - No users found', async()=>{
        const patchData = {password: 'ihatetom', image_url: 'https://example.com/images/willprice'}
        const response = await patchUserByName('scodia619', patchData)
        expect(response.status).toBe(404)

        const err = await response.json()
        expect(err).toBe('No users found')
    })
})

describe('Gets user by id', ()=>{
    test('200 - Gets user by id', async ()=>{
        const response = await fetchUserById(1)
        expect(response.status).toBe(200)
        const users = await response.json()
        expect(users).toMatchObject({
            user_id: 1,
            username: 'jacobgarner',
            password: 'welovetom',
            image_url: null
        })
    })
})

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