import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'temple-service',
  service: 'temple-service',
  location: 'us-central1'
};

export const getSevasListRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSevasList');
}
getSevasListRef.operationName = 'GetSevasList';

export function getSevasList(dc) {
  return executeQuery(getSevasListRef(dc));
}

export const getTempleInsightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTempleInsights');
}
getTempleInsightsRef.operationName = 'GetTempleInsights';

export function getTempleInsights(dc) {
  return executeQuery(getTempleInsightsRef(dc));
}

export const getMyBookingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyBookings', inputVars);
}
getMyBookingsRef.operationName = 'GetMyBookings';

export function getMyBookings(dcOrVars, vars) {
  return executeQuery(getMyBookingsRef(dcOrVars, vars));
}

export const getGalleryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGallery');
}
getGalleryRef.operationName = 'GetGallery';

export function getGallery(dc) {
  return executeQuery(getGalleryRef(dc));
}

export const createBookingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBooking', inputVars);
}
createBookingRef.operationName = 'CreateBooking';

export function createBooking(dcOrVars, vars) {
  return executeMutation(createBookingRef(dcOrVars, vars));
}

export const updateInsightsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInsights', inputVars);
}
updateInsightsRef.operationName = 'UpdateInsights';

export function updateInsights(dcOrVars, vars) {
  return executeMutation(updateInsightsRef(dcOrVars, vars));
}

export const getDigitalLibraryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDigitalLibrary', inputVars);
}
getDigitalLibraryRef.operationName = 'GetDigitalLibrary';

export function getDigitalLibrary(dcOrVars, vars) {
  return executeQuery(getDigitalLibraryRef(dcOrVars, vars));
}

export const getUpcomingEventsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUpcomingEvents');
}
getUpcomingEventsRef.operationName = 'GetUpcomingEvents';

export function getUpcomingEvents(dc) {
  return executeQuery(getUpcomingEventsRef(dc));
}

export const getLatestNewsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLatestNews');
}
getLatestNewsRef.operationName = 'GetLatestNews';

export function getLatestNews(dc) {
  return executeQuery(getLatestNewsRef(dc));
}

export const getPanchangamRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPanchangam', inputVars);
}
getPanchangamRef.operationName = 'GetPanchangam';

export function getPanchangam(dcOrVars, vars) {
  return executeQuery(getPanchangamRef(dcOrVars, vars));
}

export const getMyDonationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyDonations', inputVars);
}
getMyDonationsRef.operationName = 'GetMyDonations';

export function getMyDonations(dcOrVars, vars) {
  return executeQuery(getMyDonationsRef(dcOrVars, vars));
}

export const createDonationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDonation', inputVars);
}
createDonationRef.operationName = 'CreateDonation';

export function createDonation(dcOrVars, vars) {
  return executeMutation(createDonationRef(dcOrVars, vars));
}

export const submitFeedbackRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitFeedback', inputVars);
}
submitFeedbackRef.operationName = 'SubmitFeedback';

export function submitFeedback(dcOrVars, vars) {
  return executeMutation(submitFeedbackRef(dcOrVars, vars));
}

