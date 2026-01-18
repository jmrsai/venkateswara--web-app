# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetSevasList, useGetTempleInsights, useGetMyBookings, useGetGallery, useCreateBooking, useUpdateInsights, useGetDigitalLibrary, useGetUpcomingEvents, useGetLatestNews, useGetPanchangam } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetSevasList();

const { data, isPending, isSuccess, isError, error } = useGetTempleInsights();

const { data, isPending, isSuccess, isError, error } = useGetMyBookings(getMyBookingsVars);

const { data, isPending, isSuccess, isError, error } = useGetGallery();

const { data, isPending, isSuccess, isError, error } = useCreateBooking(createBookingVars);

const { data, isPending, isSuccess, isError, error } = useUpdateInsights(updateInsightsVars);

const { data, isPending, isSuccess, isError, error } = useGetDigitalLibrary(getDigitalLibraryVars);

const { data, isPending, isSuccess, isError, error } = useGetUpcomingEvents();

const { data, isPending, isSuccess, isError, error } = useGetLatestNews();

const { data, isPending, isSuccess, isError, error } = useGetPanchangam(getPanchangamVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getSevasList, getTempleInsights, getMyBookings, getGallery, createBooking, updateInsights, getDigitalLibrary, getUpcomingEvents, getLatestNews, getPanchangam } from '@dataconnect/generated';


// Operation GetSevasList: 
const { data } = await GetSevasList(dataConnect);

// Operation GetTempleInsights: 
const { data } = await GetTempleInsights(dataConnect);

// Operation GetMyBookings:  For variables, look at type GetMyBookingsVars in ../index.d.ts
const { data } = await GetMyBookings(dataConnect, getMyBookingsVars);

// Operation GetGallery: 
const { data } = await GetGallery(dataConnect);

// Operation CreateBooking:  For variables, look at type CreateBookingVars in ../index.d.ts
const { data } = await CreateBooking(dataConnect, createBookingVars);

// Operation UpdateInsights:  For variables, look at type UpdateInsightsVars in ../index.d.ts
const { data } = await UpdateInsights(dataConnect, updateInsightsVars);

// Operation GetDigitalLibrary:  For variables, look at type GetDigitalLibraryVars in ../index.d.ts
const { data } = await GetDigitalLibrary(dataConnect, getDigitalLibraryVars);

// Operation GetUpcomingEvents: 
const { data } = await GetUpcomingEvents(dataConnect);

// Operation GetLatestNews: 
const { data } = await GetLatestNews(dataConnect);

// Operation GetPanchangam:  For variables, look at type GetPanchangamVars in ../index.d.ts
const { data } = await GetPanchangam(dataConnect, getPanchangamVars);


```