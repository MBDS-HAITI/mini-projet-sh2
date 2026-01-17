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

module.exports = {buildMatchFilters}