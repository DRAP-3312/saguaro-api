import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomSchemaDocument = CustomSchema & Document;

@Schema({ collection: 'custom-schemas', timestamps: true })
export class CustomSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Object })
  properties: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean' | 'array';
      required?: boolean;
      default?: any;
      description?: string;
    };
  };

  @Prop({ required: true, type: Number, default: 1 })
  version: number;

  @Prop({ required: true, type: String })
  createdBy: string;

  @Prop({ required: true, type: Boolean, default: false })
  isPublic: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  isDeleted: boolean;
}

export const CustomSchemaSchema = SchemaFactory.createForClass(CustomSchema);
