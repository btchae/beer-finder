// =========================
// King Component
// =========================
var KingComponent = React.createClass ({
  getInitialState: function() {
    return {
      latitude: '',
      longitude: '',
      currentBeer: '',
      currentBrewery: '',
      brewerySearch: []
    };
  },
  getUserLocation: function(e) {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.value);
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
        that.setCoordinates(latitude, longitude);
        // that.state.latitude = latitude.toString();
        // that.state.longitude = longitude.toString();
        // console.log(that.state.latitude);
      };
      function error() {
        alert("Unable to retrieve your location");
      };
      console.log(this.state.latitude);
      console.log(this.state.longitude);
    // });
    navigator.geolocation.getCurrentPosition(success, error);
  },
  setCoordinates: function(latitude,longitude) {
    console.log('testing setCoordinates');
    this.setState({
      latitude: latitude,
      longitude: longitude
    });
    $.ajax({
      url: 'beers/search/'+ this.state.latitude + '/' + this.state.longitude,
      type: "GET",
      success: function(data) {
        console.log(data["data"]);
        var breweryList = [];
        for (var i = 0; i < data["data"].length; i++) {
          breweryList.push(data["data"][i]);
        }
        this.setState({
          brewerySearch: breweryList
        });
      }.bind(this)
    })
  },
  render: function() {
    console.log('rendering KingComponent');
    return (
      <button onClick={this.getUserLocation}>Your Location</button>
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