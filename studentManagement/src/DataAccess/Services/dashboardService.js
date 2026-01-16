import {api} from '../callClient';

 async function getAggregateData (filters) {
  let result = await api.get("dashboard/cards", {params : filters});
  return result;
}

async function getInscriptionsData(filters){
    let result = await api.get("dashboard/inscriptions", {params : filters});
    return result;
}

async function getCoursesData(filters){
    let result = await api.get("dashboard/courses", {params : filters});
    return result;
}

async function getUsageData(filters){
    let result = await api.get("dashboard/appusing", {params : filters});
    return result;
}

async function getDashboardFilters(filters){
    let result = await api.get("dashboard/filters");
    console.log(result.data);
    return result;
}
export {getAggregateData, getInscriptionsData, getCoursesData, getUsageData, getDashboardFilters};

