import { Container, Button,   Toolbar,
    AppBar } from '@mui/material'
import Login from './components/Login'
import Signup from './components/Signup'
import {useEffect, useState} from "react";
import {Link, Navigate, Route, Routes, useMatch} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "./reducers/userReducer.js";
import Achievements from "./components/Achievements.jsx";
import User from "./components/User.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Achievement from "./components/Achievement.jsx";
import Events from "./components/Events.jsx";
import UsersPage from "./components/UsersPage.jsx";
import CoachesPage from "./components/CoachesPage.jsx";
import SchedulesPage from "./components/SchedulesPage.jsx";

function App() {
    const user = useSelector(({ user }) => user);
    const users = useSelector(({ users }) => users);
    const dispatch = useDispatch();

    const [loggedUser, setLoggedUser] = useState();
    useEffect(() => {
        if(!user){
            console.log('App effect running')
            const loggedUserJSON = window.localStorage.getItem('loggedUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                dispatch(setUser(user));
                setLoggedUser(user);
            }
        }
    }, []);

    const achievementMatch = useMatch('/achievements/:id');
    const achievementId = achievementMatch ? Number(achievementMatch.params.id):null;

    const matchUser = useMatch('/users/:id');
    const userOfClub = matchUser ? users.find((user) => user.id === Number(matchUser.params.id)) : null;


    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        dispatch(setUser(null));
    }

    if (loggedUser===undefined) {
        return null
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/events">
                            Events
                        </Button>
                        <Button color="inherit" component={Link} to="/achievements">
                            Achievements
                        </Button>
                        <Button color="inherit" component={Link} to="/members">
                            Members
                        </Button>
                        <Button color="inherit" component={Link} to="/coaches">
                            Coaches
                        </Button>
                        {!user ? (<div style={{display: 'flex', gap: '1rem', marginLeft: 'auto'}}>
                            <Button color="inherit" component={Link} to="/login">
                                login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                signup
                            </Button>
                        </div>) : (
                            <div style={{display: 'flex', gap: '1rem', marginLeft: 'auto'}}>
                                <h3>{user.username} logged-in</h3>
                                <Button color="inherit" onClick={handleLogout}>
                                    logout
                                </Button>
                            </div>
                        )}

                    </Toolbar>
                </AppBar>
                <Container sx={{marginTop: 2}}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/events" replace/>} />
                        <Route path="/login" element = {!user ? <Login/> : <Navigate to="/events" replace />}/>
                        <Route path="/events" element={<Events />}/>
                        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/events" replace />}/>
                        <Route path="/members" element={user ? <UsersPage/> : <Navigate to="/login" replace />}/>
                        <Route path="/coaches" element={<CoachesPage/>}/>
                        <Route path="/members/:id" element={user ? <User user={userOfClub}/> : <Navigate to="/login" replace />}/>
                        <Route path="/coaches/:id" element={user ? <User user={userOfClub}/> : <Navigate to="/login" replace />}/>
                        <Route path="/achievements" element={user ? <Achievements/> : <Navigate to="/login" replace />}/>
                        <Route path="/achievements/:id" element={user ? <Achievement achievementId={achievementId}/> : <Navigate to="/login" replace />}/>
                        <Route path="/schedules" element={user.roles.includes('admin') ? <SchedulesPage/> : <Navigate to="/events" replace />}/>
                    </Routes>
                </Container>
        </LocalizationProvider>
    )
}

export default App
