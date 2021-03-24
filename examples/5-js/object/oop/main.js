/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-29 08:09:34
 * @LastEditTime: 2020-07-03 08:01:35
 * @LastEditors: Jecyu
 */ 
const assert = require("assert");
const { Boundaries } = require('./Boudaries');
const { Dog } = require('./Dog');
const boundariesDog = new Boundaries(0, 0, 5, 5);
const keji = new Dog("柯基", "骨头", 100, boundariesDog);
keji.makeNoise();
assert.strictEqual(keji.makeNoise(), "Canine makeNoise!")

