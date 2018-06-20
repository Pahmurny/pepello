import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget,
} from 'react-dnd';

import { ICard } from 'src/types/ICard';
import { IPanel } from 'src/types/IPanel';

import ItemTypes from '@constants/DnD';

import './Card.css';

export interface IProps {
  card: ICard;
  panel: IPanel;
  isDragging?: boolean;
  canDrop?: boolean;
  isOver?: boolean;
  connectDragSource?: ConnectDragSource;
  connectDropTarget?: ConnectDropTarget;
  onCardMove?: (card: ICard, to: IPanel, over?: ICard) => void;
}

const boxSource = {
  beginDrag(props: IProps) {
    return {
      card: props.card,
      panel: props.panel,
    };
  },

  endDrag(props: IProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && props.onCardMove) {
      console.log('Moving card', item.card, ' to ', dropResult.panel, 'over', dropResult.card);
      props.onCardMove(item.card, dropResult.panel, dropResult.card);
    }
  },
};

const boxTarget = {
  drop(props: IProps) {
    return {
      card: props.card,
      panel: props.panel,
    };
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
@DragSource(
  ItemTypes.CARD,
  boxSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)
class Card extends React.Component<IProps> {
  public render() {
    const { connectDragSource, connectDropTarget, isOver } = this.props;
    // const display = isDragging ? 'none' : 'visible';
    const isOverClass = isOver ? 'isOver' : '';
    const {card} = this.props;
    return (
      connectDragSource && connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className={`Card ${isOverClass}`}>
            <div className={`Card__Content`}>
              {card.name}
            </div>
          </div>
        )
      )
    );
  }
}

export default Card;
