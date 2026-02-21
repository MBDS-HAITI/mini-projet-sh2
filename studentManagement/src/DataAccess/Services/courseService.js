import {api} from '../callClient';

async function getCourses (filters) {
    let result = await api.get("courses", {params : filters});
    return result.data;
}


async function createCourse(form){
    let result = await api.post("courses", form);
    console.log(result);
    return result.data;
}
export {getCourses, createCourse}