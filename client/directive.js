
  var directives={};
 
 directives.compare = [function () {
					var directive = {};
						directive.require = "ngModel",
						directive.scope = {
							otherModelValue: "=compareTo"
						},
						directive.link = function(scope, element, attributes, ngModel) {
							ngModel.$validators.compareTo = function(modelValue) {
								return modelValue == scope.otherModelValue;
							};
							scope.$watch("otherModelValue", function() {
								ngModel.$validate();
							});
						}
                   return directive;
                }
			]; 

 angular.module('myApp').directive(directives);
 