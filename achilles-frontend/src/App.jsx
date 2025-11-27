import { Container, Button,   Toolbar,
    AppBar } from '@mui/material'
import Login from './components/Login'
import Signup from './components/Signup'
import {useEffect, useState} from "react";
import {Link, Route, Routes, useMatch} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "./reducers/userReducer.js";
import Users from "./components/Users.jsx"
import Achievements from "./components/Achievements.jsx";
import {initializeUsers} from "./reducers/usersReducer.js";
import User from "./components/User.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Achievement from "./components/Achievement.jsx";
import Events from "./components/Events.jsx";

function App() {
    const user = useSelector(({ user }) => user);
    const users = useSelector(({ users }) => users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);


    useEffect(() => {
        console.log('App effect running');
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
//            blogService.setToken(user.token);
        }
    }, [dispatch]);

    const achievementMatch = useMatch('/achievements/:id');
    const achievementId = achievementMatch ? Number(achievementMatch.params.id):null;

    const matchUser = useMatch('/users/:id');
    const userOfClub = matchUser ? users.find((user) => user.id === Number(matchUser.params.id)) : null;

    console.log('hii',user, users, userOfClub);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        dispatch(setUser(null));
    }

//    <Route path="/" element={{user === null ? (<Login />):(<Users />)}} />
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/events">
                            Events
                        </Button>
                        <Button color="inherit" component={Link} to="/achievements">
                            Achievements
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            Members
                        </Button>
                        <Button color="inherit" component={Link} to="/coaches">
                            Coaches
                        </Button>
                        {user && <h3>{user.name} logged-in</h3>}
                        {user && <div style={{display: 'flex', gap: '1rem', marginLeft: 'auto'}}>
                            <Button color="inherit" onClick={handleLogout}>
                            logout
                        </Button></div>}
                        {!user && <div style={{display: 'flex', gap: '1rem', marginLeft: 'auto'}}>
                            <Button color="inherit" component={Link} to="/login">
                                login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                signup
                            </Button>
                        </div>}

                    </Toolbar>
                </AppBar>
                <Container sx={{marginTop: 2}}>

                    <Routes>

                        <Route path="/login" element={<Login/>}/>

                        <Route path="/events" element={<Events />}/>

                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/users/:id" element={<User user={userOfClub}/>}/>
                        <Route path="/achievements" element={<Achievements/>}/>
                        <Route path="/achievements/:id" element={<Achievement achievementId={achievementId}/>}/>
                    </Routes>
                </Container>
            </>
        </LocalizationProvider>
    )
}

export default App
