/**
 * Created by zhaoshichao on 14-10-21.
 */
describe('weekCycleCtrl', function () {
    beforeEach(module('todo'));

    it('should create "week" which contains 7 days in a week',
        $injector(function ($controller) {
            var scope = {},
                ctrl = $controller('weekCycleCtrl', {$scope: scope});
            expect(scope.week.length).toBe(7);
        }))
});