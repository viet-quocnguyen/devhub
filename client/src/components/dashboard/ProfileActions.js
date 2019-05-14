import React from "react";
import { Link } from "react-router-dom";
function ProfileActions() {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-edit text-info mr-1" /> Edit Profile
      </Link>
    </div>
  );
}
export default ProfileActions;
