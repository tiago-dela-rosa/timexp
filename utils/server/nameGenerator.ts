import { characterNames } from './names'
import type { CharacterClass } from './types'

export function generateRandomName(characterClass: CharacterClass): string {
  const classNames = characterNames[characterClass]
  
  if (!classNames) {
    const allFirstNames = [...characterNames.warrior.first, ...characterNames.archer.first, ...characterNames.mage.first]
    const allLastNames = [...characterNames.warrior.last, ...characterNames.archer.last, ...characterNames.mage.last]
    const firstName = allFirstNames[Math.floor(Math.random() * allFirstNames.length)]
    const lastName = allLastNames[Math.floor(Math.random() * allLastNames.length)]
    return `${firstName} ${lastName}`
  }
  
  const firstName = classNames.first[Math.floor(Math.random() * classNames.first.length)]
  const lastName = classNames.last[Math.floor(Math.random() * classNames.last.length)]
  return `${firstName} ${lastName}`
}