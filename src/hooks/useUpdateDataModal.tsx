"use client";

import { CORE_SUBJECTS, SUBJECT_VALUE } from "@/constants";
import { createSubject } from "@/customMethods/subjects";
import { createTimeSlot } from "@/customMethods/timeSlots";
import { ChangeEvent, MouseEvent, useState } from "react";

const initialFormState = {
  type: SUBJECT_VALUE,
  subjectType: CORE_SUBJECTS,
  subjectValue: "",
  fromTime: "",
  toTime: "",
};

const useUpdateDataModal = ({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) => {
  const [modalForm, setModalForm] = useState(initialFormState);
  const [showEmptyField, setShowEmptyField] = useState(false);

  const [showMsg, setShowMsg] = useState<{
    type: "error" | "success";
    message: string;
    isOpen: boolean;
  }>({
    message: "",
    type: "success",
    isOpen: false,
  });

  const handleSelectChange = (value: string, type: "type" | "subjectType") => {
    setShowEmptyField(false);
    if (type === "type") {
      setModalForm({
        fromTime: "",
        subjectType: CORE_SUBJECTS,
        subjectValue: "",
        toTime: "",
        type: value,
      });
    }

    if (type === "subjectType") {
      setModalForm({ ...modalForm, subjectType: value, subjectValue: "" });
    }
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShowEmptyField(false);
    setModalForm({ ...modalForm, [name]: value });
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const requestBody: any = {};
    if (modalForm.type === SUBJECT_VALUE) {
      if (modalForm.subjectValue === "") {
        setShowEmptyField(true);
        return;
      }

      requestBody["subject"] = modalForm.subjectValue;
      requestBody["subjectType"] = modalForm.subjectType;
      const data = await createSubject(requestBody);
      onOpenChange(false);
      setShowEmptyField(false);
      if (data.responseData.error) {
        setShowMsg({
          isOpen: true,
          message: data.responseData.message,
          type: "error",
        });
      } else {
        setShowMsg({
          isOpen: true,
          message: data.responseData.message,
          type: "success",
        });
        setModalForm(initialFormState);
      }
    } else {
      if (modalForm.fromTime === "" || modalForm.toTime === "") {
        setShowEmptyField(true);
        return;
      }
      requestBody["fromTime"] = modalForm.fromTime;
      requestBody["toTime"] = modalForm.toTime;

      const data = await createTimeSlot(requestBody);
      onOpenChange(false);
      setShowEmptyField(false);
      if (data.responseData.error) {
        setShowMsg({
          isOpen: true,
          message: data.responseData.message,
          type: "error",
        });
      } else {
        setShowMsg({
          isOpen: true,
          message: data.responseData.message,
          type: "success",
        });
        setModalForm(initialFormState);
      }
    }
  };

  const toggleMsgModal = () =>
    setShowMsg({ isOpen: false, message: "", type: "success" });

  return {
    modalForm,
    handleSelectChange,
    handleValueChange,
    handleSubmit,
    showMsg,
    toggleMsgModal,
    showEmptyField,
  };
};

export default useUpdateDataModal;
