angular
    .module('starter.controllers', [])
    .controller('EventsController', EventsController);

function EventsController($scope, beacon) {
  $scope.events = [];

  $scope.$on('beaconEventRecieved', function(event, args) {
    $scope.events.push({
      name: args.event.region.identifier,
      type: args.event.state
    });
    $scope.$apply();
  });


}
