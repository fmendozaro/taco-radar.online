$(document).ready(function(){

    var map;
    var infowindow;
    var autocompleteOptions = {
        componentRestrictions: {
            "country": "us"
        }
    };
    var $autocomplete = $("#autocompleteMap");
    var autocomplete = new google.maps.places.Autocomplete($autocomplete, autocompleteOptions);

    $("#searchForm").on("submit", function(e){
        e.preventDefault();
    });

    getLocation();

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }

    // Geo Location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initMap);
            // $autocomplete.onfocus(geolocate());
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function initMap(position) {

        var curLocation = {lat: position.coords.latitude, lng: position.coords.longitude};

        map = new google.maps.Map(document.getElementById('map'), {
            center: curLocation,
            zoom: 17
        });

        infowindow = new google.maps.InfoWindow();

        var service = new google.maps.places.PlacesService(map);
        autocomplete.addListener('place_changed', onPlaceChanged);


        service.nearbySearch({
            location: curLocation,
            radius: 500,
            type: ['food']
        }, callback);
    }

    function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            search();
        } else {
            $autocomplete.setPlaceholder("Type the city, address or zip code");
        }
    }

    function search() {
        var search = {
            bounds: map.getBounds(),
            types: ['restaurant']
        };

        places.nearbySearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                // Create a marker for each hotel found, and
                // assign a letter of the alphabetic to each marker icon.
                for (var i = 0; i < results.length; i++) {
                    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                    var markerIcon = MARKER_PATH + markerLetter + '.png';
                    // Use marker animation to drop the icons incrementally on the map.
                    markers[i] = new google.maps.Marker({
                        position: results[i].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: markerIcon
                    });
                    // If the user clicks a hotel marker, show the details of that hotel
                    // in an info window.
                    markers[i].placeResult = results[i];
                    google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                    setTimeout(dropMarker(i), i * 100);
                    addResult(results[i], i);
                }
            }
        });
    }

    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i]) {
                markers[i].setMap(null);
            }
        }
        markers = [];
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        // var photos = place.photos;
        // if (!photos) {
        //     return;
        // }

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            // icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})

        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
    //
    // function initAutocomplete() {
    //     // Create the autocomplete object, restricting the search to geographical
    //     // location types.
    //     autocomplete = new google.maps.places.Autocomplete(
    //         /** @type {!HTMLInputElement} */(document.getElementById('autocompleteMap')),
    //         {types: ['geocode']});
    //
    //     // When the user selects an address from the dropdown, populate the address
    //     // fields in the form.
    //     autocomplete.addListener('place_changed', fillInAddress);
    // }
    //
    // function fillInAddress() {
    //     // Get the place details from the autocomplete object.
    //     var place = autocomplete.getPlace();
    //
    //     for (var component in componentForm) {
    //         document.getElementById(component).value = '';
    //         document.getElementById(component).disabled = false;
    //     }
    //
    //     // Get each component of the address from the place details
    //     // and fill the corresponding field on the form.
    //     for (var i = 0; i < place.address_components.length; i++) {
    //         var addressType = place.address_components[i].types[0];
    //         if (componentForm[addressType]) {
    //             var val = place.address_components[i][componentForm[addressType]];
    //             document.getElementById(addressType).value = val;
    //         }
    //     }
    // }
});