import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {Link, Route, Routes, useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {addAchievementAction, initializeAchievements} from "../reducers/achievementsReducer.js";
import {setUser} from "../reducers/userReducer.js";
import {
    TextField,
    Button,
    Autocomplete
} from "@mui/material";
import {initializeUsers} from "../reducers/usersReducer.js";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import Achievement from "./Achievement.jsx";


const Achievements = () => {
    const achievements = useSelector((state) => state.achievements);
    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [date, setDate] = useState(dayjs());


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        console.log('loggedUser', loggedUserJSON);
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
//            blogService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        dispatch(initializeAchievements());
    }, []);

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);

    const handleNewAchievement = async(event) => {
        event.preventDefault();
        await dispatch(addAchievementAction({date, type, description, userId: selectedUser.id}));
        setType('');
        setDescription('');
        setSelectedUser(null);
        setDate(dayjs());
        setFormIsVisible(false)
    }

    const addAchievementForm = () => (
        <form onSubmit={handleNewAchievement}>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    label="achievement"
                    type="text"
                    value={type}
                    onChange={({target})=> setType(target.value)}
                    required
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <TextField
                    label="description"
                    type="text"
                    value={description}
                    onChange={({target})=>setDescription(target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <Autocomplete
                    options={users || []}
                    getOptionLabel={(option) =>
                        `${option.lastName} ${option.firstName} (${option.username})`
                    }
                    value={selectedUser}
                    onChange={(event, newValue) => {
                        setSelectedUser(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select User"
                            placeholder="Start typing last name..."
                            required
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    filterOptions={(options, { inputValue }) => {
                        const filterValue = inputValue.toLowerCase();
                        return options.filter((option) =>
                            option.lastName.toLowerCase().startsWith(filterValue) ||
                            option.firstName.toLowerCase().startsWith(filterValue) ||
                            option.username.toLowerCase().includes(filterValue)
                        );
                    }}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
            <DatePicker
                label="Achievement Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        required: true,
                    },
                }}
            />
        </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="contained" color="primary" type="submit">
                add
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setFormIsVisible(false)}>
                cancel
            </Button>
            </div>
        </form>
    )

    if (!user) {
        return "Loading...";
    }

    return (
        <div>
            {user.roles.includes('coach'||'admin')&&!formIsVisible && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setFormIsVisible(true)}
                    style={{ marginBottom: '1rem' }}
                >
                    add new achievement
                </Button>
            )}
            {user.roles.includes('coach'||'admin')&&formIsVisible&&addAchievementForm()}
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {achievements.map(achievement =>(
                                <TableRow key={achievement.id}>
                                    <TableCell>
                                        <Link to={`/achievements/${achievement.id}`}>{achievement.type}</Link>
                                    </TableCell>
                                    <TableCell>
                                        {achievement.user.firstName} {achievement.user.lastName}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}
export default Achievements;