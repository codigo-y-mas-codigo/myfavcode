/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Generates a personalized greeting based on the user's name, time of day, and day of the week.
 * @param name The name of the user.
 * @returns A personalized greeting string.
 */
export function getPersonalizedGreeting(name: string): string {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // Sunday = 0, Monday = 1, ...

    // Weekend-specific greetings
    if (day === 5 && hour >= 16) { // Friday afternoon/evening
        return `¡Por fin es viernes, ${name}!`;
    }
    if (day === 6 || day === 0) { // Saturday or Sunday
        return `¿Qué tal tu fin de semana, ${name}?`;
    }

    // Time-of-day greetings
    if (hour < 5 || hour >= 22) {
        return `¿Qué te trae de vuelta, alma nocturna?`;
    }
    if (hour < 12) {
        return `¡Buenos días, ${name}!`;
    }
    if (hour < 19) {
        return `¡Buenas tardes, ${name}!`;
    }
    
    return `¡Buenas noches, ${name}!`;
}
