const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'temple-service',
  service: 'temple-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const getSevasListRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSevasList');
}
getSevasListRef.operationName = 'GetSevasList';
exports.getSevasListRef = getSevasListRef;

exports.getSevasList = function getSevasList(dc) {
  return executeQuery(getSevasListRef(dc));
};

const getTempleInsightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTempleInsights');
}
getTempleInsightsRef.operationName = 'GetTempleInsights';
exports.getTempleInsightsRef = getTempleInsightsRef;

exports.getTempleInsights = function getTempleInsights(dc) {
  return executeQuery(getTempleInsightsRef(dc));
};

const getMyBookingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyBookings', inputVars);
}
getMyBookingsRef.operationName = 'GetMyBookings';
exports.getMyBookingsRef = getMyBookingsRef;

exports.getMyBookings = function getMyBookings(dcOrVars, vars) {
  return executeQuery(getMyBookingsRef(dcOrVars, vars));
};

const getGalleryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGallery');
}
getGalleryRef.operationName = 'GetGallery';
exports.getGalleryRef = getGalleryRef;

exports.getGallery = function getGallery(dc) {
  return executeQuery(getGalleryRef(dc));
};

const createBookingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBooking', inputVars);
}
createBookingRef.operationName = 'CreateBooking';
exports.createBookingRef = createBookingRef;

exports.createBooking = function createBooking(dcOrVars, vars) {
  return executeMutation(createBookingRef(dcOrVars, vars));
};

const updateInsightsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInsights', inputVars);
}
updateInsightsRef.operationName = 'UpdateInsights';
exports.updateInsightsRef = updateInsightsRef;

exports.updateInsights = function updateInsights(dcOrVars, vars) {
  return executeMutation(updateInsightsRef(dcOrVars, vars));
};

const getDigitalLibraryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDigitalLibrary', inputVars);
}
getDigitalLibraryRef.operationName = 'GetDigitalLibrary';
exports.getDigitalLibraryRef = getDigitalLibraryRef;

exports.getDigitalLibrary = function getDigitalLibrary(dcOrVars, vars) {
  return executeQuery(getDigitalLibraryRef(dcOrVars, vars));
};

const getUpcomingEventsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUpcomingEvents');
}
getUpcomingEventsRef.operationName = 'GetUpcomingEvents';
exports.getUpcomingEventsRef = getUpcomingEventsRef;

exports.getUpcomingEvents = function getUpcomingEvents(dc) {
  return executeQuery(getUpcomingEventsRef(dc));
};

const getLatestNewsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLatestNews');
}
getLatestNewsRef.operationName = 'GetLatestNews';
exports.getLatestNewsRef = getLatestNewsRef;

exports.getLatestNews = function getLatestNews(dc) {
  return executeQuery(getLatestNewsRef(dc));
};

const getPanchangamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPanchangam', inputVars);
}
getPanchangamRef.operationName = 'GetPanchangam';
exports.getPanchangamRef = getPanchangamRef;

exports.getPanchangam = function getPanchangam(dcOrVars, vars) {
  return executeQuery(getPanchangamRef(dcOrVars, vars));
};

const getMyDonationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyDonations', inputVars);
}
getMyDonationsRef.operationName = 'GetMyDonations';
exports.getMyDonationsRef = getMyDonationsRef;

exports.getMyDonations = function getMyDonations(dcOrVars, vars) {
  return executeQuery(getMyDonationsRef(dcOrVars, vars));
};

const createDonationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDonation', inputVars);
}
createDonationRef.operationName = 'CreateDonation';
exports.createDonationRef = createDonationRef;

exports.createDonation = function createDonation(dcOrVars, vars) {
  return executeMutation(createDonationRef(dcOrVars, vars));
};

const submitFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitFeedback', inputVars);
}
submitFeedbackRef.operationName = 'SubmitFeedback';
exports.submitFeedbackRef = submitFeedbackRef;

exports.submitFeedback = function submitFeedback(dcOrVars, vars) {
  return executeMutation(submitFeedbackRef(dcOrVars, vars));
};
