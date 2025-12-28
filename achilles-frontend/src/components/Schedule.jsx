
import {
    TableCell, Button,
} from '@mui/material'
import dayjs from 'dayjs';

const Schedule = ({schedule, handleDeleteSchedule}) => {
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