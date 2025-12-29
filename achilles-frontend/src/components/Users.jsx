import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { selectUsersByRole } from "../selectors/usersSelectors.js";
import { initializeUsers } from "../reducers/usersReducer.js";

const Users = ({ role, url }) => {
  const dispatch = useDispatch();
  const memoizedSelectUsers = useMemo(() => selectUsersByRole(role), [role]);
  const selectUsersMemoized = useSelector((state) =>
    memoizedSelectUsers(state),
  );
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {selectUsersMemoized.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/${url}/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Users;
