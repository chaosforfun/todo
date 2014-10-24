/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.service('dayModel', ['$filter', 'config',
    function ($filter, config) {
        //创建一个新的日期对象
        this.init = function init(date) {
            if (!date) throw 'day.init must has the param date';
            var state = 0;
            if ($filter('date')(new Date, config.dateFormate) == date) {
                state = 1;
            }
            return {
                todoList:[],
                id:date,
                state: state
//                focus: function () {
//                    this.state = 1;
//                },
//                blur: function () {
//                    this.state = 0;
//                }
            }
        };
    }]);