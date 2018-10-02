import React from 'react';
import ItemOptions from './ItemOptions';

const DriverItemTable = ({driver, deleteItem, toggleActivation}) => {
  const { id, phone_number, active, license_number, user_id, public_service_permission_image, user } = driver;
  const permission_image = `${process.env.REACT_APP_BASE_URL}/${public_service_permission_image}`;
  console.log(driver)
  return(
    <tr>
      <th scope="row">{id}</th>
      <td>{license_number}</td>
      <td>{user_id}</td>
      <td>{user.email}</td>
      <td>{phone_number} {active}</td>
      <td>
        <a href={permission_image}>
          <img src={permission_image} style={{width: '100px'}}/>
        </a>
      </td>
      <td>
        <ItemOptions driver_id={id} active={active} deleteItem={deleteItem} toggleActivation={toggleActivation} />
      </td>
    </tr>
  )
}

export default DriverItemTable;
