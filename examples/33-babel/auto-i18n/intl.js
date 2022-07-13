
const intl = function(key, ...args) {
    let index = 0;
    let str = `aaa {placeholder} bbb {placeholder} ccc`; // bundle[locale][key];
    while(index < args.length) {	
        str = str.replace(/\{placeholder\}/, () => args[index++]);   
    }
    return str;
}
console.log(intl('intl1', 1, 2));