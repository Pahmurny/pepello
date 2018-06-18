import { ICard } from './ICard';

export interface IPanel {
  name: string;
  elements: Array<ICard>;
}
