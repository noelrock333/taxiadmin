import React from 'react';
import ItemOptions from './ItemOptions';

const UserItemTable = ({user, deleteItem}) => {
  const { id, full_name, email, phone_number } = user;
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{full_name}</td>
      <td>{email}</td>
      <td>{phone_number}</td>
      <td><ItemOptions user_id={id} deleteItem={deleteItem}/></td>
    </tr>
  )
}

export default UserItemTable;
