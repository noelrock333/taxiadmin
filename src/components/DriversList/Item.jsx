import React from 'react';
import ItemOptions from './ItemOptions';

const DriverItemTable = ({driver, deleteItem}) => {
  const { id, phone_number, license_number, user_id, public_service_permission_image, user } = driver;
  const permission_image = `http://cytio.com.mx/${public_service_permission_image}`;
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{license_number}</td>
      <td>{user_id}</td>
      <td>{user.email}</td>
      <td>{phone_number}</td>
      <td>
        <a href={permission_image}>
          <img src={permission_image} style={{width: '100px'}}/>
        </a>
      </td>
      <td>
        <ItemOptions driver_id={id} deleteItem={deleteItem} />
      </td>
    </tr>
  )
}

export default DriverItemTable;
