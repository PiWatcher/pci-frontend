// styling
import './Room.css';

// page imports
import React from 'react';
import upArrow from '../../images/Green_Arrow_Up.svg';
import downArrow from '../../images/Red_Arrow_Down.svg'
import horizontalLine from '../../images/Horizontal_Line.svg';
import { Dropdown } from 'semantic-ui-react';

// contexts
import { DataContext } from '../../contexts/DataContext';



const User = (props) => {

    // consume props
    const { name, email, role, selectUser } = props;

    return (
        <li key={email} onClick={() => selectUser(email)}>
            <div className="user-list-option">
                <div className="name">
                    <p>
                        {name}
                    </p>
                </div>

                <div className="email">
                    <p>
                        {email}
                    </p>
                </div>

                <div className="role">
                    <p>
                        {role}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default User;
