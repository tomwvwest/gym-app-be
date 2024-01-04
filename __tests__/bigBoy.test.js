const { deletePostsById, patchPostById, fetchCommentsByPostId } = require("../src/app/api/posts/[id]/route");
const { postComment } = require("../src/app/api/comments/route");
const seedDatabase = require("../seed/seed");

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