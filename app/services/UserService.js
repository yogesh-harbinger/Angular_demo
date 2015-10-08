// Resource to get all users data
sampleApp.factory("UserService", function($resource,sampleAppLib) {
  return $resource(sampleAppLib.userListApi);
});