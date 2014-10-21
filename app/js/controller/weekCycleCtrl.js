todo.controller('weekCycleCtrl', ['$scope',
    function ($scope) {
        function weekFactory(day) {
            var day = day || new Date();
            var week = [];
            var i = 1,
                l = day.getDay();
            var oneDay = 1000*3600*24;
            //构建day 之前的日期
            for (;i <= l; i++) {
                week.push(new Date(day.getTime() - oneDay*(l - i)));
            }
            //构建day之后的日期
            while(week.length !== 7) {
                week.push(new Date(day.getTime() + oneDay*(week.length - l + 1)));
            }
            return week;
        }
        $scope.week = weekFactory();
    }]);