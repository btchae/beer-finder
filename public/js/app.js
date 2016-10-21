// =========================
// King Component
// =========================
var KingComponent = React.createClass ({
  getInitialState: function() {
    return {
      latitude: '',
      longitude: '',
      currentBeerId: '',
      currentBeerName: '',
      currentBrewery: '',
      brewerySearch: [],
      beerSearch: [],
      display: '',
      searchText: ''
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
  handleSearch: function(e) {
    // console.log('testing handleSearch');
    this.setState({
      searchText: e.target.value
    });
  },
  searchBeer: function(e) {
    console.log('testing searchBeer');
    e.preventDefault();
    console.log(e.target);
    console.log(this.state.searchText);
    $.ajax({
      url: "beers/" + this.state.searchText,
      type: "GET",
      success: function(data) {
        console.log(data["data"]);
        var beerList = [];
        for (var i = 0; i < data["data"].length; i++) {
          beerList.push(data["data"][i]);
        }
        this.setState({
          beerSearch: beerList,
          display: "beer"
        });
      }.bind(this)
    })
  },
  selectingBeer: function(id, name) {
    console.log("this is id: "+ id)
    console.log("this is class: "+ name)
    this.setState({
      currentBeerId: id,
      currentBeerName: name
    });
  },
  render: function() {
    console.log('rendering KingComponent');
    if (this.state.display === 'beer') {
      return (
        <BeerSearch
          display={this.state.display}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          currentBeerId={this.state.currentBeerId}
          currentBeerName={this.state.currentBeerName}
          beerSearch={this.state.beerSearch}
          searchText={this.state.searchText}
          selectingBeer={this.selectingBeer}
          />
      )
    } else {
      return (
        <div>
          <button onClick={this.getUserLocation}>Your Location</button>
          <form onSubmit={this.searchBeer}>
          <label>Search Beer: </label>
            <input type="text" placeholder="Search beers" onChange={this.handleSearch}></input>
            <input type="submit"></input>
          </form>
        </div>
    )
  }
  }
});

var BeerSearch = React.createClass ({
  getInitialState: function() {
    return {
      beerShow: false
    };
  },
  selectBeer: function(e) {
    e.preventDefault();
    console.log('selecting beer');
    console.log(e.target.id);
    console.log(e.target);
    this.props.selectingBeer(e.target.id, e.target.className);
    this.setState({
      beerShow: true
    })
  },
  render: function() {
    console.log(this.props);
    //Not sure if the below is ok to use.
    // for (var i = 0; i < this.props.beerSearch.length; i++) {
    //   $("#container").append("<p id=" +i+">"+this.props.beerSearch[i].name+"</p>");
    // }
    // for (var i = 0; i < this.props.beerSearch.length; i++) {
    //   <Ptag id={this.props.beerSearch[i].id} innerHTML={this.props.beerSearch[i].name}/>
    // }
    if (this.state.beerShow === false) {
      var pTags = [];
      for (var i = 0; i < this.props.beerSearch.length; i++) {
        pTags.push(<Ptag
          beerSearch={this.props.beerSearch}
          selectBeer={this.selectBeer}
          id={this.props.beerSearch[i].id}
          onClick={this.selectBeer}
          innerHTML={this.props.beerSearch[i].name}
          />)
      }
      return(
        <div id="beer-container">
          <h2>Click on a beer!</h2>
          {pTags}
        </div>
      )
    } else if (this.state.beerShow === true) {
      return (
        <ShowBeer
          currentBeerId={this.props.currentBeerId}
      />
      )
    }
  }
});

var Ptag = React.createClass ({
  render: function(){
    console.log(this.props.beerSearch.length);
    return (
      <p id={this.props.id} className={this.props.innerHTML} onClick={this.props.onClick}>{this.props.innerHTML}</p>
    )
  }
});

var ShowBeer = React.createClass({
  render: function() {
    return (
      <p>Beer Name Goes Here</p>
    )
  }
});
// });
// var BrewerySearch = React.createClass ({
//   getInitialState: function() {
//   },
//   selectBrewery: function(e) {
//     e.preventDefault();
//   }
// });

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
  //This is an older version of the Ptag component
// var Ptag = React.createClass ({
//   render: function(){
//     console.log(this.props.beerSearch.length);
//     for (var i = 0; i < this.props.beerSearch.length; i++) {
//       console.log(i);
//       return (
//         <p id={this.props.beerSearch[i].id} onClick={this.props.selectBeer}>{this.props.beerSearch[i].name}</p>
//       )
//     }
//   }
// });