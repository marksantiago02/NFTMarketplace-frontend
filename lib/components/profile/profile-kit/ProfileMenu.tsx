import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileFooter from "./ProfileFooter";

import "./profile.css";

const ProfileMenu = () => {
  return (
    <div className="box bg-dark-blue divide-y-1 divide-white/10 bg-gradient-to-b from-white/0 to-white/10">
      <ProfileHeader />
      <ProfileBody />
      <ProfileFooter />
    </div>
  );
}

export default ProfileMenu;