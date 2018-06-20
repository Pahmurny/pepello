import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import { Button, Glyphicon } from 'react-bootstrap';

export interface IProps {
  onAddClick: (text: string) => void;
  onCancelClick: () => void;
}

export interface IState {
  text: string;
}

class CardEdit extends React.Component<IProps, IState> {
  public node: React.RefObject<HTMLDivElement>;
  public textarea: any;
  constructor(props: IProps) {
    super(props);
    this.state = {text: ''};
    this.node =  React.createRef();
  }

  public addClicked = () => {
    if (this.state.text.trim()) {
      this.props.onAddClick(this.state.text.trim());
      this.setState({text: ''});
    }
    this.textarea.focus();
  }

  public handleOutsideClick = (event: any) => {
    if (this.node.current && !this.node.current.contains(event.target)) {
      document.removeEventListener('click', this.handleOutsideClick);
      this.props.onCancelClick();
    }
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  public render() {
    const { onCancelClick } = this.props;
    return (
      <div className='Panel__CardEdit' ref={this.node}>
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
          <Button bsStyle='success' onClick={this.addClicked}>Add</Button>
          <Button className='Panel__CardEdit_cancel' onClick={onCancelClick}><Glyphicon glyph='remove' /></Button>
        </div>
      </div>
    );
  }
}

export default CardEdit;
