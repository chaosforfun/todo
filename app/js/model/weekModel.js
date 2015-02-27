/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.factory('WeekModel', ['$q', '$filter', 'DayModel', 'config',
    function ($q, $filter, DayModel, config) {
        var oneDay = 1000 * 3600 * 24;
        var dateFilter = $filter('date');

        /*
         * @description
         * 返回一个包含day的周，如果还没有这个周就新建一个周。
         * @param {Date} day 一个日期，这个日期包含在这周内。
         *
         * @return {week}
         * */
        function WeekModel(day) {
            var day = day || new Date();
            var monday = new Date(day.getTime() - oneDay * (day.getDay() || 7 - 1));

            this.id = dateFilter(monday, config.dateFormat);
            var defer = $q.defer();

            var self = this;
            localforage.getItem(this.id, function (err, days) {
                if (err) {
                    console.error('localForage err: ', err)
                }
                self.days = weekFactory(days);
                defer.resolve();
            });

            defer.promise.then(function () {
                console.log('OK');
            })
        };

        WeekModel.prototype.save = function () {
            var self = this;
            localforage.setItem(this.id, this.days, function () {
                console.log('saved');
                console.log(self.id)
            })
        };


        function weekFactory(days) {

            if (days) {
                return days.map(function (day) {
                    return new DayModel(day.id, day.todoList);
                })
            } else {
                var newDays = [];
                var today = new Date;
                var i = 1,
                    l = today.getDay() || 7;
                var tmp,
                    thisDay;
                //构建day 之前的日期
                for (; i <= l; i++) {
                    thisDay = new Date(today.getTime() - oneDay * (l - i));
                    tmp = new DayModel(dateFilter(thisDay, config.dateFormat));
                    newDays.push(tmp);
                }
                //构建day之后的日期
                while (newDays.length !== 7) {
                    thisDay = new Date(today.getTime() + oneDay * (newDays.length - l + 1));
                    tmp = new DayModel(dateFilter(thisDay, config.dateFormat));
                    newDays.push(tmp);
                }
                return newDays;
            }

        }

        return WeekModel;

    }]);