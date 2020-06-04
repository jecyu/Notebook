/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-04-18 12:38:39
 * @LastEditTime: 2020-04-18 14:24:21
 * @LastEditors: Jecyu
 */
enum WeaponType {
  a,
  b,
  c,
}

class WeaponDefinitions {
  private type: WeaponType = WeaponType.a; 
}

class Main {
  public weaponDefinitions: WeaponDefinitions[];  // 每个元素的 type 都是 WeaponType 枚举类型
  private Init() {
  }
}



