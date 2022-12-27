import React from "react";

const toLearn = ['react','vue','webpack','nodejs']
const TextComponent = ()=><div> hello, i am function component</div>

//在此处 babel 处理后的样子  JSX 元素节点会被编译成 React Element 形式。
// React.createElement(
//     type,
//     [props],
//     [...children]
//   )

//第一个参数:如果是组件类型，会传入组件对应的类或函数;如果是dom元素类型，传入div或者span之类的字符串
//第二个参数:一个对象，在dom类型中为标签属性，在组件类型中为props。
//其他参数:依次为children，根据顺序排序

// 举个例子：
// <div>
//    <TextComponent />
//    <div>hello,world</div>
//    let us learn React!
// </div>

//上方的代码会被babel先编译成:React.createElement("div",null,
    // React.createElement(TextComponent,null),
    // React.createElement("div",null,"hello,world"),
    // "let us learn React!"
    // )

//在老版本的React中，为什么写jsx的文件要默认引入React?

//import React from 'react'
//function Index(){ return <div>hello,world</div> }

//因为jsx在被babel编译后，写的jsx会变成上述React.createElement形式，所以需要引入React，防止找不到React引起报错

// 点击按钮，看一下写的 demo 会被 React.createElement 变成什么:
//从控制台jsx的结构来看，外层的div被react.createElement转换成react element 对象，div里面的8个元素分别
//转换成children子元素列表。

/**
 * jsx元素类型          react.createElement转换后       type属性
 * element元素类型        react element类型            标签字符串 例如div
 * fragment类型           react element类型            symbol react.fragment类型
 * 文本类型               直接字符串                   无
 * 数组类型      返回数组结构，里面元素被react.createElement转换     无
 * 组件类型               react element 类型           组件类或者组件函数本身
 * 三元运算/表达式      先执行三元运算，然后安装上述规则处理      看三元运算返回结果
 * 函数执行           先执行函数，然后按照上述规则处理           看函数执行返回结果
 */

//React 底层调和处理后，终将变成什么？
//在调和阶段，React element 对象的每一个子节点都会形成一个与之对应的fiber对象 然后通过sibling、return、child 将每一个fiber对象联系起来
//所以，我们有必要先来看一下 React 常用的 fiber 类型，以及 element 对象和 fiber 类型的对应关系。

//不同种类的fiber Tag
//React 针对不同React element 对象会产生不同tag(种类)的fiber对象。首先，来看一下tag与element的对应关系

// export const FunctionComponent = 0;       // 函数组件
// export const ClassComponent = 1;          // 类组件
// export const IndeterminateComponent = 2;  // 初始化的时候不知道是函数组件还是类组件 
// export const HostRoot = 3;                // Root Fiber 可以理解为根元素 ， 通过reactDom.render()产生的根元素
// export const HostPortal = 4;              // 对应  ReactDOM.createPortal 产生的 Portal 
// export const HostComponent = 5;           // dom 元素 比如 <div>
// export const HostText = 6;                // 文本节点
// export const Fragment = 7;                // 对应 <React.Fragment> 
// export const Mode = 8;                    // 对应 <React.StrictMode>   
// export const ContextConsumer = 9;         // 对应 <Context.Consumer>
// export const ContextProvider = 10;        // 对应 <Context.Provider>
// export const ForwardRef = 11;             // 对应 React.ForwardRef
// export const Profiler = 12;               // 对应 <Profiler/ >
// export const SuspenseComponent = 13;      // 对应 <Suspense>
// export const MemoComponent = 14;          // 对应 React.memo 返回的组件

class Index extends React.Component{
    status = false //状态
    renderFoot = ()=> <div> i am foot</div>
    render(){
        // 以下都是常用的jsx元素
        return <div style={{marginTop:'100px'}}>
            {/* element元素类型 */}
            <div>hello,world</div>
            {/* fragment类型 */}
            <React.Fragment>
                <div>👽👽</div>
            </React.Fragment>
            {/* text文本类型 */}
            my name is AshtarteKk
            {/* 数组节点类型 */}
            {toLearn.map(item=> <div key={item}>let us learn {item}</div>)}
            {/* 组件类型 */}
            <TextComponent />
            {/* 三元运算 */}
            {this.status ? <TextComponent /> : <div>三元运算</div>}
            {/* 函数执行 */}
            {this.renderFoot()}
            <button onClick={()=>console.log(this.render())}>打印</button>
        </div>
    }
}

export default Index