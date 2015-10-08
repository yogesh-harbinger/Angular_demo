/**
 * User controller
*/

sampleApp.controller('UserController', function($rootScope,$scope,sampleAppLib,$filter,UserService,$stateParams) {
    // Fetch data from resource
    // In real application application must fetch data using GET method and for specific r
    userID = $stateParams.id;
    if(userID){
        UserService.query().$promise.then(function(userListResponse) {
            // Use of angularJS filter functionality to get specific record
            $scope.userDataSet = $filter("filter")( userListResponse , {id:parseInt(userID)},true)[0];
            $scope.recordFound = true;            
            if(typeof $scope.userDataSet == 'undefined'){
                $scope.recordFound = false;
            }
        });
    }
});