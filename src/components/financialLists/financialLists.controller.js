class FinancialListsController {
  constructor() {
    this.name = "financialLists";
  }

  addList() {
    console.log("adding " + this.newListName);
  }

  cancel() {
    this.showAddList = false;
    this.newListName = "";
  }
}

export default FinancialListsController;
