import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";

const Event=({ event, open, setOpen, handleDelete, handleDeleteAll }) => {
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
                <p>{event.start.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false

                })} - {event.end.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false

                })}</p>
                <p><b>Groups:</b> {event.groups}</p>
                <p><b>Uniform:</b> {event.uniform}</p>
                <p>{event.description}</p>
                <Button onClick={handleDelete}>Delete</Button>
                {event.isRecurring&&<Button onClick={handleDeleteAll}>Delete all similar events</Button> }
{/*                <Button onClick={handleUpdate}>Update current event</Button>
                {event.isRecurring&&<Button onClick={handleUpdateAll}>Update all similar events</Button> }*/}
            </DialogContent>


        </Dialog>
    )
}
export default Event;