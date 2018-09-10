import React from 'react';
import ItemOptions from './ItemOptions';

const ServiceItemTable = ({service, deleteItem}) => {
  const { id, name } = service;
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>
        <ItemOptions service_id={id} deleteItem={deleteItem} />
      </td>
    </tr>
  )
}

export default ServiceItemTable;
