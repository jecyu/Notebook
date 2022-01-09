/// hook 的状态并不是直接通过闭包存储，而是独立的 hook 对象

let workInProgressHook;
let isMount = true;

// APP 组件对应的 fiber 对象
const fiber = {
  memoizedState: null, // 保存该FunctionComponent对应的Hooks链表
  stateNode: App, // 指向App函数
};

// 调度更新
function schedule() {
  workInProgressHook = fiber.memoizedState; // 更新前将 workInProgressHook 重置为 fiber 保存的第一个 Hook
  const app = fiber.stateNode(); // 触发组件 render
  isMount = false; // 组件首次render为mount，以后再触发的更新为update
  return app;
}

function useState(initialState) {
  let hook;
  if (isMount) {
    // mount时为该useState生成hook
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };
    // 将 hook 插入fiber.memoizedState链表末尾
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    // 移动workInProgressHook指针
    workInProgressHook = hook;
  } else {
    // update 时找到对应hook
    hook = workInProgressHook;
    // 移动 workInProgressHook 指针
    workInProgressHook = workInProgressHook.next;
  }

  // 当找到该 useState 对应的 hook 后，如果该 hook.queue.pending 不为空（即存在update），则更新其state
  // update 执行前的初始 state
  let baseState = hook.memoizedState;

  if (hook.queue.pending) {
    // 获取update环状单向链表中第一个update
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next); // 最后一个update执行完后跳出循环Z
    // 清空queue.pending
    hook.queue.pending = null;
  }
  // 将 update action 执行完后的 state 作为memoizedState
  hook.memoizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  // 创建 update
  const update = {
    action,
    next: null,
  };

  // 环状单向链表操作
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  // queue.pending始终指向最后一个插入的update
  queue.pending = update;

  // 模拟React开始调度更新
  schedule();
}

function App() {
  const [num, updateNum] = useState(0);
  console.log(`${isMount ? 'mount' : 'update'} num: `, num);
  return {
    click() {
      updateNum((num) => num + 1);
    },
  };
}

window.app = schedule();

// 单个 state
// 1. 首次 mount 时，调度更新 schedule()
//   1.1 执行 App，调用 useState 函数，生成 hook 对象，记录到 fiber.memoizedState。
//   1.2 返回当前初始化的 state 状态，以及 dsipatchAction 函数
// 2. 更新执行 dispatchAction
//   2.1 创建 update 对象，记录到 hook.queue 对象中，然后调度更新 schedule()
//   2.2 执行 fiber.stateNode()，重新执行函数式组件 APP，调用 useState 函数，isMount 为 false
//   2.3 找到 update 时对应的 hook 对象，然后计算 state，获得更新后的 state 进行渲染。

// 每次

// 多个 state，todo
