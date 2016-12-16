const assert = require("assert"),
  path = require("path"),
  firebase = require("firebase-admin"),
  databaseURL = "https://fir-stage.firebaseio.com",
  serviceAccount = require(path.join(__dirname, "private-keys", "financial-selector", "financial-selector-stage-ee22d821c41a-service-account-e2e-tests.json")),
  jenkinsCreds = require(path.join(__dirname, "private-keys", "financial-selector", "jenkins-creds.json")),
  e2eDisplayPath = "/displays/e2e",
  e2eHelper = require("rv-common-e2e").helper;

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL
  });

xdescribe("Add List", function() {
  this.timeout(50000);

  it("should enable adding a list", ()=>{
    browser.url("/");

    browser.waitUntil(firebase.database().ref(e2eDisplayPath).remove().then(()=>true));

    browser.element("#google-signin").click();

    e2eHelper.googleSignIn(jenkinsCreds.email, jenkinsCreds.pass, "toronto");

    browser.url(e2eDisplayPath + "/financialLists");

    browser.waitForVisible("a=Add List") 
    browser.click("a=Add List");
    browser.waitForVisible("#add-list-input") 
    browser.element("#add-list-input").setValue("e2e-test-list");
    browser.click("#submit-add-list");
    browser.waitForVisible("a=Add List", 5000);
    browser.waitUntil(firebase.database().ref(e2eDisplayPath).once("value").then((snap)=>snap.hasChild("lists")));
  });
});
