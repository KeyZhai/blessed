// TypeScript 类型增强
import "i18next";

// 导入你的翻译资源类型
import type basic from "./locales/zh/basic.json";

declare module "i18next" {
  // 扩展 CustomTypeOptions 接口以获得更好的类型推断
  interface CustomTypeOptions {
    // 默认命名空间
    defaultNS: "basic";
    // 资源类型
    resources: {
      basic: typeof basic;
    };
  }
}
