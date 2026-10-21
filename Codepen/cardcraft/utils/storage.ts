
import type { SavedDesign } from '../types';

const STORAGE_KEY = 'cardcraft_designs';

export function loadDesigns(): SavedDesign[] {
  try {
    const designsJson = localStorage.getItem(STORAGE_KEY);
    return designsJson ? JSON.parse(designsJson) : [];
  } catch (error) {
    console.error("Failed to load designs from localStorage", error);
    return [];
  }
}

export function saveAllDesigns(designs: SavedDesign[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
    } catch (error) {
        console.error("Failed to save all designs to localStorage", error);
    }
}

export function saveDesign(design: SavedDesign) {
  const designs = loadDesigns();
  designs.unshift(design); // Add to the beginning
  saveAllDesigns(designs);
}

export function deleteDesign(id: string) {
  let designs = loadDesigns();
  designs = designs.filter(design => design.id !== id);
  saveAllDesigns(designs);
}
