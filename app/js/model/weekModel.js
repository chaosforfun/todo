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
            var monday = new Date(day.getTime() - oneDay * (day.getDay() - 1));

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


        function weekFactory(days) {
            //mock for test
            days = [
                {
                    id: '2014-10-20',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-21',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-22',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-23',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-24',
                    state: 1,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-25',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                },
                {
                    id: '2014-10-26',
                    state: 0,
                    todoList: [
                        {
                            content: '锻炼'
                        },
                        {
                            content: '看书'
                        },
                        {
                            content: 'download'
                        }
                    ]
                }
            ];


            if (days) {
                return days.map(function (day) {
                    return new DayModel(day.id, day.todoList);
                })
            } else {
                var newDays = [];
                var i = 1,
                    l = day.getDay();
                var tmp,
                    thisDay;
                //构建day 之前的日期
                for (; i <= l; i++) {
                    thisDay = new Date(day.getTime() - oneDay * (l - i));
                    tmp = new DayModel(dateFilter(thisDay, config.dateFormate));
                    newDays.push(tmp);
                }
                //构建day之后的日期
                while (newDays.length !== 7) {
                    thisDay = new Date(day.getTime() + oneDay * (newDays.length - l + 1));
                    tmp = new DayModel(dateFilter(thisDay, config.dateFormate));
                    newDays.push(tmp);
                }
                return newDays;
            }

        }

        return WeekModel;

    }]);