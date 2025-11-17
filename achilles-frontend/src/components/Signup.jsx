import { TextField, Button } from '@mui/material';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useState} from "react";
import signupService from "../services/signup.js";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await signupService.signup({username, firstName, lastName, password});
            setUsername('');
            setFirstName('');
            setLastName('');
            setPassword('');
            navigate('/')
        } catch (error) {}

    }
    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <TextField
                        label="username"
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="firstName"
                        type="text"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="lastName"
                        type="text"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        sign up
                    </Button>
                    <Link  to="/login" >Log in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup