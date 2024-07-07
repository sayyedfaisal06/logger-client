import { BASE_URL } from "@/constants";
import axios from "axios";

const getStudents = async () => {
  const data = await axios
    .get(`${BASE_URL}/api/students`)
    .then((res) => res.data.data);
  return data;
};

export { getStudents };
