const uuid = require("../");
const isUuid = require("is-uuid");

const crypto = require("crypto");

// jest does not have crypto defined
// https://stackoverflow.com/a/52612372/2601552
Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});

describe("uuid", () => {
  it("returns valid v4 UUIDs", () => {
    let i;

    for (i = 0; i < 10; i++) {
      expect(isUuid.v4(uuid())).toBe(true);
    }
  });
});
