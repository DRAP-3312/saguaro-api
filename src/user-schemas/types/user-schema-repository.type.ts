import { UserSchema, UserSchemaDocument } from '../schema/user-schema';

export interface IUserSchemaRepository {
  registerUserSchema(userSchema: UserSchema): Promise<UserSchemaDocument>;
}
