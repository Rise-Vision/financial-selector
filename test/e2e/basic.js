const assert = require("assert");

describe("Basic functionality", ()=>{
  it("should have the right title", ()=>{
    browser.url("/");
    var title = browser.getTitle();
    assert.equal(title, "Rise Vision - Financial Selector");
  });
});
