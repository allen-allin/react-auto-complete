import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import getFilteredUsers from '../../../server/index'
import List from '../List/List'


export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            searchVal: '',
            list: [],
            showResult: false
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    // putting the event parameter by convention
    onInputChange(event) {
        const searchVal = event.target.value
        const list = searchVal !== '' ? getFilteredUsers(searchVal) : []
        this.setState({ 
            searchVal,
            list,
            showResult: true
        });
        
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
        const {searchVal,list,showResult} = this.state
        return (
            <div  className="input-wrapper">
                <div>
                    <input name='users' type='text' placeholder='search away' value={searchVal} onChange={this.onInputChange} /> 
                    <span onClick={this.handleClear.bind(this)}>clear</span>
                </div>
                <ul>
                    {
                        !list.length && searchVal !== '' && showResult
                         ? 
                        <li> No results found </li> 
                        :
                        list.map(item => {
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
                                <li key={v} onClick={this.handleSelect.bind(this,v)}>
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

