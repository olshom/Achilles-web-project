import { Link, useParams, useNavigate } from "react-router-dom";
import usersService from "../services/users.js";
import { useEffect, useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { initializeGroups } from "../reducers/groupsReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { initializePlans } from "../reducers/plansReducer.js";
import { initializeRoles } from "../reducers/rolesReducer.js";
import {
  updateUser,
  deleteUser,
  deleteUserAction,
} from "../reducers/usersReducer.js";

const User = () => {
  const id = useParams().id;
  console.log(id);
  const [userForView, setUserForView] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [belt, setBelt] = useState("");
  const [planId, setPlanId] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [groupId, setGroupId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const groups = useSelector((state) => state.groups);
  const plans = useSelector((state) => state.plans);
  const roles = useSelector((state) => state.roles);

  const fetchUser = async () => {
    try {
      const user = await usersService.getUserById(id);
      setUserForView(user);
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGroupId(user.group?.id ?? "");
      setBelt(user.belt ?? "");
      setUserRoles(user.roles?.map((role) => role.id));
      setPlanId(user.plan?.id ?? "");
      console.log("first", userRoles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userForView) {
      void fetchUser();
    }
  }, []);

  useEffect(() => {
    if (editEnabled) {
      dispatch(initializeGroups());
      dispatch(initializePlans());
      dispatch(initializeRoles());
    }
  }, [editEnabled]);

  const handleDeleteUser = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await dispatch(deleteUserAction(id));
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userForView) {
    return "Loading...";
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "80%" }} />
        </colgroup>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Username
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <TextField
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              ) : (
                <div>{userForView.username}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              First name
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <TextField
                  type="text"
                  value={firstName}
                  onChange={({ target }) => setFirstName(target.value)}
                />
              ) : (
                <div>{userForView.firstName}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Last name
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <TextField
                  type="text"
                  value={lastName}
                  onChange={({ target }) => setLastName(target.value)}
                />
              ) : (
                <div>{userForView.lastName}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Email
            </TableCell>
            <TableCell>{userForView.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Group
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <FormControl>
                  <InputLabel></InputLabel>
                  <Select
                    name="groupId"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                  >
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <div>{userForView.group ? userForView.group.name : null}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Belt
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <TextField
                  type="text"
                  value={belt}
                  onChange={({ target }) => setBelt(target.value)}
                />
              ) : (
                <div>{userForView.belt || ""}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Roles:
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <FormControl>
                  <InputLabel></InputLabel>
                  <Select
                    multiple
                    value={userRoles}
                    onChange={(e) => {
                      console.log("e.target.value  ", e.target.value);
                      setUserRoles(e.target.value);
                      console.log("userRoles  ", userRoles);
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <div>
                  {userForView.roles?.map((role) => role.name).join(", ") ||
                    "No roles"}
                </div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
              Plan
            </TableCell>
            <TableCell>
              {editEnabled ? (
                <FormControl>
                  <InputLabel></InputLabel>
                  <Select
                    name="planId"
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                  >
                    {plans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.id}>
                        {plan.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <div>{userForView.plan ? userForView.plan.type : null}</div>
              )}
            </TableCell>
          </TableRow>
          {/* First row for achievements label */}
          {userForView.achievements && userForView.achievements.length > 0 && (
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", bgcolor: "#f5f5f5" }}>
                Achievements
              </TableCell>
              <TableCell>
                {userForView.achievements[0].type}
                <Button
                  color="inherit"
                  variant="contained"
                  component={Link}
                  to={`/achievements/${userForView.achievements[0].id}`}
                >
                  show more
                </Button>
              </TableCell>
            </TableRow>
          )}

          {/* Additional rows for remaining achievements */}
          {userForView.achievements?.slice(1).map((achievement, index) => (
            <TableRow key={achievement.id || index}>
              <TableCell></TableCell>
              <TableCell>
                {achievement.type}
                <Button
                  color="inherit"
                  variant="contained"
                  component={Link}
                  to={`/achievements/${achievement.id}`}
                >
                  show more
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {user.roles.includes("admin") && (
            <TableRow>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={async () => {
                    if (editEnabled) {
                      const updatedUser = {
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        belt: belt,
                        planId: planId,
                        roles: userRoles,
                        groupId: groupId,
                      };
                      const updUser = await usersService.updateUser(
                        id,
                        updatedUser,
                      );
                      dispatch(updateUser(updUser));
                      setUserForView(updUser);
                      setEditEnabled(false);
                    } else {
                      setEditEnabled(true);
                    }
                  }}
                >
                  Update user info
                </Button>

                {editEnabled && (
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditEnabled(false)}
                    >
                      cancel
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleDeleteUser(userForView.id);
                      }}
                    >
                      Delete user
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default User;
