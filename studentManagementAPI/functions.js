let mongoose = require('mongoose');

function buildMatchFilters(filters = {}) {
  const match = {};

  if (filters.sessionId) {
    match.session = new mongoose.Types.ObjectId(filters.sessionId);
  }

  if (filters.programId) {
    match.program = new mongoose.Types.ObjectId(filters.programId);
  }

  return match;
}


function generateBaseCode(firstName, lastName, integrationDate) {
  const f = firstName.trim().toUpperCase();
  const l = lastName.trim().toUpperCase();

  const year =
    integrationDate instanceof Date
      ? integrationDate.getFullYear()
      : new Date(integrationDate).getFullYear();

  return `UNI-${f[0] || ""}${f[1] || ""}${l[0] || ""}${l[1] || ""}${year}`;
}
 
module.exports = {buildMatchFilters,generateBaseCode}