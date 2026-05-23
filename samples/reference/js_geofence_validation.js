/**
 * OutSystems Client Action — JavaScript node reference
 * Use case: Geofence validation before inspection sign-off (SJ field app)
 *
 * How to use in Service Studio:
 * 1. Create Client Action ValidateGeofence
 * 2. Add JavaScript node with inputs: userLat, userLng, siteLat, siteLng, radiusMeters
 * 3. Output: isWithinRadius (boolean), distanceMeters (decimal)
 */

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Haversine distance between two GPS points in meters
 */
function haversineDistanceMeters(lat1, lng1, lat2, lng2) {
    var R = 6371000; // Earth radius in meters
    var dLat = toRadians(lat2 - lat1);
    var dLng = toRadians(lng2 - lng1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// --- OutSystems JavaScript node body (map $parameters) ---
// Inputs: $parameters.UserLat, UserLng, SiteLat, SiteLng, RadiusMeters

var distance = haversineDistanceMeters(
    $parameters.UserLat,
    $parameters.UserLng,
    $parameters.SiteLat,
    $parameters.SiteLng
);

$parameters.DistanceMeters = Math.round(distance);
$parameters.IsWithinRadius = distance <= ($parameters.RadiusMeters || 200);

// Optional: fail closed if GPS unavailable (0,0)
if ($parameters.UserLat === 0 && $parameters.UserLng === 0) {
    $parameters.IsWithinRadius = false;
    $parameters.DistanceMeters = -1;
}

/**
 * Interview talking points:
 * - Validate on client for UX; re-validate on server action (never trust client only)
 * - Radius configurable per Site entity
 * - Privacy: explain GPS use in app onboarding
 */
