<!--
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-26 11:10:28
 * @LastEditTime: 2020-05-26 11:19:56
 * @LastEditors: Jecyu
--> 
方法：采用了 if-else 分支语句里的三个变量，进行抽离组合，首先可视化为一棵树，描述整个流程的流向。上传 -》 检查 -》查重

```ts
// 检查结果
  public enumCheckResults = [
    // value 由：上传 + 检验 + 重复 构成
    {
      value: `${this.enumUploadStatus.uploading}nullnull`, // 采用 对象数组的形式，把对应的中文也内嵌进来，虽然比原来的 map 映射中文慢O(n)，但是维护性高，代码简洁，速度差不多太多，微观的性能比较。
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
```
