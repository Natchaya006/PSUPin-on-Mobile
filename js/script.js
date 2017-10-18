function myMap() {
    var loca = new google.maps.LatLng(7.89472, 98.35220);
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