const { GET } = require("../src/app/api/loggedWorkouts/[id]/route");
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
  