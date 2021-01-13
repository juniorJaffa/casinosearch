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
        url: 'json.php',
        success: function(response)
        {
            //console.log("php response: "+response);
            jsonData = JSON.parse(response);
            
            // not empty
            if(jsonData.markers && jsonData.markers.length)
                loadMap();
       },
       error: function(){
            alert('Error loading JSON data');
       }
   });         
}

function loadMap() {

      const mapOptions = {
        zoom: 14,
        center: { lat: 48.14126478819999, lng: 17.116004918026448 },
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //console.log("jsonData IN: "+JSON.stringify(jsonData));

      for(mark of jsonData.markers) {
        
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(mark.location[0], mark.location[1]),
          title: mark.name,
          icon: './img/point-gaminghouse.svg'
        })

        // replace %s
        let outhtml =  modalContentTemplete.log(mark.name, mark.address, mark.psc+' '+mark.city, mark.address, mark.url);
        //console.log('>outhtml: '+outhtml);

        google.maps.event.addListener(marker, "click", () => {
            $('#mapPointDetail'+mark.id).html(outhtml);
            $('#mapPointDetail'+mark.id).modal('show');
          });
      }
      
}

String.prototype.log = function() {
    var args = Array.prototype.slice.call(arguments);
    var rep= args.slice(0, args.length);
    var i=0;
    var output = this.replace(/%s|%d|%f|%@/g, function(match,idx) {
      var subst=rep.slice(i, ++i);
      return( subst );
    });
return output;
}

// General Template
var modalContentTemplete = 
        '<div class="modal-dialog" role="document">'
            +'<div class="modal-content">'
                +'<div class="modal-header">'
                    +'<h2 class="modal-title">%s</h2>'
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
                        +'<div class="col-6">%s<br>%s</div>'
                    +'</div>'
                +'</div>'
                +'<div class="modal-footer pb-4 btnMiddleRight">'
                    +'<div class="btnRow w-100 pb-3 pb-md-1 d-flex">'
                        +'<a class="btn btn-secondary" href="geo:0,0?q=%s" role="button">Naviguj</a>'
                        +'<a class="btn btn-primary" href="%s" role="button">Detail kasína</a>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';