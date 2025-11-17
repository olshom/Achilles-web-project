import {Link, useParams} from 'react-router-dom'
import usersService from "../services/users.js";
import {useEffect, useState} from "react";
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Button,
} from '@mui/material'

const User = ({initUser}) => {
    const id = useParams().id
    console.log(id)
    const [user, setUser] = useState(initUser)
    const [editEnabled, seTEditEnabled] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [belt, setBelt] = useState('');
    const [plan, setPlan] = useState('');
    const [plans, setPlans] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState({});
    const fetchUser = async () => {
        try {
            console.log("Fetching user...")
            const user = await usersService.getUserById(id);
            console.log(user)
            setUser(user);
            setUsername(user.username);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        console.log('useEffect - initialUser:', initUser, 'id:', id);
        if(!user) {
            void fetchUser()
        }
    }, [])

    useEffect(() => {
        if (editEnabled) {
            setGroups([])
            setRoles([])
            setPlans()
        }
    }, [editEnabled]);

    console.log(user);

    if (!user) {
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
                            Username
                        </TableCell>
                        <TableCell>
                            {editEnabled ? <TextField
                                type="text"
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                                /> : <div>{user.username}</div>}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            First name
                        </TableCell>
                        <TableCell>
                            {editEnabled ? <TextField
                            type="text"
                            value={firstName}
                            onChange={({target}) => setFirstName(target.value)}
                            /> : <div>{user.firstName}</div>}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Last name
                        </TableCell>
                        <TableCell>
                            {editEnabled ? <TextField
                                type="text"
                                value={lastName}
                                onChange={({target}) => setLastName(target.value)}
                            /> : <div>{user.lastName}</div>}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Email
                        </TableCell>
                        <TableCell>
                            {user.username}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Group
                        </TableCell>
                        <TableCell>
                            <FormControl>
                                <InputLabel></InputLabel>
                                <Select
                                    name="groupId"
                                    value={groupId}
                                    onChange={handleChange}
                                >
                                    {groups.map(group => (
                                        <MenuItem key={group.id} value={group.id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {user.group}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Belt
                        </TableCell>
                        <TableCell>
                            {user.belt}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Roles:
                        </TableCell>
                        <TableCell>
                            {user.roles?.map(role => role.name).join(', ') || 'No roles'}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                            Plan
                        </TableCell>
                        <TableCell>
                            {user.plan.type}
                        </TableCell>
                    </TableRow>
                    {/* First row for achievements label */}
                    {user.achievements && user.achievements.length > 0 && (
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Achievements</TableCell>
                            <TableCell>{user.achievements[0].type}</TableCell>
                        </TableRow>
                    )}

                    {/* Additional rows for remaining achievements */}
                    {user.achievements?.slice(1).map((achievement, index) => (
                        <TableRow key={achievement.id || index}>
                            <TableCell></TableCell>
                            <TableCell>{achievement.type}</TableCell>
                        </TableRow>
                    ))}
                <TableRow>
                    <TableCell>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => seTEditEnabled(!editEnabled)}
                        >
                            Update user info
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {deleteUser}}
                        >
                            Delete user
                        </Button>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default User;