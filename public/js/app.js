// =========================
// King Component
// =========================
var KingComponent = React.createClass ({
  getInitialState: function() {
    return {
      latitude: '',
      longitude: ''
    };
  },
  getUserLocation: function(e) {
    e.preventDefault();
    console.log(e);
    console.log('testing function');
    console.log(this.state);
    var that = this;
      if (!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
        return;
      }
      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        // console.log(latitude.toString());
        // console.log(longitude.toString());
        console.log(that);
        that.state.latitude = latitude.toString();
        that.state.longitude = longitude.toString();
        console.log(that.state.latitude);
      };
      function error() {
        alert("Unable to retrieve your location");
      };
      console.log(this.state.latitude);
      console.log(this.state.longitude);
    // });
    navigator.geolocation.getCurrentPosition(success, error);
  },
  beerSearch: function(beer) {
    console.log("this is the beer I'm looking for: "+ beer);
    this.getUserLocation();
    // $.ajax({
    //   url: + beer,
    //   type: "GET",
    //   success: 
    // })
  },
  render: function() {
    console.log('rendering KingComponent');
    return (
      <form>
      <label for="searchbar">Search: </label>
      <input type="text" id="searchbar" placeholder="Search Beer"></input>
      <input type="submit" value="Submit" onClick={this.getUserLocation}></input>
      </form>
    )
  }
});

ReactDOM.render(
  <KingComponent />, 
document.getElementById("container"));
///////Garbage Code
// console.log('yay');
// ///var geoFindMe = function() {
//   var output = document.getElementById("out");

//   if (!navigator.geolocation){
//     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//     return;
//   }
/////
//   function success(position) {
//     var latitude  = position.coords.latitude;
//     var longitude = position.coords.longitude;

//     output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

//     // var img = new Image();
//     // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

//     // output.appendChild(img);
//   };

//   function error() {
//     output.innerHTML = "Unable to retrieve your location";
//   };

//   output.innerHTML = "<p>Locating…</p>";

//   navigator.geolocation.getCurrentPosition(success, error);
// }

// geoFindMe();
/////////*Garbage Code
// console.log('yay');
// ///var geoFindMe = function() {