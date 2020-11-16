<!--
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-05-26 11:16:35
 * @LastEditTime: 2020-05-26 11:17:47
 * @LastEditors: Jecyu
-->

```js
if (uploadStatus === EnumUploadStatus.success) {
  // 已上传 // TODO 后续重构
  checkResultStatus = EnumCheckResutlStatus.uploadSuccess;
  if (validateStatus === EnumValidateStatus.success) {
    // 检测成功
    if (buildOpt === EnumRepeatedStatus.repeated) {
      // 是否重复
      checkResultStatus = EnumCheckResutlStatus.checkNotice;
    } else if (buildOpt === EnumRepeatedStatus.notRepeated) {
      checkResultStatus = EnumCheckResutlStatus.checkSuccess;
    }
    if (buildStatus === EnumBuildStatus.success) {
      // 建档成功
      buidStatus = EnumBuildStatus.success;
    } else if (buildStatus === EnumBuildStatus.error) {
      // 建档失败
      buidStatus = EnumBuildStatus.error;
    } else if (buildStatus === EnumBuildStatus.building) {
      buidStatus = EnumBuildStatus.building;
    }
  } else if (validateStatus === EnumValidateStatus.error) {
    // 检测失败
    checkResultStatus = EnumCheckResutlStatus.checkError; // TODO 后台如果还没检测，状态不应该是0吧？还要有一个等待中
  } else if (validateStatus === EnumValidateStatus.validating) {
    // 检测中
    checkResultStatus = EnumCheckResutlStatus.checking;
  }
} else if (uploadStatus === EnumUploadStatus.uploading) {
  // 上传中
  checkResultStatus = EnumCheckResutlStatus.uploading;
} else if (uploadStatus === EnumUploadStatus.error) {
  checkResultStatus = EnumCheckResutlStatus.uploadError;
}
```
缺点：可读性差