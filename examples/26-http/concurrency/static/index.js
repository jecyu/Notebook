const cachedAsync = function(fn) {
    const cache = Object.create(null);
    return async str => {
        const hit = cache[str];
        if (hit) {
            return hit;
        }
        // 只缓存成功的 Promise，失败直接重新请求
        // 的代码有点问题的，如果第一个请求还在 pending中，
        // 这时候还没有缓存，后续的请求不会命中缓存，一样会发起多个请求的。
        // 只能保证第一个请求发出缓存后，后续的请求再进行请求。
        return (cache[str] = await fn(str));

        // 如果是直接缓存的 Promise 的话，如果第一个请求响应是错误的，
        // 那么后续每个请求会
        // return (cache[str] = fn(str)); 
    }
}

const cacheAsync2 = function(promiseGenerator, cacheKey)  {
    const cache = new Map();
    const placeholder = Symbol();
    return async (params) => {
        return new Promise((resolve, reject) => {
            cacheKey = cacheKey || params;
            let cacheConfig = cache.get(cacheKey);
            if (!cacheConfig) {
                // 没有命中
                cacheConfig = {
                    hit: placeholder,
                    exector: [{ resolve, reject }]
                };
                cache.set(cacheKey, cacheConfig);
            } else {
                // 命中缓存
                // 如果已经有命中的值，直接返回
                if (cacheConfig.hit !== placeholder) {  
                    return resolve(cacheConfig.hit); 
                }
                // 把当前的 Promise resolve、reject 存入队列
                cacheConfig.exector.push({ resolve, reject }); 
            }
            
            const { exector } = cacheConfig; 

            console.log('exector', exector.length);
            // 处理并发，在请求还处于 pending 过程中就发起了相同的请求
            // 只拿第一个 Promise 作为请求入口
            if (exector.length === 1) {
                const next = async () => {
                    try {
                        if (!exector.length) return;
                        const response = await promiseGenerator(params);
                        // 如果成功了，那么直接 resolve 掉剩余同样的请求
                        while(exector.length) { // 清空
                            exector.shift().resolve(response);
                        }
                        // 缓存结果
                        cacheConfig.hit = response;
                    } catch(error) {
                        // 如果失败了，那么这个 promise 的则为 reject
                        const { reject } = exector.shift();
                        reject(error);
                        next(); // 失败重试，降级为串行
                    }
                };
                next();
            }
        })
    }
}; 

async function fetchData() {
    const res = await fetch("http://localhost:3000/test");
    const data = await res.json();
    return data;
}

// const fetchData2 = cachedAsync(fetchData);
const fetchData3 = cacheAsync2(fetchData);

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    // fetchData();
    // fetchData();
    // fetchData();
    // fetchData();

    // fetchData2();
    // fetchData2();
    // fetchData2();
    // fetchData2();
  
    console.log(fetchData3(2));
    console.log(fetchData3(2));
    console.log(fetchData3(2));
    console.log(fetchData3(2));
});

