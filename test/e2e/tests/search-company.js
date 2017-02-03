const e2eUserPath = "users/kO4s1ZzjRIP7JVhBSjQ3Etgszpm2",
  assert = require("assert"),
  testCompanyId = "a6397169-ad53-4163-9e08-da3e53f3a413",
  testDisplayName = "Test_E2E_Financial_Selector";

module.exports = () => {
  it( "should enable searching for a company", () => {
    browser.waitForVisible( "button=Add Display" )
    browser.waitForExist( "tbody td strong", 10000 );
    browser.waitForText( "tbody td strong", 10000 );

    browser.setValue("form.hidden-xs input[ng-model='$ctrl.displaySearchText']", testCompanyId);
    browser.click("form.hidden-xs i.fa-search");
    browser.waitForText( "tbody td strong", 10000 );
    assert.equal( browser.getText( `td strong` ), testDisplayName );
  } );
};
