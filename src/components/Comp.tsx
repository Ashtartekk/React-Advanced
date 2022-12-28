import React, { useState } from "react";

//在React世界里 ，一切皆为组件，我们写的React项目全部起源于组件。组件可以分为两类，一类是类(Class)组件
//一类是函数 （Function）组件

//类组件和函数组件的本质区别

//类
class textClass {
    sayHello = ()=>console.log('hello, my name is AshtarteKk')
}
//类组件
class Index extends React.Component {
    state = { message: `hello,world!` }
    sayHello=()=>this.setState({ message:'hello,my name is AshtarteKk' })
    render(){
        return <div style={{marginTop:'50px'}} onClick={ this.sayHello }></div>
    }
}

//函数
function textFun(){
    return 'hello ,world '
}

//函数组件

function FunComponent(){
    const [message,setMessage] = useState('hello,world')
    return <div onClick={()=>setMessage('hello,my name is AshtarteKk')}>{message}</div>
}

//组件本质上就是累和函数名单是与常规的类和函数不同的是，组件承载了渲染视图UI和更新视图的setState、
//useState等方法
//React 在底层逻辑上回像正常实例化类和正常执行函数那样处理的组件。

//因此，函数与类上的特性在React组件上同样具有，比如原型链，继承，静态属性的，所以不要把React和类与函数独立开来

//React对类组件的处理流程=>>

// function constructClassInstance(
//     workInProgress, //当前正在工作的 fiber 对象
//     ctor, //我们的类组件
//     props //props
// ){
//     //实例化组件 ，的到组件实例 instance
//     const instacne = new ctor(props,context)
// }

//React对函数组件的处理流程=>>

function renderWithHooks(
    current, //当前函数组件对应的 'fiber' ,初始化
    workInProgress, //当前正在工作的 fiber 对象
    Component, //我们函数组件
    props,  //函数组件第一个参数 props
    secondAry, //函数组件其他参数
    nextRenderExpirationTime , //下次渲染过期时间
){
    //执行我们的函数组件，得到return 返回的React.element 对象
    let children = Component(props,secondAry)
}