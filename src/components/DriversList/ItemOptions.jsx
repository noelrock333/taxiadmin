import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ItemOptions = ({driver_id, deleteItem}) => {
  const path = `/user/${driver_id}`;
  const edit_path = `${path}/edit`;
  return(
    <div>
      {/*<Button color="link" onClick={() => deleteItem(driver_id)}>Delete</Button>*/}
    </div>
  )
}

export default ItemOptions;
