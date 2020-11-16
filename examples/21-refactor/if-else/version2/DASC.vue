<template>
  <div :style="wrapperStyle" :class="wrapperCls">
    <div :class="`${wrapperCls}-header`">
      <div class="title">成果包</div>
      <div class="operation">
        <EdButton type="primary" @click.stop="HandleOpenUpload">预检</EdButton>
        <EdButton type="primary" @click.stop="HandleBuildArchive"
          >建档</EdButton
        >
        <EdButton type="primary" @click.stop="HandleBatchDeleteArchive"
          >删除</EdButton
        >
        <EdButton type="primary" @click.stop="HandleBatchExportLog"
          >导出日志</EdButton
        >
      </div>
    </div>
    <div :class="`${wrapperCls}-body`">
      <!-- <div class="path">
        <label class="label">成果包路径：</label>
        <Input readonly />
      </div> -->
      <div class="table-container">
        <Table
          ref="table"
          row-key="id"
          :columns="columnsData"
          :data="showData"
          @on-selection-change="HandleCheckArchive"
          :loading="tableLoading"
        >
          <template
            slot-scope="{ row }"
            slot="name"
            style="display: inline-block;"
          >
            <Tooltip
              placement="top-start"
              theme="light"
              max-width="300"
              :content="row.name"
              :transfer="true"
            >
              <span class="name">{{ row.name }}</span>
            </Tooltip>
          </template>
          <template
            slot="progress"
            slot-scope="{ row }"
            v-if="row.uploadProgress !== 100"
          >
            <div class="progress" :style="ProgressStyle(row)"></div>
          </template>
          <template slot="checkResultStatus" slot-scope="{ row }">
            <Tooltip
              transfer
              v-if="row.checkResultStatus.value === enumCheckKeyMap.checkError"
              placement="top-start"
              theme="light"
              max-width="200"
              :content="row.checkResultStatus.name"
            >
              <EdSvgIcon
                iconClass="error"
                :color="colorStyle.error"
              ></EdSvgIcon>
            </Tooltip>

            <Tooltip
              transfer
              v-else-if="
                row.checkResultStatus.value === enumCheckKeyMap.checkSuccess
              "
              placement="top-start"
              theme="light"
              max-width="200"
              :content="row.checkResultStatus.name"
            >
              <EdSvgIcon
                iconClass="correct"
                :color="colorStyle.correct"
              ></EdSvgIcon>
            </Tooltip>

            <Tooltip
              transfer
              v-else-if="
                row.checkResultStatus.value === enumCheckKeyMap.checkNotice
              "
              placement="top-start"
              theme="light"
              max-width="200"
              :content="row.checkResultStatus.name"
            >
              <EdSvgIcon
                iconClass="notice"
                :color="colorStyle.warn"
              ></EdSvgIcon>
            </Tooltip>

            <span v-else>{{ row.checkResultStatus.name }}</span>
          </template>
          <template slot="archiveMethod" slot-scope="{ row }">
            <span>{{ repeatedStatusMap(row.buildOpt) }}</span>
          </template>
          <template slot="buildStatus" slot-scope="{ row }">
            <EdSvgIcon
              v-if="row.archiveStatus === EnumBuildStatus.error"
              iconClass="error"
              color="red"
            ></EdSvgIcon>
            <EdSvgIcon
              v-else-if="row.archiveStatus === EnumBuildStatus.success"
              iconClass="correct"
              :color="colorStyle.correct"
            ></EdSvgIcon>
            <span v-else>{{ BuildStatusMap(row.archiveStatus) }}</span>
          </template>
          <template
            slot-scope="{ row }"
            slot="opera"
            style="display: inline-block;"
          >
            <EdButton type="text" @click.stop="HandleCancelUpload(row)"
              >取消</EdButton
            >
            <Poptip
              transfer
              @on-popper-show="HandleViewArchiveJGAndMetadata(row)"
              :width="poptipWidth"
              placement="bottom"
            >
              <EdButton type="text">查看</EdButton>
              <div slot="content">
                <Tabs value="name1">
                  <TabPane label="成果包结构" name="name1">
                    <Table
                      :show-header="false"
                      row-key="id"
                      :columns="columnDataDAJG"
                      :data="showDataDAJG"
                      :load-data="HandleLazyLoad"
                    ></Table>
                  </TabPane>
                  <TabPane label="元数据信息" name="name2">
                    <ReviewArchiveMetaData></ReviewArchiveMetaData>
                  </TabPane>
                </Tabs>
              </div>
            </Poptip>
            <EdButton type="text" @click="HandleDeleteArchive(row)"
              >删除</EdButton
            >
            <Poptip
              transfer
              @on-popper-show="HandleViewArchiveLog(row)"
              :width="poptipWidth"
              word-wrap
              placement="bottom"
            >
              <EdButton type="text">日志</EdButton>
              <div slot="content">
                <Tabs value="buildLog">
                  <TabPane label="建档日志" name="buildLog">
                    {{ archiveLog.buildLog }}
                  </TabPane>
                  <TabPane label="检查日志" name="validateLog">
                    {{ archiveLog.validateLog }}
                  </TabPane>
                </Tabs>
                <EdButton
                  style="margin-top: 1rem;"
                  @click.stop="HandleExportLog(row)"
                  >导出日志</EdButton
                >
              </div>
            </Poptip>
          </template>
        </Table>
      </div>
      <div class="page-container">
        <Page
          :total="totalElements"
          @on-change="HandleChangePage"
          :page-size="pageSize"
        />
      </div>
    </div>
    <div class="modal-contaier">
      <EdModal
        closeByOuter="true"
        v-model="modalStatus.isShowUploadModal"
        title="上传文件"
        @on-confirm="HandleComfirmUpload"
      >
        <UploadFile
          @on-file-upload-change="HandleFileUploadChange"
          ref="uploadfile"
          :key="`uploadfile-${uploadFileKey}`"
        ></UploadFile>
      </EdModal>
    </div>
  </div>
