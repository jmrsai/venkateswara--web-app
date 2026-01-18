# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `temple-service`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetSevasList*](#getsevaslist)
  - [*GetTempleInsights*](#gettempleinsights)
  - [*GetMyBookings*](#getmybookings)
  - [*GetGallery*](#getgallery)
  - [*GetDigitalLibrary*](#getdigitallibrary)
  - [*GetUpcomingEvents*](#getupcomingevents)
  - [*GetLatestNews*](#getlatestnews)
  - [*GetPanchangam*](#getpanchangam)
  - [*GetMyDonations*](#getmydonations)
- [**Mutations**](#mutations)
  - [*CreateBooking*](#createbooking)
  - [*UpdateInsights*](#updateinsights)
  - [*CreateDonation*](#createdonation)
  - [*SubmitFeedback*](#submitfeedback)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `temple-service`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@temple/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@temple/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@temple/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `temple-service` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetSevasList
You can execute the `GetSevasList` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getSevasList(): QueryPromise<GetSevasListData, undefined>;

interface GetSevasListRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetSevasListData, undefined>;
}
export const getSevasListRef: GetSevasListRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSevasList(dc: DataConnect): QueryPromise<GetSevasListData, undefined>;

interface GetSevasListRef {
  ...
  (dc: DataConnect): QueryRef<GetSevasListData, undefined>;
}
export const getSevasListRef: GetSevasListRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSevasListRef:
```typescript
const name = getSevasListRef.operationName;
console.log(name);
```

### Variables
The `GetSevasList` query has no variables.
### Return Type
Recall that executing the `GetSevasList` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSevasListData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSevasList`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSevasList } from '@temple/dataconnect';


// Call the `getSevasList()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSevasList();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSevasList(dataConnect);

console.log(data.sevas);

// Or, you can use the `Promise` API.
getSevasList().then((response) => {
  const data = response.data;
  console.log(data.sevas);
});
```

### Using `GetSevasList`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSevasListRef } from '@temple/dataconnect';


// Call the `getSevasListRef()` function to get a reference to the query.
const ref = getSevasListRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSevasListRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sevas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sevas);
});
```

## GetTempleInsights
You can execute the `GetTempleInsights` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getTempleInsights(): QueryPromise<GetTempleInsightsData, undefined>;

interface GetTempleInsightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTempleInsightsData, undefined>;
}
export const getTempleInsightsRef: GetTempleInsightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTempleInsights(dc: DataConnect): QueryPromise<GetTempleInsightsData, undefined>;

interface GetTempleInsightsRef {
  ...
  (dc: DataConnect): QueryRef<GetTempleInsightsData, undefined>;
}
export const getTempleInsightsRef: GetTempleInsightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTempleInsightsRef:
```typescript
const name = getTempleInsightsRef.operationName;
console.log(name);
```

### Variables
The `GetTempleInsights` query has no variables.
### Return Type
Recall that executing the `GetTempleInsights` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTempleInsightsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTempleInsights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTempleInsights } from '@temple/dataconnect';


// Call the `getTempleInsights()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTempleInsights();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTempleInsights(dataConnect);

console.log(data.insights);

// Or, you can use the `Promise` API.
getTempleInsights().then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

### Using `GetTempleInsights`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTempleInsightsRef } from '@temple/dataconnect';


// Call the `getTempleInsightsRef()` function to get a reference to the query.
const ref = getTempleInsightsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTempleInsightsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.insights);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

## GetMyBookings
You can execute the `GetMyBookings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getMyBookings(vars: GetMyBookingsVariables): QueryPromise<GetMyBookingsData, GetMyBookingsVariables>;

interface GetMyBookingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyBookingsVariables): QueryRef<GetMyBookingsData, GetMyBookingsVariables>;
}
export const getMyBookingsRef: GetMyBookingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyBookings(dc: DataConnect, vars: GetMyBookingsVariables): QueryPromise<GetMyBookingsData, GetMyBookingsVariables>;

interface GetMyBookingsRef {
  ...
  (dc: DataConnect, vars: GetMyBookingsVariables): QueryRef<GetMyBookingsData, GetMyBookingsVariables>;
}
export const getMyBookingsRef: GetMyBookingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyBookingsRef:
```typescript
const name = getMyBookingsRef.operationName;
console.log(name);
```

### Variables
The `GetMyBookings` query requires an argument of type `GetMyBookingsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyBookingsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetMyBookings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyBookingsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyBookings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyBookings, GetMyBookingsVariables } from '@temple/dataconnect';

// The `GetMyBookings` query requires an argument of type `GetMyBookingsVariables`:
const getMyBookingsVars: GetMyBookingsVariables = {
  userId: ..., 
};

// Call the `getMyBookings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyBookings(getMyBookingsVars);
// Variables can be defined inline as well.
const { data } = await getMyBookings({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyBookings(dataConnect, getMyBookingsVars);

console.log(data.bookings);

// Or, you can use the `Promise` API.
getMyBookings(getMyBookingsVars).then((response) => {
  const data = response.data;
  console.log(data.bookings);
});
```

### Using `GetMyBookings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyBookingsRef, GetMyBookingsVariables } from '@temple/dataconnect';

// The `GetMyBookings` query requires an argument of type `GetMyBookingsVariables`:
const getMyBookingsVars: GetMyBookingsVariables = {
  userId: ..., 
};

// Call the `getMyBookingsRef()` function to get a reference to the query.
const ref = getMyBookingsRef(getMyBookingsVars);
// Variables can be defined inline as well.
const ref = getMyBookingsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyBookingsRef(dataConnect, getMyBookingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.bookings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.bookings);
});
```

## GetGallery
You can execute the `GetGallery` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getGallery(): QueryPromise<GetGalleryData, undefined>;

interface GetGalleryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetGalleryData, undefined>;
}
export const getGalleryRef: GetGalleryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGallery(dc: DataConnect): QueryPromise<GetGalleryData, undefined>;

interface GetGalleryRef {
  ...
  (dc: DataConnect): QueryRef<GetGalleryData, undefined>;
}
export const getGalleryRef: GetGalleryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGalleryRef:
```typescript
const name = getGalleryRef.operationName;
console.log(name);
```

### Variables
The `GetGallery` query has no variables.
### Return Type
Recall that executing the `GetGallery` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGalleryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGalleryData {
  galleries: ({
    id: UUIDString;
    url: string;
    caption?: string | null;
    type: string;
  } & Gallery_Key)[];
}
```
### Using `GetGallery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGallery } from '@temple/dataconnect';


// Call the `getGallery()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGallery();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGallery(dataConnect);

console.log(data.galleries);

// Or, you can use the `Promise` API.
getGallery().then((response) => {
  const data = response.data;
  console.log(data.galleries);
});
```

### Using `GetGallery`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGalleryRef } from '@temple/dataconnect';


// Call the `getGalleryRef()` function to get a reference to the query.
const ref = getGalleryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGalleryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.galleries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.galleries);
});
```

## GetDigitalLibrary
You can execute the `GetDigitalLibrary` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getDigitalLibrary(vars?: GetDigitalLibraryVariables): QueryPromise<GetDigitalLibraryData, GetDigitalLibraryVariables>;

interface GetDigitalLibraryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetDigitalLibraryVariables): QueryRef<GetDigitalLibraryData, GetDigitalLibraryVariables>;
}
export const getDigitalLibraryRef: GetDigitalLibraryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDigitalLibrary(dc: DataConnect, vars?: GetDigitalLibraryVariables): QueryPromise<GetDigitalLibraryData, GetDigitalLibraryVariables>;

interface GetDigitalLibraryRef {
  ...
  (dc: DataConnect, vars?: GetDigitalLibraryVariables): QueryRef<GetDigitalLibraryData, GetDigitalLibraryVariables>;
}
export const getDigitalLibraryRef: GetDigitalLibraryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDigitalLibraryRef:
```typescript
const name = getDigitalLibraryRef.operationName;
console.log(name);
```

### Variables
The `GetDigitalLibrary` query has an optional argument of type `GetDigitalLibraryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDigitalLibraryVariables {
  category?: string | null;
}
```
### Return Type
Recall that executing the `GetDigitalLibrary` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDigitalLibraryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDigitalLibrary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDigitalLibrary, GetDigitalLibraryVariables } from '@temple/dataconnect';

// The `GetDigitalLibrary` query has an optional argument of type `GetDigitalLibraryVariables`:
const getDigitalLibraryVars: GetDigitalLibraryVariables = {
  category: ..., // optional
};

// Call the `getDigitalLibrary()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDigitalLibrary(getDigitalLibraryVars);
// Variables can be defined inline as well.
const { data } = await getDigitalLibrary({ category: ..., });
// Since all variables are optional for this query, you can omit the `GetDigitalLibraryVariables` argument.
const { data } = await getDigitalLibrary();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDigitalLibrary(dataConnect, getDigitalLibraryVars);

console.log(data.digitalLibraries);

// Or, you can use the `Promise` API.
getDigitalLibrary(getDigitalLibraryVars).then((response) => {
  const data = response.data;
  console.log(data.digitalLibraries);
});
```

### Using `GetDigitalLibrary`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDigitalLibraryRef, GetDigitalLibraryVariables } from '@temple/dataconnect';

// The `GetDigitalLibrary` query has an optional argument of type `GetDigitalLibraryVariables`:
const getDigitalLibraryVars: GetDigitalLibraryVariables = {
  category: ..., // optional
};

// Call the `getDigitalLibraryRef()` function to get a reference to the query.
const ref = getDigitalLibraryRef(getDigitalLibraryVars);
// Variables can be defined inline as well.
const ref = getDigitalLibraryRef({ category: ..., });
// Since all variables are optional for this query, you can omit the `GetDigitalLibraryVariables` argument.
const ref = getDigitalLibraryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDigitalLibraryRef(dataConnect, getDigitalLibraryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.digitalLibraries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.digitalLibraries);
});
```

## GetUpcomingEvents
You can execute the `GetUpcomingEvents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUpcomingEvents(): QueryPromise<GetUpcomingEventsData, undefined>;

interface GetUpcomingEventsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUpcomingEventsData, undefined>;
}
export const getUpcomingEventsRef: GetUpcomingEventsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUpcomingEvents(dc: DataConnect): QueryPromise<GetUpcomingEventsData, undefined>;

interface GetUpcomingEventsRef {
  ...
  (dc: DataConnect): QueryRef<GetUpcomingEventsData, undefined>;
}
export const getUpcomingEventsRef: GetUpcomingEventsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUpcomingEventsRef:
```typescript
const name = getUpcomingEventsRef.operationName;
console.log(name);
```

### Variables
The `GetUpcomingEvents` query has no variables.
### Return Type
Recall that executing the `GetUpcomingEvents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUpcomingEventsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUpcomingEvents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUpcomingEvents } from '@temple/dataconnect';


// Call the `getUpcomingEvents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUpcomingEvents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUpcomingEvents(dataConnect);

console.log(data.events);

// Or, you can use the `Promise` API.
getUpcomingEvents().then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

### Using `GetUpcomingEvents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUpcomingEventsRef } from '@temple/dataconnect';


// Call the `getUpcomingEventsRef()` function to get a reference to the query.
const ref = getUpcomingEventsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUpcomingEventsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.events);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

## GetLatestNews
You can execute the `GetLatestNews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLatestNews(): QueryPromise<GetLatestNewsData, undefined>;

interface GetLatestNewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLatestNewsData, undefined>;
}
export const getLatestNewsRef: GetLatestNewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLatestNews(dc: DataConnect): QueryPromise<GetLatestNewsData, undefined>;

interface GetLatestNewsRef {
  ...
  (dc: DataConnect): QueryRef<GetLatestNewsData, undefined>;
}
export const getLatestNewsRef: GetLatestNewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLatestNewsRef:
```typescript
const name = getLatestNewsRef.operationName;
console.log(name);
```

### Variables
The `GetLatestNews` query has no variables.
### Return Type
Recall that executing the `GetLatestNews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLatestNewsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLatestNews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLatestNews } from '@temple/dataconnect';


// Call the `getLatestNews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLatestNews();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLatestNews(dataConnect);

console.log(data.newss);

// Or, you can use the `Promise` API.
getLatestNews().then((response) => {
  const data = response.data;
  console.log(data.newss);
});
```

### Using `GetLatestNews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLatestNewsRef } from '@temple/dataconnect';


