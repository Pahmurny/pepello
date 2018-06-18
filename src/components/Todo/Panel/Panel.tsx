import * as React from 'react';

import Header from './Header';
import Card from './Card';
import AddCard from './AddCard';
import CardEdit from './CardEdit';

import './Panel.css';

import { IPanel } from 'src/types/IPanel';

export interface IProps {
  data: IPanel;
  onAddCard: (panel: IPanel, card: string) => void;
}

export interface IState {
  isNewCard: boolean;
}

class Panel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {isNewCard: false};
  }

  public addCardClicked = () => {
    console.log('Adding Card');
    this.setState({isNewCard: true});
  }

  public onAddClick = (text: string) => {
    console.log(text);
    this.props.onAddCard(this.props.data, text);

  }

  public onCancelClick = () => {
    this.setState({isNewCard: false});
  }

  public render() {
    // const {data, onAddCard} = this.props;
    const {data} = this.props;
    const cards = data.elements.map((e, i) => {
      return (
        <Card data={e} key={i}/>
      );
    });

    return (
      <div className='Panel'>
        <Header text={data.name}/>
        {cards}
        {/* <AddCard onClick={() => onAddCard(data)}/> */}
        { this.state.isNewCard ?
          <CardEdit onAddClick={this.onAddClick} onCancelClick={this.onCancelClick}/>
          :
          <AddCard onClick={this.addCardClicked}/>
        }
      </div>
    );
  }
}

export default Panel;
