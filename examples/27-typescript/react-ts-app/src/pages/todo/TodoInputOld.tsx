/*
 * @Author: naluduo233
 * @Date: 2021-04-22 22:23:11
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-22 22:39:20
 * @FilePath: /react-ts-app/src/pages/todo/TodoInput.tsx
 * @Description:
 */
import * as React from 'react';

interface Props {
  handleSubmit: (value: string) => void;
}

interface State {
  itemText: string;
}

export class TodoInput extends React.Component<Props, State> {
  private inputRef = React.createRef<HTMLInputElement>();
  constructor(props: Props) {
    super(props);
    this.state = {
      itemText: '',
    };
  }

  // 受控组件
  private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value });
  }

  private handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!this.state.itemText.trim()) {
      return;
    }
    this.props.handleSubmit(this.state.itemText);
    this.setState({ itemText: '' });
  }

  render() {
    return (
      <input
        ref={this.inputRef}
        className="edit"
        value={this.state.itemText}
      ></input>
    );
  }
}
