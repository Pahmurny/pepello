import * as React from 'react';
import Textarea from 'react-textarea-autosize';

export interface IProps {
  onAddClick: (text: string) => void;
  onCancelClick: () => void;
}

export interface IState {
  text: string;
}

class CardEdit extends React.Component<IProps, IState> {
  public textarea: any;
  constructor(props: IProps) {
    super(props);
    this.state = {text: ''};
  }

  public addClicked = () => {
    this.props.onAddClick(this.state.text);
    this.setState({text: ''});
    this.textarea.focus();
  }

  public render() {
    const { onCancelClick } = this.props;
    return (
      <div className='Panel__CardEdit'>
        <div className='Panel__CardEdit_text'>
          <Textarea
          minRows={3}
          autoFocus
          useCacheForDOMMeasurements
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
          inputRef={tag => (this.textarea = tag)}
          />
        </div>
        <div>
          <button onClick={this.addClicked}>Add</button>
          <button onClick={onCancelClick}>X</button>
        </div>
      </div>
    );
  }
}

export default CardEdit;
