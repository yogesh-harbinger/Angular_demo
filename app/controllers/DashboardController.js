/**
 * Dashboard controller 
*/

sampleApp.controller('DashboardController', function($rootScope,$scope,sampleAppLib,UserService,$resource) {    
    // Fetch data from resource created to get all user's data
    UserService.query().$promise.then(function(userListResponse) {
        //Data set contains all user's information
        $scope.userDataSet = userListResponse;
    });
});