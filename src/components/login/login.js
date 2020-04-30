import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {styled} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {Redirect} from 'react-router-dom';
import {users} from "./users-data";


const StyledTextField = styled(TextField)({
    margin: '0 15px',
});


export default class Login extends Component {
    state = {
        user: '',
        password: '',
        error: false
    };
    onUserChange = (e) => {
        this.setState({
            user: e.target.value
        })
    };
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    onSubmit = (e) => {

        e.preventDefault();
        const {user, password} = this.state;
        const {onLogin} = this.props;
        if (users.some(u => u.user === user && u.password === password)) {
            onLogin();
        } else {
            this.setState({
                user: '',
                password: '',
                error: true
            });

        }

    };

    render() {
        const {error} = this.state;
        const {isLoggedIn} = this.props;
        if (isLoggedIn) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <Box height='95vh' alignItems="center" display='flex' justifyContent="center">
                <form autoComplete="off" onSubmit={this.onSubmit}>
                    <Box m={2} display='flex' justifyContent="center">
                        <Typography component='h2' variant='h3'>Login</Typography>
                    </Box>
                    <Box display='flex' justifyContent="center" m={2}>
                        <StyledTextField
                            error={error}
                            helperText={error ? 'Incorrect entry' : ' '}
                            required
                            id="filled-required"
                            label="Username"
                            value={this.state.user}
                            onChange={this.onUserChange}
                            name='user'

                        />
                        <StyledTextField
                            error={error}
                            helperText={error ? 'Incorrect entry' : ' '}
                            required
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            name='password'

                        />
                    </Box>

                    <Box display='flex' justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Send
                        </Button>
                    </Box>
                </form>
            </Box>
        )
    }
}

