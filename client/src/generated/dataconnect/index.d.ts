import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface CreateBookingData {
  booking_insert: Booking_Key;
}

export interface CreateBookingVariables {
  sevaId: UUIDString;
  date: DateString;
  name: string;
  mobile: string;
  email?: string | null;
  code: string;
  userId: string;
}

export interface CreateDonationData {
  donation_insert: Donation_Key;
}

export interface CreateDonationVariables {
  name: string;
  category: string;
  amount: number;
  email?: string | null;
  txId: string;
  userId?: string | null;
  gothram?: string | null;
}

export interface DigitalLibrary_Key {
  id: UUIDString;
  __typename?: 'DigitalLibrary_Key';
}

export interface Donation_Key {
  id: UUIDString;
  __typename?: 'Donation_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface Feedback_Key {
  id: UUIDString;
  __typename?: 'Feedback_Key';
}

export interface Gallery_Key {
  id: UUIDString;
  __typename?: 'Gallery_Key';
}

export interface GetDigitalLibraryData {
  digitalLibraries: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    category: string;
    url: string;
    format: string;
    thumbnailUrl?: string | null;
  } & DigitalLibrary_Key)[];
}

export interface GetDigitalLibraryVariables {
  category?: string | null;
}

export interface GetGalleryData {
  galleries: ({
    id: UUIDString;
    url: string;
    caption?: string | null;
    type: string;
  } & Gallery_Key)[];
}

export interface GetLatestNewsData {
  newss: ({
    id: UUIDString;
    title: string;
    content: string;
    category?: string | null;
    publishDate: DateString;
    imageUrl?: string | null;
    isCritical?: boolean | null;
  } & News_Key)[];
}

export interface GetMyBookingsData {
  bookings: ({
    id: UUIDString;
    date: DateString;
    ticketCode: string;
    status: string;
    seva: {
      name: string;
      timing?: string | null;
    };
  } & Booking_Key)[];
}

export interface GetMyBookingsVariables {
  userId: string;
}

export interface GetMyDonationsData {
  donations: ({
    id: UUIDString;
    donorName: string;
    category: string;
    amount: number;
    status: string;
    createdAt: TimestampString;
    transactionId: string;
  } & Donation_Key)[];
}

export interface GetMyDonationsVariables {
  userId: string;
}

export interface GetPanchangamData {
  panchangam?: {
    tithi?: string | null;
    nakshatram?: string | null;
    yogam?: string | null;
    karanam?: string | null;
    sunrise?: string | null;
    sunset?: string | null;
    rahukalam?: string | null;
    yamagandam?: string | null;
    additionalInfo?: string | null;
  };
}

export interface GetPanchangamVariables {
  date: DateString;
}

export interface GetSevasListData {
  sevas: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    timing?: string | null;
    day?: string | null;
    imageUrl?: string | null;
  } & Seva_Key)[];
}

export interface GetTempleInsightsData {
  insights: ({
    id: number;
    ladduStock?: number | null;
    laddusDistributed?: number | null;
    annadanamCount?: number | null;
    nextAarathiTime?: string | null;
    crowdStatus?: string | null;
    darshanWaitTime?: number | null;
    updatedAt: TimestampString;
  } & Insight_Key)[];
}

export interface GetUpcomingEventsData {
  events: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    date: DateString;
    startTime?: string | null;
    endTime?: string | null;
    location?: string | null;
    imageUrl?: string | null;
  } & Event_Key)[];
}

export interface Insight_Key {
  id: number;
  __typename?: 'Insight_Key';
}

export interface News_Key {
  id: UUIDString;
  __typename?: 'News_Key';
}

export interface Panchangam_Key {
  date: DateString;
  __typename?: 'Panchangam_Key';
}

export interface Seva_Key {
  id: UUIDString;
  __typename?: 'Seva_Key';
}

export interface SubmitFeedbackData {
  feedback_insert: Feedback_Key;
}

export interface SubmitFeedbackVariables {
  name: string;
  email?: string | null;
  subject?: string | null;
  message: string;
  userId?: string | null;
}

export interface UpdateInsightsData {
  insight_update?: Insight_Key | null;
}

export interface UpdateInsightsVariables {
  id: number;
  crowd?: string | null;
  wait?: number | null;
}

interface GetSevasListRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetSevasListData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetSevasListData, undefined>;
  operationName: string;
}
export const getSevasListRef: GetSevasListRef;

export function getSevasList(): QueryPromise<GetSevasListData, undefined>;
export function getSevasList(dc: DataConnect): QueryPromise<GetSevasListData, undefined>;

interface GetTempleInsightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTempleInsightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTempleInsightsData, undefined>;
  operationName: string;
}
export const getTempleInsightsRef: GetTempleInsightsRef;

export function getTempleInsights(): QueryPromise<GetTempleInsightsData, undefined>;
export function getTempleInsights(dc: DataConnect): QueryPromise<GetTempleInsightsData, undefined>;

interface GetMyBookingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyBookingsVariables): QueryRef<GetMyBookingsData, GetMyBookingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyBookingsVariables): QueryRef<GetMyBookingsData, GetMyBookingsVariables>;
  operationName: string;
}
export const getMyBookingsRef: GetMyBookingsRef;

