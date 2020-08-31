import React, {useState} from 'react';
import * as apiOrders from '../../apis/apiOrders';
import {Modal} from '../common/Modal';

type Props = {
  show: boolean;
  onClose: (success: boolean) => void;
};

export const CreateOrderModal = (props: Props) => {
  const [amount, setAmount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modalBody = (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Product Id"
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Amount"
          value={productId}
          type="number"
          onChange={(e) => setProductId(+e.target.value)}
        />
      </div>
    </div>
  );

  const onClose = (success: boolean) => {
    if (processing) {
      return;
    }
    setProcessing(false);
    setErrorMessage('');
    setAmount(0);
    setProductId(0);
    props.onClose(success);
  };

  const onSubmit = async () => {
    if (processing) {
      return;
    }
    setProcessing(true);
    try {
      await apiOrders.createOrder({amount, productId});
      onClose(true);
    } catch (err) {
      setProcessing(false);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <Modal
      title="Create Order"
      show={props.show}
      children={modalBody}
      onClose={() => {
        onClose(false);
      }}
      onSubmit={onSubmit}
    />
  );
};
