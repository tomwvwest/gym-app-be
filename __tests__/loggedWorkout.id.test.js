const { GET, DELETE } = require("../src/app/api/loggedWorkouts/[id]/route");
const { createRequest, createResponse } = require('node-mocks-http');


describe("GET api/exercises", () => {
    test("returns a list of sessions", async () => {
        const req = createRequest({
            method: "GET",
            params: {
                id: 1
            }
        })
        
        const res = await GET(req)
        expect(res.status).toBe(200)
    
    });
  });
  
//   describe('DELETE /api/workouts/:id', () => {
//     test('DELETE:204 deletes an exercise and sends no body back', async () => {
//         // const req = createRequest({
//         //     method: "DELETE",
//         //     params: {
//         //         session_id: 1
//         //     }
//         // });

//         const response = await DELETE(1);
//         expect(response.status).toBe(200);
//     })

// })