import { useState, useEffect } from "react";
import GroupsService from "../services/groups.js";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    void fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const res = await GroupsService.getAllGroups();
    setGroups(res);
  };

  const handleDelete = async (id) => {
    await GroupsService.deleteGroup(id);
    setGroups(groups.filter((group) => group.id !== id));
  };

  const handleGroupCreate = async (event) => {
    event.preventDefault();
    const newGroup = {
      name,
      description,
    };
    const newGroupCreated = await GroupsService.addGroup(newGroup);
    setName("");
    setDescription("");
    setFormIsVisible(false);
    setGroups(groups.concat(newGroupCreated));
  };

  const handleGroupUpdate = async (event) => {
    event.preventDefault();
    const updatedGroup = {
      name,
      description,
    };
    const groupWasUpdated = await GroupsService.updateGroup(
      idToUpdate,
      updatedGroup,
    );
    setName("");
    setDescription("");
    setIdToUpdate(null);
    setFormIsVisible(false);
    setGroups(
      groups.map((g) => (g.id === groupWasUpdated.id ? groupWasUpdated : g)),
    );
  };

  const groupForm = () => {
    return (
      <Paper style={{ padding: "2rem", marginBottom: "2rem" }}>
        <form onSubmit={idToUpdate ? handleGroupUpdate : handleGroupCreate}>
          <TextField
            label="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setFormIsVisible(false);
              setIdToUpdate(null);
              setName("");
              setDescription("");
            }}
          >
            cancel
          </Button>
        </form>
      </Paper>
    );
  };

  return (
    <>
      <h2>Current groups</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(group.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={() => {
                      setFormIsVisible(true);
                      setIdToUpdate(group.id);
                      setName(group.name);
                      setDescription(group.description);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setFormIsVisible(true);
                  }}
                >
                  Add new group
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {formIsVisible && groupForm()}
    </>
  );
};

export default Groups;
