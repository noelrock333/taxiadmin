import React from 'react';
import ItemOptions from './ItemOptions';

const OrganizationItemTable = ({organization, deleteItem}) => {
  const { id, name } = organization;
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>
          <ItemOptions org_id={id} deleteItem={deleteItem}/>
      </td>
    </tr>
  )
}

export default OrganizationItemTable;
