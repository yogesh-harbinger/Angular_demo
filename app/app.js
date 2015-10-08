/* Initilization of Sample App
* version 1.4.7
* Add module names which needs to be pre-loaded
*/
var sampleApp = angular.module('sampleApp', [
'ngResource',
'ui.router', // User UI router to load views as per state of application
'ui.bootstrap',
'datatables',
'ngMap',
]);

// It can contain constants or some utility functions
sampleApp.factory("sampleAppLib", function() {
    var baseAPIUrl = 'json/';
    return{
        userListApi:baseAPIUrl+'user_list.json',
    };
});

// Define required states here
sampleApp.config(function($urlRouterProvider,$stateProvider) {
    var templateDir = 'app/templates/';
    var viewsDir = 'app/views/';
    //Default state
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('/', {
        url:'/',
        views: {
			'@' : {
                templateUrl: templateDir+'layout.html',
            },
            "header@/": {
                templateUrl: templateDir+'header.html'
            },
            "content@/":{
                templateUrl: templateDir+'content.html',
                controller: "DashboardController"
            },
            "footer@/":{
                templateUrl: templateDir+'footer.html',
            }
        }
    })
    .state('/user/:id', {
        url:'/user/:id',
        views: {
			'@' : {
                templateUrl: templateDir+'layout.html',
            },
            "header@/user/:id": {
                templateUrl: templateDir+'header.html'
            },
            "content@/user/:id":{
                templateUrl: viewsDir+'users/userDetails.html',
                controller: "UserController"
            },
            "footer@/user/:id":{
                templateUrl: templateDir+'footer.html',
            }
        }
    })
    .state('/usermap/:id', {
        url:'/usermap/:id',
        views: {
			'@' : {
                templateUrl: templateDir+'layout.html',
            },
            "header@/usermap/:id": {
                templateUrl: templateDir+'header.html'
            },
            "content@/usermap/:id":{
                templateUrl: viewsDir+'users/map.html',
                controller: "MapController"
            },
            "footer@/usermap/:id":{
                templateUrl: templateDir+'footer.html',
            }
        }
    })
});