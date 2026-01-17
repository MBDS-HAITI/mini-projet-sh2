
import {api} from '../callClient';

async function getStudents (filters) {
  let result = await api.get("students", {params : filters});
  return result;
}

async function getStudent (id) {
  let result = await api.get("student/"+id);
  return result;
}

export {getStudents, getStudent}