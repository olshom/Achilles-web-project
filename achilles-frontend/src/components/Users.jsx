import {useSelector} from "react-redux";
import User from "../components/User";
import {Link} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

const Users = () => {
    const users = useSelector(state => state.users)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {users.map(user =>(
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                                </TableCell>
                            </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
)}
export default Users;
