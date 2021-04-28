
// styling
import './RoleList.css';

// page imports
import React, { useState, useEffect, useCallback } from 'react';

// components
import Role from './Role';


/** 
* Component: RoleList
* 
* Maps all pulled roles to role components and displays them within the list
*
* @param {props} props
*/
const RoleList = (props) => {

   const {

      // {list} pulled roles from the back end database
      roles,

      // {function} to pull roles from the back end database
      pullRoles

   } = props;

   const [search, setSearch] = useState('');

   const [filteredRoleList, setFilteredRoleList] = useState([]);


   /** 
   * Function: handleRoleSearch
   * 
   * Takes user search input and sets to state
   * 
   * @param {event} event
   */
   const handleRoleSearch = (event) => {
      if (event.target.id === "roleSearch") {
         setSearch(event.target.value);
      }
   }

   /** 
   * Function: handleRoleFilter
   * 
   * Filters displayed roles based on the state of the search bar
   */
   const handleRoleFilter = useCallback(() => {

      // filters by role name
      let filteredRoles = roles.filter(function (item) {
         return item['role_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })

      // maps only roles that match search query
      let filtered =
         filteredRoles.map((role) =>
            <Role
               key={role.role_name}
               name={role.role_name}
               isAdmin={role.is_admin}
               canViewRaw={role.can_view_raw}
               pullRoles={pullRoles}
            />)

      // sets filtered list state
      setFilteredRoleList(filtered);

   }, [roles, search, pullRoles]);


   /** 
   * Function: useEffect
   * 
   * Refilters the list of roles every time the search state changes
   */
   useEffect(() => {

      handleRoleFilter();

   }, [search, handleRoleFilter])


   /** 
   * Return: RoleList JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="role-list-component">
         <p>Available Roles</p>
         <input type="text" id="roleSearch" onChange={handleRoleSearch} placeholder="Role search" value={search} />
         <div className="role-list">
            <ul>
               {filteredRoleList}
            </ul>
         </div>
      </div>
   )
}

export default RoleList;
