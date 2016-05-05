trdStrEntityParamSettingAddCtrl.$inject = ['URL','$scope','$location','CommonService'];
app.controller('trdStrEntityParamSettingAddCtrl',trdStrEntityParamSettingAddCtrl);
function trdStrEntityParamSettingAddCtrl (URL,$scope,$location,CommonService) {
	$scope.add = function(){

		//发送添加请求
		CommonService.add(URL.trdStrEntityParamSettingAdd,$scope.data).then(function(result){
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
                             $location.url('/trdStrEntityParamSetting');
                        });
					}
				});
            }
		});
	};
}

trdStrEntityParamSettingUpdateCtrl.$inject = ['URL','$scope','$routeParams','CommonService'];
app.controller('trdStrEntityParamSettingUpdateCtrl',trdStrEntityParamSettingUpdateCtrl );
function trdStrEntityParamSettingUpdateCtrl (URL,$scope,$routeParams,CommonService) {

	CommonService.getOne(
            URL.trdStrEntityParamSettingGet,
            $routeParams.id, "trdStrEntityParamSetting"
        ).then(function (data) {
                $scope.data = data;
            });

	//修改操作
	$scope.update = function(){
		CommonService.update(URL.trdStrEntityParamSettingUpdate,$scope.data);
	};
}

trdStrEntityParamSettingListCtrl.$inject = ['URL','$scope','CommonService'];
app.controller('trdStrEntityParamSettingListCtrl',trdStrEntityParamSettingListCtrl );
function trdStrEntityParamSettingListCtrl (URL,$scope,CommonService) {

	var listKey  = 'trdStrEntityParamSettingList';

    $scope.displayed = [];

	//查询操作
	$scope.queryList = function(){
		CommonService.queryList($scope, $scope.searchParams);
	};

	//删除一条数据
	$scope.remove = function(id){
		CommonService.remove(URL.trdStrEntityParamSettingDelete,id,function(){
			$scope.queryList();
		});
	};

	$scope.callServer = function callServer(tableState) {
		CommonService.tableCallServer(tableState, {
			tableScope: $scope,
			url: URL.trdStrEntityParamSettingList,
			listKey: listKey
		});
	};

	// 清除查询
	$scope.clearSearch = function () {
		$scope.searchParams = {};
		$scope.queryList();
	}
}
