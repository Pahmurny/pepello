import * as React from 'react';


export interface IProps {
  text: string;
}

class Header extends React.Component<IProps> {
  public render() {
    const {text} = this.props;
    return (
      <div className='Panel__Header'>
        {text}
      </div>
    );
  }
}

export default Header;
