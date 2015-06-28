'use strict';

angular.module('core').controller('NewGoodsCtrl', ['$scope', '$state','$location', '$http', 'Authentication', 'Upload',
    function($scope, $state, $location, $http, Authentication, Upload) {
        $scope.user = Authentication;
        $scope.params = {};
        $scope.files =[123,232];
        $scope.params.photos = ['http://41.media.tumblr.com/b2f760e1c0c521bd1e25e41be0e6c443/tumblr_muek2go8421qktf2io1_1280.jpg',
                            'https://secure.static.tumblr.com/1a7b7eb61d13cd5d7c16da400a06c955/lbsebbj/V52n68y5y/tumblr_static_filename_640_v2.jpg',
                            'http://40.media.tumblr.com/065947fe3d7b50117eddd794e160c887/tumblr_nksy1vIU6D1qh33xeo1_1280.jpg'];
        $scope.state = $state.$current.name;
        console.log($state.$current.name);
        if (!$scope.user) $location.path('/signin');
        console.log(this.ymaps);
        var map;
        $scope.afterInit = function($map){
            map = $map;
            console.log(map);
        };
        $scope.mapClick = function(e){
            if (!map.balloon.isOpen()) {
                var coords = e.get('coords');
                map.balloon.open(coords, {
                    contentHeader:'Событие!',
                    contentBody:'Кто-то щелкнул по карте. Координаты щелчка: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
            ].join(', ') + '',
                    contentFooter:'Щелкните еще раз'
                });
            }
            else {
                map.balloon.close();
            }
        };
        $scope.handleContext = function(e){
            map.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
        };
        $scope.balloonOpen=function(){
            map.hint.close();
        };

        $scope.$watch('files', function () {
            console.log($scope.files[0].name);
            $http.post('/upload', {
                file_name: $scope.files[0].name,
                file_type: $scope.files[0].type
            })
                .success( function (data) {
                    console.log(data);
                    var req = {
                     method: 'POST',
                     url: data.signed_request,
                     data: $scope.files,
                     headers: {
                        'Content-Type': $scope.files[0].type,
                    }
                    };
                    console.log(req);
                    $http(req).success(function (data){
                        console.log(data);

                    }).error(function(err){
                        console.log('!!!!',err);
                    });
                })
                .error(function (err) {
                    console.log(err);
                });
        });
        // $scope.afterMapInit=function(map){
        //     $timeout(function(){
        //         map.hint.show(map.getCenter(), 'Содержимое хинта', {
        //             // Опция: задержка перед открытием.
        //             showTimeout: 1500
        //         });
        //     });
        //     map.balloon.open([40.37,40.85], 'Содержимое балуна', {
        //         // Опция: не показываем кнопку закрытия.
        //         closeButton: false
        //     });
        // };

        $scope.addNewGood = function () {
            console.log($scope.params);
            $http.post('/goods/', $scope.params)
                .success( function (data) {
                    console.log(data);
                })
                .error( function (status) {
                    console.log('Error ', status);
                });
        };
    }
]);