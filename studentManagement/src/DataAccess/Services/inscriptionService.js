import {api} from '../callClient';

async function getInscriptions (filters) {
    let result = await api.get("inscriptions", {params : filters});
    return result.data;
}


async function createInscription(enrollement){
    console.log("enrollements :");
    console.log(enrollement);
    let result = await api.post("inscriptions", enrollement);
    console.log(result);
    return result.data;
}
export {getInscriptions, createInscription}