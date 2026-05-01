import { useProfile } from "../Context/ProfileContext";
import "./ProfileSwitcher.css";

function ProfileSwitcher() {
  const { profiles, setActiveProfile } = useProfile();

  return (
    <div className="profile-container">
      <h1 className="profile-title">Who's Watching?</h1>
      <div className="profile-grid">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => setActiveProfile(profile)}
          >
            <div
              className="profile-avatar"
              style={{ backgroundColor: profile.color }}
            >
              {profile.avatar}
            </div>
            <p className="profile-name">{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSwitcher;