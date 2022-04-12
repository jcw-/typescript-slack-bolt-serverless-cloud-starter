import { api, data } from "@serverless/cloud";

beforeAll(async () => {
  await data.seed("tests/data.json", false);
});

test("should return users", async () => {
  const { body } = await api.get("/users").invoke();

  expect(body).toHaveProperty("users");
  expect(body.users.length).toBeGreaterThan(0);
});
