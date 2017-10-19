$.get("http://localhost:3000/pins", function (data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
        var latData = data[i].lat;
        var lngData = data[i].lng;
        console.log(latData);
        console.log(lngData);

        function myMap() {

            var loca = new google.maps.LatLng(lat, lng);
            var mapProp = {
                center: loca,
                zoom: 19,
            };
            var map = new google.maps.Map(document.getElementById("mpaPin"), mapProp);
            var marker = new google.maps.Marker({
                position: loca,
                map: map
            });
        }
    }
});
ons.ready(function () {
    $("#add").click(function () {
        var onSuccess = function (position) {
            var latGPS = position.coords.latitude;
            var lngGPS = position.coords.longitude;
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
});