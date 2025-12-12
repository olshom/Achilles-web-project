import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import dayjs from 'dayjs';
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";

const Event=({ event, open, setOpen, handleDelete, handleDeleteAll, handleUpdate }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {event.title}
            </DialogTitle>
            <DialogContent>
                <p><b>Date:</b> {dayjs(event.start).format('MMMM D, YYYY')}</p>
                <p>Time: {dayjs(event.start).format('H:mm')} - {dayjs(event.end).format('H:mm')}</p>
                <p><b>Groups:</b> {event.event.groups.map((group) => group.name).join(", ")}</p>
                <p><b>Uniform:</b> {event.uniform}</p>
                <p><b>Coach:</b> {event.coach.firstName + ' ' + event.coach.lastName}</p>
                <p>{event.description}</p>
                <Button onClick={handleDelete}>Delete</Button>
                <p>To preserve past training history, only future scheduled classes can be deleted.</p>
                {event.isRecurring&&<Button onClick={handleDeleteAll}>Delete all similar events</Button> }
                <Button onClick={handleUpdate}>Update current event</Button>
                {/*                {event.isRecurring&&<Button onClick={handleUpdateAll}>Update all similar events</Button> }*/}
            </DialogContent>
        </Dialog>
    )
}
export default Event;