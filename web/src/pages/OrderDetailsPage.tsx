import React, {useEffect} from 'react';
import ReactJson from 'react-json-view';
import {useDispatch, useSelector} from 'react-redux';
import {cancelOrder, fetchOrderDetails, orderDetailsSelector} from '../slices/orderDetailsSlice';

export const OrderDetailsPage = (props: any) => {
  const {id} = props.match.params;
  const dispatch = useDispatch();
  const {orderDetails, loading, hasErrors} = useSelector(orderDetailsSelector);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch]);

  const renderPage = () => {
    if (loading) return <p>Loading order details...</p>;
    if (hasErrors) return <p>Unable to display order details</p>;

    return <ReactJson src={orderDetails || {}} enableClipboard={false} />;
  };

  const onClickCancel = () => {
    const confirmedCancel = window.confirm('Do you want to cancel this order?');
    if (confirmedCancel) {
      dispatch(cancelOrder(id));
    }
  };

  return (
    <div className="col">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              Orders
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {id}
          </li>
        </ol>
      </nav>
      <section>{renderPage()}</section>
      <button type="button" className="btn btn-danger mt-1" onClick={onClickCancel}>
        Cancel
      </button>
    </div>
  );
};
