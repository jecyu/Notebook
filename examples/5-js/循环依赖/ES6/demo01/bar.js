console.log('bar is running');
export let bar = false;
setTimeout(() => bar = true, 500);
console.log('bar is finished');
