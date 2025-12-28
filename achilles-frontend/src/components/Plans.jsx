import {useState, useEffect} from 'react';
import PlansService from '../services/plans.js';
import {
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Button, TextField,
} from "@mui/material";

const Plans = () => {
    const [plans, setPlans] = useState([])
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    useEffect(() => {
        void fetchPlans();
    }, []);

    const fetchPlans = async () => {
        const res = await PlansService.getAllPlans();
        setPlans(res);
    }

    const handlePlanCreate = async (event) => {
        event.preventDefault();
        const newPlan = {
            type,
            description,
            price: Number(price)
        };
        const newPlanCreated = await PlansService.addPlan(newPlan);
        setType('');
        setDescription('');
        setPrice('');
        setFormIsVisible(false);
        setPlans(plans.concat(newPlanCreated));
    }

    const handlePlanUpdate = async (event) => {
        event.preventDefault();
        const updatedPlan = {
            type,
            description,
            price: Number(price)
        };
        const PlanWasUpdated = await PlansService.updatePlan(idToUpdate, updatedPlan);
        setDescription('');
        setType('');
        setPrice('');
        setIdToUpdate(null);
        setFormIsVisible(false);
        setPlans(plans.map(p => p.id === PlanWasUpdated.id ? PlanWasUpdated : p));
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            await PlansService.deletePlan(id);
            setPlans(plans.filter(plan => plan.id !== id));
        }
    }

    const planFormFunction = () => {
        return (
            <Paper style={{ padding: '2rem', marginBottom: '2rem'  }}>
                <form onSubmit={idToUpdate?handlePlanUpdate:handlePlanCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                    <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} required/>
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)}
                               required/>
                    <TextField label="Price"  value={price} onChange={(e) => setPrice(e.target.value)}
                               required/>
                    <Button type="submit" variant="contained" color="primary">submit</Button>
                    <Button variant="outlined" color="secondary" onClick={()=> {
                        setFormIsVisible(false)
                        setType('')
                        setDescription('')
                        setPrice('')
                    }}>cancel</Button>
                </form>
            </Paper>
        )
    }

  return (
      <>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Current Plans</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {plans.map((plan) => (
                        <TableRow key={plan.id}>
                            <TableCell>{plan.type}</TableCell>
                            <TableCell>{plan.description}</TableCell>
                            <TableCell>{plan.price}</TableCell>
                            <TableCell>
                                <Button color="error" variant="contained" onClick={() => handleDelete(plan.id)} >Delete</Button>
                            </TableCell>
                            <TableCell>
                                <Button color="inherit"
                                        variant="contained"
                                        onClick={() => {
                                            setFormIsVisible(true)
                                            setIdToUpdate(plan.id)
                                            setType(plan.type)
                                            setDescription(plan.description)
                                            setPrice(plan.price)
                                        }}
                                        >Update</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Button color="primary" variant="contained" onClick={() => {
                                setFormIsVisible(true)
                            }} >Add new plan</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
          {formIsVisible&&planFormFunction()}
      </>
  );
}
export default Plans;