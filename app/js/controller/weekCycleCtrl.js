todo.controller('weekCycleCtrl', ['$scope', 'weekModel',
    function ($scope, weekModel) {
//        weekModel.init().then(function (week) {
//            $scope.week = week;
//        });

        $scope.changeState = function changeState(theDay){
            $scope.week.days.forEach(function (day) {
                day.state = 0;
            })
            theDay.state = 1;
        };

        //mock data
        $scope.week = {
            id: '',
            days: [{
                    id: '2014-10-20',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                },{
                    id: '2014-10-21',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                },{
                    id: '2014-10-22',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                },{
                    id: '2014-10-23',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                },{
                    id: '2014-10-24',
                    state: 1,
                    todoList:['锻炼', '看书', 'download']
                },{
                    id: '2014-10-25',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                }, {
                    id: '2014-10-26',
                    state: 0,
                    todoList:['锻炼', '看书', 'download']
                }
            ]
        }
    }]);