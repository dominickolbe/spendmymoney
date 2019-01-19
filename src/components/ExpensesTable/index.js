import React, { PureComponent } from 'react';
import orderBy from 'lodash/orderBy';
import { Dropdown, Icon, Menu, Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withFirebase } from '../../components/Firebase';

class ExpensesTable extends PureComponent {

  state = {
    expenses: [],
  }

  componentDidMount() {
    this.props.firebase.getExpenses().on('value', snapshot => {
      const expenses = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => expenses.push({ ...value, uuid: key, key })
      );
      this.setState({ expenses });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getExpenses().off();
  }

  onDelete = id => {
    this.props.firebase.deleteExpense(id);
  }

  getColumns = () => {
    return [{
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      fixed: 'left',
      width: 90,
      render: (text, record) => `€ ${(record.amount + record.tip).toFixed(2)}`,
    }, {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (text, record) => record.tags && record.tags.join(', '),
    }, {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => moment(record.date).format('dd, DD.MM'),
    }, {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 90,
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">
                <Link to={`transactions/${record.uuid}/edit`}>Edit</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <span onClick={() => this.onDelete(record.uuid)}>Delete</span>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          {/* eslint-disable-next-line */}
          <a className="ant-dropdown-link" href="#">
            Edit <Icon type="down" />
          </a>
        </Dropdown>
      ),
    }];
  }

  render() {
    let { expenses } = this.state;
    expenses = orderBy(expenses, 'date', 'desc')

    return (
      <Table
        dataSource={expenses}
        columns={this.getColumns()}
        loading={expenses.length === 0}
      />
    );
  }
};

export default withFirebase(ExpensesTable);
