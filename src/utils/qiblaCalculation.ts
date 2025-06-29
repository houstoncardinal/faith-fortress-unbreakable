
/**
 * Calculate the Qibla direction (bearing to Kaaba) from any location
 * @param lat - Latitude of current location
 * @param lng - Longitude of current location
 * @returns Qibla direction in degrees (0-360)
 */
export const calculateQiblaDirection = (lat: number, lng: number): number => {
  // Kaaba coordinates in Mecca, Saudi Arabia
  const kaabaLat = 21.4225; // 21°25'21.2"N
  const kaabaLng = 39.8262; // 39°49'34.2"E

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const lat1 = toRadians(lat);
  const lat2 = toRadians(kaabaLat);
  const deltaLng = toRadians(kaabaLng - lng);

  // Calculate bearing using the forward azimuth formula
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

  let bearing = toDegrees(Math.atan2(y, x));

  // Normalize to 0-360 degrees
  bearing = (bearing + 360) % 360;

  return Math.round(bearing);
};

/**
 * Calculate distance to Kaaba in kilometers
 * @param lat - Latitude of current location
 * @param lng - Longitude of current location
 * @returns Distance in kilometers
 */
export const calculateDistanceToKaaba = (lat: number, lng: number): number => {
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(kaabaLat - lat);
  const dLng = toRadians(kaabaLng - lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat)) * Math.cos(toRadians(kaabaLat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};

/**
 * Get compass direction name from degrees
 * @param degrees - Direction in degrees (0-360)
 * @returns Direction name (e.g., "North", "Northeast", etc.)
 */
export const getDirectionName = (degrees: number): string => {
  const directions = [
    'North', 'North-Northeast', 'Northeast', 'East-Northeast',
    'East', 'East-Southeast', 'Southeast', 'South-Southeast',
    'South', 'South-Southwest', 'Southwest', 'West-Southwest',
    'West', 'West-Northwest', 'Northwest', 'North-Northwest'
  ];

  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
