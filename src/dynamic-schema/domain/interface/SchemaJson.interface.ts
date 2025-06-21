export interface SchemaJsonInterface {
  name: string;
  properties: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean' | 'array';
    };
  };
}
