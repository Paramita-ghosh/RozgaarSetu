import { Client } from "@googlemaps/google-maps-services-js";
import 'dotenv/config';

// Initialize the Google Maps Client
const googleMapsClient = new Client({});

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export default googleMapsClient;