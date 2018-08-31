import React from 'react';
import { Alert } from 'reactstrap';

const AlertMessage = ({alertType = "danger", message}) => {
  return(
    <div>
      <Alert color={alertType}>
        {message}
      </Alert>
    </div>
  )
}

export default AlertMessage;
