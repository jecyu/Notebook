import { useState, useCallback } from 'react';

import { useStateHook } from '../utils/user-hooks';
import styles from './index.less';

export default function IndexPage() {
  const [num, updateNum] = useState(0);
  const [state, setState] = useState({
    newNum: 0,
  });
  // const [state, setState] = useStateHook({
  //   newNum: 0,
  // });

  const renderNum = useCallback(() => {
    return <div>num：{num}</div>;
  }, [num]);

  const renderNewNum = useCallback(() => {
    console.log('6666 ->');
    const { newNum } = state; // 这里依赖为空，state 获取的值是最初始的值，除非添加依赖 state.newNum
    return <div>newNum：{newNum}</div>;
  }, []);

  const { newNum } = state;
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <p>
        <button
          onClick={() => {
            // Object.assign(state, { newNum: newNum + 1 });
            updateNum((num) => num + 1);
          }}
        >
          num {num}
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            // setState((prevState) => ({
            //   ...prevState,
            //   newNum: prevState.newNum + 1,
            // }));
            const { newNum } = state;
            setState({
              newNum: newNum + 1,
            });
            // 1. 这里使用到 useStateHook ，可以这样更新后，renderNewNum 不需要添加依赖也可以获取到最新的 state 值。
            //    内部是更新了 state 值，然后通过 setUpdate 值更新组件后，重新渲染函数式组件。
            //    这个时候的 useCallback 里面的 state 值是新的值，不是旧的值，这是什么原理？
            //    原理就是，使用 setUpdate 后，整个函数组件重新执行，重新执行 useCallback ，重新获取 state 值。
            // 2. 如果没有 setUpdate的处理，renderNewNum 整个函数都不会重新执行，所以才是旧的值。
            //    但是之前的 setState 时，newNum 确实改变了，但是由于 useCallback 本身的处理，导致获取的 state 是旧值。
            // 3. 那为什么使用 setUpdate 的值不会受到 useCallback 的限制呢？
            //    目前测试了，只要不是 useCallback 里面依赖的 state。
            //    先使用 Object.assign 手动更改，然后触发新的 useState 声明的 state 变化
            //    比如这里的 setUpdate，重新执行 useCallback，并且读取最新的 state。
            // 4. 本质上，只要是 useCallback 处理后，里面依赖的 state 都是旧值，除非依赖改变。
            //    然后 useStateHook 里面做的就是手动使用 Object.assign(myState, newState) 来强制更新 state 的值，
            //    使得 useCallback 获取了最新 state。
            // 5. 这样的话，每次更新其他 state 里的值时，都会更新 useCallback 的 state 值，
            //    只不过 useCallback 返回的函数地址是不变的。可以做到依赖的减少，以及保证 useCallback 的作用。
            //    具体还需要继续验证 react useCallback 的缓存原理，以及函数式组件闭包。这个可以在实现模拟 hook 时，重新讨论。
          }}
        >
          newNum {newNum}
        </button>
      </p>
      {renderNum()}
      {renderNewNum()}
    </div>
  );
}
