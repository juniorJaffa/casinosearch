// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
let map;
var jsonData;
var marker1;
var marker2;

function initMap() {

    // call php
    loadData();
}

function loadData() {
    $.ajax({
        type: "POST",
        url: 'index.php',
        success: function(response)
        {
            //console.log("php response: "+response);
            jsonData = JSON.parse(response);
            //console.log("OK jsonData: "+JSON.stringify(jsonData));
            
            // not empty
            if(jsonData.markers && jsonData.markers.length)
                loadMap();
       },
       error: function(){
            alert('Error load JSON data');
       }
   });         
}

function loadMap() {

    const mapOptions = {
        zoom: 14,
        center: { lat: 48.14126478819999, lng: 17.116004918026448 },
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      console.log("jsonData 1: "+JSON.stringify(jsonData));

      /*
      for(mark of jsonData.markers) {
        let marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(mark.location[0], hotel.location[1]),
          title: mark.name
        })
      }
      */

      var marker1Data = jsonData.markers[0];
      // Olympic Casino Bratislava, Carlton
      // Hviezdoslavovo námestie 3, (Hotel Carlton)
      marker1 = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        //position: { lat: 48.14143788944112, lng: 17.108613893253427 },
        position: { lat: marker1Data.location[0], lng: marker1Data.location[1] },
        icon: './img/point-gaminghouse.svg',
        map: map,
      });
    
    
      // Olympic Casino Bratislava, Eurovea
      // Pribinova 8
      var marker2Data = jsonData.markers[1];
      marker2 = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        //position: { lat: 48.14057591384127, lng: 17.12373869843766 }, 
        position: { lat: marker2Data.location[0], lng: marker2Data.location[1] },
        icon: './img/point-gaminghouse.svg',
        map: map,
      });
    
      // You can use a LatLng literal in place of a google.maps.LatLng object when
      // creating the Marker object. Once the Marker object is instantiated, its
      // position will be available as a google.maps.LatLng object. In this case,
      // we retrieve the marker's position using the
      // google.maps.LatLng.getPosition() method.
      const infowindow1 = new google.maps.InfoWindow({
        content: modalContent1,
      });
    
      marker1.addListener("click", toggleBounce);
      google.maps.event.addListener(marker1, "click", () => {
        infowindow1.open(map, marker1);
      });

      const infowindow2 = new google.maps.InfoWindow({
        content: modalContent2,
      });
      marker2.addListener("click", toggleBounce);
      google.maps.event.addListener(marker2, "click", () => {
        infowindow2.open(map, marker2);
      });
}

function toggleBounce() {

    if (marker1.getAnimation() !== null) {
      marker1.setAnimation(null);
    } else {
      marker1.setAnimation(google.maps.Animation.BOUNCE);
    }

    if (marker2.getAnimation() !== null) {
        marker2.setAnimation(null);
      } else {
        marker2.setAnimation(google.maps.Animation.BOUNCE);
      }
}

// Carltom
var modalContent1 = 
    '<div class="modal fade mapPointModal" id="mapPointDetail" tabindex="-1" role="dialog">'
    +'<div class="modal-dialog" role="document">'
        +'<div class="modal-content">'
            +'<div class="modal-header">'
                +'<h2 class="modal-title">Olympic Casino Bratislava, Carlton</h2>'
                +'<div class="btnArrow">'
                    +'<button type="button" class="btn" data-dismiss="modal"></button>'
                +'</div>'
            +'</div>'
            +'<div class="modal-body">'
                +'<div class="row">'
                    +'<div class="col-6">'
                        +'<div class="position-relative mapPointPhoto">'
                            +'<div class="vCenterImageBox">'
                                +'<div>'
                                    +'<picture>'
                                        +'<source srcset="https://api.olympic-casino.sk/sites/default/files/styles/ims_vertical_cards_desktop/public/2020-10/OCS-web---taser-872-x-540x-01.jpg" type="image/jpeg" width="300" height="200">'
                                        
                                        +'<img src="https://api.olympic-casino.sk/sites/default/files/styles/ims_vertical_cards_desktop/public/2020-10/OCS-web---taser-872-x-540x-01.jpg" type="image/jpeg" width="300" height="200 alt="" title="" class="vCenterImage">'
                                    +'</picture>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                    +'<div class="col-6">Hviezdoslavovo námestie 185/3,<br>81102 Bratislava</div>'
                +'</div>'
            +'</div>'
            +'<div class="modal-footer pb-4 btnMiddleRight">'
                +'<div class="btnRow w-100 pb-3 pb-md-1 d-flex">'
                    +'<a class="btn btn-secondary" href="geo:0,0?q=Olympic+Casino+Bratislava" role="button">Naviguj</a>'
                    +'<a class="btn btn-primary" href="#" role="button">Detail kasína</a>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    +'</div>';

// Eurovea
var modalContent2 = 
    '<div class="modal fade mapPointModal" id="mapPointDetail" tabindex="-1" role="dialog">'
    +'<div class="modal-dialog" role="document">'
        +'<div class="modal-content">'
            +'<div class="modal-header">'
                +'<h2 class="modal-title">Olympic Casino Bratislava, Eurovea</h2>'
                +'<div class="btnArrow">'
                    +'<button type="button" class="btn" data-dismiss="modal"></button>'
                +'</div>'
            +'</div>'
            +'<div class="modal-body">'
                +'<div class="row">'
                    +'<div class="col-6">'
                        +'<div class="position-relative mapPointPhoto">'
                            +'<div class="vCenterImageBox">'
                                +'<div>'
                                    +'<picture>'
                                        +'<source srcset="https://api.olympic-casino.sk/sites/default/files/styles/ims_vertical_cards_desktop/public/2020-10/OCS-web---taser-872-x-540px-eurovea-02.jpg" type="image/jpeg" width="300" height="200">'
                                        
                                        +'<img src="https://api.olympic-casino.sk/sites/default/files/styles/ims_vertical_cards_desktop/public/2020-10/OCS-web---taser-872-x-540px-eurovea-02.jpg" type="image/jpeg" width="300" height="200 alt="" title="" class="vCenterImage">'
                                    +'</picture>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                    +'<div class="col-6">Hviezdoslavovo námestie 185/3,<br>81102 Bratislava</div>'
                +'</div>'
            +'</div>'
            +'<div class="modal-footer pb-4 btnMiddleRight">'
                +'<div class="btnRow w-100 pb-3 pb-md-1 d-flex">'
                    +'<a class="btn btn-secondary" href="geo:0,0?q=Olympic+Casino+Bratislava" role="button">Naviguj</a>'
                    +'<a class="btn btn-primary" href="#" role="button">Detail kasína</a>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    +'</div>';