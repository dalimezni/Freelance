import React from "react";
import Pin from "./Pin";
import MapGL, {
  Popup,
  Marker,
  GeolocateControl,
  setRTLTextPlugin,
  NavigationControl,
} from "react-map-gl";

const mapboxgl = require("mapbox-gl");

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};
const TOKEN =
  "pk.eyJ1IjoiYWRlbHN5c2FkbSIsImEiOiJja2l6dTJ6bGcxYnJnMzBueGNxNHRreGh5In0.UD5OqChKEu5KkORht8O3Ag"; // Set your mapbox token here

class GeoMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      // annonce: this.props.annonce[0],
      // match: this.props.match[0],
      disabled: true,
      methode: null,
      recherche:
        "Recherche en cours du veterinaire le plus proche à votre position !",

      vets: [],
      loading: "validating",
      navigate: false,
      viewport: {
        latitude: 36.8065,
        longitude: 10.1815,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      },
      popupInfo: true,

      routes: [],
      copied: false,
      ref: null,
      selectedStore: null,
      showMap: false,
    };
    console.log(props);
  }
  componentDidMount() {
    if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
      setRTLTextPlugin(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
        null,
        false
      );
    }
  }
  componentDidUpdate() {}

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    const {
      visible,
      confirmLoading,
      disabled,
      viewport,
      longitude,
      latitude,
      vets,
    } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          width="100%"
          height="350px"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />

          <Marker
            longitude={this.props.longitude}
            latitude={this.props.latitude}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <Pin size={40} />
          </Marker>
        </MapGL>
      </div>
    );
  }
}

export default GeoMap;