// Call the `getLatestNewsRef()` function to get a reference to the query.
const ref = getLatestNewsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLatestNewsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.newss);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.newss);
});
```

## GetPanchangam
You can execute the `GetPanchangam` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getPanchangam(vars: GetPanchangamVariables): QueryPromise<GetPanchangamData, GetPanchangamVariables>;

interface GetPanchangamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPanchangamVariables): QueryRef<GetPanchangamData, GetPanchangamVariables>;
}
export const getPanchangamRef: GetPanchangamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPanchangam(dc: DataConnect, vars: GetPanchangamVariables): QueryPromise<GetPanchangamData, GetPanchangamVariables>;

interface GetPanchangamRef {
  ...
  (dc: DataConnect, vars: GetPanchangamVariables): QueryRef<GetPanchangamData, GetPanchangamVariables>;
}
export const getPanchangamRef: GetPanchangamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPanchangamRef:
```typescript
const name = getPanchangamRef.operationName;
console.log(name);
```

### Variables
The `GetPanchangam` query requires an argument of type `GetPanchangamVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPanchangamVariables {
  date: DateString;
}
```
### Return Type
Recall that executing the `GetPanchangam` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPanchangamData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPanchangam`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPanchangam, GetPanchangamVariables } from '@temple/dataconnect';

// The `GetPanchangam` query requires an argument of type `GetPanchangamVariables`:
const getPanchangamVars: GetPanchangamVariables = {
  date: ..., 
};

