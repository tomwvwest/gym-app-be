import { BrowseSingleUserContainer } from "./BrowseSingleUserContainer";

export const BrowseUsersContainer = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.user_id} className=" flex justify-center">
            
              <BrowseSingleUserContainer user={user} />
          </div>
        );
      })}
    </>
  );
};
