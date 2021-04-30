/*
 * @Author: naluduo233
 * @Date: 2021-04-22 22:23:11
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-24 22:39:22
 * @FilePath: /react-ts-app/src/pages/todo/TodoInput.tsx
 * @Description:
 */
import * as React from 'react';
import { TodoInputProps } from './props.type';

// interface Props {
//   handleSubmit: (value: string) => void;
// }

interface State {
  itemText: string;
}

export class TodoInput extends React.Component<TodoInputProps, State> {
  public static defaultProps = new TodoInputProps();
  private inputRef = React.createRef<HTMLInputElement>();
  constructor(props: TodoInputProps) {
    super(props);
    this.state = {
      itemText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  // 受控组件
  private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value });
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!this.state.itemText.trim()) {
      return;
    }
    this.props.handleSubmit(this.state.itemText);
    this.setState({ itemText: '' });
  }

  render() {
    const { itemText } = this.state;
    const { updateValue, handleSubmit } = this;
    const { inputSetting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input
          onChange={updateValue}
          maxLength={inputSetting?.maxlength}
          ref={this.inputRef}
          className="edit"
          value={itemText}
        ></input>
      </form>
    );
  }
}
