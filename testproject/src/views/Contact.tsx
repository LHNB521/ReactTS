import React, { Component } from "react";
import styles from './contact.module.scss';

import { getCarList } from "../api/index";
export default class Contact extends Component {
  getList() {
    getCarList({page: '1'}).then((res)=>console.log(res))
  }
  render() {
    return (
      <div className={styles.contact}>
        <div className={styles.container}>
          <h3 className={styles.center}> Contact页面</h3>
          <p>欢迎来到联系我们页面！</p>
          <button onClick={this.getList}>获取数据</button>
        </div>
      </div>
    );
  }
}
