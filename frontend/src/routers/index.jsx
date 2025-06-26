import LoginLayout from "../components/layouts/login/LoginLayout.jsx";
import RegisterLayout from "../components/layouts/login/RegisterLayout.jsx";
import Profile from "../pages/user/profile/profile.jsx";
const UserRoute = [
    {path: '/profile', component: Profile}
]
const LayoutLogin = [
    {path: '/', component: LoginLayout},
    {path: '/register', component: RegisterLayout}
]
export {UserRoute, LayoutLogin};