
import {api} from '../callClient';

async function getStudents (filters) {
  let result = await api.get("students", {params : filters});
  return result;
}

async function getStudent (id) {
    console.log(id);
    let result = await api.get("student/"+id);
  console.log(result);
  return result;
}

async function createStudent(form){
  let result = await api.post("students", form);
  console.log(result);
  return result;
}
export {getStudents, getStudent, createStudent}