import { TModel } from '@core/models/util-types';
import { ITag } from '@core/models/tag';

export interface INote extends TModel {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  reminder: string | null;
  tags: ITag[];
}
