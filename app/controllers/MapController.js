/**
 * Map controller 
*/

sampleApp.controller('MapController', function($rootScope,$scope,sampleAppLib,$filter,userList,$stateParams) {    
    // Following method uses the json object set in rootscope. This can also be achieved by creating service and then calling service functions to read data from server instead of rootscope
    // In actual implementation application should fetch data from API
    userID = $stateParams.id;
    if(userID){        
        $scope.userData = $filter("filter")( $rootScope.userDataSet , {id:parseInt(userID)},true)[0];    
    }
    
    // Map Object initialization and call to view user's location
    var mapObj;
    $scope.$on('mapInitialized', function(event, map) {
        //Basic configuration        
        mapObj = map;
        mapObj.setZoom(8); // Zoom level        
        mapObj.setCenter(new google.maps.LatLng($scope.userData.address.latitude, $scope.userData.address.longitude));
        marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.userData.address.latitude, $scope.userData.address.longitude),
            map: map
        });
    });    
});