// Call the `getPanchangam()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPanchangam(getPanchangamVars);
// Variables can be defined inline as well.
const { data } = await getPanchangam({ date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPanchangam(dataConnect, getPanchangamVars);

console.log(data.panchangam);

// Or, you can use the `Promise` API.
getPanchangam(getPanchangamVars).then((response) => {
  const data = response.data;
  console.log(data.panchangam);
});
```

### Using `GetPanchangam`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPanchangamRef, GetPanchangamVariables } from '@temple/dataconnect';

// The `GetPanchangam` query requires an argument of type `GetPanchangamVariables`:
const getPanchangamVars: GetPanchangamVariables = {
  date: ..., 
};

// Call the `getPanchangamRef()` function to get a reference to the query.
const ref = getPanchangamRef(getPanchangamVars);
// Variables can be defined inline as well.
const ref = getPanchangamRef({ date: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPanchangamRef(dataConnect, getPanchangamVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.panchangam);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.panchangam);
});
```

## GetMyDonations
You can execute the `GetMyDonations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getMyDonations(vars: GetMyDonationsVariables): QueryPromise<GetMyDonationsData, GetMyDonationsVariables>;

interface GetMyDonationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyDonationsVariables): QueryRef<GetMyDonationsData, GetMyDonationsVariables>;
}
export const getMyDonationsRef: GetMyDonationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyDonations(dc: DataConnect, vars: GetMyDonationsVariables): QueryPromise<GetMyDonationsData, GetMyDonationsVariables>;

interface GetMyDonationsRef {
  ...
  (dc: DataConnect, vars: GetMyDonationsVariables): QueryRef<GetMyDonationsData, GetMyDonationsVariables>;
}
export const getMyDonationsRef: GetMyDonationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyDonationsRef:
```typescript
const name = getMyDonationsRef.operationName;
console.log(name);
```

### Variables
The `GetMyDonations` query requires an argument of type `GetMyDonationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyDonationsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetMyDonations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyDonationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyDonations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyDonations, GetMyDonationsVariables } from '@temple/dataconnect';

// The `GetMyDonations` query requires an argument of type `GetMyDonationsVariables`:
const getMyDonationsVars: GetMyDonationsVariables = {
  userId: ..., 
};

// Call the `getMyDonations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyDonations(getMyDonationsVars);
// Variables can be defined inline as well.
const { data } = await getMyDonations({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyDonations(dataConnect, getMyDonationsVars);

console.log(data.donations);

// Or, you can use the `Promise` API.
getMyDonations(getMyDonationsVars).then((response) => {
  const data = response.data;
  console.log(data.donations);
});
```

### Using `GetMyDonations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyDonationsRef, GetMyDonationsVariables } from '@temple/dataconnect';

// The `GetMyDonations` query requires an argument of type `GetMyDonationsVariables`:
const getMyDonationsVars: GetMyDonationsVariables = {
  userId: ..., 
};

// Call the `getMyDonationsRef()` function to get a reference to the query.
const ref = getMyDonationsRef(getMyDonationsVars);
// Variables can be defined inline as well.
const ref = getMyDonationsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyDonationsRef(dataConnect, getMyDonationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.donations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.donations);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `temple-service` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateBooking
You can execute the `CreateBooking` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookingRef:
```typescript
const name = createBookingRef.operationName;
console.log(name);
```

### Variables
The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookingVariables {
  sevaId: UUIDString;
  date: DateString;
  name: string;
  mobile: string;
  email?: string | null;
  code: string;
  userId: string;
}
```
### Return Type
Recall that executing the `CreateBooking` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookingData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookingData {
  booking_insert: Booking_Key;
}
```
### Using `CreateBooking`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBooking, CreateBookingVariables } from '@temple/dataconnect';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  sevaId: ..., 
  date: ..., 
  name: ..., 
  mobile: ..., 
  email: ..., // optional
  code: ..., 
  userId: ..., 
};

// Call the `createBooking()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBooking(createBookingVars);
// Variables can be defined inline as well.
const { data } = await createBooking({ sevaId: ..., date: ..., name: ..., mobile: ..., email: ..., code: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBooking(dataConnect, createBookingVars);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
createBooking(createBookingVars).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

### Using `CreateBooking`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookingRef, CreateBookingVariables } from '@temple/dataconnect';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  sevaId: ..., 
  date: ..., 
  name: ..., 
  mobile: ..., 
  email: ..., // optional
  code: ..., 
  userId: ..., 
};

// Call the `createBookingRef()` function to get a reference to the mutation.
const ref = createBookingRef(createBookingVars);
// Variables can be defined inline as well.
const ref = createBookingRef({ sevaId: ..., date: ..., name: ..., mobile: ..., email: ..., code: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookingRef(dataConnect, createBookingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

## UpdateInsights
You can execute the `UpdateInsights` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateInsights(vars: UpdateInsightsVariables): MutationPromise<UpdateInsightsData, UpdateInsightsVariables>;

interface UpdateInsightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightsVariables): MutationRef<UpdateInsightsData, UpdateInsightsVariables>;
}
export const updateInsightsRef: UpdateInsightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInsights(dc: DataConnect, vars: UpdateInsightsVariables): MutationPromise<UpdateInsightsData, UpdateInsightsVariables>;

interface UpdateInsightsRef {
  ...
  (dc: DataConnect, vars: UpdateInsightsVariables): MutationRef<UpdateInsightsData, UpdateInsightsVariables>;
}
export const updateInsightsRef: UpdateInsightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInsightsRef:
```typescript
const name = updateInsightsRef.operationName;
console.log(name);
```

### Variables
The `UpdateInsights` mutation requires an argument of type `UpdateInsightsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInsightsVariables {
  id: number;
  crowd?: string | null;
  wait?: number | null;
}
```
### Return Type
Recall that executing the `UpdateInsights` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInsightsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInsightsData {
  insight_update?: Insight_Key | null;
}
```
### Using `UpdateInsights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInsights, UpdateInsightsVariables } from '@temple/dataconnect';

// The `UpdateInsights` mutation requires an argument of type `UpdateInsightsVariables`:
const updateInsightsVars: UpdateInsightsVariables = {
  id: ..., 
  crowd: ..., // optional
  wait: ..., // optional
};

// Call the `updateInsights()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInsights(updateInsightsVars);
// Variables can be defined inline as well.
const { data } = await updateInsights({ id: ..., crowd: ..., wait: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInsights(dataConnect, updateInsightsVars);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
updateInsights(updateInsightsVars).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

### Using `UpdateInsights`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInsightsRef, UpdateInsightsVariables } from '@temple/dataconnect';

// The `UpdateInsights` mutation requires an argument of type `UpdateInsightsVariables`:
const updateInsightsVars: UpdateInsightsVariables = {
  id: ..., 
  crowd: ..., // optional
  wait: ..., // optional
};

// Call the `updateInsightsRef()` function to get a reference to the mutation.
const ref = updateInsightsRef(updateInsightsVars);
// Variables can be defined inline as well.
const ref = updateInsightsRef({ id: ..., crowd: ..., wait: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInsightsRef(dataConnect, updateInsightsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

## CreateDonation
You can execute the `CreateDonation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createDonation(vars: CreateDonationVariables): MutationPromise<CreateDonationData, CreateDonationVariables>;

interface CreateDonationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDonationVariables): MutationRef<CreateDonationData, CreateDonationVariables>;
}
export const createDonationRef: CreateDonationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDonation(dc: DataConnect, vars: CreateDonationVariables): MutationPromise<CreateDonationData, CreateDonationVariables>;

interface CreateDonationRef {
  ...
  (dc: DataConnect, vars: CreateDonationVariables): MutationRef<CreateDonationData, CreateDonationVariables>;
}
export const createDonationRef: CreateDonationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDonationRef:
```typescript
const name = createDonationRef.operationName;
console.log(name);
```

### Variables
The `CreateDonation` mutation requires an argument of type `CreateDonationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDonationVariables {
  name: string;
  category: string;
  amount: number;
  email?: string | null;
  txId: string;
  userId?: string | null;
  gothram?: string | null;
}
```
### Return Type
Recall that executing the `CreateDonation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDonationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDonationData {
  donation_insert: Donation_Key;
}
```
### Using `CreateDonation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDonation, CreateDonationVariables } from '@temple/dataconnect';

// The `CreateDonation` mutation requires an argument of type `CreateDonationVariables`:
const createDonationVars: CreateDonationVariables = {
  name: ..., 
  category: ..., 
  amount: ..., 
  email: ..., // optional
  txId: ..., 
  userId: ..., // optional
  gothram: ..., // optional
};

// Call the `createDonation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDonation(createDonationVars);
// Variables can be defined inline as well.
const { data } = await createDonation({ name: ..., category: ..., amount: ..., email: ..., txId: ..., userId: ..., gothram: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDonation(dataConnect, createDonationVars);

console.log(data.donation_insert);

// Or, you can use the `Promise` API.
createDonation(createDonationVars).then((response) => {
  const data = response.data;
  console.log(data.donation_insert);
});
```

### Using `CreateDonation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDonationRef, CreateDonationVariables } from '@temple/dataconnect';

// The `CreateDonation` mutation requires an argument of type `CreateDonationVariables`:
const createDonationVars: CreateDonationVariables = {
  name: ..., 
  category: ..., 
  amount: ..., 
  email: ..., // optional
  txId: ..., 
  userId: ..., // optional
  gothram: ..., // optional
};

// Call the `createDonationRef()` function to get a reference to the mutation.
const ref = createDonationRef(createDonationVars);
// Variables can be defined inline as well.
const ref = createDonationRef({ name: ..., category: ..., amount: ..., email: ..., txId: ..., userId: ..., gothram: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDonationRef(dataConnect, createDonationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.donation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.donation_insert);
});
```

## SubmitFeedback
You can execute the `SubmitFeedback` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
submitFeedback(vars: SubmitFeedbackVariables): MutationPromise<SubmitFeedbackData, SubmitFeedbackVariables>;

interface SubmitFeedbackRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitFeedbackVariables): MutationRef<SubmitFeedbackData, SubmitFeedbackVariables>;
}
export const submitFeedbackRef: SubmitFeedbackRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitFeedback(dc: DataConnect, vars: SubmitFeedbackVariables): MutationPromise<SubmitFeedbackData, SubmitFeedbackVariables>;

interface SubmitFeedbackRef {
  ...
  (dc: DataConnect, vars: SubmitFeedbackVariables): MutationRef<SubmitFeedbackData, SubmitFeedbackVariables>;
}
export const submitFeedbackRef: SubmitFeedbackRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitFeedbackRef:
```typescript
const name = submitFeedbackRef.operationName;
console.log(name);
```

### Variables
The `SubmitFeedback` mutation requires an argument of type `SubmitFeedbackVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitFeedbackVariables {
  name: string;
  email?: string | null;
  subject?: string | null;
  message: string;
  userId?: string | null;
}
```
### Return Type
Recall that executing the `SubmitFeedback` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitFeedbackData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitFeedbackData {
  feedback_insert: Feedback_Key;
}
```
### Using `SubmitFeedback`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitFeedback, SubmitFeedbackVariables } from '@temple/dataconnect';

// The `SubmitFeedback` mutation requires an argument of type `SubmitFeedbackVariables`:
const submitFeedbackVars: SubmitFeedbackVariables = {
  name: ..., 
  email: ..., // optional
  subject: ..., // optional
  message: ..., 
  userId: ..., // optional
};

// Call the `submitFeedback()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitFeedback(submitFeedbackVars);
// Variables can be defined inline as well.
const { data } = await submitFeedback({ name: ..., email: ..., subject: ..., message: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitFeedback(dataConnect, submitFeedbackVars);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
submitFeedback(submitFeedbackVars).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

### Using `SubmitFeedback`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitFeedbackRef, SubmitFeedbackVariables } from '@temple/dataconnect';

// The `SubmitFeedback` mutation requires an argument of type `SubmitFeedbackVariables`:
const submitFeedbackVars: SubmitFeedbackVariables = {
  name: ..., 
  email: ..., // optional
  subject: ..., // optional
  message: ..., 
  userId: ..., // optional
};

// Call the `submitFeedbackRef()` function to get a reference to the mutation.
const ref = submitFeedbackRef(submitFeedbackVars);
// Variables can be defined inline as well.
const ref = submitFeedbackRef({ name: ..., email: ..., subject: ..., message: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitFeedbackRef(dataConnect, submitFeedbackVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feedback_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feedback_insert);
});
```

