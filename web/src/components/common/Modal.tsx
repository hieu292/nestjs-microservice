import React from 'react';
import styles from './Modal.module.css';

type Props = {
  show: boolean;
  title: string;
  children: any;
  onClose: () => void;
  onSubmit: () => void;
};

export const Modal = ({show, title, children, onClose, onSubmit}: Props) => {
  return (
    <div className={`modal ${show ? styles.show : ''}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
