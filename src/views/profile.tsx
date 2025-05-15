import React from "react";
import { ProfileDetails } from "../components/profile/details";
import { UserLayout } from "../layouts/user-layout";

export const Profile = () => {
  return (
    <UserLayout>
      <ProfileDetails />
    </UserLayout>
  );
};
