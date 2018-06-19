import * as React from 'react';

export interface IProps {
  onClick: () => void;
}

class Creator extends React.Component<IProps> {
  public render() {
    return (
      <div className='Todo__Creator' onClick={this.props.onClick}>
        Add a panel...
      </div>
    );
  }
}

export default Creator;
