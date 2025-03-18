import { ModalProps, Dog } from "@/lib/types";
import Image from "next/image";

interface MatchModalProps extends ModalProps {
    data: Dog | null;
}

const MatchModal = ({ modalId, data }: MatchModalProps) => {
    const handleClose = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    return (
        <dialog
            id={modalId}
            className="modal modal-bottom sm:modal-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="match-modal-title"
            aria-describedby="match-modal-description"
        >
            {data && (
                <div className="modal-box p-6 bg-white rounded-lg shadow-lg">
                    <h1
                        id="match-modal-title"
                        className="text-2xl font-bold text-gray-800 mb-4 text-center"
                    >
                        You’ve Found Your Perfect Match! 🎉
                    </h1>

                    <section className="text-center">
                        <h2 className="text-3xl font-semibold text-primary">{data.name}</h2>
                        <p className="text-lg text-gray-600">
                            <span className="font-medium">
                                {`${data.breed} • ${data.age} years old`}
                            </span>
                        </p>

                        {data.img && (
                            <div className="w-full h-[300px] relative mt-4">
                                <Image
                                    src={data.img}
                                    alt={data.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="object-center"
                                    priority
                                />
                            </div>
                        )}

                        <p id="match-modal-description" className="mt-4 text-lg text-gray-700">
                            <strong>{data.name}</strong> is a lovable{" "}
                            <span className="font-medium">{data.breed}</span> looking for a warm home. This adorable pup is ready to be your lifelong companion!
                        </p>
                    </section>
                    <div className="modal-action flex justify-center">
                        <button
                            type="button"
                            className="btn"
                            onClick={handleClose}
                            aria-label="Close match modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
};

export default MatchModal;
