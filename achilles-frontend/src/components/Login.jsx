import { TextField, Button } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginAction, setUser} from "../reducers/userReducer.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log('User changed:', user)
        if (user) navigate('/events');
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginAction(username, password));
            console.log(username);
            navigate('/events');
            setUsername('');
            setPassword('');
        } catch (error) {
//            dispatch(setErrorNotificationWTimer(`${error.response.data.error}`, 5));
            setUsername('');
            setPassword('');
        }
    };


    return (
        <div>
            <h2>log in</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label="username"
                        type="text"
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="password"
                        type='password'
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        log in
                    </Button>
                    <Link to="/signup">sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login