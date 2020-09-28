/*
 * @Author: your name
 * @Date: 2020-09-19 11:02:05
 * @LastEditTime: 2020-09-20 18:53:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo01/index.js
 */
const puppeteer = require("puppeteer");
const search = 4490;
const s_proj4_text = "#s_proj4_text";
async function main() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
//   await page.goto(`https://epsg.io/?q=${search}`); // 两种方式
  await page.goto(`https://epsg.io/${search}`);        
//   await page.screenshot({path: './screenshots/epsg.png'});
//   await page.click(proj4Selector);
//   const handle = await page.$(".padt-2");
  const searchValue = await page.$eval(s_proj4_text, el => el.innerText);
  console.log(searchValue);
  browser.close();
}

main();
