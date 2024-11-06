import { Button } from "@mui/material";
import { User } from "../types/user";

interface UserHeaderProps {
    user: User;
    link: any;
}
  
const UserHeader = ({ user, link }: UserHeaderProps) => {

    return (
        <>
            <div>
                <div>Welcome, {user.name}</div>
                <div>Your balance: {user.balance}</div>
            </div>
            <Button data-cy={'view-history-btn'} component={link} to="/history">View History</Button>
        </>
    );
};

export default UserHeader;
  