</template>
<script lang="ts">
const prefixCls = "dasc";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// 引入组件
import UploadFile from "./UploadFile.vue";
import ReviewArchiveMetaData from "./ReviewArchiveMetaData.vue";
// 引入 mixin
import UploadFileMixin from "./mixins/uploadFileMixin";
// 引入工具类
import { remToPx, BuildTree } from "@/utils/base";
import PollingAction from "@/utils/pollingAction";
import { saveAs } from "file-saver";
// 引入 store
import { GeneralModule } from "@/store/modules/general";
// 引入接口
import {
  GetUploadDaArchiveByPagination,
  BuildArchive,
  GetArchiveLog,
  GetArchiveStructureByArchiveType,
  GetmetadataKeyByArchiveType,
  getArcStructure,
  DownLoadArchiveLog,
  DeleteUploadArchiveFromMongo
} from "@/api/general/dasc";
// 引入 scss 变量
import colorStyle from "@/styles/themes/custom.scss";
import { ArchiveStructureDto } from "@/api/types";
import { mixins } from "vue-class-component";
import { Row } from "view-design";

interface RowData {
  rank: number;
  name: string;
  checkResultStatus: any;
  archiveStatus: number; // 归档状态
  archiveId: number; // 档案id
  archiveType?: number; // 档案类型
  buildStatus?: number;
  isCover?: number; // 0,1是否覆盖
  _checked?: boolean;
  _disabled?: boolean;
  batchNo?: string;
}

interface ShowDataDAJGRow extends ArchiveStructureDto {
  id?: number;
  name: string;
  nodeType: number;
  parent: number;
  pathName: string;
  archiveStructureCatalog: number;
  children?: [];
}

type Dictionary = { [index: string]: object };

@Component({
  name: "DASC",
  components: {
    UploadFile,
    ReviewArchiveMetaData
  }
})
export default class DASC extends mixins(UploadFileMixin) {
  // prop
  @Prop({ default: 0 }) private PropA!: number;

