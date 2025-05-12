import { useEffect, useState } from 'react';

const PhotoViewerModal = ({ images, initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleEsc = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div
            className="fixed inset-0 z-60 backdrop-blur-2xl bg-black/70 flex items-center justify-center"
            onClick={onClose} // click on backdrop closes modal
        >

            <div
                onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside the modal content
                className="w-full max-w-3xl px-6"
            >
                <img
                    src={images[currentIndex]}
                    alt={`photo-${currentIndex}`}
                    className="max-h-[90vh] mx-auto rounded-md object-contain"
                />



                {/* Nav Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-green-400 transition"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-green-400 transition"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default PhotoViewerModal;
