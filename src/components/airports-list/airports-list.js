import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {styled} from '@material-ui/core/styles';
import AirportModalContent from "../airport-modal/airport-modal-content";
import Dialog from '@material-ui/core/Dialog';


const Item = styled(Grid)({
    margin: '15px',
    minHeight: '200px',
    border: '1px solid grey',
    cursor: 'pointer',
    padding: '15px',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
});


export default class AirportList extends Component {
    state = {
        selectedItem: null,
        airportName: null,
        modalOpen: false
    };

    onItemSelected = (icao, name) => {
        this.setState({
            selectedItem: icao,
            airportName: name,
            modalOpen: true
        });
    };

    handleClose = () => {
        this.setState({
            modalOpen: false
        });
    };

    render() {

        return (
            <Grid container justify='center'>
                {this.props.airports.map(airport => (
                    <Item item key={airport.icao} lg={2} md={4} sm={6} xs={12}
                          onClick={() => this.onItemSelected(airport.icao, airport.name)}>
                        <Typography component='h4' align='center'>{airport.name}</Typography>
                    </Item>
                ))}
                <Dialog
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth='lg'
                >
                    <AirportModalContent selectedAirport={this.state.selectedItem} airportName={this.state.airportName}/>
                </Dialog>
            </Grid>
        )
    }
}
