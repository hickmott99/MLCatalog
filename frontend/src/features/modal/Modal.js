import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from './modalSlice';

export function GlobalModal() {
    const {modalShow, modalMessage, modalTitle} = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(hideModal());
    };

    // Permits user to click inside modal-content without closing modal 
    useEffect(() => {
        const stopPropagation = (e) => {
            if (!e.target) {
                e.stopPropagation();
            }
        };
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', stopPropagation);
        }
        return () => {
            if (modalContent) {
                modalContent.removeEventListener('click', stopPropagation);
            }
        };
    }, [modalShow]);

    return (
        <>
        <div className={`modal-backdrop fade ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }}></div>
        <div className={`modal fade ${modalShow ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalShow ? 'block' : 'none' }} onClick={closeModal}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{modalMessage}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

