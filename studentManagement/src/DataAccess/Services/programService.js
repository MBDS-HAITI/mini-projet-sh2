import {api} from '../callClient';

async function getPrograms (filters) {
    let result = await api.get("programs", {params : filters});
    return result.data;
}


async function createProgram(form){
    let result = await api.post("programs", form);
    console.log(result);
    return result.data;
}
export {getPrograms, createProgram}