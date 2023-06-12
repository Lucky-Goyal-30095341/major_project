import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  width: '95%',
  borderRadius:"10px",
  height: "350px",
  zIndex: "10 !important",
  border:"2px solid #1a237e",
};


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    var points =[];
    const objLocation={Manufacture:props.mAddress, ThirdParty:props.tAddress, Delivery:props.dAddress};
    if(props.prodData[0][7].length !== 0) { points.push({latitude: props.prodData[0][6], longitude: props.prodData[0][7],info:"Manufacturer location ",key:"Manufacture"})};
    if(props.prodData[2][0].length !== 0) {points.push( {latitude: props.prodData[1][7], longitude: props.prodData[2][0],info:'Third Party Location',key:'ThirdParty'})};
    if(props.prodData[2][3].length !== 0) {points.push({latitude: props.prodData[2][2], longitude: props.prodData[2][3],info:'Delivery Hub Location',key:'Delivery'})};

    this.state = {
      stores: points,
      objLocation
    }
  }
  
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker  key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     title={store.info}
     
     onClick={() => alert(`${store.key} Location :${this.state.objLocation[store.key]}`)} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 28.7041, lng: 77.1025}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}
MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer);