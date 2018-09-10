import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ItemOptions = ({trip_id, deleteItem}) => {
  const path = `/trip/${trip_id}`;
  const edit_path = `${path}/edit`;
  const confirmDelete = () => {
    var opcion = window.confirm("Eliminar?");
    if (opcion == true) {
      deleteItem(trip_id)
    }
  } 
  return(
    <div>
      <Button color="link" onClick={() => confirmDelete(trip_id)}>Eliminar</Button>
    </div>
  )
}

export default ItemOptions;
