$.get("http://localhost:3000/pins", function (data) {
    console.log(data);
    for(i=0;i<data.length;i++){
        var lat = data[i].lat;
        var lng = data[i].lng;
        console.log(lat);
        console.log(lng);
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
