"use client";
import { Button } from "../ui/button";
import UpdateDataModal from "../modals/UpdateDataModal";
import { useState } from "react";

const HeaderComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div className="w-full flex justify-end">
      <Button onClick={toggleModal}>Update Data</Button>
      <UpdateDataModal isOpen={openModal} onOpenChange={toggleModal} />
    </div>
  );
};

export default HeaderComponent;
