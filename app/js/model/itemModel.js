/**
 * Created by adsage on 15/2/13.
 */
todo.factory('ItemModel', [
    function () {
        function ItemModel(content, status) {
            this.status = status || 'unfinished';
            this.content = content;
        }

        ItemModel.prototype.done = function () {
            this.status = 'done';
        };

        ItemModel.prototype.undone = function () {
            this.status = 'unfinished';
        };

        return ItemModel;
    }]);