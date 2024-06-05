import { Report } from "@/app/report/page";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
} from "@chakra-ui/react";

const ReportModal = ({
  report,
  isOpen,
  onClose,
}: {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{report?.name || "Report Details"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{report?.message}</p>
          <div>
            <Image
              src={
                `https://gs-backend-one.vercel.app/images/${report?.image}` ||
                "https://via.placeholder.com/150"
              }
              alt="report image"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color={"#fff"}
            backgroundColor={"#1176ab"}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
