import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import getFilteredUsers from '../../../server/index'


export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            searchVal: '',          //输入框输入的值
            list: [],               //输入值匹配到的数组
            showResult: false,      //是否展示结果
            currVal: 0              //当前选中的值的index
        };
        this.onInputChange = this.onInputChange.bind(this);     //input输入事件绑定this
        this.handleKey = this.handleKey.bind(this);             //input键盘事件绑定this
    }
    // putting the event parameter by convention
    onInputChange(event) {
        const searchVal = event.target.value
        const list = searchVal !== '' ? getFilteredUsers(searchVal) : []        //输入值为空的时候设为空数组，否则就用匹配到的数组
        this.setState({ 
            searchVal,
            list,               //(es6的对象简洁写法，等同于 list:  list)
            showResult: true                                //输入的时候展示结果
        });
        
    }
    handleKey(e) {
        const { currVal, list } = this.state        // (es6的对象解构)
        const l = list.length
        //有数据的情况下才能进行键盘事件
        if (l) {                    
            if (e.keyCode === 38) {         //上箭头
                //up
                if (currVal !== 0) {
                    this.setState({
                        currVal: currVal - 1
                    })
                }
            }
            if (e.keyCode === 40) {         //下箭头
                //down
                if (currVal <= l) {
                    this.setState({
                        currVal: currVal + 1
                    })
                }
            }
            if (e.keyCode === 13) {
                this.setState({
                    currVal: 0,
                    showResult: false,
                    searchVal: list[currVal],
                    list: []
                })
            }
        }
        return false 
    }
    handleSelect(value) {
        this.setState({
            searchVal: value,
            list: [],
            showResult: false
        })
    }
    handleClear() {
        this.setState({
            searchVal: '',
            list: [],
            showResult: false
        })
    }
    render() {
        const {searchVal,list,showResult,currVal} = this.state
        return (
            <div  className="input-wrapper">
                <div>
                    <input name='users' type='text' placeholder='search away' onKeyDown={this.handleKey}  value={searchVal} onChange={this.onInputChange} /> 
                    <span onClick={this.handleClear.bind(this)}>clear</span>
                </div>
                <ul>
                    {
                        !list.length && searchVal !== '' && showResult
                         ? 
                        <li> No results found </li> 
                        :
                        list.map((item,idx) => {
                            const v = item.toLowerCase()
                            const s = searchVal.toLowerCase()
                            const i = v.indexOf(s)
                            const l = s.length
                            let s1 = v.slice(0,i)
                            let s2 = v.slice(i + l)
                            if(s === v.split(' ')[0]) {
                                s1 = s1 + ' '
                            }
                            if(s === v.split(' ')[1]) {
                                s2 = ' ' + s2
                            }
                            return (
                                <li key={v + idx} onClick={this.handleSelect.bind(this, v)} className={currVal === idx ? 'currVal' : ''}>
                                    {s1}<span className="highlight">{s}</span>{s2}
                                </li>
                            )
                        })
                        
                    }

                </ul>
            </div>

        )
    }
}

