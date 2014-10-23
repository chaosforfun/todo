todo.controller('weekCycleCtrl', ['$scope', 'weekModel',
    function ($scope, weekModel) {
        weekModel.init().then(function (week) {
            $scope.week = week;
        });
    }]);