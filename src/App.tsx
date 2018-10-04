import React, { Component } from 'react';
import logo from './logo.svg';
import gifImg from './img/giphy.gif';
import cls from './App.css';
import scssCls from './app.scss';
import './main.global.scss';
import Header from "./components/heder";
import { DatePicker ,  Timeline, Icon , Radio  } from 'antd';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.css';
const RadioGroup = Radio.Group;

class App extends Component {
  render() {
    return (
      <div className={cls.App}>
        <header className={cls["App-header"]}>
          <img src={logo} className={cls["App-logo"]} alt="logo" />
          <h1 className={scssCls["app-title"]}>Welcome to Reacts and webpack 4+ !!</h1>
        </header>
        <DatePicker/>
          <Header onClick={_=>conmsole.log('ss')}/>
        <div className={cls["App-intro"]}>
          <div>
              <img src={gifImg}/>
          </div>
          <Timeline>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
        <RadioGroup >
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
        </div>
      </div>
    );
  }
}

export default App;
