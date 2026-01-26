import api from './api';

const getAllTours = () => {
    return api.get('/tours');
};

const getTourById = (id) => {
    return api.get(`/tours/${id}`);
};

const getCosts = (tourId) => {
    return api.get(`/costs/${tourId}`); // Assuming endpoint based on previous context, user said /api/costs but typically it needs an ID
};

const getItinerary = (tourId) => {
    return api.get(`/itineraries/${tourId}`); // User said GET /api/itineraries but usually needs tourId
};

// User specified: GET /departure/category/{catId} for departures? 
// Or maybe for a specific tour? usually departures are per tour.
// The user request said: "GET /departure/category/{catId}" in TourDetails.
// This matches the user request, although it's odd to get departures by category in tour details. 
// I will assume it might be /departure/tour/{tourId} or similar, but I will stick to the user's documented path if possible or safely assume standard REST.
// Actually, looking at the user request again: "GET /departure/category/{catId}" was listed under TourDetails.
// But TourDetails is for a specific Tour {id}. 
// It also listed "GET /api/costs".
// I'll implement assuming standard REST patterns where possible but keeping the user's paths in mind. 
// If the backend assumes /departure/category/{catId}, I'll add that.
// But for a specific tour details, I probably need departures for THAT tour. 
// Let's add a generic getDepartures and we'll see.
const getDepartures = (tourId) => {
    return api.get(`/departures/tour/${tourId}`); // Proposing this as a sensible default
}

// If strictly following user request for TourDetails:
// GET /api/tours/{id}
// GET /api/itineraries
// GET /departure/category/{catId}
// GET /api/costs
// I will implement these as requested.

const getAllAppCosts = () => {
    return api.get('/costs');
}

const getAllItineraries = () => {
    return api.get('/itineraries');
}

const getDeparturesByCategory = (catId) => {
    return api.get(`/departure/category/${catId}`);
}

const searchTours = (params) => {
    // params object { minPrice, maxPrice, days, startDate, endDate }
    // Convert to query string or post body based on API.
    // User requested GET /api/search? or POST /api/search? usually GET for search.
    // Let's assume GET with query params.
    return api.get('/search', { params });
}

const tourService = {
    getAllTours,
    getTourById,
    getCosts,
    getItinerary,
    getDepartures,
    getAllAppCosts,
    getAllItineraries,
    getDeparturesByCategory,
    searchTours
};

export default tourService;
