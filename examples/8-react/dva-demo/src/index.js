import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css'; // 引入 antd 的样式

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/users').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
