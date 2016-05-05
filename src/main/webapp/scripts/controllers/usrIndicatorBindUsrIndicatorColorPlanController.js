usrIndicatorBindUsrIndicatorColorPlanAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('usrIndicatorBindUsrIndicatorColorPlanAddCtrl',usrIndicatorBindUsrIndicatorColorPlanAddCtrl);
function usrIndicatorBindUsrIndicatorColorPlanAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.usrIndicatorBindUsrIndicatorColorPlanAdd,$scope.data).then(function(result){
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
                             $location.url('/usrIndicatorBindUsrIndicatorColorPlan');
                        });
					}
				});
            }
		});
	};
}

usrIndicatorBindUsrIndicatorColorPlanUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('usrIndicatorBindUsrIndicatorColorPlanUpdateCtrl',usrIndicatorBindUsrIndicatorColorPlanUpdateCtrl );
function usrIndicatorBindUsrIndicatorColorPlanUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.usrIndicatorBindUsrIndicatorColorPlanGet,
            $routeParams.id, "usrIndicatorBindUsrIndicatorColorPlan"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.usrIndicatorBindUsrIndicatorColorPlanUpdate,$scope.data);
	};
}

usrIndicatorBindUsrIndicatorColorPlanListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('usrIndicatorBindUsrIndicatorColorPlanListCtrl',usrIndicatorBindUsrIndicatorColorPlanListCtrl );
function usrIndicatorBindUsrIndicatorColorPlanListCtrl (URL,$scope,CommonService) {

	var listKey  = 'usrIndicatorBindUsrIndicatorColorPlanList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.usrIndicatorBindUsrIndicatorColorPlanDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.usrIndicatorBindUsrIndicatorColorPlanList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
