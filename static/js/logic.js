// Creating map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 1.5
});

// Adding tile layer to the map

var street = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
  }).addTo(myMap);

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var baseMaps = {
    Bright: street,
    Dark: dark
    };



// Assemble API query URL
var local = "/geo.json";

 

// Grab the data with d3
d3.json(local, function(data) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  var heatArray = [];

  // Loop through data
  for (var i = 0; i < data.features.length; i++) {
    var location = data.features[i].geometry.coordinates
 


    //Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location[0], location[1]])
      
        );
      
      heatArray.push([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]
        );
    
  }
}
console.log(heatArray)

 var heat = L.heatLayer(heatArray, {
   radius: 20,
   blur: 35
 }).addTo(myMap);

myMap.addLayer(markers);

var overlayMaps = {
  Earthquake: markers,
  Density: heat
};


//Overlays that may be toggled on or off
  

  // Add our marker cluster layer to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});


