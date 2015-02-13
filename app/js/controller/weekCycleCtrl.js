todo.controller('weekCycleCtrl', ['$scope', 'WeekModel', 'CONST',
    function ($scope, WeekModel, CONST) {

        $scope.activeDay = function (theDay){
            $scope.week.days.forEach(function (day) {
                day.state = CONST.normal;
            });
            theDay.state = CONST.activated;
        };

        $scope.showAdd = function(day, e) {
            e.stopPropagation();
            day.adding = true;
            console.log(day);
        };

        $scope.saveItem = function (e) {

        };

        $scope.week = new WeekModel();
    }]);