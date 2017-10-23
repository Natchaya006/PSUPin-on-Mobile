var url = "http://localhost:3000/pins";
$.get(url, function (data) {
    var template = $('#template').html();
    var diffDays = 0;
    for (var i = 0; i < data.length; i++) {
        var rendered = Mustache.render(template, data[i]);
        $("#pin").append(rendered);
        var newdata = {};
        newdata.id = data[i].id;
        newdata.title = data[i].title;
        newdata.photo = data[i].photo;
        newdata.lat = data[i].lat;
        newdata.lng = data[i].lng;
        newdata.description = data[i].description;
        newdata.buliding = data[i].buliding;
        newdata.room = data[i].room;
        newdata.day = data[i].day;
        newdata.month = data[i].month;
        newdata.year = data[i].year;
        var oneDay = 24 * 60 * 60 * 1000;
        var today = new Date();
        var firstDate = new Date(data[i].year, data[i].month, data[i].day);
        var secondDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        if (diffDays === 0) {
            newdata.timeline = "Today";
        }
        if (diffDays !== 0) {
            newdata.timeline = diffDays + "D";
        }
        JSON.stringify(newdata);
        var updateUrl = url + "/" + data[i].id;
        $.ajax({
            url: updateUrl,
            type: 'PUT',
            data: newdata,
            success: function (result) {}
        });
    }
});


function deletePin(id) {
    $.ajax({
        url: url + "/" + id,
        method: "DELETE",
        success: function (data, status, xhr) {
            location.reload();
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
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            console.log(dd);
            var dateP = dd + "/" + mm + "/" + yyyy;
            $.post(url, {
                photo: "https://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png",
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                title: "PSU Phuket",
                description: $("#desc").val(),
                buliding: $("#choose-sel").val(),
                room: $("#room").val(),
                day: dd,
                month: mm,
                year: yyyy,
                timeline: "Today"
            });
            alert('complete');
            location.reload('post.html')
        };

        function onError(error) {
            console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    });

    function notification() {
        var count = 0;
        $.ajax({
            url: url,
            method: "GET",
            success: function (data, status, xhr) {
                for (var i = 0; i < data.length; i++) {
                    count++;
                }
                var tab = "<ons-tab page='post.html' id='news' label='News' icon='ion-ios-clock' badge='" + count + "' active></ons-tab><ons-tab page='addPic.html' label='Post' icon='ion-camera' active-icon='ion-camera'></ons-tab><ons-tab page='mapPin.html' label='Map' icon='ion-ios-location' active-icon='ion-ios-location'></ons-tab>";
                $("#pin").append(rendered);
            }
        })
        return count;
    }

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
        var mapOptions = {
            center: {
                lat: 7.89472,
                lng: 98.35220
            },
            zoom: 17,
        }
        var maps = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
        var marker, info;
        $.get(url, function (jsonObj) {
            $.each(jsonObj, function (i, item) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.lat, item.lng),
                    map: maps,
                    title: item.room
                });
                info = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        info.setContent(item.room);
                        info.open(maps, marker);
                    }
                })(marker, i));
            });
        });
    }
});