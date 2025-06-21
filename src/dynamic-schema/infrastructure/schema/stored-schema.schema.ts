import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StoredSchemaDocument = StoredSchema & Document;

@Schema({ collection: 'stored-schemas', timestamps: true })
export class StoredSchema {
  @Prop({ required: true, type: Types.ObjectId, ref: 'CustomSchema' })
  customSchemaId: Types.ObjectId;

  @Prop({ required: false, type: String })
  userId: string;

  @Prop({ required: false, type: String })
  sessionId: string;

  @Prop({ required: true, type: String })
  schemaName: string;

  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

  @Prop({ required: true, type: Date })
  expiresAt: Date;

  @Prop({ required: false, type: Date })
  lastAccessedAt: Date;

  @Prop({ required: true, type: Number, default: 0 })
  accessCount: number;

  @Prop({ required: false, type: String })
  endpointPrefix: string;

  @Prop({ required: false, type: Object })
  metadata: {
    description?: string;
    tags?: string[];
    environment?: 'dev' | 'prod' | 'test';
  };
}

export const StoredSchemaSchema = SchemaFactory.createForClass(StoredSchema);
