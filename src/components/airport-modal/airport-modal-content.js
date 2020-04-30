import React, {Component} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from "@material-ui/core/Box";
import {styled} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FlightsTable from "../flights-table/flights-table";
import DialogContent from '@material-ui/core/DialogContent';
import OpenSkyService from "../../service/open-sky-service";


const ModalSelect = styled(Select)({
    width: '140px'
});


export default class AirportModalContent extends Component {
    openSkyService = new OpenSkyService();
    state = {
        minutes: null,
        arrivalData: null,
        departureData:null,
        error: false
    };

    onSelectChange = (event) => {

        this.setState({
            minutes: event.target.value
        })
    };

    componentDidMount() {
        this.getArrival();
        this.getDeparture()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.minutes !== prevState.minutes) {
            this.setState({
                arrivalData: null,
                departureData:null
            });
            this.getArrival();
            this.getDeparture()
        }

    }

    onError = () => {

    };

    getArrival() {
        const {selectedAirport} = this.props;
        const {minutes} = this.state;
        this.openSkyService.getArrival(selectedAirport, minutes)
            .then((arrivalData) => {
                this.setState({
                    arrivalData
                });
            })
            .catch(this.onError)

    };
    getDeparture() {
        const {selectedAirport} = this.props;
        const {minutes} = this.state;
        this.openSkyService.getDepartures(selectedAirport, minutes)
            .then(( departureData) => {
                this.setState({
                    departureData
                });
            })
            .catch(this.onError)

    }


    render() {
        const {arrivalData, departureData} = this.state;
        const {airportName} = this.props;

        return (
            <DialogContent>
                <Box m={2} >
                    <Typography component='h2'
                                variant='h4'
                                align='center'>
                        {airportName}
                    </Typography>
                </Box>
                <Box m={2} display='flex' justifyContent="center">
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Time Interval</InputLabel>
                        <ModalSelect
                            labelId="select"
                            id="select"
                            value={this.state.minutes}
                            onChange={this.onSelectChange}
                        >
                            <MenuItem value={10}>Ten minutes</MenuItem>
                            <MenuItem value={30}>Thirty minutes</MenuItem>
                            <MenuItem value={60}>One hour</MenuItem>
                        </ModalSelect>
                    </FormControl>
                </Box>
                <Box m={2}>
                    <Typography align='center' component='h3' variant='h5'>Arrival</Typography>
                    <FlightsTable
                        data={arrivalData}
                    />
                </Box>
                <Box m={2}>
                    <Typography align='center' component='h3' variant='h5'>Departure</Typography>

                    <FlightsTable
                    data={departureData}/>

                </Box>
            </DialogContent>

        )
    }


}


