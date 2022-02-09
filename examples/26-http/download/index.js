const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs/promises');
const { createReadStream, write } = require('fs');
const { PassThrough } = require('stream');

const app = new Koa();
const router = new Router();

// 简单下载
router.get('/download/simple', async ctx => {
    const file = await fs.readFile(`${__dirname}/static/1.txt`, 'utf-8');
    ctx.set(
        {
            // 告诉浏览器应该下载这个文件
            'Content-Disposition': 'attachment; filename=1.txt',
        }
    );
    ctx.body = file;
});

// 流式下载，针对 Node 无法将大文件一次性读取到进程内存里
router.get('/download/stream', async (ctx) => {
    // 浏览器会自动下载
    const file = createReadStream(`${__dirname}/static/2.pdf`, 'utf-8'); 
    ctx.set(
        {
            // 告诉浏览器应该下载这个文件
            'Content-Disposition': 'attachment; filename=2.pdf', 
        }
    );
    // 使用读写流 Content-type 会自动被 koa 设为 application/octet-stream
    // 大文件网络差的情况下可以看到浏览器的进度条
    ctx.body = file; 
});

/**
 * 模拟进度显示
 * 这里利用了 PassThrough 流来替代 fs.createReadStream，故 Koa 不再知道文件大小和类型，
 * 并将文件分为 4 份，每份间隔 3 秒发送来模拟大文件下载
 */
router.get('/download/progress', async (ctx) => {
    const { enable } = ctx.query;
    const buffer = await fs.readFile(`${__dirname}/static/1.txt`);
    const stream = new PassThrough();
    const l = buffer.length;
    const count = 4;
    const size = Math.floor(l / count);
    const writeQuarter = (i = 0) => {
        const start = i * size;
        const end = i === count - 1 ? l : (i + 1) * size;
        stream.write(buffer.slice(start, end));
        if (end === l) {
            stream.end();
        } else {
            setTimeout(() => writeQuarter(i + 1), 3000);
        }
    }

    if (!!enable) {
        ctx.set(
            {
                'Content-Length': `${l}`,
            }
        );
    }

    ctx.set( 
        {
            'Content-Type': 'plain/txt',
            'Content-Disposition': `attachment; filename=1.txt`,
            'Connection': 'keep-alive'
        }
    );

    ctx.body = stream;
    writeQuarter();
}); 


/**
 * 下载文件特别大时，常常也会因为网络不稳定导致下载中途断开而失败，
 * 这时候可以考虑支持断点续传
 */


app.use(router.routes());
app.listen(3000);

