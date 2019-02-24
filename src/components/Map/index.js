import React, {Component, Fragment} from 'react';

import { View } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Search from '../Search';
import Directions from '../Directions';
import getPixels from '../../utils';

import markerImage from '../../../assets/marker.png';
import {LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall} from './styles';


export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
    }


    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {

                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    }
                });
            },
            (error) => {
                console.log("deu ruim");
                console.log(error);
            },
            {
                timeout: 8000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    }


    handleLocationSelected = (data, {geometry}) => {
        const { location: { lat: lati, lng: longi } } = geometry;


        const destination = {
            latitude: (lati),
            longitude: (longi),
            title: data.structured_formatting.main_text,
        };

        this.setState({
            destination: {
                latitude: (lati),
                longitude: (longi),
                title: data.structured_formatting.main_text,
            }
        });
    };

    render() {
        const { region, destination, duration } = this.state;
        console.log(region, destination);
        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex:1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    { destination && (
                        <Fragment>
                            <Directions 
                            origin={region} 
                            destination={destination}
                            onReady={ result => { 
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                    right: getPixels(50),
                                    bottom: getPixels(50),
                                    left: getPixels(50),
                                    top: getPixels(50),
                                    }
                                }); 

                                this.setState({
                                    duration: Math.floor(result.duration)
                                });
                            }}
                            />

                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={markerImage}
                            >
                                <LocationBox>
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>



                            <Marker
                                coordinate={region}
                                anchor={{ x: 0, y: 0 }}
                            >
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>Rua antonio melato</LocationText>
                                </LocationBox>
                            </Marker>

                        </Fragment>
                    )}
                </MapView>
                <Search onLocationSelected={this.handleLocationSelected} />
            </View>
        );
    }
}