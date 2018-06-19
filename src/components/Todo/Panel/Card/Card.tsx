import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';

import { ICard } from 'src/types/ICard';
import { IPanel } from 'src/types/IPanel';

import ItemTypes from '@constants/DnD';

import './Card.css';

export interface IProps {
  data: ICard;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
  onCardMove?: (card: ICard, panel: IPanel) => void;
}

const boxSource = {
  beginDrag(props: IProps) {
    return {
      data: props.data,
    };
  },

  endDrag(props: IProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && props.onCardMove) {
      props.onCardMove(item.data, dropResult.panel.data);
    }
  },
};

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
    const { connectDragSource } = this.props;
    const {data} = this.props;
    return (
      connectDragSource &&
      connectDragSource(
      <div className='Card'>
        {data.name}
      </div>
      )
    );
  }
}

export default Card;
