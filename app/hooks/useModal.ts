import { useState } from "react"; // Import React useState hook

const useModal = () => {
  // Custom hook for modal open/close state
  const [isOpen, setIsOpen] = useState(false); // State to track if modal is open

  const open = () => setIsOpen(true); // Function to open the modal
  const close = () => setIsOpen(false); // Function to close the modal

  return { isOpen, open, close }; // Return modal state and handlers
};

export default useModal; // Export the custom hook
