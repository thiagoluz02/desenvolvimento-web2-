var Utils = {
    apply: _apply
}

function _apply($scope){
    if (!$scope.$$phase) {
        $scope.$apply();
    }
}