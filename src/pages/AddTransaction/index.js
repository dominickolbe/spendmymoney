import React, { Component } from 'react';
import {
  Button,
  Card,
  notification
} from 'antd';
import moment from 'moment';
import { withFirebase, withAuth } from '../../components/Firebase';
import ExpenseForm from '../../components/ExpenseForm';

class AddTransaction extends Component {
  state = {
    expense: {
      date: moment().format(),
      type: 1,
      tip: 0,
    },
    tags: [],
  }

  componentDidMount() {
    this.props.firebase.getTags().on('value', snapshot => {
      const tags = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => tags.push({ ...value, uuid: key })
      );
      this.setState({ tags });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getTags().off();
  }

  onExpenseChange = expense => {
    this.setState(state => {
      return {
        expense: {
          ...state.expense,
          ...expense,
        }
      }
    })
  }

  onSubmit = () => {
    const { expense } = this.state;
    this.props.firebase.addExpense(expense);

    notification.success({
      message: 'Expense',
      description: 'successfully saved',
      placement: 'bottomRight',
    });
  }

  render() {
    const { expense, tags } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Card title="Add new transaction">

              <ExpenseForm
                expense={expense}
                tags={tags}
                onExpenseChange={this.onExpenseChange}
              />

              <div className="row" style={{ marginTop: '50px' }}>
                <div className="col-6">
                  <Button type="danger" onClick={this.onSubmit}>Delete</Button>
                </div>
                <div className="col-6" style={{ textAlign: 'right' }}>
                  <Button style={{ marginRight: '15px' }} onClick={this.onSubmit}>Cancel</Button>
                  <Button type="primary" onClick={this.onSubmit}>
                    Save
                  </Button>
                </div>
              </div>

            </Card>
            <pre>{JSON.stringify(expense, null, 2)}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(withFirebase(AddTransaction));
