import HeaderCover from "../../../components/layouts/headercover/HeaderCover";
import { Outlet } from "react-router-dom";
function Profile() {
    return ( 
        <>
            <HeaderCover>
            </HeaderCover>
            <Outlet />
        </>
     );
}

export default Profile;