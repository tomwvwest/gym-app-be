const { deletePostsById } = require("../src/app/api/posts/route");
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe('Delete a Jimmy', ()=>{
    test('204 - Deletes a jimmy and returns nothing', async ()=>{
      const response = await deletePostsById(1)
      expect(response.status).toBe(200)
  
      const deletePost = await response.json()
      expect(deletePost).toEqual({})
    })
  
    test('400 - Incorrect Data Type', async ()=>{
      const response = await deletePostsById("Banana")
      expect(response.status).toBe(400)
  
      const err = await response.json()
      expect(err).toBe('Incorrect Data Type')
    })
  
    test('404 - No Post Found', async ()=>{
      const response = await deletePostsById(99)
      expect(response.status).toBe(404)
  
      const err = await response.json()
      expect(err).toBe('No posts found')
    })
  })