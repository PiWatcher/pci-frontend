// styling
import "./User.css"

// page imports
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// contexts
import { DataContext } from '../../contexts/DataContext';



const User = (props) => {

    // consume props
    const { name, email, role, roles } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
        console.log(roles);
    };

    // update per user

    return (
        <div>
            <li key={email}>
                <div className="user-list-option">
                    <div className="user-info">
                        <div className="user-name">
                            {name}
                        </div>
                        <div className="user-email">
                            {email}
                        </div>
                    </div>

                    <div className="user-role">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {role}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {roles.map((item) => {
                                <MenuItem onClick={handleClose}>{item}</MenuItem>
                            })}
                        </Menu>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default User;
