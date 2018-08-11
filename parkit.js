/* 
 Google Maps API Key
AIzaSyCXXPjgXEKGgUi5CuvN786CL2m7iV8Hs0M

Directions API Key:  AIzaSyBrtvOsq-bZrH1YjdL2vbnA1R0SobakZq4
Geolocation API Key: AIzaSyBrtvOsq-bZrH1YjdL2vbnA1R0SobakZq4
Maps Javascript API Key: AIzaSyBrtvOsq-bZrH1YjdL2vbnA1R0SobakZq4

 */


var latitude;
var longitude;
var parkLatitude;
var parkLongitude;

var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
    
}

function onDeviceReady() {
    var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');
    if (cordova.Id == 'ios') {
        console.log(cordova.Id);
        node.setAttribute('href', 'parkitios.css');
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else {
        console.log(cordova.Id);
        node.setAttribute('href', 'parkitandroid.css');
        window.StatusBar.backgroundColorByHexString('#1565C0');
    }
    document.getElementsByTagName('head')[0].append(node);
}

function setCss(idtag, attribute, value) {
        //document.getElementById(idtag).setAttribute('style', attribute + ': ' + value);
        document.getElementById(idtag).style.setProperty(attribute, value);
    }
    
function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, locationError, {enableHighAccuracy:true});
}

function setParkingLocationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    storage.setItem('parkedLatitude', latitude);
    storage.setItem('parkedLongitude', longitude);
    navigator.notification.alert('Parking Location Successfully Saved');
    showParkingLocation();
}

function locationError() {
    navigator.notification.alert("Error Code:" + error.code + "\nError Message: " + error.message);
}

function showParkingLocation() {
    setCss('directions','visibility', 'hidden');
    setCss('instructions', 'display', 'none');
    var latLong = new google.maps.LatLng(latitude, longitude);
    var map =  new google.maps.Map(document.getElementById('map'));
    map.setZoom(16);
    map.setCenter(latLong);
    var marker = new google.maps.Marker({
        position: latLong,
        map: map
    })
    setCss('map', 'visibility', 'visible');
}