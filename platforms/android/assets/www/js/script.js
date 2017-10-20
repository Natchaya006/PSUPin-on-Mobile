$.get("http://localhost:3000/pins", function (data) {
    var template = $('#template').html();
    for (var i = 0; i < data.length; i++) {
        var rendered = Mustache.render(template, data[i]);
        $("#pin").append(rendered);
    }
});
ons.ready(function () {
    $("#add").click(function () {
        var onSuccess = function (position) {
            var latGPS = position.coords.latitude;
            var lngGPS = position.coords.longitude;
            console.log(lngGPS);
        };

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });

    function takePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
        function onSuccess(imageURI) {
            var image = document.getElementById('preview');
            image.src = imageURI;
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

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
});