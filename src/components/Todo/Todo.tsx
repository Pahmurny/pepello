import * as React from 'react';
import * as clone from 'clone';

import Panel from './Panel';
import Creator from './Creator';

import './Todo.css';

import { IPanel } from 'src/types/IPanel';
import { ICard } from 'src/types/ICard';

export interface IProps {

}

export interface IState {
  panels: Array<IPanel>;
}
const panelsInit: Array<IPanel> = [
  {
    name: 'Panlel1',
    elements: [
      {name: 'card1'},
      {name: 'card2'},
      {name: 'card3'},
      {name: 'card4'},
    ],
  },
  {
    name: 'Panlel2',
    elements: [],
  },
  {
    name: 'Panlel3',
    elements: [
      {name: 'card3-1'},
      {name: 'card3-2'},
      {name: 'card3-3'},
      {name: 'card3-4'},
    ],
  },
];

class Todo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { panels: panelsInit };
    this.onAddCard = this.onAddCard.bind(this);
  }

  public updatePanel = (panel: IPanel, newPanel: IPanel) => {
    const oldPanels: Array<IPanel> = clone(this.state.panels);
    const index = this.state.panels.findIndex(e => panel === e);
    oldPanels[index] = {...oldPanels[index], ...newPanel};
    this.setState({panels: oldPanels});
  }

  public onAddCard(data: IPanel, card: string = 'New Card') {
    let oldPanels: Array<IPanel> = clone(this.state.panels);
    const index = this.state.panels.findIndex(e => data === e);
    const newCard: ICard = {
      name: card,
    };
    oldPanels[index].elements.push(newCard);
    this.setState({panels: oldPanels});
  }

  public onAddNewPanel = () => {
    const newPanel: IPanel = {
      name: 'New Panel',
      elements: [],
    };
    this.setState({panels: [...this.state.panels, newPanel]});
  }

  public moveCard = (card: ICard, from: IPanel, to: IPanel, over?: ICard) => {
    let newPanels: Array<IPanel> = clone(this.state.panels);
    const fromIndex = this.state.panels.findIndex(e => from === e);
    const toIndex = this.state.panels.findIndex(e => to === e);
    const overIndex = this.state.panels[toIndex].elements.findIndex(e => over === e);
    const newTo = clone(to);
    const newFrom = clone(from);
    newFrom.elements = from.elements.filter(e => card !== e);
    if (from !== to) {
      if (over) {
        newTo.elements.splice(overIndex, 0, card);
      } else {
        newTo.elements.push(card);
      }
      newPanels[toIndex] = newTo;
    } else {
      if (over) {
        newFrom.elements.splice(overIndex, 0, card);
      } else {
        newFrom.elements.push(card);
      }
    }
    newPanels[fromIndex] = newFrom;
    this.setState({panels: newPanels});
  }

  public render() {

    const panelsList = this.state.panels.map((e, i) => {
      return (
        <Panel
          key={i}
          panel={e}
          onAddCard={this.onAddCard}
          onPanelUpate={this.updatePanel}
          onMoveCard={this.moveCard}
        />
      );
    });
    return (
      <div className='Todo'>
        {panelsList}
        <Creator onClick={this.onAddNewPanel}/>
      </div>
    );
  }
}

export default Todo;
