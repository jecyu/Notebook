import React, { Component } from "react";

class Say extends Component {
  constructor() {
    super();
    // this.state = { timeString: "" };
  }

  componentWillMount() {
    this.speech = new SpeechSynthesisUtterance();
  }

  componentWillUnmount() {
    this.speech = null;
  }

  // 播放
  speak() {
    const { speech } = this;
    const { textMsg } = this.props;
    // speech.pitch = 1 // 获取并设置话语的音调(值越大越尖锐,越低越低沉)
    // speech.rate  = 5 // 获取并设置说话的速度(值越大语速越快,越小语速越慢)
    // speech.voice = 10 // 获取并设置说话的声音
    // speech.volume = 1 // 获取并设置说话的音量
    // console.log(speechSynthesis.getVoices());
    // speech.lang = speechSynthesis.getVoices()[0] // 设置播放语言，测试没效果
    // speech.cancel() // 删除队列中所有的语音.如果正在播放,则直接停止
    speech.text = textMsg; // 获取并设置说话时的文本
    speechSynthesis.speak(speech);
  }

  // 暂停
  pause() {
    speechSynthesis.pause();
  }
  // 继续播放
  resume() {
    speechSynthesis.resume();
  }

  // 取消播放
  cancel() {
    speechSynthesis.cancel();
  }

  render() {
    return (
      <div className="say-field-button">
        <button onClick={this.speak.bind(this)}>播放</button>
        <button onClick={this.pause.bind(this)}>暂停</button>
        <button onClick={this.resume.bind(this)}>继续播放</button>
        <button onClick={this.cancel.bind(this)}>取消播放</button>
      </div>
    );
  }
}
export default Say;
