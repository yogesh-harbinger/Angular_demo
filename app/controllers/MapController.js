/**
 * Map controller
*/

sampleApp.controller('MapController', function($rootScope,$scope,sampleAppLib,$filter,UserService,$stateParams) {
    // Map Object initialization
    var mapObj;
    $scope.recordFound = true;
    $scope.LatLongObj = undefined;
    $scope.$on('mapInitialized', function(event, map) {
        //Basic configuration
        mapObj = map;
        mapObj.setZoom(8); // Zoom level

    });

    userID = $stateParams.id;
    if(userID){
        UserService.query().$promise.then(function(userListResponse) {
            // Use of angularJS filter functionality to get specific record
            $scope.userData = $filter("filter")( userListResponse , {id:parseInt(userID)},true)[0];
                        
            if(typeof $scope.userData != 'undefined'){
                // As Address is auto-generated they are not valid so passing complete address may not give any latlong object so passing only country
                $scope.addressString = $scope.userData.address.street_address+',<br>'+$scope.userData.address.city+',<br>'+$scope.userData.address.region+',<br>'+$scope.userData.address.country;
                // Call getcoder to get latlong object for address
                geocoder = new google.maps.Geocoder();
                if (geocoder) {
                    geocoder.geocode({'address': $scope.userData.address.country}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                                $scope.LatLongObj = results[0].geometry.location;

                                // Now setting Marker position
                                mapObj.setCenter($scope.LatLongObj);
                                var infowindow = new google.maps.InfoWindow({
                                    content: '<div><b>' + $scope.addressString + '</b></div>',
                                    size: new google.maps.Size(150, 50)
                                });
                                marker = new google.maps.Marker({
                                    position: $scope.LatLongObj,
                                    title: 'Address',
                                    map: mapObj
                                });
                                google.maps.event.addListener(marker, 'click', function() {
                                    infowindow.open(mapObj, marker);
                                });
                            } else {
                                // No latitude longitude found
                                console.log('Latitude and Longitude not found for address '+address);
                            }
                        } else {
                            console.log('Geocode was successful with status '+ status);
                        }
                    });
                }
            } else {
                 $scope.recordFound = false;
            }
        });
    }
});