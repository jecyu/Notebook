/*
 * @Description: TreeStore
 * @Author: Jecyu
 * @Date: 2020-03-18 09:38:15
 * @LastEditTime: 2020-04-28 23:37:57
 * @LastEditors: Jecyu
 */
class TreeStore {
  constructor(startNodeKey = 0, data, childrenKey = "children") {
    this.nodeMap = {}; // 字典
    this.state = {
      showData: data, // 展示的数据
      initData: data, // 初始的数据
      startNodeKey,
      childrenKey
    };
    this.RefreshTreeKey(); // 刷新 key
  }

  /**
   * 过滤节点
   * @param {Function} filterNodeMethod 过滤方法
   * @param includeParent 是否保护符合节点的父节点
   */
  filter(filterNodeMethod, includeParent = true) {
    const { state } = this;
    if (includeParent) {
      const filterData = this.FilterTreeNodes(
        filterNodeMethod,
        JSON.parse(JSON.stringify(state.initData)) // 必须深拷贝避免影响 initData，在 filterTreeNodes。
      );
      state.showData = filterData;
    } else {
      const filterData = this.FilterFlatNodes(filterNodeMethod);
      state.showData = filterData;
    }
  }

  /**
   * 过滤带有层级结构的树节点
   * @param { Function} filterNodeMethod
   * @param {Array} data
   * @param expandKey
   * @param childrenKey
   * @returns {Array} 返回符合规则的节点，并且会返回它的父节点
   */
  FilterTreeNodes(filterNodeMethod, data, expandKey, childrenKey = "children") {
    const array = [];
    data.forEach(item => {
      if (filterNodeMethod(item)) {
        // 如果返回true
        item[expandKey] && (item[expandKey] = true);
        array.push(item);
        return item;
      } else if (item[childrenKey]) {
        const findNode = this.FilterTreeNodes(filterNodeMethod, item.children);
        if (findNode && findNode.length > 0) {
          item[expandKey] && (item[expandKey] = true);
          item[childrenKey] = findNode;
          array.push(item);
        }
      }
    });
    this.RefreshTreeKey();

    return array;
  }

  /**
   * nodeKey 命名不能与其他的产生冲突，如 iview 的 nodeKey
   */
  RefreshTreeKey() {
    let i = this.state.startNodeKey;
    this.state.showData.forEach(row => {
      row.treeNodeKey = i;
      row.treeParentKey = -1; // 父节点
      this.nodeMap[i] = row;
      i++;
      if (row.children && row.children.length > 0) {
        const setIndex = data => {
          data.children.forEach(c => {
            c.treeNodeKey = i;
            c.treeParentKey = data.treeNodeKey;
            this.nodeMap[i] = c; // 记录 key
            i++;
            if (c.children && c.children.length) {
              setIndex(c);
            }
          });
        };
        setIndex(row);
      }
    });
  }
}

export default TreeStore;
