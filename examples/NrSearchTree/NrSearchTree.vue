<!--
 * @Description: 搜索树，支持查看已选
 * @Author: linjy
 * @Date: 2019-08-21 22:34:13
 * @LastEditors: Jecyu
 -->
<template>
    <div
        ref="wrapper"
        :class="wrapperClass"
      >
          <div :class="[prefixCls + '-normal-tree']">
            <NrTree ref="tree" :data="showData" v-bind="$attrs" v-on="$listeners" :show-checkbox="multiple" :multiple="multiple" @on-check-change="handleCheckChange"></NrTree>
          </div>
      </div>
</template>
<script>
import TreeStore from "./TreeStore";
const prefixCls = "NrSearchTree";

export default {
  name: "NrSearchTree",
  components: {},

  props: {
    height: {
      type: Number
    },
    // 树选项
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    // 是否显示已选择的树状态
    isShowSelectedTree: {
      type: Boolean,
      deafult: false
    },
    // 默认选中的选项
    defaultOptionsProp: {
      type: Array,
      default: () => []
    },
    // 加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 占位符
    placeholder: {
      type: String,
      default: ""
    },
    // 孩子 key
    childrenKey: {
      type: String,
      default: "children"
    },
    render: {
      type: Function
    },
    filterText: {
      default: "",
      type: String
    }
    // filterNodeMethod:
  },
  data() {
    return {
      prefixCls: prefixCls,
      treeStore: null, // tree 状态记录
      isFocused: false,
      checkedNodes: [] // 选中的节点，包括半选与全选
    };
  },
  computed: {
    wrapperClass() {
      return { [`${prefixCls}-multiple`]: this.multiple };
    },
    // 搜索找不到值
    showNotFoundLabel() {
      return this.showData && this.showData.length === 0 && !this.isLoading;
    },
    selectionCls() {
      return {
        [`${prefixCls}-selection`]: true,
        [`${prefixCls}-selection-focused`]: this.isFocused
      };
    },
    showData() {
      const { state } = this.treeStore;
      return state.showData;
    }
  },
  watch: {
    options: {
      handler() {
        // 添加状态值，进响应式
        const data = JSON.parse(JSON.stringify(this.options));
        const traverse = data => {
          data.forEach(item => {
            this.$set(item, "checked", false);
            this.$set(item, "indeterminate", false);
            if (item.children && item.children.length) {
              traverse(item.children);
            }
          });
        };
        traverse(data);
        this.treeStore = new TreeStore(1, data);
        this.upDateNodeMapStatus();
        this.updateInitData();
      },
      deep: true,
      immediate: true
    },
    // 默认选中的状态
    defaultOptionsProp: {
      handler(defaultVals) {
        // console.log("defaultVals => ", defaultVals);
        if (!defaultVals.length) return; // 空则返回
        const { state } = this.treeStore;
        this.unCheckedAll();
        // 处理选中状态
        const traverse = data => {
          data.forEach(item => {
            if (defaultVals.find(val => val.title === item.title)) {
              this.$set(item, "checked", true);
              this.updateTreeUp(item);
            }
            if (item.children && item.children.length) {
              traverse(item.children);
            }
          });
        };
        traverse(state.showData); // 设置 checked
        // 同步状态
        this.upDateNodeMapStatus();
        // 同步更新 initData 状态
        this.updateInitData();
      },
      deep: true
    },
    // 过滤值
    filterText: {
      handler(val) {
        this.filter(val);
      }
    },
    // 是否已选，联动的条件
    isShowSelectedTree(val) {
      const { state } = this.treeStore;
      if (val) {
        const data = this.buildTree(
          JSON.parse(JSON.stringify(this.checkedNodes)) // 避免更改里面的 children 值
        );
        state.showData = data;
      } else {
        // state.showData = state.initData;
        this.filter(this.filterText);
      }
    },

    showData: {
      handler() {
        // 获得 checkNodes 的值，因为有时候不会触发 check 的事件，例如搜索过滤，因此在这里进行获取
        // const data = this.$refs.tree.getCheckedAndIndeterminateNodes();
        this.checkedNodes = [];
        const { state } = this.treeStore;
        const traverse = data => {
          data.forEach(item => {
            if (item.indeterminate === true || item.checked === true) {
              this.checkedNodes.push(JSON.parse(JSON.stringify(item)));
            }
            if (item.children && item.children.length) {
              traverse(item.children);
            }
          });
        };
        traverse(state.showData);
      },
      deep: true
    }
  },
  methods: {
    // 向上更新节点状态
    updateTreeUp(node, callback) {
      if (!node) return;
      const { treeParentKey } = node;
      callback && callback(node);
      const parent = this.treeStore.nodeMap[treeParentKey]; // 更新 nodeMap 的值

      if (parent) {
        if (
          node.checked == parent.checked &&
          node.indeterminate == parent.indeterminate
        )
          return; // 不再需要向上更新
        if (node.checked == true) {
          this.$set(
            parent,
            "checked",
            parent["children"].every(node => node.checked)
          );
          this.$set(parent, "indeterminate", !parent.checked);
        } else {
          this.$set(parent, "checked", false);
          this.$set(
            parent,
            "indeterminate",
            parent["children"].some(node => node.checked || node.indeterminate)
          );
        }
        this.updateTreeUp(parent, callback);
      }
    },

    // 更新 nodeMap
    upDateNodeMapStatus() {
      const { state, nodeMap } = this.treeStore;
      const traverse = data => {
        data.forEach(item => {
          const targetNode = nodeMap[item.treeNodeKey];
          if (targetNode) {
            // 这里不能简单同步状态，如果是已选树的话，节点与 initData 的子节点数量不同，从而状态不一样。
            // 不能简单赋值，否则会出现，parent 1-1 在已选树为 true，导致非已选树也为 true 的情况
            // this.$set(targetNode, "checked", item.checked);
            // this.$set(targetNode, "indeterminate", item.indeterminate);
            // if (item.checked == true) {
            // }
            // 可以把父节点排除，直接调用 updateTreeUp 向上更新
            if (!item.children) {
              this.$set(targetNode, "checked", item.checked);
              this.$set(targetNode, "indeterminate", item.indeterminate);
              this.updateTreeUp(targetNode);
            }
          }
          if (item.children && item.children.length) {
            traverse(item.children);
          }
        });
      };
      traverse(state.showData);
    },

    // 更新树 InitData 的状态
    updateInitData() {
      const { state, nodeMap } = this.treeStore;
      const traverse = data => {
        data.forEach(item => {
          const targetNode = nodeMap[item.treeNodeKey];
          if (targetNode) {
            this.$set(item, "checked", targetNode.checked);
            this.$set(item, "indeterminate", targetNode.indeterminate);
          }
          if (item.children && item.children.length) {
            traverse(item.children);
          }
        });
      };
      traverse(state.initData);
    },
    // 多选勾选
    handleCheckChange() {
      // const data = this.$refs.tree.getCheckedAndIndeterminateNodes();
      // 同步更新字典 map 的状态
      this.upDateNodeMapStatus();
      // 同步更新 initData 状态
      this.updateInitData();

      // 非显示已选的状态下，对外触发
      // if (!this.isShowSelectedTree) {
      // 显示以及已选树的时候，checkNodes 需要根据 showData 的变化而变化
      // 需要把所有 nodeMap 下的勾选，发放出去，不仅仅搜索的showData
      const checkedNodes = [];
      const { state } = this.treeStore;
      const traverse = data => {
        data.forEach(item => {
          if (!item.children && item.checked === true) {
            checkedNodes.push(item);
          }
          if (item.children && item.children.length) {
            traverse(item.children);
          }
        });
      };
      traverse(state.initData);
      this.$emit("on-nrchecked-change", checkedNodes);
    },
    /**
     * @description: 过滤值变更
     * @param {String} val
     * @return: null
     */
    filter(val) {
      val = val.trim();

      const debounceSearch = this.$lodash.debounce(() => {
        const filterMethod = item => {
          return item.title && item.title.indexOf(val) > -1;
        };
        this.treeStore.filter(filterMethod);
      }, 100);
      debounceSearch(val);
    },

    /**
     * 生成树结构
     * @param {Array} tree 一维带有父子关系的树数组
     */
    buildTree(
      tree,
      childrenKey = "children",
      key = "treeNodeKey",
      parentKey = "treeParentKey"
    ) {
      const n = []; // 添加多一个数组，记录父级
      const treeMap = {};
      // 删除 所有 children，传入的值带有 children），以防止孩子重复，产生副作用，会把原数据children 删除
      // 传入值需要深拷贝
      let treeCopy = JSON.parse(JSON.stringify(tree));
      treeCopy.forEach(node => {
        node[childrenKey] && delete node[childrenKey];
      });

      treeCopy.forEach(node => (treeMap[node[key]] = node));
      treeCopy.forEach(node => {
        const parent = treeMap[node[parentKey]];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到它对应的父级中
        if (parent) {
          const children = parent[childrenKey] || []; // parent.children ，避免相同值
          children.push(node);
          parent[childrenKey] = children;
        } else {
          // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 n 结果集中，作为顶级
          n.push(node);
        }
      });
      return n;
    },
    // 取消选中状态
    unCheckedAll() {
      const { state } = this.treeStore;
      const traverse = data => {
        data.forEach(item => {
          this.$set(item, "checked", false);
          this.$set(item, "indeterminate", false);
          if (item.children && item.children.length) {
            traverse(item.children);
          }
        });
      };
      traverse(state.showData);
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: fadeIn 0.3s slideUpIn;
}
.slide-leave-active {
  animation: fadeIn 0.3s slideUpIn reverse;
}
@keyframes slideUpIn {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
  }
  100% {
    opacity: 1;
    transform: scaleY(0.8);
  }
}
.NrSearchTree {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  color: #515a6e;
  font-size: 14px;
  line-height: normal;
  &-normal-tree {
    overflow: auto;
  }
  &-multiple &-selection {
    padding: 0 24px 0 4px;
  }
  &-selection {
    position: relative;
    display: block;
    white-space: nowrap;
    outline: none;
    user-select: none;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    transition: all 0.2s ease-in-out;
    &-focused {
      border-color: #57a3f3;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    }
    &:hover {
      border-color: #57a3f3;
      outline: 0;
    }
  }
}
</style>
