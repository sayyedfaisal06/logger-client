import { BASE_URL } from "@/constants";
import axios from "axios";

const createSubject = async (data: any) => {
  const { status, data: responseData } = await axios
    .post(`${BASE_URL}/api/subjects`, data)
    .then((res) => res);
  return { status, responseData };
};

const getSubjects = async () => {
  const data = await axios
    .get(`${BASE_URL}/api/subjects`)
    .then((res) => res.data);
  return data;
};

const updateSubjects = (
  subjects: { subjectType: string; subjectName: string; _id: string }[]
) => {
  const result: any = [];

  subjects.forEach((item) => {
    const { subjectType, subjectName, _id } = item;
    const existingType = result.find(
      (entry: { subjectType: string }) => entry.subjectType === subjectType
    );

    if (existingType) {
      existingType.values.push({ subjectName, _id });
    } else {
      result.push({ subjectType, values: [{ subjectName, _id }] });
    }
  });

  return result;
};

export { createSubject, getSubjects, updateSubjects };
