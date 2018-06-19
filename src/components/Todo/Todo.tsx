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

  public updatePanel = (panel: IPanel, newPanel: IPanel) => {
    const oldPanels: Array<IPanel> = clone(this.state.panels);
    const index = this.state.panels.findIndex(e => panel === e);
    oldPanels[index] = {...oldPanels[index], ...newPanel};
    this.setState({panels: oldPanels});
  }

  public onAddCard(data: IPanel, card: string = 'New Card') {
    let oldPanels: Array<IPanel> = clone(this.state.panels);
    console.log('Old panels', oldPanels);
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

  public moveCard = (card: ICard, from: IPanel, to: IPanel) => {
    let newPanels: Array<IPanel> = clone(this.state.panels);
    const fromIndex = this.state.panels.findIndex(e => from === e);
    const toIndex = this.state.panels.findIndex(e => to === e);
    const newTo = clone(to);
    const newFrom = clone(from);
    newFrom.elements = from.elements.filter(e => card !== e);
    newTo.elements.push(card);
    newPanels[fromIndex] = newFrom;
    newPanels[toIndex] = newTo;
    this.setState({panels: newPanels});
  }

  public render() {

    const panelsList = this.state.panels.map((e, i) => {
      return (
        <Panel
          key={i}
          data={e}
          onAddCard={this.onAddCard}
          onPanelUpate={this.updatePanel}
          onMoveCard={this.moveCard}
        />
      );
    });
    console.log('Panels list:', panelsList);
    return (
      <div className='Todo'>
        {panelsList}
        <Creator onClick={this.onAddNewPanel}/>
      </div>
    );
  }
}

export default Todo;
