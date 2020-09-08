import {PageSchema} from './Page';
import {FormSchema} from './Form';
import {TplSchema} from './Tpl';

// 每加个类型，这补充一下。
export type SchemaType = 'page' | 'form' | 'tpl' | 'html';
export type SchemaObject = PageSchema | FormSchema | TplSchema;

export type SchemaContainer = SchemaObject | Array<SchemaObject> | SchemaTpl;

/**
 * 表达式，语法 `data.xxx > 5`。
 */
export type SchemaExpression = string;

// /**
//  * css类名，配置字符串，或者对象。
//  *
//  *     className: "red"
//  *
//  * 用对象配置时意味着你能跟表达式一起搭配使用，如：
//  *
//  *     className: {
//  *         "red": "data.progress > 80",
//  *         "blue": "data.progress > 60"
//  *     }
//  */
// export type SchemaClassName =
//   | string
//   | {
//       [propName: string]: true | false | null | SchemaExpression;
//     };

/**
 * css类名，字符串格式
 */
export type SchemaClassName = string; // todo 支持上面那种格式。

export type SchemaApi =
  | string
  | {
      /**
       * API 发送类型
       */
      method?: 'get' | 'post' | 'put' | 'delete' | 'patch';

      /**
       * API 发送目标地址
       */
      url: string;

      /**
       * 用来控制携带数据. 当key 为 `&` 值为 `$$` 时, 将所有原始数据打平设置到 data 中. 当值为 $$ 将所有原始数据赋值到对应的 key 中. 当值为 $ 打头时, 将变量值设置到 key 中.
       */
      data?: {
        [propName: string]: any;
      };

      /**
       * 发送体的格式
       */
      dataType?: 'json' | 'form-data' | 'form';

      /**
       * 如果是文件下载接口，请配置这个。
       */
      responseType?: 'blob';

      /**
       * 携带 headers，用法和 data 一样，可以用变量。
       */
      headers?: {
        [propName: string]: string;
      };

      /**
       * 设置发送条件
       */
      sendOn?: SchemaExpression;
    };

/**
 * 组件名字，这个名字可以用来定位，用于组件通信
 */
export type SchemaName = string;

/**
 * 配置刷新动作，这个动作通常在完成渲染器本省的固定动作后出发。
 *
 * 一般用来配置目标组件的 name 属性。多个目标可以用逗号隔开。
 *
 * 当目标是 windows 时表示刷新整个页面。
 *
 * 刷新目标的同时还支持传递参数如： `foo?a=${a}&b=${b},boo?c=${c}`
 */
export type SchemaReload = string;

/**
 * 支持两种语法，但是不能混着用。分别是：
 *
 * 1. `${xxx}` 或者 `${xxx|upperCase}`
 * 2. `<%= data.xxx %>`
 *
 *
 * 更多文档：https://baidu.gitee.io/amis/docs/concepts/template
 */
export type SchemaTpl = string;

/**
 * 初始数据，设置得值可用于组件内部模板使用。
 */
export type SchemaDefaultData = object;

/**
 * 用来关联 json schema 的，不用管。
 */
export type SchemaSchema = string;

export interface BaseSchema {
  $schema?: SchemaSchema;
  type: SchemaType;
  className?: SchemaClassName;
}
