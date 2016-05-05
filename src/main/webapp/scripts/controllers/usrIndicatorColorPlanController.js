usrIndicatorColorPlanAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrIndicatorColorPlanAddCtrl',usrIndicatorColorPlanAddCtrl);
function usrIndicatorColorPlanAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrIndicatorColorPlanAdd,$scope.data).then(function(result){
			if(result['success']){
				CommonService.confirmPop({
					msg: "是否继续添加？",
					okBtn: "是",
					cancelBtn: "否",
					okCallBack: function () {
						$scope.$apply(function () {
                             $scope.data = {};
                        });
					},
					cancelCallBack: function () {
						$scope.$apply(function () {
                             $location.url('/usrIndicatorColorPlan');
                        });
					}
				});
            }
		});
	};
}

usrIndicatorColorPlanUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrIndicatorColorPlanUpdateCtrl',usrIndicatorColorPlanUpdateCtrl );
function usrIndicatorColorPlanUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrIndicatorColorPlanGet,
            $routeParams.id, "usrIndicatorColorPlan"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrIndicatorColorPlanUpdate,$scope.data);
	};
}

usrIndicatorColorPlanListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrIndicatorColorPlanListCtrl',usrIndicatorColorPlanListCtrl );
function usrIndicatorColorPlanListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrIndicatorColorPlanList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrIndicatorColorPlanDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrIndicatorColorPlanList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
