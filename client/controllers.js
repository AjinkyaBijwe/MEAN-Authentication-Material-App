var controllers={};

controllers.loginController =['$rootScope','$scope', '$location', 'AuthService','$timeout',
  function ($rootScope, $scope, $location, AuthService, $timeout) {

    $scope.login = function () {

      $scope.error = false;
      $scope.disabled = true;

      AuthService.login($scope.loginForm.username.toLowerCase(),$scope.loginForm.password)
        .then(function() {
          $location.path('/');
          $scope.disabled = false;  
          $rootScope.getUserData($scope.loginForm.username.toLowerCase());
          $scope.loginForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $rootScope.showCustomToast('Invalid username and/or password','errorMessage');
          $scope.disabled = false;
        });
    };
  }
];

controllers.logoutController = ['$scope', '$location', 'AuthService','$rootScope',
  function ($scope, $location, AuthService, $rootScope) {
    $scope.logout = function () {
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
  }
];

controllers.registerController = ['$rootScope','$scope', '$location', 'AuthService',
  function ($rootScope, $scope, $location, AuthService) {

    $scope.register = function () {
      $scope.error = false;
      $scope.disabled = true;

      if($scope.registerForm.name,$scope.registerForm.username,$scope.registerForm.email,$scope.registerForm.password,$scope.registerForm.confirmPassword)
      {
        AuthService.register($scope.registerForm.name,$scope.registerForm.username.toLowerCase(),$scope.registerForm.email,$scope.registerForm.password,null)
        .success(function (response) {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
          $rootScope.showCustomToast('User registered successfully. Please Login','successMessage');
        })

        .error(function (response) {
          $scope.error = true;
          $rootScope.showCustomToast(response.err.message,'errorMessage');
          $scope.disabled = false;
        });
      }
    };
  }
];

controllers.mainController = ['AuthService','$rootScope','$scope', '$location','$mdSidenav','$mdToast',
  function (AuthService, $rootScope, $scope, $location ,$mdSidenav,$mdToast) {
  
  var init = function(){
    
  };

  init();

  $scope.switchPath = function(){
    $rootScope.errorMessage = "";
    $rootScope.successMessage= "";
    if($location.$$url == "/login"){
      $location.path('/register')
    }else{
      $location.path('/login');
    } 
  };
  
  $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };

   $rootScope.getUserData = function(username) {
          AuthService.getData(username).success(function(response) {
            $rootScope.name = response.data[0].name;
          }).error(function (response){
              console.log("Data Not Found");
          });
    }; 

    $rootScope.showCustomToast = function(message,className) {
        $mdToast.show({
            controller: 'mainController',
            bindToController: true,
            position: 'top',
            template:'<md-toast><div class="md-toast-content"><span>'+ message +'</span></div></md-toast>',
            hideDelay: 2000,
            toastClass : className
        });
      };
   }
];
    
 angular.module('myApp').controller(controllers);