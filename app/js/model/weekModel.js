/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.service('weekModel', ['$q', '$filter', 'dayModel', 'config',
    function ($q, $filter, dayModel, config) {
        this.week = [];
        var dateFilter = $filter('date');
        /*
        * @description
        * 返回一个包含day的周，如果还没有这个周就新建一个周。
        * @param {Date} day 一个日期，这个日期包含在这周内。
        *
        * @return {week}
        * */
        this.init = function (day) {
            var day = day || new Date();
            var oneDay = 1000 * 3600 * 24;
            var monday = new Date(day.getTime() - oneDay*(day.getDay() - 1));
            var id = dateFilter(monday, config.dateFormate);
            var defer = $q.defer();
            var week = {
                id: id
            };

            localforage.keys(function(err, keys) {
                if (err) {

                }
                var i = keys.indexOf(id);
                if (i > -1) {
                    localforage.getItem(keys[i])
                        .then(function(days) {
                            week.days = days;
                            defer.resolve(week);
                        })
                } else {
                    week.days = weekFactory(day);
                    defer.resolve(week);
                }
            });
            return defer.promise;
        };


        function weekFactory(day) {
            var week = [];
            var i = 1,
                l = day.getDay();
            var oneDay = 1000 * 3600 * 24;
            var tmp;
            //构建day 之前的日期
            for (; i <= l; i++) {
                tmp = dayModel.init(dateFilter(new Date(day.getTime() - oneDay * (l - i)), config.dateFormate));
                week.push(tmp);
            }
            //构建day之后的日期
            while (week.length !== 7) {
                tmp = dayModel.init(dateFilter(new Date(day.getTime() + oneDay * (week.length - l + 1))), config.dateFormate);
                week.push(tmp);
            }
            return week;
        }

    }]);