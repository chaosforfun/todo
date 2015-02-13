/**
 * Created by zhaoshichao on 14-10-22.
 */
todo.factory('DayModel', ['$filter', 'CONST', 'ItemModel', 'config',
    function ($filter, CONST, ItemModel, config) {
        //创建一个新的日期对象
        /*
        * 日起对象构造函数
        * @param date {String} format yyyy-MM-dd
        * return day Object which*/
        function DayModel(date, items) {
            if (!this instanceof DayModel) throw 'pleas new DayModel(someDate)';
            if (!date) throw 'DayModel must has the param date';
            this.id = date;
            this.state = CONST.dayStatus.normal;
            this.todoList = [];
            if ($filter('date')(new Date, config.dateFormate) == date) {
                state = CONST.dayStatus.activated;
            }

            var self = this;
            angular.forEach(items, function (item) {
                self.todoList.push(new ItemModel(item.content, item.status))
            });
        }

        /*
         * 添加代办事项
         * @param content {String} 内容
         * return this*/
        DayModel.prototype.addItem = function (content) {
            todoList.push(new ItemModel(content));
            return this;
        };

        /*删除事项
         * @param index {Number}*/
        DayModel.prototype.removeItem = function (index) {
            todoList.splice(index, 1);
        };

        return DayModel
    }]);