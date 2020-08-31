import * as _ from 'lodash';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Pagination} from '../components/common/Pagination';
import {CreateOrderModal} from '../components/orders/CreateOrderModal';
import {PageRoute} from '../constants';
import history from '../shared/history';
import {fetchOrders, ordersSelector} from '../slices/ordersSlice';

export const getOrderDetailsLink = (id: string) => PageRoute.OrderDetails.replace(':id', id);

const PAGE_QUERY = 'page';

export const OrdersPage = (props: any) => {
  const pageFromLocation = +(new URLSearchParams(props.location.search).get(PAGE_QUERY) || '');

  const dispatch = useDispatch();
  const {orders, loading, hasErrors, page, pageCount} = useSelector(ordersSelector);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders(pageFromLocation));
  }, [dispatch]);

  const renderPage = () => {
    if (loading) return <p>Loading orders...</p>;
    if (hasErrors) return <p>Unable to display orders</p>;

    const tableRows = _.map(orders, (order) => (
      <tr key={order.id}>
        <th>
          <Link to={getOrderDetailsLink(order.id)} className="button">
            {order.id}
          </Link>
        </th>
        <td>{order.amount}</td>
        <td>{order.productId}</td>
        <td>{order.status}</td>
        <td>{order.createdAt}</td>
        <td>{order.updatedAt}</td>
      </tr>
    ));

    const onChangePage = (page: number) => {
      history.replace({search: `?${PAGE_QUERY}=${page}`});
      dispatch(fetchOrders(page));
    };

    return (
      <Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Amount</th>
              <th scope="col">Product Id</th>
              <th scope="col">Status</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </Fragment>
    );
  };

  const onCloseCreateOrderModal = (success: boolean) => {
    setShowCreateOrderModal(false);
    if (success) {
      dispatch(fetchOrders());
    }
  };

  return (
    <div className="col">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Orders</li>
        </ol>
      </nav>

      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={() => {
          setShowCreateOrderModal(true);
        }}
      >
        Create order
      </button>
      <CreateOrderModal show={showCreateOrderModal} onClose={onCloseCreateOrderModal} />

      <section>{renderPage()}</section>
    </div>
  );
};
