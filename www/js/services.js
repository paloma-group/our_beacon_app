angular
  .module('starter.services', [])
  .factory('beacon', function($rootScope) {

  return {

    initialise: function() {
      // Request permission from user to access location info.
      window.cordova.plugins.locationManager.requestAlwaysAuthorization();

      var delegate = new window.cordova.plugins.locationManager.Delegate();
      delegate.didDetermineStateForRegion = onDidDetermineStateForRegion;
      delegate.didStartMonitoringForRegion = onDidStartMonitoringForRegion;
      delegate.didRangeBeaconsInRegion = onDidRangeBeaconsInRegion;
      cordova.plugins.locationManager.setDelegate(delegate);

      initialiseBeaconRegions();

    }
  }

  /* PRIVATE METHODS */

  function onDidStartMonitoringForRegion(pluginResult) {
    console.log("Mointoring for Region");
  };

  function onDidRangeBeaconsInRegion(pluginResult) {
    console.log("Ranging region");
  };

  function onDidDetermineStateForRegion(pluginResult) {
    var event = pluginResult;
    switch (pluginResult.state) {
      case "CLRegionStateInside":
        processEntryEvent(event);
        break;
      case "CLRegionStateOutside":
        break;
    }
  };

  function processEntryEvent(event) {
    $rootScope.$broadcast("beaconEventRecieved", {event: event});
  }

  function initialiseBeaconRegions() {
    var beacons = [{
        identifier: "BEACON3",
        uuid: "61687109-905F-4436-91F8-E602F514C96D",
        minor: "32025",
         major: "3",
     }];
    setupBeaconRegions(beacons);
  }

  function setupBeaconRegions(beaconRegions) {
    for (var i = 0; i < beaconRegions.length; i++) {
      var beacon = beaconRegions[i];
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
        beacon['identifier'],
        beacon['uuid'],
        beacon['major'],
        beacon['minor']);

      startMonitoringBeaconRegion(beaconRegion);
    }
  }

  function startMonitoringBeaconRegion(beaconRegion) {
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
      .fail(console.error)
      .done();
  }

});
