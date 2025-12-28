import {useEffect, useState} from "react";
import RolesService from '../services/roles.js'
import {
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableRow,
    TableHead,
    Paper, Button,} from "@mui/material";
import {Link} from "react-router-dom";

const Roles = () => {
    const [roles, setRoles] = useState([])

    const paths = {
        admin: '/admins/',
        member: '/members/',
        coach: '/coaches/',
    }

    useEffect(() => {
        void fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const res = await RolesService.getAllRoles();
        setRoles(res);
    }
    return (
        <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                    <TableCell>Current roles</TableCell>
                </TableRow>
            </TableHead>
            <Table>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>
                                <Button color="inherit"
                                        variant="contained" component={Link}
                                        to={`${paths[role.name]}`}>Show users</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Roles