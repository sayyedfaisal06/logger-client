import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COMMON_SUBJECTS,
  CORE_SUBJECTS,
  OTHERS,
  SUBJECT_TITLE,
  SUBJECT_VALUE,
  TIME_SLOT_TITLE,
  TIME_SLOT_VALUE,
} from "@/constants";
import { Label } from "../ui/label";
import useUpdateDataModal from "@/hooks/useUpdateDataModal";
import FieldWithLabel from "../widgets/FieldWithLabel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const TypeFields = [
  {
    type: SUBJECT_TITLE,
    value: SUBJECT_VALUE,
  },
  {
    type: TIME_SLOT_TITLE,
    value: TIME_SLOT_VALUE,
  },
];

const SubjectTypeFields = [
  {
    type: CORE_SUBJECTS,
    value: CORE_SUBJECTS,
  },
  {
    type: COMMON_SUBJECTS,
    value: COMMON_SUBJECTS,
  },
  {
    type: OTHERS,
    value: OTHERS,
  },
];

const UpdateDataModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const {
    modalForm,
    handleSelectChange,
    handleValueChange,
    handleSubmit,
    showMsg,
    toggleMsgModal,
    showEmptyField,
  } = useUpdateDataModal({ onOpenChange });

  return (
    <>
      <Dialog onOpenChange={onOpenChange} open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new data</DialogTitle>
            <DialogDescription>Fill below details</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <FieldWithLabel label="Select Type">
              <Select
                value={modalForm.type}
                onValueChange={(value: string) =>
                  handleSelectChange(value, "type")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {TypeFields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWithLabel>

            {modalForm.type === SUBJECT_VALUE && (
              <div className="flex flex-col gap-4">
                <FieldWithLabel label="Select Type">
                  <Select
                    value={modalForm.subjectType}
                    onValueChange={(value: string) =>
                      handleSelectChange(value, "subjectType")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Subject Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SubjectTypeFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldWithLabel>
                <FieldWithLabel label="Subject">
                  <Input
                    id="subject"
                    placeholder="Enter Subject here..."
                    value={modalForm.subjectValue}
                    onChange={handleValueChange}
                    name="subjectValue"
                  />
                </FieldWithLabel>
              </div>
            )}
            {modalForm.type === TIME_SLOT_VALUE && (
              <div className="flex gap-2">
                <FieldWithLabel label="From">
                  <Input
                    id="fromTime"
                    type="time"
                    value={modalForm.fromTime}
                    onChange={handleValueChange}
                    name="fromTime"
                  />
                </FieldWithLabel>
                <FieldWithLabel label="To">
                  <Input
                    id="toTime"
                    type="time"
                    value={modalForm.toTime}
                    onChange={handleValueChange}
                    name="toTime"
                  />
                </FieldWithLabel>
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full">
              Submit
            </Button>
            {showEmptyField && (
              <p className="text-sm text-red-500">Please enter all values</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog onOpenChange={toggleMsgModal} open={showMsg.isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showMsg.type === "error" ? "Error" : "Success"}
            </DialogTitle>
            <DialogDescription>{showMsg.message}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateDataModal;
