import {api} from '../callClient';

async function getSessions (filters) {
    let result = await api.get("sessions", {params : filters});
    return result.data;
}


async function createSession(form){
    let result = await api.post("sessions", form);
    console.log(result);
    return result.data;
}
export {getSessions, createSession}