import * as React from 'react';

import Panel from './Panel';

import './Todo.css';

import { IPanel } from 'src/types/IPanel';
import { ICard } from 'src/types/ICard';

export interface IProps {
  // panels: Array<IPanel>;
}
export interface IState {
  panels: Array<IPanel>;
}
const panelsInit: Array<IPanel> = [
  {
    name: 'Panlel1',
    elements: [
      {name: 'card1'},
      {name: 'card2'}
    ],
  },
  {
    name: 'Panlel2',
    elements: [],
  },
  {
    name: 'Panlel3',
    elements: [],
  },
];

class Todo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { panels: panelsInit };
    this.onAddCard = this.onAddCard.bind(this);
  }

  public onAddCard(data: IPanel, card: string = 'New Card') {
    let oldPanels: Array<IPanel> = Object.assign(this.state.panels, {});
    const index = oldPanels.findIndex(e => data === e);
    const newCard: ICard = {
      name: card,
    };
    oldPanels[index].elements.push(newCard);
    this.setState({panels: oldPanels});
  }
  public render() {

    const panelsList = this.state.panels.map((e, i) => {
      return (
        <Panel key={i} data={e} onAddCard={this.onAddCard}/>
      );
    });
    return (
      <div className='Todo'>
        {panelsList}
      </div>
    );
  }
}

export default Todo;
