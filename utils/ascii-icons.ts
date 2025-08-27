// ASCII Icons and Special Characters for Retro Theme
export const ASCII_ICONS = {
  // Character Classes
  CLASSES: {
    warrior: '⚔️',     // Sword
    mage: '🔮',        // Crystal ball
    archer: '🏹',      // Bow and arrow
  },
  
  // Character Stats
  STATS: {
    hp: '♥',          // Heart
    mp: '✦',          // Star/magic
    attack: '⚔',      // Crossed swords
    defense: '🛡',     // Shield
    level: '★',       // Star
    xp: '◆',          // Diamond
    lives: '♠',       // Spade
    gold: '🪙',       // Coin
  },
  
  // Game Actions
  ACTIONS: {
    explore: '🗺️',     // Map
    rest: '💤',       // Sleep
    train: '💪',      // Muscle
    inventory: '🎒',   // Backpack
    menu: '≡',        // Hamburger menu
    back: '←',        // Left arrow
    create: '✓',      // Checkmark
  },
  
  // UI Elements
  UI: {
    arrow_right: '→',
    arrow_left: '←',
    arrow_up: '↑',
    arrow_down: '↓',
    bullet: '•',
    diamond: '◆',
    square: '■',
    circle: '●',
    triangle: '▲',
    selected: '►',
    unselected: '▷',
    separator: '│',
    corner: '└',
  },
  
  // ASCII Art alternatives (text-based)
  TEXT_ICONS: {
    CLASSES: {
      warrior: '[⚔]',
      mage: '[✦]', 
      archer: '[→]',
    },
    STATS: {
      hp: 'HP♥',
      mp: 'MP✦',
      attack: 'ATK⚔',
      defense: 'DEF🛡',
      level: 'LVL★',
      xp: 'EXP◆',
      lives: '♠',
    }
  }
}

// Helper function to get class icon
export function getClassIcon(className: string): string {
  return ASCII_ICONS.CLASSES[className as keyof typeof ASCII_ICONS.CLASSES] || '?'
}

// Helper function to get stat icon
export function getStatIcon(statName: string): string {
  return ASCII_ICONS.STATS[statName as keyof typeof ASCII_ICONS.STATS] || ''
}