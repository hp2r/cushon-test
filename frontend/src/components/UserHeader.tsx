import { Button } from "@mui/material";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

interface UserHeaderProps {
    user: User;
}
  
const UserHeader = ({ user }: UserHeaderProps) => {

    const navigate = useNavigate();

    return (
        <div className="header-container" style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0'}}>
            <div className="header-text-info" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}> 
                <div data-testid={'welcome-text'}>Welcome, <strong>{user.name}</strong></div>
                <div data-testid={'balance-text'}>Your balance: <strong>{user.balance}</strong></div>
            </div>
            <Button data-testid={'view-history-btn'} data-cy={'view-history-btn'} onClick={() => navigate('/history')} variant="contained">View History</Button>
        </div>
    );
};

export default UserHeader;
  