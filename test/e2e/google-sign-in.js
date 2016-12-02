const assert = require("assert"),
  path = require("path"),
  jenkinsCreds = require(path.join(__dirname, "private-keys", "financial-selector", "jenkins-creds.json"));

describe("Sign in", function() {
  this.timeout(50000);

  it("should allow sign in with google", ()=>{
    browser.url("/");
    let mainWindow = browser.windowHandles().value[0];
    let additionalChallengeButtonCount = 3;

    browser.element("#google-signin").click();
    browser.waitUntil(()=>browser.windowHandles().value.length === 2, 5000, "login window not present");
    browser.window(browser.windowHandles().value[1]);

    browser.waitForExist("#Email");
    browser.element("#Email").setValue(jenkinsCreds.email);
    browser.element("#next").click();

    browser.waitForVisible("#Passwd");
    browser.element("#Passwd").setValue(jenkinsCreds.pass)
    browser.element("#signIn").click();

    browser.waitUntil(()=>{
      if (browser.windowHandles().value.length === 1) {return true;}
      if (browser.elements("button").value.length === additionalChallengeButtonCount) {
        browser.elements("button").value[1].click();
        browser.element("#answer").setValue("toronto");
        browser.element("#submit").click();
      }
    }, 15000, "could not complete signin process");

    browser.window(mainWindow);
    browser.waitForExist("#add-display", 15000);
  });
});
