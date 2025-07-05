import About from "../components/layouts/profile/Profile.jsx";
import Profile from "../pages/user/profile/profile.jsx";
const UserRoute = [
  {
    path: "/profile",
    component: Profile,
    children: [
      { path: "about", component: About },
    ],
  },
];
export { UserRoute };
