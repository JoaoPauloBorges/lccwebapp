import { Researcher } from './researcher';

export interface Paper {
  _id: string;
  researchers: [Researcher];
  title: string;
  paperDate: Date;
  topicId: string;
  abstract: string;
  references: string;
  imagePath: string;
}
