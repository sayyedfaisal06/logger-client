"use client";
import useFilterComponent from "@/hooks/useFilterComponent";
import React from "react";
import FieldWithLabel from "../widgets/FieldWithLabel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSubjects } from "@/customMethods/subjects";
import { Button } from "../ui/button";
import DatePicker from "../widgets/DatePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FilterComponent = ({ table }: { table: any }) => {
  const {
    subjects,
    timeSlots,
    openExcelModal,
    onOpenChangeModal,
    filterData,
    onChangeData,
    onFilterDateChange,
    exportDate,
    onExportDateChange,
    onMarkAttendance,
    error,
    exportAttendance,
    showMsg,
    onChangeModal,
  } = useFilterComponent({ table });
  const updatedSubjects = updateSubjects(subjects);

  return (
    <>
      <div className="bg-white shadow p-4 rounded my-2 flex flex-col gap-1">
        <div className="flex gap-4 items-end">
          <FieldWithLabel label="Select Subject">
            <Select
              value={filterData.subject}
              onValueChange={(value) => onChangeData(value, "subject")}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Subject" />
              </SelectTrigger>
              <SelectContent>
                {updatedSubjects.length &&
                  updatedSubjects.map(
                    (subject: { subjectType: string; values: any[] }) => (
                      <SelectGroup key={subject.subjectType}>
                        <SelectLabel>{subject.subjectType}</SelectLabel>
                        {subject.values.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.subjectName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  )}
              </SelectContent>
            </Select>
          </FieldWithLabel>
          <FieldWithLabel label="Select Time Slot">
            <Select
              value={filterData.timeslot}
              onValueChange={(value) => onChangeData(value, "timeslot")}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Time Slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {timeSlots.length &&
                    timeSlots.map((item: any) => (
                      <SelectItem key={item.timeSlot} value={item._id}>
                        {item.timeSlot}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FieldWithLabel>
          <FieldWithLabel label="Select Date">
            <DatePicker
              value={filterData.date}
              onChangeDate={onFilterDateChange}
            />
          </FieldWithLabel>
          <Button onClick={onMarkAttendance}>Mark Attendance</Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onOpenChangeModal(true)}
          >
            Export
          </Button>
        </div>
        <div>
          {error.isVisible && (
            <p className="text-red-500 text-sm">{error.msg}</p>
          )}
        </div>
      </div>
      <Dialog open={openExcelModal} onOpenChange={onOpenChangeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Attendance</DialogTitle>
            <DialogDescription>export data by selecting date</DialogDescription>
          </DialogHeader>

          <div className="flex items-end gap-2">
            <FieldWithLabel label="Select Date">
              <DatePicker
                value={exportDate}
                onChangeDate={onExportDateChange}
              />
            </FieldWithLabel>
            <Button onClick={exportAttendance} className="mt-2">
              Export Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showMsg.isVisible} onOpenChange={onChangeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{showMsg.isError ? "Error" : "Success"}</DialogTitle>
            <DialogDescription>{showMsg.msg}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterComponent;
