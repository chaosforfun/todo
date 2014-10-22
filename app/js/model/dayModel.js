/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.service('dayModel', ['$q', '$filter',
    function ($q, $filter) {
        //创建一个新的日期对象
        this.init = function init(date) {
            if (!date) throw 'day.init must has the param date';
            return {
                todoList:[],
                dayStr:date
            }
        };
    }]);