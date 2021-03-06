// global objects to control
	var map;
	var yorkUCoords = {lat: 43.7735, lng: -79.5019};
	var oldMarker,
		markerCount=0;

	// delete previous marker
	function clearOverlays() {
		if(markerCount > 0){
    oldMarker.setMap(null);
   }
}
 
	// basic google map initialization function 
//  function initMap() {
//   var yorkU = {lat: 43.7735, lng: -79.5019};
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 16,
//     center: yorkU,
//     disableDefaultUI: true,
//   });
// }

// Function to initialize google map with direction display
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: yorkUCoords,
    disableDefaultUI: true,
  });

  directionsDisplay.setMap(map);

  // on button click, calculate and display route
  document.getElementById("directions-button").addEventListener("click",function(){
    calculateAndDisplayRoute(directionsService,directionsDisplay);
  });
}
// Function to calculate and display the route
// if user is not within reasonable campus walking distance
// user will be prompted to relocate logically to the center of the campus.
// @param directionsService: DirectionsService
// @param directionsDisplay:  directionsRenderer
function calculateAndDisplayRoute(directionsService,directionsDisplay,deviceLocation){
  obtainGeoLocation(function(result){
    let notOnCampus = document.getElementById("not-on-campus-box").checked;
    if(notOnCampus) result = yorkUCoords;
    directionsService.route({
        origin: result,
        destination:{lat:oldMarker.getPosition().lat(),lng:oldMarker.getPosition().lng()},
        travelMode: "WALKING",
      }, function(response,status){
          if(status === "OK"){
            // set the renderer to use the result of ds.
            directionsDisplay.setDirections(response);
            clearOverlays();
          }else{
            swal("Direction request failed due to " + status);
          }
      }
    );
  });
}

// Function to obtain geo location
// return: {lat:number,lng:number}
function obtainGeoLocation(cb){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(result){
        let loc = {lat: result.coords.latitude,lng:result.coords.longitude};
        return cb(loc);
      },
      function(error){
        swal("Failed to obtain geolocation");
      });
  }else{
    swal("Browser does not support geolocation detection, or not enabled.")
  }
}


// Function select object to highlight function
function selectObject(obj,name){
	clearOverlays();
	map.panTo(obj);
	var marker = new google.maps.Marker({
    position: obj,
    map: map
  });
  oldMarker = marker;
  markerCount +=1;

  //cell list name change
  document.getElementById("cell-li").innerHTML    = name;
  //list height collapse
  document.getElementById("list-ul").style.height = "0";

  // //directions button controls
  btn = document.getElementById("directions-button-container");
  btn.style.width       = "50%";
  btn.style.zIndex      = 9999;
}

// Function cell press, show list and remove layover
function cellClicked(){
  let layoverMessage = document.getElementById("layover");
  if(layoverMessage){ layoverMessage.outerHTML="";}
  document.getElementById("list-ul").style.height ="100%";

  //directions button control
  var btn = document.getElementById("directions-button-container");
  btn.style.width  = "0";
  btn.style.zIndex = "0";
}


//checking the "no on campus box" if user clicks on li element, not just the checkbox
document.getElementById("away-from-campus-li").addEventListener("click",function(){
  let awayFromCampusCheckbox = document.getElementById("not-on-campus-box").checked;
  if(awayFromCampusCheckbox){
    document.getElementById("not-on-campus-box").checked = false;
  }else {
    document.getElementById("not-on-campus-box").checked = true;
  }
});
// buildings coordinates
var buildings={
	accolade_east: {lat:43.77271300089065,lng:-79.50114727020264},
	accolade_west: {lat:43.772480584953584,lng:-79.50254201889038},
	atkinson: {lat:43.771248765407734,lng:-79.5026171207428},
	behavioral_science_building: {lat:43.773510955400546,lng:-79.50372219085693},
	bennette_center: {lat:43.77207772852301,lng:-79.49841141700745},
	bergeron_center: {lat:43.77234888218828,lng:-79.5067048072815},
	yorklanes: {lat:43.77423917643775,lng:-79.50173735618591},
	calumet_college: {lat:43.773185577177244,lng:-79.5089042186737},
	central_square: {lat:43.772906680148246,lng:-79.50485944747925},
	centre_film_media: {lat:43.77272849525432,lng:-79.50112581253052},
	chemistry_building: {lat:43.77336376070928,lng:-79.50798153877258},
	curtis_lecture_hall: {lat:43.773053875964514,lng:-79.50525641441345},
	executive_learning_centre: {lat:43.772906680148246,lng:-79.49817538261414},
	farquharson_life_science: {lat:43.77423917643775,lng:-79.50448393821716},
	founders_college: {lat:43.77603644998223,lng:-79.50335741043091},
	health_nursing: {lat:43.771457944100135,lng:-79.50440883636475},
	osgoode: {lat:43.770807163543445,lng:-79.50432300567627},
	fine_arts: {lat:43.772627781818585,lng:-79.50197339057922},
	kaneff_tower: {lat:43.77490541344873,lng:-79.50063228607178},
	lassonde_building: {lat:43.774030007473115,lng:-79.50536370277405},
	lumbers: {lat:43.7746420183083,lng:-79.50502038002014},
	Mclaughlin_college: {lat:43.77696605303355,lng:-79.50282096862793},
	bethune_college: {lat:43.773185577177244,lng:-79.50891494750977},
	observatory: {lat:43.77389830812002,lng:-79.50746655464172},
	petrie_science_building: {lat:43.77361166734897,lng:-79.50697302818298},
	ross: {lat:43.772821461352166,lng:-79.5041835308075},
	scott_library: {lat:43.77241085999633,lng:-79.50577139854431},
	scott_religious_centre: {lat:43.77228690431605,lng:-79.50434446334839},
	schulich: {lat:43.77323205988896,lng:-79.49826121330261},
	sherman_health_centre: {lat:43.77516880742899,lng:-79.51185464859009},
	steacie: {lat:43.773727873232566,lng:-79.50607180595398},
	stedman: {lat:43.774425103792154,lng:-79.50321793556213},
	stong_college: {lat:43.77277497832132,lng:-79.50865745544434},
	student_center_old: {lat:43.773906055148835,lng:-79.50269222259521},
	tait: {lat:43.774580042812545,lng:-79.50930118560791},
	vanier_college: {lat:43.775703338705085,lng:-79.5024561882019},
	vari_hall: {lat:43.77298415167566,lng:-79.50344324111938},
	db_building: {lat:43.77127200752081,lng:-79.5006537437439},
	west_office_building: {lat:43.77530825083124,lng:-79.50801372528076},
	william_small_centre: {lat:43.772991898822866,lng:-79.50769186019897},
	winters_college: {lat:43.776423786343216,lng:-79.50174808502197},
}
