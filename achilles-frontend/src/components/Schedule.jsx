
import {
    TableCell,
    Paper, Button,
} from '@mui/material'
import dayjs from 'dayjs';
import schedulesService from "../services/schedules.js";


const Schedule = ({schedule, handleDeleteSchedule}) => {
/*    const handleDelete = async(scheduleId) => {
        if(window.confirm("Are you sure you want to delete this schedule?"))
        {
            await schedulesService.deleteSchedule(scheduleId);
        }

//        window.location.reload();
    }*/


    return (
        <>
            <TableCell>{dayjs(schedule.start).format('MMMM D, YYYY')} - {dayjs(schedule.end).format('MMMM D, YYYY')}</TableCell>
            <TableCell>{schedule.monday ? 'Mon ' : ''}{schedule.tuesday ? 'Tue ' : ''}{schedule.wednesday ? 'Wed ' : ''}{schedule.thursday ? 'Thu ' : ''}{schedule.friday ? 'Fri ' : ''}{schedule.saturday ? 'Sat ' : ''}{schedule.sunday ? 'Sun ' : ''}</TableCell>
            <TableCell>{schedule.groupsForEvent.map(group=>group.name).join(', ')}</TableCell>
            <TableCell>
                {(dayjs(schedule.end)>new Date())&&
                <Button variant="contained" color="error" onClick={() => handleDeleteSchedule(schedule.id)}>
                    Delete</Button>
                }
            </TableCell>
        </>
    );
}

export default Schedule;