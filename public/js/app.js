// =========================
// King Component
// =========================
//Everything starts from here. Children: BeerSearch, BrewerySearch
var KingComponent = React.createClass ({
  getInitialState: function() {
    return {
      latitude: '',
      longitude: '',
      currentBeerId: '',
      currentBeerName: '',
      currentBeerData: '',
      currentBeerStyle: '',
      currentBreweryId: '',
      currentBreweryName: '',
      currentBreweryDistance: '',
      currentBreweryWebsite: '',
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
          brewerySearch: breweryList,
          display: 'brewery'
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
        console.log(data);
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
  selectingBeer: function(id, name, description, style) {
    console.log("this is id: "+ id)
    console.log("this is class: "+ name)
    console.log("this is description: "+ description)
    console.log("this is style: " + style)
    this.setState({
      currentBeerId: id,
      currentBeerName: name,
      currentBeerData: description,
      currentBeerStyle: style
    });
  },
  fromBeerToHome: function() {
    this.setState({
      display: ""
    });
  },
  selectingBrewery: function(id, name, distance, website) {
    console.log('testing selectingBrewery');
    this.setState({
      currentBreweryId: id,
      currentBreweryName: name,
      currentBreweryDistance: distance,
      currentBreweryWebsite: website
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
          currentBeerData={this.state.currentBeerData}
          currentBeerStyle={this.state.currentBeerStyle}
          fromBeerToHome={this.fromBeerToHome}
          />
      )
    } else if (this.state.display === 'brewery') {
        return (
          <BrewerySearch
            display={this.state.display}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            brewerySearch={this.state.brewerySearch}
            fromBeerToHome={this.fromBeerToHome}
            currentBreweryId={this.state.currentBreweryId}
            currentBreweryName={this.state.currentBreweryName}
            currentBreweryDistance={this.state.currentBreweryDistance}
            currentBreweryWebsite={this.state.currentBreweryWebsite}
            selectingBrewery={this.selectingBrewery}
          />
        )
    } else {
      return (
        <div>
          <button onClick={this.getUserLocation}>Find breweries near you!</button>
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
// =========================
// BeerSearch
// =========================
///Component for Beer Search Results. Children: ShowBeer, Ptag Parent: KingComponent
var BeerSearch = React.createClass ({
  getInitialState: function() {
    return {
      beerShow: false
    };
  },
  selectBeer: function(e) {
    e.preventDefault();
    console.log('selecting beer');
    // console.log(e.target.id);
    // console.log(e.target);
    console.log($(e.target).attr('name'));
    console.log($(e.target).attr('title'));
    this.props.selectingBeer(e.target.id, e.target.className, $(e.target).attr('name'), $(e.target).attr('title'));
    this.setState({
      beerShow: true
    });
  },
  unSelectBeer: function() {
    this.setState({
      beerShow: false
    });
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
        console.log(this.props.beerSearch[i]["style"]["description"])
        pTags.push(<Ptag
          beerSearch={this.props.beerSearch}
          selectBeer={this.selectBeer}
          id={this.props.beerSearch[i].id}
          onClick={this.selectBeer}
          innerHTML={this.props.beerSearch[i].name}
          description={this.props.beerSearch[i]["style"]["description"]}
          style={this.props.beerSearch[i]["style"]["name"]}
          />)
      }
      return(
        <div id="beer-container">
          <h2>Click on a beer!</h2>
          {pTags}
          <br/>
          <button onClick={this.props.fromBeerToHome}>Go Back</button>
        </div>
      )
    } else if (this.state.beerShow === true) {
      return (
        <ShowBeer
          currentBeerId={this.props.currentBeerId}
          currentBeerName={this.props.currentBeerName}
          currentBeerData={this.props.currentBeerData}
          currentBeerStyle={this.props.currentBeerStyle}
          unSelectBeer={this.unSelectBeer}
      />
      )
    }
  }
});
// =========================
// Ptag
// =========================
///Component for Beer search result list items. Children: None Parent: BeerSearch
var Ptag = React.createClass ({
  render: function(){
    return (
      <p id={this.props.id} className={this.props.innerHTML}
      name={this.props.description} title={this.props.style}
      onClick={this.props.onClick}>{this.props.innerHTML}</p>
    )
  }
});
// =========================
// ShowBeer
// =========================
///Component for Beer Show Page(in other words, for more detail on one specific beer). Children: BreweryByBeer Parent: BeerSearch
var ShowBeer = React.createClass({
  getInitialState: function() {
    return{
      breweryDisplay: false,
      thisList: [],
      message: "https://twitter.com/intent/tweet?text=I%20like%20" + this.props.currentBeerName
    }
  },
  goBackToBeerList: function() {
    this.props.unSelectBeer();
  },
  undisplayBrewery: function() {
    this.setState({
      breweryDisplay: false
    });
  },
  showBreweries: function() {
    console.log('testing button');
    $.ajax({
      url: "beers/" + this.props.currentBeerId + "/breweries",
      type: "GET",
      success: function(data) {
        console.log(data["data"]);
        var thisList = [];
        for (var i = 0; i < data["data"].length; i++) {
          thisList.push(data["data"][i]);
        }
        this.setState({
          thisList: thisList,
          breweryDisplay: true
        });
      }.bind(this)
    })
  },
  render: function() {
    console.log(this.props);
    var showTheBreweries = [];
    if (this.state.breweryDisplay === false) {
      return (
        <div>
          <h2 id={this.props.currentBeerId}>{this.props.currentBeerName}</h2>
          <p>Style: {this.props.currentBeerStyle}</p>
          <p>{this.props.currentBeerData}</p>
          <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count"
          data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share this beer on Facebook!</a></div>
          <a className="twitter-share-button"
          href={this.state.message}
          data-size="large">Tweet this beer!</a>
          <br/>
          <button onClick={this.showBreweries}>Click to find breweries with this beer!</button>
          <br/>
          <button onClick={this.goBackToBeerList}>Go Back</button>
        </div>
      )
    } else if (this.state.breweryDisplay === true) {
      for (var i = 0; i < this.state.thisList.length; i++) {
        console.log(i);
        showTheBreweries.push(<BreweryByBeer
          breweryName={this.state.thisList[i].name}
          breweryDescription={this.state.thisList[i].description}
          website={this.state.thisList[i].website}
          />)
        }
      }
      return (
        <div>
          <h2 id={this.props.currentBeerId}>{this.props.currentBeerName}</h2>
          <p>Style: {this.props.currentBeerStyle}</p>
          <p>{this.props.currentBeerData}</p>
          <h2>Breweries with {this.props.currentBeerName}</h2>
          {showTheBreweries}
          <button onClick={this.undisplayBrewery}>Hide Breweries</button>
        </div>
      )
  }
});
// =========================
// BreweryByBeer
// =========================
///Component for showing breweries that have the selected Beer. Children: N/A Parent: Show Beer
//BreweyByBeer needs Name, Description and Website
var BreweryByBeer = React.createClass ({
  goBack: function() {

  },
  render: function(){
    return (
      <div>
        <p>{this.props.breweryName}</p>
        <p>{this.props.breweryDescription}</p>
        <a href={this.props.website}>{this.props.website}</a>
      </div>
    )
  }
});
// =========================
// BrewerySearch
// =========================
///Component for Brewery Search Results. Children: BreweryListing, BreweryShow Parent: KingComponent
var BrewerySearch = React.createClass ({
  getInitialState: function() {
    return{
      breweryShow: false
    }
  },
  selectBrewery: function(e) {
    e.preventDefault();
    console.log('click test');
    this.props.selectingBrewery(e.target.id, e.target.className, $(e.target).attr('name'), $(e.target).attr('title'));
    this.setState({
      breweryShow: true
    });
  },
  unShowBrewery: function() {
    console.log('testing unShowBrewery');
    this.setState({
      breweryShow: false
    });
  },
  render: function() {
    var breweryResults = [];
    for (var i = 0; i < this.props.brewerySearch.length; i++) {
      breweryResults.push(
        <BreweryListing
        id={this.props.brewerySearch[i].brewery.id}
        breweryName={this.props.brewerySearch[i].brewery.name}
        distance={this.props.brewerySearch[i].distance}
        website={this.props.brewerySearch[i].brewery.website}
        handleClick={this.selectBrewery}
        />);
    }
    if (this.state.breweryShow === false) {
      return(
        <div>
          <h2>Breweries Near You</h2>
          {breweryResults}
          <button onClick={this.props.fromBeerToHome}>Go Back</button>
        </div>
      )
    } else {
      return(
        <BreweryShow
        id={this.props.currentBreweryId}
        name={this.props.currentBreweryName}
        distance={this.props.currentBreweryDistance}
        website={this.props.currentBreweryWebsite}
        unShowBrewery={this.unShowBrewery}
        />
      )
    }
  }
});
// =========================
// BreweryListing
// =========================
///Component for individual items within the Brewery Search Results. Children: N/A Parent: BrewerySearch
// Brewery Listing Needs: Name, Distance, and Id Optional: Region? Locality?
var BreweryListing = React.createClass ({
  render: function() {
    return(
      <p id={this.props.id} className={this.props.breweryName} name={this.props.distance} title={this.props.website} onClick={this.props.handleClick}>{this.props.breweryName}</p>
    )
  }
});
// =========================
// BreweryShow
// =========================
///Component for Specific Brewery information. Children: BeerByBrewery Parent: BrewerySearch
var BreweryShow = React.createClass ({
  getInitialState: function() {
    return{
          displayBeer: false,
          thisList: []
    }
  },
  handleClick: function() {
    console.log("I'll put beer here maybe");
    $.ajax({
      url: "/beers/" + this.props.id + "/beers/",
      type: "GET",
      success: function(data) {
        console.log(data["data"]);
        var myList = [];
        for (var i = 0; i < data["data"].length; i++) {
          myList.push(data["data"][i]);
        }
        console.log(myList);
        this.setState({
          displayBeer: true,
          thisList: myList
        });
        console.log(this.state.thisList);
      }.bind(this)
    })
  },
  hideBeer: function() {
    console.log('testing hideBeer');
    this.setState({
      displayBeer: false
    });
  },
  render: function() {
    if (this.state.displayBeer === false) {
      return(
        <div>
          <p id={this.props.id}>Name: {this.props.name}</p>
          <p>Distance from you: {this.props.distance} miles</p>
          <a href={this.props.website}>{this.props.website}</a>
          <br/>
          <button onClick={this.handleClick}>Check out the beers this brewery has!</button>
          <br/>
          <button onClick={this.props.unShowBrewery} >Back to Search Results</button>
        </div>
      )
    } else if (this.state.displayBeer === true) {
      console.log('testing display beer');
      var listOfBeer = [];
        for (var i = 0; i < this.state.thisList.length; i++) {
          console.log(this.state.thisList[i]["style"].name);
          listOfBeer.push(<BeerByBrewery
            beerName={this.state.thisList[i].name}
            style={this.state.thisList[i]["style"].name}
            />)
        }
      return(
        <div>
          <p id={this.props.id}>Name: {this.props.name}</p>
          <p>Distance from you: {this.props.distance} miles</p>
          <a href={this.props.website}>{this.props.website}</a>
          {listOfBeer}
          <button onClick={this.hideBeer}>Hide Beer</button>
        </div>
      )
    }
  }
});
// =========================
// BeerByBrewery
// =========================
///Component for Beer Search Results given a Brewery. Children: N/A Parent: BreweryShow
var BeerByBrewery = React.createClass ({
  render: function() {
    return(
      <div>
        <p>Name: {this.props.beerName}</p>
        <p>Style: {this.props.style}</p>
      </div>
    )
  }
})
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