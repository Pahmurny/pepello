import * as React from 'react';

export interface IProps {
  onClick?: () => void;
}

class AddCard extends React.Component<IProps> {
  public render() {
    const { onClick } = this.props;
    return (
      <div className='Panel__AddCard' onClick={onClick}>
        Add card...
      </div>
    );
  }
}

export default AddCard;
