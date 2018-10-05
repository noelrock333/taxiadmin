import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ItemOptions = ({user_id, deleteItem}) => {
  const path = `/user/${user_id}`;
  const edit_path = `${path}/edit`;
  return(
    <div>
      <Link to={path}>Show </Link>
      <Link to={edit_path}> Edit </Link>
      <Button color="link" onClick={() => deleteItem(user_id)}>Delete</Button>
    </div>
  )
}

export default ItemOptions;
//No longer needed
