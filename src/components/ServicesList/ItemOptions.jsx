import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ItemOptions = ({service_id, deleteItem}) => {
  const path = `/service/${service_id}`;
  const edit_path = `${path}/edit`;
  return(
    <div>
      {/*<Button color="link" onClick={() => deleteItem(service_id)}>Delete</Button>*/}
    </div>
  )
}

export default ItemOptions;
