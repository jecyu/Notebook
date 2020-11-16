/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-04-13 13:20:23
 * @LastEditTime: 2020-05-26 10:50:47
 * @LastEditors: Jecyu
 */
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "UploadFileMixin"
})
export default class UploadFileMixin extends Vue  {
  public EnumCheckResutlStatus = {
    uploading: 0, // 上传中
    uploadError: 1, // 上传失败
    uploadSuccess: 2, // 上传成功
    waitCheck: 3, // 等待检测
    checking: 4, // 检测中
    checkSuccess: 5, // 检测成功 -> 上传成功&校验成功&无重复
    checkError: 6, // 检测错误 -> 上传成功&检验失败
    checkNotice: 7 // 检测成功，但有重复：上传成功&校验成功&有重复
  };
  /**
   * EnumCheckResultStatus 文字转换
   * @param status
   */
  public checkResultStatusMap(status: number) {
    const checkResult = [
      "上传中",
      "上传失败",
      "上传成功",
      "等待检测",
      "检测中",
      "上传成功&校验成功&无重复",
      "上传成功&检验失败",
      "上传成功&校验成功&有重复"
    ];

    return checkResult[status];
  }

  /**
   * EnumCheckResultStatus 文字转换
   * @param status
   */
  public repeatedStatusMap(status: number) {
    const checkResult = ["新增(不重复)", "覆盖(重复)"];
    return checkResult[status];
  }

}
