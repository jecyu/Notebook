/*
 * @Author: naluduo233
 * @Date: 2021-04-22 22:07:33
 * @LastEditors: naluduo233
 * @LastEditTime: 2021-04-22 22:22:20
 * @FilePath: /react-ts-app/src/components/logo/Logo.tsx
 * @Description:
 */

import * as React from 'react';

interface IProps {
  logo?: string;
  className?: string;
  alt?: string;
}

// 无状态组件
export const Logo: React.FC<IProps> = (props) => {
  const { logo, className, alt } = props;
  return <img src={logo} className={className} alt={alt} />;
};
