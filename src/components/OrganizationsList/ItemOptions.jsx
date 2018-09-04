import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ItemOptions = ({org_id, deleteItem}) => {
  const path = `/organization/${org_id}`;
  const edit_path = `${path}/edit`;
  return(
    <div>
      <Link to={path}>Show </Link>
      <Link to={edit_path}> Edit </Link>
      {/*<Button color="link" onClick={() => deleteItem(org_id)}>Delete</Button>*/}
    </div>
  )
}

export default ItemOptions;
