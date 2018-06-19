import * as React from 'react';
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget,
} from 'react-dnd';
import ItemTypes from '@constants/DnD';

import Header from './Header';
import Card from './Card';
import AddCard from './AddCard';
import CardEdit from './CardEdit';

import './Panel.css';

import { IPanel } from 'src/types/IPanel';
import { ICard } from 'src/types/ICard';

export interface IProps {
  data: IPanel;
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onAddCard: (panel: IPanel, card: string) => void;
  onPanelUpate: (panel: IPanel, newPanel: IPanel) => void;
  onMoveCard?: (card: ICard, from: IPanel, to: IPanel) => void;
}

export interface IState {
  isNewCard: boolean;
}

const boxTarget = {
  drop(panel: IProps) {
    return { panel };
  },
};

@DropTarget(
  ItemTypes.CARD,
  boxTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)
class Panel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {isNewCard: false};
  }

  public addCardClicked = () => {
    this.setState({isNewCard: true});
  }

  public onAddClick = (text: string) => {
    this.props.onAddCard(this.props.data, text);
  }

  public onCancelClick = () => {
    this.setState({isNewCard: false});
  }

  public updateHeader = (name: string) => {
    const updatedPanel: IPanel = {...this.props.data, name};
    this.props.onPanelUpate(this.props.data, updatedPanel);
  }

  public moveCard = (card: ICard, panel: IPanel) => {
    if (this.props.onMoveCard) {
      this.props.onMoveCard(card, this.props.data, panel);
    }
  }

  public render() {
    const { data, canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const cards = data.elements.map((e, i) => {
      return (
        <Card data={e} key={i} onCardMove={this.moveCard}/>
      );
    });
    return (
      connectDropTarget &&
      connectDropTarget(
      <div className='Panel'>
        <Header text={data.name} onHeaderChange={this.updateHeader}/>
        {cards}
        {isActive && <div className='Panel__DropTarget'></div>}
        { this.state.isNewCard ?
          <CardEdit onAddClick={this.onAddClick} onCancelClick={this.onCancelClick}/>
          :
          <AddCard onClick={this.addCardClicked}/>
        }

      </div>
      )
    );
  }
}

export default Panel;
