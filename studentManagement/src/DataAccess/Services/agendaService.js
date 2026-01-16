const studentGetAll = import.meta.env.VITE_StudentGetAll;
const studentDetails= import.meta.env.VITE_studentDetails;
import {api} from '../callClient';

async function getAgenda(){
      let result = await api.get("agenda");
      console.log(result.data);
      return result;
}

export {getAgenda}