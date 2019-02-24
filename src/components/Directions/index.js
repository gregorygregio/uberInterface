import React, {Component} from 'react';
import MapViewDirections from 'react-native-maps-directions';

export default class Directions extends Component {



    async componentDidMount() {
        console.log("componentDidMount");
    }

    render(){
        const { destination, origin, onReady } = this.props;
        return (
            <MapViewDirections 
                destination={destination}
                origin={origin}
                onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={onReady}
                onError={(errorMessage) => {
                    console.log('GOT AN ERROR');
                }}
                apikey="AIzaSyBuI_23X2KDrJF582x-G5iDxhNOvZ0Kow8"
                strokeWidth={3}
                strokeColor="#222"
            />
        );
    }

};