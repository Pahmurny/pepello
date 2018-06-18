import * as React from 'react';

export interface IProps {
  name: string;
  value?: number;
}

class Home extends React.Component<IProps> {
  public render() {
    const { name, value = 1 } = this.props;
    return (
      <div>
          Hello { name } {value * 10}
          <button >Hello</button>
      </div>
    );
  }
}

export default Home;
