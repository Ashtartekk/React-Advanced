import React from "react";

const toLearn = ['react','vue','webpack','nodejs']
const TextComponent = ()=><div> hello, i am function component</div>

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