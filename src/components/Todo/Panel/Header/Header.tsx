import * as React from 'react';


export interface IProps {
  text: string;
  onHeaderChange: (text: string) => void;
}

export interface IState {
  isEdited: boolean;
  newText: string;
}

class Header extends React.Component<IProps, IState> {
  public node: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.state = { isEdited: false, newText: this.props.text };
    this.node =  React.createRef();
  }
  public handleOutsideClick = (event: any) => {
    if (this.node.current && !this.node.current.contains(event.target)) {
      console.log('clicked outside');
      this.setState({isEdited: false});
      document.removeEventListener('click', this.handleOutsideClick);
      this.props.onHeaderChange(this.state.newText);
    }
  }

  public onEditClick = () => {
    this.setState({isEdited: true});
    document.addEventListener('click', this.handleOutsideClick);
  }

  public render() {
    const {text} = this.props;
    return (
      <div className='Panel__Header' ref={this.node}>
        { this.state.isEdited ?
          <div>
            <input
              type='text'
              autoFocus
              value={this.state.newText}
              onChange={e => this.setState({newText: e.target.value})}
            />
          </div>
        :
          <div onClick={this.onEditClick}>{text}</div>
        }
      </div>
    );
  }
}

export default Header;
