var url = "http://localhost:3000/pins";
$.get(url, function (data) {
    var template = $('#template').html();
    for (var i = 0; i < data.length; i++) {
        var rendered = Mustache.render(template, data[i]);
        $("#pin").append(rendered);
    }
});

function deletePin(id) {
    $.ajax({
        url: url + "/" + id,
        method: "DELETE",
        success: function (data, status, xhr) {
            alert('complete');
        }
    })
}
ons.ready(function () {
    $("#add").click(function () {
        var onSuccess = function (position) {
            $("#location").val(position.coords.latitude + "," + position.coords.longitude);
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                var date = dd+"/"+mm+"/"+yyyy;
            $.post(url, {
                photo: "https://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png",
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                title: "PSU Phuket",
                description: $("#desc").val(),
                buliding: $("#choose-sel").val(),
                room: $("#room").val(),
                date: date
            });
            alert('complete');
        };

        function onError(error) {
            console.log('code: ' + error.code + '\n' +
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

    function d() {
        alert('rwe')
    }

});