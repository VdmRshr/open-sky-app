import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import ErrorIndicator from "../error-indicator/error-indicator";


const FlightsTable = ({data}) => {
    const getNormalDateFormat = (date) => {
        return moment.unix(date).format("YYYY-MM-DD HH:mm");
    };

    let tableContent;
    if (!data) {
        tableContent = (
            <TableBody>
                <TableRow>
                    <TableCell>
                       <ErrorIndicator/>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    } else {
        tableContent = (
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.icao24 + row.firstSeen}>
                        <TableCell component="th" scope="row">
                            {row.icao24}
                        </TableCell>
                        <TableCell align="right">{row.callsign}</TableCell>
                        <TableCell align="right">{row.estArrivalAirport}</TableCell>
                        <TableCell align="right">{row.estDepartureAirport}</TableCell>
                        <TableCell align="right">{getNormalDateFormat(row.firstSeen)}</TableCell>
                        <TableCell align="right">{getNormalDateFormat(row.lastSeen)}</TableCell>
                    </TableRow>
                ))

            }</TableBody>
        )
    }


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>icao24</TableCell>
                        <TableCell align="right">callsign</TableCell>
                        <TableCell align="right">Arrival Airport</TableCell>
                        <TableCell align="right">Departure Airport</TableCell>
                        <TableCell align="right">Time Of Departure</TableCell>
                        <TableCell align="right">Time Of Arrival</TableCell>
                    </TableRow>
                </TableHead>

                {tableContent}

            </Table>
        </TableContainer>
    )

};
export default FlightsTable;