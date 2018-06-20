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
  panel: IPanel;
  canDrop?: boolean;
  isOver?: boolean;
  isOverCurrent?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onAddCard: (panel: IPanel, card: string) => void;
  onPanelUpate: (panel: IPanel, newPanel: IPanel) => void;
  onMoveCard?: (card: ICard, from: IPanel, to: IPanel, over?: ICard) => void;
}

export interface IState {
  isNewCard: boolean;
}

const boxTarget = {
  drop(
    props: IProps,
    monitor: DropTargetMonitor,
    component: React.Component | null,
  ) {
    if (!component) {
      return;
    }
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }
    return { panel: props.panel };
  },
};

@DropTarget(
  ItemTypes.CARD,
  boxTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOverCurrent: monitor.isOver({ shallow: true }),
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
    this.props.onAddCard(this.props.panel, text);
  }

  public onCancelClick = () => {
    this.setState({isNewCard: false});
  }

  public updateHeader = (name: string) => {
    const updatedPanel: IPanel = {...this.props.panel, name};
    this.props.onPanelUpate(this.props.panel, updatedPanel);
  }

  public moveCard = (card: ICard, to: IPanel, over?: ICard) => {
    if (this.props.onMoveCard) {
      this.props.onMoveCard(card, this.props.panel, to, over);
    }
  }

  public render() {
    const { panel, canDrop, isOverCurrent, connectDropTarget } = this.props;
    const isActive = canDrop && isOverCurrent;
    const cards = panel.elements.map((e, i) => {
      return (
        <Card card={e} panel={panel} key={i} onCardMove={this.moveCard}/>
      );
    });
    return (
      connectDropTarget &&
      connectDropTarget(
      <div className='Panel'>
        <Header text={panel.name} onHeaderChange={this.updateHeader}/>
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
