"use client";

import { getAttendance, markAttendance } from "@/customMethods/attendance";
import { getSubjects } from "@/customMethods/subjects";
import { getTimeSlots } from "@/customMethods/timeSlots";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const useFilterComponent = ({ table }: { table: any }) => {
  const [subjects, setSubjects] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [showMsg, setShowMsg] = useState({
    isVisible: false,
    msg: "",
    isError: false,
  });

  const [error, showError] = useState({
    isVisible: false,
    msg: "",
  });

  const [openExcelModal, setOpenExcelModal] = useState(false);
  const [filterData, setFilterData] = useState<{
    subject: string;
    timeslot: string;
    date: Date;
  }>({
    date: new Date(),
    subject: "",
    timeslot: "",
  });
  const [exportDate, setExportDate] = useState<Date>(new Date());

  useEffect(() => {
    getSubjects().then((res) => setSubjects(res.data));
    getTimeSlots().then((res) => setTimeSlots(res.data));
  }, []);

  const onChangeData = (value: string, name: "subject" | "timeslot") => {
    showError({
      isVisible: false,
      msg: "",
    });
    setFilterData({ ...filterData, [name]: value });
  };

  const onFilterDateChange = (date: any) =>
    setFilterData({ ...filterData, date: date });
  const onExportDateChange = (date: any) => setExportDate(date);

  const onOpenChangeModal = (open: boolean) => {
    setExportDate(new Date());
    setOpenExcelModal(open);
  };

  const onMarkAttendance = async () => {
    showError({
      isVisible: false,
      msg: "",
    });
    setShowMsg({
      isVisible: false,
      isError: false,
      msg: "",
    });
    if (!filterData.subject || !filterData.timeslot) {
      showError({
        isVisible: true,
        msg: "Please enter all values",
      });
      return;
    }
    if (!table.getFilteredSelectedRowModel().rows.length) {
      showError({
        isVisible: true,
        msg: "Please select present students.",
      });
      return;
    }
    const selectedStudents = table
      .getFilteredSelectedRowModel()
      .rows.map((item: any) => item.original);
    const studentIds: string[] = selectedStudents.map(
      (student: any) => student._id
    );

    const reqBody = {
      timeslot: filterData.timeslot,
      subject: filterData.subject,
      students: studentIds,
      date: format(new Date(filterData.date), "dd/MM/yyyy"),
    };

    const responseData = await markAttendance(reqBody);

    setShowMsg({
      isVisible: true,
      isError: responseData.error,
      msg: responseData.message,
    });
    if (!responseData.error) {
      table.resetRowSelection();
      setFilterData({
        date: new Date(),
        subject: "",
        timeslot: "",
      });
    }
  };

  const exportAttendance = async () => {
    const response: any = await getAttendance(exportDate);

    if (response.status === 203) {
      setExportDate(new Date());
      setOpenExcelModal(false);
      setShowMsg({
        isError: true,
        isVisible: true,
        msg: "Something went wrong please try again",
      });
      return;
    }
    setExportDate(new Date());
    setOpenExcelModal(false);
    const a: any = document.createElement("a");
    a.style.display = "none";
    a.href = response;
    a.download = "attendance.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(response);
    document.body.removeChild(a);
  };

  const onChangeModal = (open: boolean) =>
    setShowMsg({ isVisible: open, isError: false, msg: "" });

  return {
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
  };
};

export default useFilterComponent;
