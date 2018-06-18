import * as React from 'react';

import { ICard } from 'src/types/ICard';

import './Card.css';

export interface IProps {
  data: ICard;
}

class Card extends React.Component<IProps> {
  public render() {
    const {data} = this.props;
    return (
      <div className='Card'>
        {data.name}
      </div>
    );
  }
}

export default Card;
