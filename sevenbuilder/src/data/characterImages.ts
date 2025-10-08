/**
 * Character Image Mapping
 * Auto-generated from downloaded character images
 * Last updated: October 8, 2025
 */

export const characterImages: Record<string, string> = {
  "Aaron": "/characters/Aaron.png",
  "Ace": "/characters/Ace.png",
  "Ahkan": "/characters/Ahkan.png",
  "Ahri": "/characters/Ahri.png",
  "Alice": "/characters/Alice.png",
  "Amelia": "/characters/Amelia.png",
  "Aragon": "/characters/Aragon.png",
  "Ariel": "/characters/Ariel.png",
  "Asura": "/characters/Asura.png",
  "Babel": "/characters/Babel.png",
  "Ballista": "/characters/Ballista.png",
  "Bane": "/characters/Bane.png",
  "Baron": "/characters/Baron.png",
  "Bella": "/characters/Bella.png",
  "Beskin": "/characters/Beskin.png",
  "BiDam": "/characters/BiDam.png",
  "Biscuit": "/characters/Biscuit.png",
  "Black_Rose": "/characters/Black_Rose.png",
  "Catty": "/characters/Catty.png",
  "Cellops": "/characters/Cellops.png",
  "Chancellor": "/characters/Chancellor.png",
  "Charles": "/characters/Charles.png",
  "Chloe": "/characters/Chloe.png",
  "Cleo": "/characters/Cleo.png",
  "Clops": "/characters/Clops.png",
  "Coco": "/characters/Coco.png",
  "Colt": "/characters/Colt.png",
  "Daisy": "/characters/Daisy.png",
  "Dellons": "/characters/Dellons.png",
  "Derek": "/characters/Derek.png",
  "Drillo": "/characters/Drillo.png",
  "Eileene": "/characters/Eileene.png",
  "Ellen": "/characters/Ellen.png",
  "Ellin": "/characters/Ellin.png",
  "Espada": "/characters/Espada.png",
  "Evan": "/characters/Evan.png",
  "Fai": "/characters/Fai.png",
  "FengYan": "/characters/FengYan.png",
  "Frose": "/characters/Frose.png",
  "Fruna": "/characters/Fruna.png",
  "Guppy": "/characters/Guppy.png",
  "Happy": "/characters/Happy.png",
  "Heavenia": "/characters/Heavenia.png",
  "Hellenia": "/characters/Hellenia.png",
  "Hokin": "/characters/Hokin.png",
  "Howl": "/characters/Howl.png",
  "Ichi": "/characters/Ichi.png",
  "Jak": "/characters/Jak.png",
  "Jane": "/characters/Jane.png",
  "Jas": "/characters/Jas.png",
  "Jave": "/characters/Jave.png",
  "Jin": "/characters/Jin.png",
  "Joker": "/characters/Joker.png",
  "Jumon": "/characters/Jumon.png",
  "Jupy": "/characters/Jupy.png",
  "Juri": "/characters/Juri.png",
  "Kagura": "/characters/Kagura.png",
  "Kai": "/characters/Kai.png",
  "Karin": "/characters/Karin.png",
  "Karma": "/characters/Karma.png",
  "Karon": "/characters/Karon.png",
  "Klahan": "/characters/Klahan.png",
  "Knox": "/characters/Knox.png",
  "Kohkun": "/characters/Kohkun.png",
  "Kris": "/characters/Kris.png",
  "Lania": "/characters/Lania.png",
  "Leo": "/characters/Leo.png",
  "Li": "/characters/Li.png",
  "Lina": "/characters/Lina.png",
  "Loto": "/characters/Loto.png",
  "Lucy": "/characters/Lucy.png",
  "May": "/characters/May.png",
  "Mercure": "/characters/Mercure.png",
  "Miho": "/characters/Miho.png",
  "Nami": "/characters/Nami.png",
  "Nia": "/characters/Nia.png",
  "Noho": "/characters/Noho.png",
  "Orly": "/characters/Orly.png",
  "Pascal": "/characters/Pascal.png",
  "Pepe": "/characters/Pepe.png",
  "Platin": "/characters/Platin.png",
  "Pon": "/characters/Pon.png",
  "Pooki": "/characters/Pooki.png",
  "Popo": "/characters/Popo.png",
  "Rachel": "/characters/Rachel.png",
  "Rahkun": "/characters/Rahkun.png",
  "Reaper": "/characters/Reaper.png",
  "Rei": "/characters/Rei.png",
  "Ricky": "/characters/Ricky.png",
  "Rin": "/characters/Rin.png",
  "Rocky": "/characters/Rocky.png",
  "Rook": "/characters/Rook.png",
  "Rosie": "/characters/Rosie.png",
  "Rowl": "/characters/Rowl.png",
  "Rudy": "/characters/Rudy.png",
  "Ruri": "/characters/Ruri.png",
  "Sarah": "/characters/Sarah.png",
  "Sera": "/characters/Sera.png",
  "Shane": "/characters/Shane.png",
  "Shiro": "/characters/Shiro.png",
  "Sieg": "/characters/Sieg.png",
  "Silvesta": "/characters/Silvesta.png",
  "Skud": "/characters/Skud.png",
  "Skull": "/characters/Skull.png",
  "Smoky": "/characters/Smoky.png",
  "Snipper": "/characters/Snipper.png",
  "Soi": "/characters/Soi.png",
  "Spike": "/characters/Spike.png",
  "Syllops": "/characters/Syllops.png",
  "Sylvia": "/characters/Sylvia.png",
  "Taka": "/characters/Taka.png",
  "Taurus": "/characters/Taurus.png",
  "Teo": "/characters/Teo.png",
  "Toto": "/characters/Toto.png",
  "Vanessa": "/characters/Vanessa.png",
  "Velika": "/characters/Velika.png",
  "Victoria": "/characters/Victoria.png",
  "Wendy": "/characters/Wendy.png",
  "Yeonhee": "/characters/Yeonhee.png",
  "YuShin": "/characters/YuShin.png",
  "Yui": "/characters/Yui.png",
  "Yumi": "/characters/Yumi.png",
  "Yuri": "/characters/Yuri.png"
};

/**
 * Get character image path by name
 * Falls back to placeholder if not found
 */
export function getCharacterImage(name: string): string {
  // Try exact match first
  if (characterImages[name]) {
    return characterImages[name];
  }
  
  // Try with underscores replaced by spaces
  const nameWithSpaces = name.replace(/_/g, ' ');
  const foundKey = Object.keys(characterImages).find(
    key => key.replace(/_/g, ' ').toLowerCase() === nameWithSpaces.toLowerCase()
  );
  
  if (foundKey && characterImages[foundKey]) {
    return characterImages[foundKey];
  }
  
  // Fallback to placeholder
  return '/placeholder-character.svg';
}
