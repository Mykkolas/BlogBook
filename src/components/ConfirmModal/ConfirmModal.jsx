import { useEffect } from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    useEffect(() => {
        // Disable scroll
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scroll when modal is removed
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 backdrop-blur-sm px-4">
            <div className="rounded-lg shadow-lg max-w-md w-full p-6 text-center bg-white">
                <p className="text-gray-800 sm:text-lg pb-5">{message}</p>

                <div className="flex justify-center gap-4 ">
                    <button
                        onClick={onConfirm}
                        className="btn px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition  w-20"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="btn px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition  w-20 "
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
