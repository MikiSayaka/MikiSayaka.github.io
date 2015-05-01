function topMenu($scope, $http) {
  $http.get('js/menu.json').success(function(data){
    $scope.data = data.main_menu;
  });
}