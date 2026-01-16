
const studentGetAll = import.meta.env.VITE_StudentGetAll;
const studentDetails= import.meta.env.VITE_studentDetails;
import {api} from '../callClient';

async function getStudents (filters) {
  let result = await api.get(studentGetAll, {params : filters});
  return result;
}

async function getStudent (id) {
  let result = await api.get(studentDetails+"/"+id);
  return result;
}

export {getStudents, getStudent}