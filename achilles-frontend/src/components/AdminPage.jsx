import Groups from "./Groups.jsx";
import Roles from "./Roles.jsx";
import Plans from "./Plans.jsx";

const AdminPage = () => {
    return (
        <>
            <h1>Admin Page</h1>
            <Roles />
            <Groups />
            <Plans />
        </>
    )
}

export default AdminPage;