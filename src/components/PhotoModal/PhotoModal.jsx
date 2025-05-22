import { useEffect, useRef, useState } from 'react';

const PhotoViewerModal = ({ images, initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

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

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const deltaX = touchStartX.current - touchEndX.current;
            if (Math.abs(deltaX) > 50) {
                deltaX > 0 ? next() : prev();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="fixed  inset-0 z-60 backdrop-blur-2xl bg-black/70 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full flex justify-center items-center max-w-3xl mx-5  "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={images[currentIndex]}
                    alt={`photo-${currentIndex}`}
                    className="max-h-[90vh]   rounded-md object-contain select-none"
                    draggable={false}
                />
                <button className='absolute md:top-10 md:right-10 top-2 right-2' onClick={() => onClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="md:size-10 size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>

                {/* Nav Arrows - only show on md+ screens */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-green-400 transition"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-green-400 transition"
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
