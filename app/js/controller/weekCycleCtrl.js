todo.controller('weekCycleCtrl', ['$scope', 'WeekModel', 'CONST',
    function ($scope, WeekModel, CONST) {

        $scope.newItem = {
            value: ''
        };

        $scope.activeDay = function (theDay){
            $scope.week.days.forEach(function (day) {
                day.state = CONST.dayStatus.normal;
            });
            theDay.state = CONST.dayStatus.activated;

            //reset
            $scope.newItem.value = '';
        };

        $scope.showAdd = function(day, e) {
            e.stopPropagation();
            day.adding = true;
            console.log(day);
        };

        $scope.saveItem = function (day,e) {
            e.stopPropagation();
            if ($scope.newItem.value) {
                day.addItem($scope.newItem.value);
                $scope.newItem.value = '';
                day.adding = false;

                $scope.week.save();
            } else {
                //todo: tip for no item
            }
        };

        $scope.week = new WeekModel();
    }]);