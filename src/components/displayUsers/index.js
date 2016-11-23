import angular from "angular";
import uiRouter from "angular-ui-router";
import displayManageUsersComponent from "./displayManageUsers.component"
import addUserComponent from "./addUser.component";
import editUserComponent from "./editUser.component";
import inviteSuccess from "./inviteSuccess.component";
import displayUsersService from "./displayUsers.service";

const displayUsersModule = angular.module( "display-users", [ uiRouter, ] )
  .config( ( $stateProvider ) => {
    "ngInject";

    $stateProvider.state( "manageDisplayUsers", {
      url: "/displays/:displayId/users",
      component: "displayManageUsers",
      abstract: false,
      resolve: {
        displayId: ( $stateParams ) => {
          "ngInject";
          return $stateParams.displayId
        }
      }
    } ).state( "manageDisplayUsers.addUser", {
      url: "/add",
      component: "displayManageUsers",
      onEnter: ( $stateParams, $state, $uibModal, $controller ) => {
        "ngInject";
        const { displayId } = $stateParams;

        $controller.modalInstance = $uibModal.open( {
          template: `<add-user display-id="${displayId}"></add-user>`,
          backdrop: "static",
        } )
      },
      onExit: ( $controller ) => {
        "ngInject";
        $controller.modalInstance.close();
      }
    } ).state( "manageDisplayUsers.editUser", {
      url: "/:inviteKey/edit",
      component: "displayManageUsers",
      onEnter: ( $stateParams, $state, $uibModal, $controller ) => {
        "ngInject";
        const { inviteKey } = $stateParams;

        $controller.modalInstance = $uibModal.open( {
          template: `<edit-user invite-key="${inviteKey}"></edit-user>`,
          backdrop: "static",
        } )
      },
      onExit: ( $controller ) => {
        "ngInject";
        $controller.modalInstance.close();
      }
    } ).state( "manageDisplayUsers.inviteSuccess", {
      url: "/:inviteKey/success",
      component: "displayManageUsers",
      onEnter: ( $stateParams, $state, $uibModal, $controller ) => {
        "ngInject";
        const { inviteKey } = $stateParams;

        $controller.modalInstance = $uibModal.open( {
          template: `<invite-success invite-key="${inviteKey}"></invite-success>`,
          backdrop: "static",
        } )
      },
      onExit: ( $controller ) => {
        "ngInject";
        $controller.modalInstance.close();
      }
    } );
  } )
  .component( "displayManageUsers", displayManageUsersComponent )
  .component( "addUser", addUserComponent )
  .component( "editUser", editUserComponent )
  .component( "inviteSuccess", inviteSuccess )
  .service( "displayUsersService", displayUsersService )
  .name;

export default displayUsersModule;
