import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import actions from '../../store/actions/mainheader';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
const { Header } = Layout;
interface Props {
    collapsed?: any,
    color?: string,
    changeCollapsed?: Function,
    changeColor?: Function
}
interface State { }
class MainHeader extends Component<Props, State> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: Props) {
        super(props)
    }
    toggle = () => {
        this.props.changeCollapsed!()
    }
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: '0 16px', display: 'flex', backgroundColor: this.props.color }}>
                <div style={{ width: '50px' }}>
                    {
                        this.props.collapsed ?
                            <MenuUnfoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={this.toggle.bind(this)} /> :
                            <MenuFoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={this.toggle.bind(this)} />
                    }
                </div>
                <div style={{ flex: 1 }}>
                    <input type="color"
                        onChange={(e) => {
                            this.props.changeColor!(e.target.value)
                        }}
                    />
                </div>
            </Header>
        )
    }
}

const mapStateToProps = (state: any) => {
    return state.mainheader
}
export default connect(mapStateToProps, actions)(MainHeader);