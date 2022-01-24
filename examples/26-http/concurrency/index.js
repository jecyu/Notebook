const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

function sleep(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds);
    })
}

app.use(serve(__dirname + '/static'));
app.use(async (ctx, next) => {
    if (ctx.url === '/test') {
        await sleep(200);
        
        const n = Math.random();
        console.log('n ->', n);
        // 随机挂掉接口
        if (n > 0.5) {
            ctx.body = JSON.stringify({ n });
        } else {
            ctx.status = 404;
            ctx.body = '';
        }
        next();
    }
    
    if (ctx.url === '/') {
        ctx.status = 200;
        ctx.body = 'Hello';
    }
});

app.listen(3000);