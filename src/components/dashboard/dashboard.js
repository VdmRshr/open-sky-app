import React from "react";
import {Container} from '@material-ui/core';
import {airports} from "./dashboard-content";
import AirportList from "../airports-list/airports-list";
import Typography from "@material-ui/core/Typography";
import {Redirect} from 'react-router-dom'


const Dashboard = ({isLoggedIn}) => {

    if (isLoggedIn) {
        return (
            <Container>
                <Typography component='h1' variant='h3' align='center'>Select airport to view flights</Typography>
                <AirportList airports={airports}/>
            </Container>
        )
    }
    return <Redirect to='/'/>

};
export default Dashboard;