import { defineStore } from 'pinia'
import type { IRegion } from './models/region'

export const useRegionsStore = defineStore('regions', () => {
  const regions: IRegion[] = [
    {
      id: 'forest',
      name: 'Whispering Forest',
      description: 'A mysterious forest filled with ancient trees and magical creatures.',
      isUnlocked: true,
      enemies: [
        {
          name: 'Rabid Squirrel',
          description: 'A tiny ball of fury with anger management issues.',
          frequency: 'Common',
          hp: 20,
          attack: 15,
          defense: 2,
          xpReward: 15
        },
        {
          name: 'Loan Shark Fox',
          description: 'This fox will lend you nuts... at 300% interest rate.',
          frequency: 'Common',
          hp: 35,
          attack: 12,
          defense: 3,
          xpReward: 15
        },
        {
          name: 'Cowardly Goblin',
          description: 'Talks big but runs away when you look at him funny.',
          frequency: 'Common',
          hp: 25,
          attack: 10,
          defense: 4,
          xpReward: 15
        },
        {
          name: 'Toothless Bear',
          description: 'Once feared, now mostly gums berries to death.',
          frequency: 'Common',
          hp: 50,
          attack: 8,
          defense: 5,
          xpReward: 15
        },
        {
          name: 'Hipster Owl',
          description: 'Says it was wise before wisdom was cool. Wears tiny glasses.',
          frequency: 'Rare',
          hp: 45,
          attack: 16,
          defense: 4,
          xpReward: 35
        },
        {
          name: 'Mushroom Dealer',
          description: 'Suspicious fungi offering "magical experiences" behind trees.',
          frequency: 'Rare',
          hp: 75,
          attack: 12,
          defense: 18,
          xpReward: 35
        },
        {
          name: 'Karen Tree',
          description: 'Demands to speak to the forest manager. Very, VERY angry.',
          frequency: 'Super Rare',
          hp: 120,
          attack: 25,
          defense: 15,
          xpReward: 100
        }                
      ],
      events: [
        {
          name: 'Healing Spring',
          description: 'You discover a magical spring that restores your health.',
          frequency: 'Common',
          effects: { hp: 20 }
        },
        {
          name: 'Lost Traveler',
          description: 'You help a lost traveler and receive a reward.',
          frequency: 'Rare',
          effects: { gold: 50, xp: 10 }
        },
        {
          name: 'Ancient Wisdom',
          description: 'You find an ancient scroll that grants you knowledge.',
          frequency: 'Super Rare',
          effects: { xp: 75 }
        }
      ],
      items: [
        {
          name: 'Health Potion',
          description: 'A small vial that restores health.',
          frequency: 'Common',
          type: 'consumable',
          effects: { hp: 30 }
        },
        {
          name: 'Forest Berries',
          description: 'Sweet berries that provide a small boost.',
          frequency: 'Common',
          type: 'consumable',
          effects: { hp: 15, mp: 10 }
        },
        {
          name: 'Wooden Shield',
          description: 'A sturdy wooden shield crafted from forest oak.',
          frequency: 'Rare',
          type: 'equipment',
          effects: { defense: 5 }
        },
        {
          name: 'Elven Bow',
          description: 'A masterwork bow blessed by forest spirits.',
          frequency: 'Super Rare',
          type: 'equipment',
          effects: { attack: 12 }
        }
      ]
    },
    {
      id: 'swamp',
      name: 'Murky Swamplands',
      description: 'A treacherous bog filled with poisonous creatures and hidden dangers.',
      isUnlocked: false,
      unlockRequirement: {
        level: 5,
        description: 'Reach level 5 to unlock'
      },
      enemies: [
        {
          name: 'Swamp Rat',
          description: 'A diseased rat that carries poison.',
          frequency: 'Common',
          hp: 30,
          attack: 10,
          defense: 2,
          xpReward: 18
        },
        {
          name: 'Bog Crawler',
          description: 'A massive insect that lurks in the mud.',
          frequency: 'Common',
          hp: 50,
          attack: 14,
          defense: 8,
          xpReward: 25
        },
        {
          name: 'Venomous Serpent',
          description: 'A deadly snake with potent venom.',
          frequency: 'Rare',
          hp: 45,
          attack: 20,
          defense: 4,
          xpReward: 40
        },
        {
          name: 'Swamp Witch',
          description: 'An ancient hag who controls the swamp\'s dark magic.',
          frequency: 'Super Rare',
          hp: 100,
          attack: 30,
          defense: 12,
          xpReward: 120
        }
      ],
      events: [
        {
          name: 'Poisonous Gas',
          description: 'You walk through a cloud of toxic gas.',
          frequency: 'Common',
          effects: { hp: -15 }
        },
        {
          name: 'Hidden Cache',
          description: 'You find supplies hidden by a previous explorer.',
          frequency: 'Rare',
          effects: { gold: 75 }
        },
        {
          name: 'Witch\'s Blessing',
          description: 'A mysterious witch grants you power.',
          frequency: 'Super Rare',
          effects: { mp: 30, xp: 50 }
        }
      ],
      items: [
        {
          name: 'Antidote',
          description: 'Cures poison and restores some health.',
          frequency: 'Common',
          type: 'consumable',
          effects: { hp: 25 }
        },
        {
          name: 'Swamp Moss',
          description: 'A peculiar moss with magical properties.',
          frequency: 'Rare',
          type: 'consumable',
          effects: { mp: 20 }
        },
        {
          name: 'Poison Dagger',
          description: 'A blade coated with swamp toxins.',
          frequency: 'Rare',
          type: 'equipment',
          effects: { attack: 8 }
        },
        {
          name: 'Witch\'s Amulet',
          description: 'A powerful amulet that enhances magical abilities.',
          frequency: 'Super Rare',
          type: 'equipment',
          effects: { mp: 25, defense: 3 }
        }
      ]
    },
    {
      id: 'caves',
      name: 'Crystal Caverns',
      description: 'Deep underground caves filled with precious gems and dangerous creatures.',
      isUnlocked: false,
      unlockRequirement: {
        level: 10,
        description: 'Reach level 10 to unlock'
      },
      enemies: [
        {
          name: 'Cave Spider',
          description: 'A large spider that spins deadly webs.',
          frequency: 'Common',
          hp: 35,
          attack: 12,
          defense: 4,
          xpReward: 22
        },
        {
          name: 'Stone Golem',
          description: 'A creature made of living rock.',
          frequency: 'Common',
          hp: 80,
          attack: 16,
          defense: 12,
          xpReward: 30
        },
        {
          name: 'Crystal Bat',
          description: 'A bat with crystalline wings that reflect light.',
          frequency: 'Rare',
          hp: 40,
          attack: 18,
          defense: 6,
          xpReward: 45
        },
        {
          name: 'Cave Dragon',
          description: 'An ancient dragon that guards the deepest crystals.',
          frequency: 'Super Rare',
          hp: 200,
          attack: 40,
          defense: 20,
          xpReward: 200
        }
      ],
      events: [
        {
          name: 'Falling Rocks',
          description: 'Loose rocks fall from the ceiling.',
          frequency: 'Common',
          effects: { hp: -20 }
        },
        {
          name: 'Crystal Resonance',
          description: 'The cave crystals resonate, restoring your energy.',
          frequency: 'Rare',
          effects: { mp: 25, hp: 15 }
        },
        {
          name: 'Ancient Runes',
          description: 'You decipher ancient runes that grant knowledge.',
          frequency: 'Super Rare',
          effects: { xp: 100 }
        }
      ],
      items: [
        {
          name: 'Crystal Shard',
          description: 'A small crystal that glows with inner light.',
          frequency: 'Common',
          type: 'consumable',
          effects: { mp: 15 }
        },
        {
          name: 'Cave Mushroom',
          description: 'A glowing mushroom with restorative properties.',
          frequency: 'Common',
          type: 'consumable',
          effects: { hp: 20, mp: 10 }
        },
        {
          name: 'Crystal Armor',
          description: 'Armor made from hardened crystal formations.',
          frequency: 'Rare',
          type: 'equipment',
          effects: { defense: 10 }
        },
        {
          name: 'Dragon Scale Shield',
          description: 'A shield crafted from ancient dragon scales.',
          frequency: 'Super Rare',
          type: 'equipment',
          effects: { defense: 15, hp: 20 }
        }
      ]
    },
    {
      id: 'desert',
      name: 'Scorching Wastes',
      description: 'An endless desert where the sun burns mercilessly and mirages deceive travelers.',
      isUnlocked: false,
      unlockRequirement: {
        level: 15,
        description: 'Reach level 15 to unlock'
      },
      enemies: [
        {
          name: 'Sand Scarab',
          description: 'A giant beetle that burrows through sand.',
          frequency: 'Common',
          hp: 45,
          attack: 14,
          defense: 8,
          xpReward: 28
        },
        {
          name: 'Desert Nomad',
          description: 'A hostile warrior adapted to desert survival.',
          frequency: 'Common',
          hp: 60,
          attack: 18,
          defense: 10,
          xpReward: 35
        },
        {
          name: 'Sand Elemental',
          description: 'A being of pure sand and wind.',
          frequency: 'Rare',
          hp: 70,
          attack: 22,
          defense: 5,
          xpReward: 55
        },
        {
          name: 'Ancient Sphinx',
          description: 'A wise and powerful guardian of desert secrets.',
          frequency: 'Super Rare',
          hp: 300,
          attack: 50,
          defense: 25,
          xpReward: 300
        }
      ],
      events: [
        {
          name: 'Sandstorm',
          description: 'A fierce sandstorm damages you.',
          frequency: 'Common',
          effects: { hp: -25 }
        },
        {
          name: 'Desert Oasis',
          description: 'You find a hidden oasis that restores you.',
          frequency: 'Rare',
          effects: { hp: 40, mp: 30 }
        },
        {
          name: 'Ancient Treasure',
          description: 'You discover a cache of ancient gold.',
          frequency: 'Super Rare',
          effects: { gold: 200, xp: 80 }
        }
      ],
      items: [
        {
          name: 'Water Flask',
          description: 'Precious water that restores health in the desert.',
          frequency: 'Common',
          type: 'consumable',
          effects: { hp: 35 }
        },
        {
          name: 'Desert Herb',
          description: 'A rare plant that thrives in harsh conditions.',
          frequency: 'Rare',
          type: 'consumable',
          effects: { hp: 25, mp: 15 }
        },
        {
          name: 'Scimitar',
          description: 'A curved blade perfect for desert combat.',
          frequency: 'Rare',
          type: 'equipment',
          effects: { attack: 15 }
        },
        {
          name: 'Sphinx Artifact',
          description: 'A legendary artifact containing ancient wisdom.',
          frequency: 'Super Rare',
          type: 'equipment',
          effects: { attack: 10, defense: 10, mp: 30 }
        }
      ]
    }
  ]

  const getRegionById = (id: string): IRegion | undefined => {
    return regions.find(region => region.id === id)
  }

  const getUnlockedRegions = (): IRegion[] => {
    return regions.filter(region => region.isUnlocked)
  }

  const getLockedRegions = (): IRegion[] => {
    return regions.filter(region => !region.isUnlocked)
  }

  return {
    regions,
    getRegionById,
    getUnlockedRegions,
    getLockedRegions
  }
})