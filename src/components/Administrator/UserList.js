
// styling
import './UserList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';

// components
import User from './User';


/** 
* Component: UserList
* 
* Maps all pulled users to user components and displays them within the list
*/
const UserList = (props) => {

   const { users, roles, pullUsers } = props;

   const [search, setSearch] = useState('');

   const [filteredUserList, setFilteredUserList] = useState([]);


   /** 
   * Function: handleUserSearch
   * 
   * Takes user search input and sets to state
   */
   const handleUserSearch = (e) => {
      if (e.target.id === "userSearch") {
         setSearch(e.target.value);
      }
   }


   /** 
   * Function: handleUserFilter
   * 
   * Filters displayed users based on the state of the search bar
   */
   const handleUserFilter = useCallback(() => {

      // filters by name
      let filteredUsers = users.filter(function (item) {
         return item['full_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })

      // maps only users that match search query
      let filtered =
         filteredUsers.map((user) =>
            <User
               key={user.email}
               name={user.full_name}
               email={user.email}
               role={user.role}
               roles={roles}
               pullUsers={pullUsers}
            />)

      // sets list state
      setFilteredUserList(filtered);

   }, [users, roles, search, pullUsers]);


   /** 
   * Function: useEffect
   * 
   * Refilters the list of users every time the search state changes
   */
   useEffect(() => {

      handleUserFilter();

   }, [search, handleUserFilter])


   /** 
   * Return: UserList JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="user-list-component">
         <p>Registered Users</p>
         <input type="text" id="userSearch" onChange={handleUserSearch} placeholder="User search" value={search} />
         <div className="user-list">
            <ul>
               {filteredUserList}
            </ul>
         </div>
      </div>
   )
}

export default UserList;