  // data
  private modalStatus = {
    isShowUploadModal: GeneralModule.isShowUploadModal,
    isShowUploadProgress: false,
    isShowBuildArchiveModal: false,
    isShowLogModal: false,
    isShowBuildTipModal: false
  };
  private uploadProgessKey = 0;
  private mapFileRequest: any[] = [];
  private pollingAction!: PollingAction;
  private LogData = {};
  private showDataMeta = [];
  private uploadFileKey = 0;
  private tableLoading = false;
  private colorStyle = colorStyle; // scss color

  // 档案结构
  private columnDataDAJG = [
    {
      title: "Name",
      tree: true,
      key: "name",
      align: "left"
    }
  ];

  private showDataDAJG: ShowDataDAJGRow[] = [
    // {
    //   title: "名称",
    //   key: "name",
    //   align: "center"
    // }
  ];

  private selectCoverList = [
    {
      label: "是",
      value: 1
    },
    {
      label: "否",
      value: 0
    }
  ];

  private columnsData = [
    {
      title: " ",
      width: 1,
      slot: "progress"
    },
    {
      title: "checkbox",
      width: 60,
      type: "selection"
    },
    {
      title: "序号",
      key: "rank",
      align: "center",
      width: this.rankColumnWidth
    },
    {
      title: "名称",
      key: "name",
      align: "center",
      slot: "name"
    },
    {
      title: "检查结果",
      key: "checkResultStatus",
      align: "center",
      width: this.archiveResultWidth,
      slot: "checkResultStatus"
    },
    {
      title: "建档方式",
      key: "archiveMethod",
      align: "center",
      width: this.archiveResultWidth,
      slot: "archiveMethod"
    },
    {
      title: "建档结果",
      key: "archiveStatus",
      align: "center",
      width: this.archiveResultWidth,
      slot: "buildStatus"
    },
    {
      title: "操作",
      slot: "opera",
      align: "center",
      width: this.operaWidth
    }
  ];
  private showData: RowData[] = [
    // {
    //   rank: 1,
    //   name: "520000贵州省国土空间规划数据库电子",
    //   checkResultStatus: 1,
    //   archiveStatus: 1,
    //   buildStatus: 1,
    //   archiveId: 114,
    //   isCover: 0,
    //   archiveType: 71,
    //   batchNo: "d4782a78d16e4dfb1236459b47a642fb"
    // }
  ];
  private archiveDic: Dictionary = {}; // 记录状态，用于记录状态
  private selectedArchive = [];
  private selectedArchiveBuild: RowData[] = []; // 选中要建档的
  private archiveBuildCopy: RowData[] = []; // 记录选择的状态，避免轮询刷新丢失
  // private selectedArchiveBuilded: RowData[] = []; // 选中已经建档的
  private rowHeights: number[] = [];

  // 分页参数
  private pageIndex = 1;
  private pageSize = 10; //每页大小
  private totalElements = 0;

  // 档案日志
  private archiveLog = {
    validateLog: "暂无",
    buildLog: "暂无"
  };

  // computed
  get wrapperCls() {
    return prefixCls;
  }
  get wrapperStyle() {
    return {};
  }

  get modalStyles() {
    return {
      // top: "18.13rem",
      width: "74.58rem !important"
    };
  }
  get rankColumnWidth() {
    return remToPx(5.5);
  }

  get archiveResultWidth() {
    return remToPx(8);
  }
  get operaWidth() {
    return remToPx(20);
  }

  get poptipWidth() {
    return remToPx(30);
  }

  get fileRequests() {
    // 获取文件上传信息
    const { fileRequests } = (this.$refs.uploadfile as any).getUploadFileForm();
    return fileRequests;
  }

  @Watch("mapFileRequest")
  onMapFileRequestChanged() {
    // 上传的文件触发，更新表格数据/
    // this.UpDateShowData(this.mapFileRequest);
  }

  @Watch("pageIndex")
  OnPageIndexChanged() {
    this.InitGetUploadArchive();
  }

  @Watch("modalStatus.isShowUploadModal")
  OnUploadFileModalStatus(val: boolean) {
    GeneralModule.SET_UPLOADMODALSTATUS(val); // 同步 vuex
  }

  // liftcycle
  created() {
    this.InitData();
  }
  beforeDestroy() {
    // 取消轮询
    this.pollingAction.cancel();
  }

