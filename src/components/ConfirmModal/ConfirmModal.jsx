import s from './ConfirmModal.module.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={s.backdrop}>
            <div className={s.modal}>
                <p>{message}</p>
                <div className={s.buttons}>
                    <button onClick={onConfirm} className={s.confirm}>Yes</button>
                    <button onClick={onCancel} className={s.cancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
