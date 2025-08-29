export type CharacterClass = 'warrior' | 'mage' | 'archer'

export interface IClassNames {
  first: string[]
  last: string[]
}

export interface ICharacterNames {
  warrior: IClassNames
  archer: IClassNames
  mage: IClassNames
}

export interface INameGenerationRequest {
  characterClass: CharacterClass
}

export interface INameGenerationResponse {
  name: string
}