  // method
  private InitData() {
    // 获取上传的档案记录
    // 轮询获取后台数据，
    this.pollingAction = new PollingAction(
      this.InitGetUploadArchive,
      300, // 100 ms
      true
    );
    this.pollingAction.start();
  }

  // 获取上传后的档案
  private async InitGetUploadArchive() {
    // 组织参数
    const param = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize
    };
    // this.tableLoading = true;
    const res: any = await GetUploadDaArchiveByPagination(param);
    // this.tableLoading = false;

    const { total, result } = res;
    this.totalElements = total;

    if (result.length === 0) {
      this.showData = []; // 清空
      return;
    }
    // 处理数据
    this.showData = (result as any).map((item: any, index: number) => {
      const {
        validateStatus,
        uploadStatus,
        buildStatus,
        archiveId,
        buildOpt
      } = item;
      // 状态 pipe 上传 -> 检测 -> 建档
      // 默认等待中
      let checkResultStatus = this.getCheckResultItem(
        this.enumCheckKeyMap.waitCheck,
        this.enumCheckResults
      );
      const composeKey = `${uploadStatus}${validateStatus}${buildOpt}`;
      const checkResultStatusItem = this.enumCheckResults.find(
        (item: any) => item.value === composeKey
      );
      if (checkResultStatusItem) {
        // 存在再替换
        checkResultStatus = checkResultStatusItem;
      }

      const obj: RowData = {
        rank: index + 1,
        name: item.fileName,
        checkResultStatus,
        archiveStatus: buildStatus,
        isCover: 1, // 默认覆盖
        _checked: false,
        archiveId
      };
      const data = Object.assign(obj, item);

      // 添加上传文件的信息
      const file = this.mapFileRequest.find(
        (file: any) => data.batchNo === file.batchNo
      );
      if (file) {
        Object.assign(data, file);
      }
      return data;
    });

    // 更新状态：选中状态
    this.UpdateCheck(this.showData, this.selectedArchive);

