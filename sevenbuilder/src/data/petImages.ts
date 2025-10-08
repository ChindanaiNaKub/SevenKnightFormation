/**
 * Pet Image Mapping
 * Auto-generated from downloaded pet images
 * Last updated: October 8, 2025
 */

export const petImages: Record<string, string> = {
  "Aivan": "/pets/Aivan.png",
  "Aya": "/pets/Aya.png",
  "Bay": "/pets/Bay.png",
  "Croa": "/pets/Croa.png",
  "Dello": "/pets/Dello.png",
  "Doo": "/pets/Doo.png",
  "Eirin": "/pets/Eirin.png",
  "Eri": "/pets/Eri.png",
  "Halpy": "/pets/Halpy.png",
  "Hellepin": "/pets/Hellepin.png",
  "Hevepin": "/pets/Hevepin.png",
  "Jenipper": "/pets/Jenipper.png",
  "Jucy": "/pets/Jucy.png",
  "Karen": "/pets/Karen.png",
  "Kree": "/pets/Kree.png",
  "Li_kuh": "/pets/Li_kuh.png",
  "Little_Feng": "/pets/Little_Feng.png",
  "Mewmew": "/pets/Mewmew.png",
  "Mick": "/pets/Mick.png",
  "Mimic": "/pets/Mimic.png",
  "Mole": "/pets/Mole.png",
  "Nikki": "/pets/Nikki.png",
  "Nina": "/pets/Nina.png",
  "Note": "/pets/Note.png",
  "Paragon": "/pets/Paragon.png",
  "Pike": "/pets/Pike.png",
  "Poori": "/pets/Poori.png",
  "R_RL": "/pets/R_RL.png",
  "Racco": "/pets/Racco.png",
  "Richel": "/pets/Richel.png",
  "Ruu": "/pets/Ruu.png",
  "Sarana": "/pets/Sarana.png",
  "Sherry": "/pets/Sherry.png",
  "Yeonji": "/pets/Yeonji.png",
  "Yuu": "/pets/Yuu.png"
};

/**
 * Get pet image path by name
 * Falls back to placeholder if not found
 */
export function getPetImage(name: string): string {
  // Try exact match first
  if (petImages[name]) {
    return petImages[name];
  }
  
  // Try with underscores replaced by spaces
  const nameWithSpaces = name.replace(/_/g, ' ');
  const foundKey = Object.keys(petImages).find(
    key => key.replace(/_/g, ' ').toLowerCase() === nameWithSpaces.toLowerCase()
  );
  
  if (foundKey) {
    return petImages[foundKey];
  }
  
  // Try with spaces replaced by underscores
  const nameWithUnderscores = name.replace(/s/g, '_');
  if (petImages[nameWithUnderscores]) {
    return petImages[nameWithUnderscores];
  }
  
  // Fallback to placeholder
  return '/placeholder-pet.svg';
}
