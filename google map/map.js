let map;
let openInfoWindow = null;

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 35.89258056902498, lng: -78.78327684570964 },
    zoom: 11,
  });

  // Fetch the external JSON file
  const response = await fetch('markers.json');
  const markersData = await response.json();

  // Loop through markers
  for (const markerData of markersData) {
    addMarker(markerData);
  }

  // Add Marker Function
  function addMarker(props) {
    const marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: {
        url: 'location.png',
        scaledSize: new google.maps.Size(30, 30),
      }
    });

    // Check content
    if (props.title || props.description || props.website) {
      const infoWindow = new InfoWindow({
        content: `<h3>${props.title}</h3><p>${props.description}</p><a href="${props.website}" target="_blank">Website</a> <a href="${props.readMore}">Read More</a>`
      });

      marker.addListener('click', function () {
        if (openInfoWindow) {
          openInfoWindow.close();
        }
        infoWindow.open(map, marker);
        openInfoWindow = infoWindow;
      });
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".listView").addEventListener("click", function() {
    const listViewSection = document.getElementById("listViewSection");
    listViewSection.scrollIntoView({ behavior: "smooth"});
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".mapView").addEventListener("click", function() {
    const mapViewSection = document.getElementById("mapViewSection");
    mapViewSection.scrollIntoView({ behavior: "smooth"});
  });
});

initMap();
