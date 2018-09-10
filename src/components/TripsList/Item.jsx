import React from 'react';
import ItemOptions from './ItemOptions';
import moment from 'moment';

const TripItemTable = ({trip, deleteItem}) => {
  const { id, address_origin, status, user_id, created_at, user, driver } = trip;
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{status}</td>
      <td>{user.full_name}</td>
      <td>{driver ? driver.user.full_name : 'Sin asignar'}</td>
      <td>{address_origin}</td>
      <td>{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td>{moment(created_at).fromNow()}</td>
      <td>
        <ItemOptions trip_id={id} deleteItem={deleteItem} />
      </td>
    </tr>
  )
}

export default TripItemTable;
