# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `temple-service`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `temple-service`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `temple-service`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `temple-service` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetSevasList
You can execute the `GetSevasList` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetSevasList(dc: DataConnect, options?: useDataConnectQueryOptions<GetSevasListData>): UseDataConnectQueryResult<GetSevasListData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSevasList(options?: useDataConnectQueryOptions<GetSevasListData>): UseDataConnectQueryResult<GetSevasListData, undefined>;
```

### Variables
The `GetSevasList` Query has no variables.
### Return Type
Recall that calling the `GetSevasList` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSevasList` Query is of type `GetSevasListData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSevasList`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetSevasList } from '@dataconnect/generated/react'

export default function GetSevasListComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSevasList();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSevasList(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSevasList(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSevasList(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sevas);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTempleInsights
You can execute the `GetTempleInsights` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTempleInsights(dc: DataConnect, options?: useDataConnectQueryOptions<GetTempleInsightsData>): UseDataConnectQueryResult<GetTempleInsightsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTempleInsights(options?: useDataConnectQueryOptions<GetTempleInsightsData>): UseDataConnectQueryResult<GetTempleInsightsData, undefined>;
```

### Variables
The `GetTempleInsights` Query has no variables.
### Return Type
Recall that calling the `GetTempleInsights` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTempleInsights` Query is of type `GetTempleInsightsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTempleInsights`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetTempleInsights } from '@dataconnect/generated/react'

export default function GetTempleInsightsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTempleInsights();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTempleInsights(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTempleInsights(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTempleInsights(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.insights);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyBookings
You can execute the `GetMyBookings` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMyBookings(dc: DataConnect, vars: GetMyBookingsVariables, options?: useDataConnectQueryOptions<GetMyBookingsData>): UseDataConnectQueryResult<GetMyBookingsData, GetMyBookingsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyBookings(vars: GetMyBookingsVariables, options?: useDataConnectQueryOptions<GetMyBookingsData>): UseDataConnectQueryResult<GetMyBookingsData, GetMyBookingsVariables>;
```

### Variables
The `GetMyBookings` Query requires an argument of type `GetMyBookingsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyBookingsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetMyBookings` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyBookings` Query is of type `GetMyBookingsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyBookings`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyBookingsVariables } from '@dataconnect/generated';
import { useGetMyBookings } from '@dataconnect/generated/react'

export default function GetMyBookingsComponent() {
  // The `useGetMyBookings` Query hook requires an argument of type `GetMyBookingsVariables`:
  const getMyBookingsVars: GetMyBookingsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyBookings(getMyBookingsVars);
  // Variables can be defined inline as well.
  const query = useGetMyBookings({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyBookings(dataConnect, getMyBookingsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyBookings(getMyBookingsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyBookings(dataConnect, getMyBookingsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.bookings);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetGallery
You can execute the `GetGallery` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetGallery(dc: DataConnect, options?: useDataConnectQueryOptions<GetGalleryData>): UseDataConnectQueryResult<GetGalleryData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetGallery(options?: useDataConnectQueryOptions<GetGalleryData>): UseDataConnectQueryResult<GetGalleryData, undefined>;
```

### Variables
The `GetGallery` Query has no variables.
### Return Type
Recall that calling the `GetGallery` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetGallery` Query is of type `GetGalleryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetGalleryData {
  galleries: ({
    id: UUIDString;
    url: string;
    caption?: string | null;
    type: string;
  } & Gallery_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetGallery`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetGallery } from '@dataconnect/generated/react'

export default function GetGalleryComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetGallery();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetGallery(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetGallery(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetGallery(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.galleries);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDigitalLibrary
You can execute the `GetDigitalLibrary` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetDigitalLibrary(dc: DataConnect, vars?: GetDigitalLibraryVariables, options?: useDataConnectQueryOptions<GetDigitalLibraryData>): UseDataConnectQueryResult<GetDigitalLibraryData, GetDigitalLibraryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDigitalLibrary(vars?: GetDigitalLibraryVariables, options?: useDataConnectQueryOptions<GetDigitalLibraryData>): UseDataConnectQueryResult<GetDigitalLibraryData, GetDigitalLibraryVariables>;
```

### Variables
The `GetDigitalLibrary` Query has an optional argument of type `GetDigitalLibraryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDigitalLibraryVariables {
  category?: string | null;
}
```
### Return Type
Recall that calling the `GetDigitalLibrary` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDigitalLibrary` Query is of type `GetDigitalLibraryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDigitalLibrary`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDigitalLibraryVariables } from '@dataconnect/generated';
import { useGetDigitalLibrary } from '@dataconnect/generated/react'

export default function GetDigitalLibraryComponent() {
  // The `useGetDigitalLibrary` Query hook has an optional argument of type `GetDigitalLibraryVariables`:
  const getDigitalLibraryVars: GetDigitalLibraryVariables = {
    category: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDigitalLibrary(getDigitalLibraryVars);
  // Variables can be defined inline as well.
  const query = useGetDigitalLibrary({ category: ..., });
  // Since all variables are optional for this Query, you can omit the `GetDigitalLibraryVariables` argument.
  // (as long as you don't want to provide any `options`!)
  const query = useGetDigitalLibrary();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDigitalLibrary(dataConnect, getDigitalLibraryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDigitalLibrary(getDigitalLibraryVars, options);
  // If you'd like to provide options without providing any variables, you must
  // pass `undefined` where you would normally pass the variables.
  const query = useGetDigitalLibrary(undefined, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDigitalLibrary(dataConnect, getDigitalLibraryVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.digitalLibraries);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUpcomingEvents
You can execute the `GetUpcomingEvents` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUpcomingEvents(dc: DataConnect, options?: useDataConnectQueryOptions<GetUpcomingEventsData>): UseDataConnectQueryResult<GetUpcomingEventsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUpcomingEvents(options?: useDataConnectQueryOptions<GetUpcomingEventsData>): UseDataConnectQueryResult<GetUpcomingEventsData, undefined>;
```

### Variables
The `GetUpcomingEvents` Query has no variables.
### Return Type
Recall that calling the `GetUpcomingEvents` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUpcomingEvents` Query is of type `GetUpcomingEventsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUpcomingEvents`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetUpcomingEvents } from '@dataconnect/generated/react'

export default function GetUpcomingEventsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUpcomingEvents();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUpcomingEvents(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUpcomingEvents(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUpcomingEvents(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.events);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLatestNews
You can execute the `GetLatestNews` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetLatestNews(dc: DataConnect, options?: useDataConnectQueryOptions<GetLatestNewsData>): UseDataConnectQueryResult<GetLatestNewsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLatestNews(options?: useDataConnectQueryOptions<GetLatestNewsData>): UseDataConnectQueryResult<GetLatestNewsData, undefined>;
```

### Variables
The `GetLatestNews` Query has no variables.
### Return Type
Recall that calling the `GetLatestNews` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLatestNews` Query is of type `GetLatestNewsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLatestNews`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetLatestNews } from '@dataconnect/generated/react'

export default function GetLatestNewsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLatestNews();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLatestNews(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLatestNews(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLatestNews(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.newss);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPanchangam
You can execute the `GetPanchangam` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPanchangam(dc: DataConnect, vars: GetPanchangamVariables, options?: useDataConnectQueryOptions<GetPanchangamData>): UseDataConnectQueryResult<GetPanchangamData, GetPanchangamVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPanchangam(vars: GetPanchangamVariables, options?: useDataConnectQueryOptions<GetPanchangamData>): UseDataConnectQueryResult<GetPanchangamData, GetPanchangamVariables>;
```

### Variables
The `GetPanchangam` Query requires an argument of type `GetPanchangamVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetPanchangamVariables {
  date: DateString;
}
```
### Return Type
Recall that calling the `GetPanchangam` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPanchangam` Query is of type `GetPanchangamData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPanchangam`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetPanchangamVariables } from '@dataconnect/generated';
import { useGetPanchangam } from '@dataconnect/generated/react'

export default function GetPanchangamComponent() {
  // The `useGetPanchangam` Query hook requires an argument of type `GetPanchangamVariables`:
  const getPanchangamVars: GetPanchangamVariables = {
    date: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPanchangam(getPanchangamVars);
  // Variables can be defined inline as well.
  const query = useGetPanchangam({ date: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPanchangam(dataConnect, getPanchangamVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPanchangam(getPanchangamVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPanchangam(dataConnect, getPanchangamVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.panchangam);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyDonations
You can execute the `GetMyDonations` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMyDonations(dc: DataConnect, vars: GetMyDonationsVariables, options?: useDataConnectQueryOptions<GetMyDonationsData>): UseDataConnectQueryResult<GetMyDonationsData, GetMyDonationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyDonations(vars: GetMyDonationsVariables, options?: useDataConnectQueryOptions<GetMyDonationsData>): UseDataConnectQueryResult<GetMyDonationsData, GetMyDonationsVariables>;
```

### Variables
The `GetMyDonations` Query requires an argument of type `GetMyDonationsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyDonationsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetMyDonations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyDonations` Query is of type `GetMyDonationsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyDonations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyDonationsVariables } from '@dataconnect/generated';
import { useGetMyDonations } from '@dataconnect/generated/react'

export default function GetMyDonationsComponent() {
  // The `useGetMyDonations` Query hook requires an argument of type `GetMyDonationsVariables`:
  const getMyDonationsVars: GetMyDonationsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyDonations(getMyDonationsVars);
  // Variables can be defined inline as well.
  const query = useGetMyDonations({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyDonations(dataConnect, getMyDonationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyDonations(getMyDonationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyDonations(dataConnect, getMyDonationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.donations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `temple-service` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateBooking
You can execute the `CreateBooking` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateBooking(options?: useDataConnectMutationOptions<CreateBookingData, FirebaseError, CreateBookingVariables>): UseDataConnectMutationResult<CreateBookingData, CreateBookingVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateBooking(dc: DataConnect, options?: useDataConnectMutationOptions<CreateBookingData, FirebaseError, CreateBookingVariables>): UseDataConnectMutationResult<CreateBookingData, CreateBookingVariables>;
```

### Variables
The `CreateBooking` Mutation requires an argument of type `CreateBookingVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateBooking` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateBooking` Mutation is of type `CreateBookingData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateBookingData {
  booking_insert: Booking_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateBooking`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateBookingVariables } from '@dataconnect/generated';
import { useCreateBooking } from '@dataconnect/generated/react'

export default function CreateBookingComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateBooking();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateBooking(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateBooking(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateBooking(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateBooking` Mutation requires an argument of type `CreateBookingVariables`:
  const createBookingVars: CreateBookingVariables = {
    sevaId: ..., 
    date: ..., 
    name: ..., 
    mobile: ..., 
    email: ..., // optional
    code: ..., 
    userId: ..., 
  };
  mutation.mutate(createBookingVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sevaId: ..., date: ..., name: ..., mobile: ..., email: ..., code: ..., userId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createBookingVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.booking_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateInsights
You can execute the `UpdateInsights` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateInsights(options?: useDataConnectMutationOptions<UpdateInsightsData, FirebaseError, UpdateInsightsVariables>): UseDataConnectMutationResult<UpdateInsightsData, UpdateInsightsVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateInsights(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInsightsData, FirebaseError, UpdateInsightsVariables>): UseDataConnectMutationResult<UpdateInsightsData, UpdateInsightsVariables>;
```

### Variables
The `UpdateInsights` Mutation requires an argument of type `UpdateInsightsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateInsightsVariables {
  id: number;
  crowd?: string | null;
  wait?: number | null;
}
```
### Return Type
Recall that calling the `UpdateInsights` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInsights` Mutation is of type `UpdateInsightsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInsightsData {
  insight_update?: Insight_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateInsights`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateInsightsVariables } from '@dataconnect/generated';
import { useUpdateInsights } from '@dataconnect/generated/react'

export default function UpdateInsightsComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateInsights();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateInsights(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInsights(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInsights(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateInsights` Mutation requires an argument of type `UpdateInsightsVariables`:
  const updateInsightsVars: UpdateInsightsVariables = {
    id: ..., 
    crowd: ..., // optional
    wait: ..., // optional
  };
  mutation.mutate(updateInsightsVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., crowd: ..., wait: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateInsightsVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.insight_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateDonation
You can execute the `CreateDonation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCreateDonation(options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, CreateDonationVariables>): UseDataConnectMutationResult<CreateDonationData, CreateDonationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateDonation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDonationData, FirebaseError, CreateDonationVariables>): UseDataConnectMutationResult<CreateDonationData, CreateDonationVariables>;
```

### Variables
The `CreateDonation` Mutation requires an argument of type `CreateDonationVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateDonation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateDonation` Mutation is of type `CreateDonationData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateDonationData {
  donation_insert: Donation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateDonation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateDonationVariables } from '@dataconnect/generated';
import { useCreateDonation } from '@dataconnect/generated/react'

export default function CreateDonationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateDonation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateDonation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDonation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateDonation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateDonation` Mutation requires an argument of type `CreateDonationVariables`:
  const createDonationVars: CreateDonationVariables = {
    name: ..., 
    category: ..., 
    amount: ..., 
    email: ..., // optional
    txId: ..., 
    userId: ..., // optional
    gothram: ..., // optional
  };
  mutation.mutate(createDonationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., category: ..., amount: ..., email: ..., txId: ..., userId: ..., gothram: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createDonationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.donation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SubmitFeedback
You can execute the `SubmitFeedback` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useSubmitFeedback(options?: useDataConnectMutationOptions<SubmitFeedbackData, FirebaseError, SubmitFeedbackVariables>): UseDataConnectMutationResult<SubmitFeedbackData, SubmitFeedbackVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSubmitFeedback(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitFeedbackData, FirebaseError, SubmitFeedbackVariables>): UseDataConnectMutationResult<SubmitFeedbackData, SubmitFeedbackVariables>;
```

### Variables
The `SubmitFeedback` Mutation requires an argument of type `SubmitFeedbackVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SubmitFeedbackVariables {
  name: string;
  email?: string | null;
  subject?: string | null;
  message: string;
  userId?: string | null;
}
```
### Return Type
Recall that calling the `SubmitFeedback` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SubmitFeedback` Mutation is of type `SubmitFeedbackData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SubmitFeedbackData {
  feedback_insert: Feedback_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SubmitFeedback`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SubmitFeedbackVariables } from '@dataconnect/generated';
import { useSubmitFeedback } from '@dataconnect/generated/react'

export default function SubmitFeedbackComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSubmitFeedback();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSubmitFeedback(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitFeedback(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitFeedback(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSubmitFeedback` Mutation requires an argument of type `SubmitFeedbackVariables`:
  const submitFeedbackVars: SubmitFeedbackVariables = {
    name: ..., 
    email: ..., // optional
    subject: ..., // optional
    message: ..., 
    userId: ..., // optional
  };
  mutation.mutate(submitFeedbackVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., email: ..., subject: ..., message: ..., userId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(submitFeedbackVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.feedback_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