export function getMyBookings(vars: GetMyBookingsVariables): QueryPromise<GetMyBookingsData, GetMyBookingsVariables>;
export function getMyBookings(dc: DataConnect, vars: GetMyBookingsVariables): QueryPromise<GetMyBookingsData, GetMyBookingsVariables>;

interface GetGalleryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetGalleryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetGalleryData, undefined>;
  operationName: string;
}
export const getGalleryRef: GetGalleryRef;

export function getGallery(): QueryPromise<GetGalleryData, undefined>;
export function getGallery(dc: DataConnect): QueryPromise<GetGalleryData, undefined>;

interface CreateBookingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  operationName: string;
}
export const createBookingRef: CreateBookingRef;

export function createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;
export function createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface UpdateInsightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightsVariables): MutationRef<UpdateInsightsData, UpdateInsightsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInsightsVariables): MutationRef<UpdateInsightsData, UpdateInsightsVariables>;
  operationName: string;
}
export const updateInsightsRef: UpdateInsightsRef;

export function updateInsights(vars: UpdateInsightsVariables): MutationPromise<UpdateInsightsData, UpdateInsightsVariables>;
export function updateInsights(dc: DataConnect, vars: UpdateInsightsVariables): MutationPromise<UpdateInsightsData, UpdateInsightsVariables>;

interface GetDigitalLibraryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetDigitalLibraryVariables): QueryRef<GetDigitalLibraryData, GetDigitalLibraryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetDigitalLibraryVariables): QueryRef<GetDigitalLibraryData, GetDigitalLibraryVariables>;
  operationName: string;
}
export const getDigitalLibraryRef: GetDigitalLibraryRef;

export function getDigitalLibrary(vars?: GetDigitalLibraryVariables): QueryPromise<GetDigitalLibraryData, GetDigitalLibraryVariables>;
export function getDigitalLibrary(dc: DataConnect, vars?: GetDigitalLibraryVariables): QueryPromise<GetDigitalLibraryData, GetDigitalLibraryVariables>;

interface GetUpcomingEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUpcomingEventsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUpcomingEventsData, undefined>;
  operationName: string;
}
export const getUpcomingEventsRef: GetUpcomingEventsRef;

export function getUpcomingEvents(): QueryPromise<GetUpcomingEventsData, undefined>;
export function getUpcomingEvents(dc: DataConnect): QueryPromise<GetUpcomingEventsData, undefined>;

interface GetLatestNewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLatestNewsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLatestNewsData, undefined>;
  operationName: string;
}
export const getLatestNewsRef: GetLatestNewsRef;

export function getLatestNews(): QueryPromise<GetLatestNewsData, undefined>;
export function getLatestNews(dc: DataConnect): QueryPromise<GetLatestNewsData, undefined>;

interface GetPanchangamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPanchangamVariables): QueryRef<GetPanchangamData, GetPanchangamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPanchangamVariables): QueryRef<GetPanchangamData, GetPanchangamVariables>;
  operationName: string;
}
export const getPanchangamRef: GetPanchangamRef;

export function getPanchangam(vars: GetPanchangamVariables): QueryPromise<GetPanchangamData, GetPanchangamVariables>;
export function getPanchangam(dc: DataConnect, vars: GetPanchangamVariables): QueryPromise<GetPanchangamData, GetPanchangamVariables>;

interface GetMyDonationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyDonationsVariables): QueryRef<GetMyDonationsData, GetMyDonationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyDonationsVariables): QueryRef<GetMyDonationsData, GetMyDonationsVariables>;
  operationName: string;
}
export const getMyDonationsRef: GetMyDonationsRef;

export function getMyDonations(vars: GetMyDonationsVariables): QueryPromise<GetMyDonationsData, GetMyDonationsVariables>;
export function getMyDonations(dc: DataConnect, vars: GetMyDonationsVariables): QueryPromise<GetMyDonationsData, GetMyDonationsVariables>;

interface CreateDonationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDonationVariables): MutationRef<CreateDonationData, CreateDonationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDonationVariables): MutationRef<CreateDonationData, CreateDonationVariables>;
  operationName: string;
}
export const createDonationRef: CreateDonationRef;

export function createDonation(vars: CreateDonationVariables): MutationPromise<CreateDonationData, CreateDonationVariables>;
export function createDonation(dc: DataConnect, vars: CreateDonationVariables): MutationPromise<CreateDonationData, CreateDonationVariables>;

interface SubmitFeedbackRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitFeedbackVariables): MutationRef<SubmitFeedbackData, SubmitFeedbackVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitFeedbackVariables): MutationRef<SubmitFeedbackData, SubmitFeedbackVariables>;
  operationName: string;
}
export const submitFeedbackRef: SubmitFeedbackRef;

export function submitFeedback(vars: SubmitFeedbackVariables): MutationPromise<SubmitFeedbackData, SubmitFeedbackVariables>;
export function submitFeedback(dc: DataConnect, vars: SubmitFeedbackVariables): MutationPromise<SubmitFeedbackData, SubmitFeedbackVariables>;

