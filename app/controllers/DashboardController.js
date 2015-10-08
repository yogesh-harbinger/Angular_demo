/**
 * Dashboard controller 
*/

sampleApp.controller('DashboardController', function($rootScope,$scope,sampleAppLib,userList,$resource) {    
    // Fetch data from resource created to get all user's data
    userList.query().$promise.then(function(userListResponse) {
        //Data set contains all user's information
        $scope.userDataSet = userListResponse;
    });
});