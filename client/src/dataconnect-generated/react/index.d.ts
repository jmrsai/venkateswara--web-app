import { GetSevasListData, GetTempleInsightsData, GetMyBookingsData, GetMyBookingsVariables, GetGalleryData, CreateBookingData, CreateBookingVariables, UpdateInsightsData, UpdateInsightsVariables, GetDigitalLibraryData, GetDigitalLibraryVariables, GetUpcomingEventsData, GetLatestNewsData, GetPanchangamData, GetPanchangamVariables, GetMyDonationsData, GetMyDonationsVariables, CreateDonationData, CreateDonationVariables, SubmitFeedbackData, SubmitFeedbackVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetSevasList(options?: useDataConnectQueryOptions<GetSevasListData>): UseDataConnectQueryResult<GetSevasListData, undefined>;
export function useGetSevasList(dc: DataConnect, options?: useDataConnectQueryOptions<GetSevasListData>): UseDataConnectQueryResult<GetSevasListData, undefined>;

export function useGetTempleInsights(options?: useDataConnectQueryOptions<GetTempleInsightsData>): UseDataConnectQueryResult<GetTempleInsightsData, undefined>;
export function useGetTempleInsights(dc: DataConnect, options?: useDataConnectQueryOptions<GetTempleInsightsData>): UseDataConnectQueryResult<GetTempleInsightsData, undefined>;

export function useGetMyBookings(vars: GetMyBookingsVariables, options?: useDataConnectQueryOptions<GetMyBookingsData>): UseDataConnectQueryResult<GetMyBookingsData, GetMyBookingsVariables>;
export function useGetMyBookings(dc: DataConnect, vars: GetMyBookingsVariables, options?: useDataConnectQueryOptions<GetMyBookingsData>): UseDataConnectQueryResult<GetMyBookingsData, GetMyBookingsVariables>;

export function useGetGallery(options?: useDataConnectQueryOptions<GetGalleryData>): UseDataConnectQueryResult<GetGalleryData, undefined>;
export function useGetGallery(dc: DataConnect, options?: useDataConnectQueryOptions<GetGalleryData>): UseDataConnectQueryResult<GetGalleryData, undefined>;

export function useCreateBooking(options?: useDataConnectMutationOptions<CreateBookingData, FirebaseError, CreateBookingVariables>): UseDataConnectMutationResult<CreateBookingData, CreateBookingVariables>;
export function useCreateBooking(dc: DataConnect, options?: useDataConnectMutationOptions<CreateBookingData, FirebaseError, CreateBookingVariables>): UseDataConnectMutationResult<CreateBookingData, CreateBookingVariables>;

export function useUpdateInsights(options?: useDataConnectMutationOptions<UpdateInsightsData, FirebaseError, UpdateInsightsVariables>): UseDataConnectMutationResult<UpdateInsightsData, UpdateInsightsVariables>;
export function useUpdateInsights(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInsightsData, FirebaseError, UpdateInsightsVariables>): UseDataConnectMutationResult<UpdateInsightsData, UpdateInsightsVariables>;

export function useGetDigitalLibrary(vars?: GetDigitalLibraryVariables, options?: useDataConnectQueryOptions<GetDigitalLibraryData>): UseDataConnectQueryResult<GetDigitalLibraryData, GetDigitalLibraryVariables>;
export function useGetDigitalLibrary(dc: DataConnect, vars?: GetDigitalLibraryVariables, options?: useDataConnectQueryOptions<GetDigitalLibraryData>): UseDataConnectQueryResult<GetDigitalLibraryData, GetDigitalLibraryVariables>;

export function useGetUpcomingEvents(options?: useDataConnectQueryOptions<GetUpcomingEventsData>): UseDataConnectQueryResult<GetUpcomingEventsData, undefined>;
export function useGetUpcomingEvents(dc: DataConnect, options?: useDataConnectQueryOptions<GetUpcomingEventsData>): UseDataConnectQueryResult<GetUpcomingEventsData, undefined>;

export function useGetLatestNews(options?: useDataConnectQueryOptions<GetLatestNewsData>): UseDataConnectQueryResult<GetLatestNewsData, undefined>;
export function useGetLatestNews(dc: DataConnect, options?: useDataConnectQueryOptions<GetLatestNewsData>): UseDataConnectQueryResult<GetLatestNewsData, undefined>;

export function useGetPanchangam(vars: GetPanchangamVariables, options?: useDataConnectQueryOptions<GetPanchangamData>): UseDataConnectQueryResult<GetPanchangamData, GetPanchangamVariables>;
export function useGetPanchangam(dc: DataConnect, vars: GetPanchangamVariables, options?: useDataConnectQueryOptions<GetPanchangamData>): UseDataConnectQueryResult<GetPanchangamData, GetPanchangamVariables>;

export function useGetMyDonations(vars: GetMyDonationsVariables, options?: useDataConnectQueryOptions<GetMyDonationsData>): UseDataConnectQueryResult<GetMyDonationsData, GetMyDonationsVariables>;
export function useGetMyDonations(dc: DataConnect, vars: GetMyDonationsVariables, options?: useDataConnectQueryOptions<GetMyDonationsData>): UseDataConnectQueryResult<GetMyDonationsData, GetMyDonationsVariables>;

export function useCreateDonation(options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, CreateDonationVariables>): UseDataConnectMutationResult<CreateDonationData, CreateDonationVariables>;
export function useCreateDonation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, CreateDonationVariables>): UseDataConnectMutationResult<CreateDonationData, CreateDonationVariables>;

export function useSubmitFeedback(options?: useDataConnectMutationOptions<SubmitFeedbackData, FirebaseError, SubmitFeedbackVariables>): UseDataConnectMutationResult<SubmitFeedbackData, SubmitFeedbackVariables>;
export function useSubmitFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitFeedbackData, FirebaseError, SubmitFeedbackVariables>): UseDataConnectMutationResult<SubmitFeedbackData, SubmitFeedbackVariables>;
