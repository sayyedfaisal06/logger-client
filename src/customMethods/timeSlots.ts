import { BASE_URL } from "@/constants";
import axios from "axios";

const createTimeSlot = async (data: any) => {
  const { status, data: responseData } = await axios
    .post(`${BASE_URL}/api/timeslots`, data)
    .then((res) => res);
  return { status, responseData };
};

const getTimeSlots = async () => {
  const data = await axios
    .get(`${BASE_URL}/api/timeslots`)
    .then((res) => res.data);
  return data;
};

export { getTimeSlots, createTimeSlot };
