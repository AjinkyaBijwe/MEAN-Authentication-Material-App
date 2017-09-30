angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var user = null;

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      getData : getData,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      .error(function (data) {
        user = false;
      });
    }

    function getData(username){
       return $http.post('/user/data',{username: username});
    }

    function login(username, password) {
      var deferred = $q.defer();
      $http.post('/user/login',{username: username, password: password})
        .success(function (data, status) {
          if(status === 200 && data){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    };

    function logout() {
      var deferred = $q.defer();
      $http.get('/user/logout')
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;

    }

    function register(name, username, email, password,data) {
      return $http.post('/user/register',{name:name, username: username, email: email, password: password, data: data});
    }
  
}]);