/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-04-13 13:20:23
 * @LastEditTime: 2020-05-26 11:08:57
 * @LastEditors: Jecyu
 */
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "UploadFileMixin"
})
export default class UploadFileMixin extends Vue {
  public enumValidateStatus = {
    error: 0,
    success: 1,
    validating: 2
  };

  public enumUploadStatus = {
    error: 0,
    success: 1,
    uploading: 2
  };

  public enumRepeatedStatus = {
    notRepeated: 0, // 0：新增(不重复)
    repeated: 1 // 1:覆盖(重复)
  };

  // 检查结果
  public enumCheckResults = [
    // value 由：上传 + 检验 + 重复 构成
    {
      value: `${this.enumUploadStatus.uploading}nullnull`,
      name: "上传中"
    },
    {
      value: `${this.enumUploadStatus.error}nullnull`,
      name: "上传失败"
    },
    {
      value: `${this.enumUploadStatus.success}nullnull`,
      name: "上传成功"
    },
    {
      value: `${this.enumUploadStatus.success}nullnull`,
      name: "等待中"
    },
    {
      value: `${this.enumUploadStatus.success}${this.enumValidateStatus.validating}${this.enumRepeatedStatus.notRepeated}`,
      name: "检测中"
    },
    {
      value: `${this.enumUploadStatus.success}${this.enumValidateStatus.error}${this.enumRepeatedStatus.notRepeated}`,
      name: "上传成功&检验失败"
    },
    {
      value: `${this.enumUploadStatus.success}${this.enumValidateStatus.success}${this.enumRepeatedStatus.repeated}`,
      name: "上传成功&校验成功&有重复"
    },
    {
      value: `${this.enumUploadStatus.success}${this.enumValidateStatus.success}${this.enumRepeatedStatus.notRepeated}`,
      name: "上传成功&校验成功&无重复"
    }
  ];
  // 检查key
  public enumCheckKeyMap = {
    uploading: `${this.enumUploadStatus.uploading}nullnull`, // 上传中
    uploadError: `${this.enumUploadStatus.error}nullnull`, // 上传失败
    uploadSuccess: `${this.enumUploadStatus.success}nullnull`, // 上传成功
    waitCheck: `${this.enumUploadStatus.success}nullnull`, // 等待检测
    checking: `${this.enumUploadStatus.success}${this.enumValidateStatus.validating}${this.enumRepeatedStatus.notRepeated}`, // 检测中
    checkError: `${this.enumUploadStatus.success}${this.enumValidateStatus.error}${this.enumRepeatedStatus.notRepeated}`, // 检测错误 -> 上传成功&检验失败
    checkSuccess: `${this.enumUploadStatus.success}${this.enumValidateStatus.success}${this.enumRepeatedStatus.repeated}`, // 检测成功，但有重复：上传成功&校验成功&有重复
    checkNotice: `${this.enumUploadStatus.success}${this.enumValidateStatus.success}${this.enumRepeatedStatus.notRepeated}` // 检测成功 -> 上传成功&校验成功&无重复
  };

  /**
   * EnumCheckResultStatus 文字转换
   * @param status
   */
  public repeatedStatusMap(status: number) {
    const checkResult = ["新增(不重复)", "覆盖(重复)"];
    return checkResult[status];
  }

  public getCheckResultItem(key: string, enumCheckResults: any[]) {
    return enumCheckResults.find((item: any) => item.value === key);
  }
}