    // 更新行高
    this.$nextTick(() => {
      this.InitGetTableRowHeight();
    });
  }

  // 改变分页
  private HandleChangePage(currentPageIndex: number) {
    this.pageIndex = currentPageIndex;
  }

  private RefreshDataKey(data: Array<any>) {
    data.forEach((item: any, index: number) => {
      item.rank = index + 1;
    });
  }

  /**
   *  获取表格行的高度
   */
  private InitGetTableRowHeight() {
    if (this.$refs.table as Vue) {
      const trNodeList = (this.$refs.table as Vue).$el.querySelectorAll(
        ".ivu-table-row"
      );
      const trs = Array.prototype.slice.call(trNodeList);
      this.rowHeights = trs.map((item: any) => {
        return item.offsetHeight;
      });
    }
  }

  /**
   * 处理进度条样式
   */
  private ProgressStyle(row: any) {
    const style: any = {};
    style.left = `${row.uploadProgress - 100}%`;
    style.height = `${this.rowHeights[row._index]}px`; // 获取行高
    style.top = `${this.rowHeights
      .filter((item, index) => index < row._index)
      .reduce((item, sum) => item + sum, 0)}px`; // 过滤高度
    return style;
  }

  // 上传文件
  private HandleOpenUpload() {
    this.modalStatus.isShowUploadModal = true;
    this.uploadFileKey++;
  }

  private HandleFileUploadChange(fileRequests: any[]) {
    this.uploadProgessKey++;
    this.mapFileRequest = [];
    fileRequests.forEach((item: any) => {
      this.mapFileRequest.push(item);
    });
  }

  private HandleComfirmUpload() {
    // 调用子组件
    ((this.$refs.uploadfile as Vue).$refs.formValidate as any).validate(
      (valid: any) => {
        if (valid) {
          this.modalStatus.isShowUploadModal = false;
          (this.$refs.uploadfile as any).ConfirmUpload();
        }
      }
    );
  }

  /**
   * 更新选中状态
   */
  private UpdateCheck(data: RowData[], selectedArchive: RowData[]) {
    data.forEach((item: any) => {
      const isMatch = selectedArchive.find(
        (archive: any) => archive.batchNo === item.batchNo
      );
      if (isMatch) {
        item._checked = true;
      }
    });
    return data;
  }

  private BuildStatusMap(status: number) {
    const checkResult = ["建档失败", "建档成功", "建档中"];
    return checkResult[status];
  }

  private HandleOpenLog(row: RowData[]) {
    this.LogData = row; // 打开当前日志信息，// todo 获取日志的接口
    this.modalStatus.isShowLogModal = true;
  }

  private HandleCheckArchive(selection: any) {
    this.selectedArchive = selection;
  }

  // 取消上传
  private HandleCancelUpload(row: any) {
    const { cancelRequestFun } = row;
    cancelRequestFun();
    // 状态改变
    row.uploadProgress = 100;
    // 获取检查选项
    row.checkResultStatus = this.getCheckResultItem(
      this.enumCheckKeyMap.uploadError,
      this.enumCheckResults
    );
  }
  /**
   * 删除当前的档案记录
   */
  private HandleDeleteArchive(row: any) {
    const { batchNo } = row;
    this.$Modal.confirm({
      title: "提示",
      content: "是否确认删除选中的上传记录？",
      onOk: async () => {
        // 删除选中的记录
        await this.DeleteArcive([batchNo]);
        // 刷新 showData 索引
        this.RefreshDataKey(this.showData);
      }
    });
  }
  /**
   * 批量删除档案记录
   */
  private HandleBatchDeleteArchive() {
    if (this.selectedArchive.length === 0) {
      return this.$Message.warning("请勾选档案。");
    }
    // 组织参数
    const params: string[] = [];
    this.selectedArchive.forEach((item: RowData) => {
      if (item.batchNo) {
        params.push(item.batchNo);
      }
    });
    this.$Modal.confirm({
      title: "提示",
      content: "是否确认删除选中的上传记录？",
      onOk: async () => {
        // 删除选中的记录
        await this.DeleteArcive(params);
        // 清空
        this.selectedArchive = [];
      }
    });
  }

  /**
   * 删除所有上传档案记录
   */
  private async DeleteArcive(params: string[]) {
    //
    try {
      await DeleteUploadArchiveFromMongo(params);
      // await this.InitGetUploadArchive();
      this.$Message.success("删除记录成功。");
    } catch (err) {
      this.$Message.error("删除失败。");
    }
  }

  /**
   * 导出日志
   */
  private async HandleExportLog(row: RowData) {
    const { batchNo } = row;
    if (!batchNo) {
      throw new Error("batchNo 不能为空。");
    }
    await this.ExportArchiveLog([batchNo]);
  }

  /**
   * 批量导出日志
   */
  private async HandleBatchExportLog() {
    if (this.selectedArchive.length === 0)
      return this.$Message.warning("暂无档案信息。");
    const params: string[] = [];
    this.selectedArchive.forEach((item: any) => {
      if (!item.batchNo) {
        throw new Error("batchNo 不能为空。");
      }
      params.push(item.batchNo);
    });
    await this.ExportArchiveLog(params);
  }

  /**
   * 导出日志
   */
  private async ExportArchiveLog(batchNos: string[]) {
    try {
      const data = await DownLoadArchiveLog(batchNos);
      if (data && this.$lodash.isObject(data)) {
        const { blob, name } = data as any; // 后台需要添加响应头Access-Control-Expose-Headers: Content-Disposition，才能正确保存文件
        saveAs(blob, name);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 打开建档
   */
  private async HandleBuildArchive() {
    if (this.selectedArchive.length === 0) {
      return this.$Message.warning("请勾选档案。");
    }
    const requests: any[] = [];
    this.selectedArchive.forEach((item: any) => {
      const {
        archiveCatalog,
        archiveType,
        batchNo,
        chunkSum,
        fileName,
        isCover
      } = item;
      // 处理数据，适配表格树的渲染
      const param = {
        archiveCatalog,
        archiveType,
        batchNo,
        chunkCount: chunkSum,
        cover: !!isCover,
        fileName
      };
      requests.push(BuildArchive(param));
      debugger;
    });
    // 请求后台
    try {
      const data = await Promise.all(requests);
      if (data && this.$lodash.isObject(data)) {
        this.$Message.success("建档成功");
      }
    } catch (error) {
      // 异常处理
      this.$Message.error(error);
    }
  }

  /**
   * 获取档案日志
   */
  private async HandleViewArchiveLog(row: any) {
    // 组织参数
    const { batchNo } = row;
    if (!batchNo) {
      throw new Error("查看日志需要 batchNo 属性。");
    }
    try {
      // 请求后台
      this.archiveLog.validateLog = "";
      this.archiveLog.buildLog = "";
      const logData: any = await GetArchiveLog(batchNo);
      if (logData && this.$lodash.isObject(logData)) {
        const { validateLog, buildLog } = logData;
        this.archiveLog.validateLog = validateLog;
        this.archiveLog.buildLog = buildLog;
      }
      // 处理数据
    } catch (err) {
      this.$Message.error("获取日志失败。");
    }
  }

  /**
   * 获取管理的档案结构和元数据
   */
  private async HandleViewArchiveJGAndMetadata(row: any) {
    const { archiveType } = row;
    await this.InitGetArchiveStructureByArchiveType(archiveType);
    await this.InitGetmetadataKeyByArchiveType(archiveType);
  }

  // 获取档案结构
  private async InitGetArchiveStructureByArchiveType(archiveType: number) {
    this.showDataDAJG = [];
    try {
      // 返回一个扁平化树
      const data = await GetArchiveStructureByArchiveType(archiveType);
      if (data && this.$lodash.isArray(data)) {
        // 处理数据，适配树的渲染
        const treeData = BuildTree(data as [], "children", "id", "parent");
        console.log(treeData);
        this.showDataDAJG = (treeData as any[]).map((item: any) => {
          item.children = item.children || [];
          item._loading = false;
          return item;
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * 懒加载档案结构节点
   */
  private async HandleLazyLoad(item: ShowDataDAJGRow, callback: Function) {
    try {
      if (item.id) {
        const res = await getArcStructure(item.id);
        console.log(res);
        callback(res);
      }
    } catch (error) {
      console.log(error);
      this.$Message.error("获取结构节点失败！");
    }
  }

  // 获取元数据信息
  private async InitGetmetadataKeyByArchiveType(archiveType: number) {
    try {
      const data = await GetmetadataKeyByArchiveType(archiveType);
      this.showDataMeta = data as any;
      // 处理数据
      console.log();
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.dasc {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    padding: 0.56rem 0.83rem;
    border-bottom: 1px solid #eee;
    .title {
      @include scw(1.25rem, #222);
      // border-bottom: 1px solid $border;
    }
    .operation {
      margin-left: auto;
    }
  }
  &-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0.56rem 1.1rem;
    .path {
      display: flex;
      padding: 1.11rem 0;
      align-items: center;
      white-space: nowrap;
      .label {
        display: inline-block;
        margin-right: 1.11rem;
        @include scw(0.97rem, #1d1d1d);
      }
    }
    .table-container {
      flex-grow: 1;
    }

    .page-container {
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      ::v-deep .ivu-page-item-active {
        border-color: $light-blue;
        background: $light-blue;
        a {
          color: #fff;
        }
      }
    }
    ::v-deep .ivu-table-wrapper {
      // 上传进度处理
      tr,
      td {
        background: transparent;
      }
      table {
        position: relative;
        z-index: 0;
      }
      .ivu-table {
        background: transparent;
      }
      .ivu-table-body {
        .ivu-table-row {
          .ivu-table-cell {
            .oper-span {
              display: inline-block;
              margin-left: 1.11rem;
              color: $buttonBgDefault;
              cursor: pointer;
              &.active {
                color: $buttonBgDefault;
              }
            }
            .progress {
              position: absolute;
              left: -100%;
              width: 100%;
              height: 0;
              // top: 0;
              // bottom: 0;
              z-index: -1;
              background: hsl(207, 100%, 90%);
              transition: left 1s;
            }
            .ivu-tooltip {
              width: 100%;
              .ivu-tooltip-rel {
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              .name {
                width: 100%;
                cursor: pointer !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
