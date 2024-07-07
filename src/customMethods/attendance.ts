import { BASE_URL } from "@/constants";
import axios from "axios";

const markAttendance = async (reqData: any) => {
  const data = await axios
    .post(`${BASE_URL}/api/attendance`, { ...reqData })
    .then((res) => res.data);
  return data;
};

const getAttendance = async (date: Date) => {
  const data = await axios
    .get(`${BASE_URL}/api/attendance?date=${date}`, {
      responseType: "blob",
      headers: {
        Accept: "application/octet-stream",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res);
  if (data.status === 203) {
    return data;
  }
  const blob = await new Blob([data.data]);
  const url = window.URL.createObjectURL(blob);

  return url;
};

export { markAttendance, getAttendance };
