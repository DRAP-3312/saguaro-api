import { v4 as uuidv4 } from 'uuid';

export function generateUniqueCollectionIdentifier(schemaName: string): string {
  const uniqueId = uuidv4();
  return `${schemaName}_${uniqueId}`;
}
