/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.service('weekModel', ['$q', '$filter', 'dayModel',
    function ($q, $filter, dayModel) {
        this.week = [];
        var dateFilter = $filter('date');
        /*
        * @description
        * 返回一个包含day的周，如果还没有这个周就新建一个周。
        * @param {Date} day 一个日期，这个日期包含在这周内。
        *
        * @return {week}
        * */
        this.init = function init(day) {
            var day = day || new Date();
            var oneDay = 1000 * 3600 * 24;
            var monday = new Date(day.getTime() - oneDay*(day.getDay() - 1));
            var id = dateFilter(monday, 'yyyy-MM-dd');
            var defer = $q.defer();

            localforage.keys(function(err, keys) {
                if (err) {

                }
                var i = keys.indexOf(id);
                if (i > -1) {
                    localforage.getItem(keys[i])
                        .then(function(week) {
                            defer.resolve(week);
                        })
                } else {
                    defer.resolve(weekFactory(day));
                }
            });
            var week = {};

            return week;
        };

        function weekFactory(day) {
            var day = day || new Date();
            var week = [];
            var i = 1,
                l = day.getDay();
            var oneDay = 1000 * 3600 * 24;
            //构建day 之前的日期
            for (; i <= l; i++) {
                week.push(new Date(day.getTime() - oneDay * (l - i)));
            }
            //构建day之后的日期
            while (week.length !== 7) {
                week.push(new Date(day.getTime() + oneDay * (week.length - l + 1)));
            }
            return week;
        }

    }]);