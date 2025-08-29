import { generateRandomName } from '~/utils/server/nameGenerator'
import type { INameGenerationRequest, INameGenerationResponse } from '~/utils/server/types'

export default defineEventHandler(async (event): Promise<INameGenerationResponse> => {
  const body = await readBody<INameGenerationRequest>(event)
  
  const randomName = generateRandomName(body.characterClass)
  return { name: randomName }
})