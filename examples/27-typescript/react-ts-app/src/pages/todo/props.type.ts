/*
 * @Author: naluduo233
 * @Date: 2021-04-24 22:25:40
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-24 22:28:11
 * @FilePath: /react-ts-app/src/pages/todo/props.type.ts
 * @Description:
 */
interface InputSetting {
  placeholder?: string;
  maxlength?: number;
}

export class TodoInputProps {
  public handleSubmit!: (value: string) => void;
  public inputSetting?: InputSetting = {
    maxlength: 20,
    placeholder: '请输入todo',
  };
}
