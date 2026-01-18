# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getSevasList, getTempleInsights, getMyBookings, getGallery, createBooking, updateInsights, getDigitalLibrary, getUpcomingEvents, getLatestNews, getPanchangam } from '@temple/dataconnect';


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