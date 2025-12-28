import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import achievementService from "../services/achievements.js";
import {updateAchievement, deleteAchievementAction} from "../reducers/achievementsReducer.js"
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Button,
} from '@mui/material'
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {useDispatch, useSelector} from "react-redux";


const Achievement = () => {
    const id = useParams().id
    const [achievement, setAchievement] = useState(null);
    const [rolePath, setRolePath] = useState('users');
    const [editEnabled, setEditEnabled] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(dayjs());

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const fetchAchievement = async () => {
        try {
            const achievementFromBackEnd = await achievementService.getAchievementById(id);
            setAchievement(achievementFromBackEnd);
            console.log('achievement', achievementFromBackEnd);
            if (achievementFromBackEnd.user.roles.map(r=>r.name).includes('coach')) {setRolePath('coaches');}
            if (achievementFromBackEnd.user.roles.map(r=>r.name).includes('member')) {setRolePath('members');}

            console.log('path', rolePath);
            setType(achievement.type);
            setDescription(achievement.description);
            setDate(dayjs(achievement.date));
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!achievement) {
            void fetchAchievement();
        }
    }, [])

    const readableDate = date ? dayjs(date).format('MMMM D, YYYY') : null;

    const handleDelete = async (id) => {
        console.log('achievement', achievement);
        try {
            if (window.confirm("Are you sure you want to delete this achievement?")) {
                await dispatch(deleteAchievementAction(id));
                navigate('/achievements')
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (!achievement|| !user) {
        return "Loading...";
    }
    return (
    <TableContainer component={Paper}>
        <Table>
            <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '80%' }} />
            </colgroup>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                        Achievement
                    </TableCell>
                    <TableCell>
                        {editEnabled ? (
                            <TextField
                                type="text"
                                value={type}
                                onChange={({target})=> setType(target.value)}
                                fullWidth
                            />
                        ) : (
                            <div>{achievement.type}</div>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                        Description
                    </TableCell>
                    <TableCell>
                        {editEnabled ? (
                            <TextField
                                type="text"
                                value={description}
                                onChange={({target})=> setDescription(target.value)}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        ) : (
                            <div>{achievement.description}</div>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                        Date
                    </TableCell>
                    <TableCell>
                        {editEnabled ? (
                            <DatePicker
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                    },
                                }}
                            />
                        ) : (
                            <div>{readableDate}</div>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                        User
                    </TableCell>
                    <TableCell>
                        {achievement.user.firstName} {achievement.user.lastName}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                        Belt
                    </TableCell>
                    <TableCell>{achievement.user.belt}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ bgcolor: '#f5f5f5' }}></TableCell>
                    <TableCell>
                        <Button
                            color="primary"
                            variant="contained"
                            component={Link}
                            to={`/${rolePath}/${achievement.user.id}`}
                        >
                            View User
                        </Button>
                    </TableCell>
                </TableRow>
                {user.roles.includes('admin') && (
                    <TableRow>
                    <TableCell>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={async () => {
                                if (editEnabled) {
                                    try {
                                        const updatedInfo = {
                                            type,
                                            description,
                                            date: date.format('YYYY-MM-DD') // Format for backend
                                        };

                                        const updatedAchievement = await achievementService.updateAchievement(id, updatedInfo);
                                        dispatch(updateAchievement(updatedAchievement))
                                        setAchievement(updatedAchievement);
                                        setEditEnabled(false);
                                    } catch (error) {
                                        console.error('Error updating achievement:', error);
                                    }
                                } else {
                                    setEditEnabled(true);
                                }
                            }}
                        >
                            {editEnabled ? 'Save Changes' : 'Edit'}
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleDelete(achievement.id)}
                        >Delete</Button>
                    </TableCell>
                    <TableCell>
                        {editEnabled && (
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => {
                                        // Reset to original values
                                        setType(achievement.type);
                                        setDescription(achievement.description);
                                        setDate(dayjs(achievement.date));
                                        setEditEnabled(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                        )}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
    )
};

export default Achievement;