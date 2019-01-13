import React, { PureComponent } from 'react';
import { withFirebase, withAuth } from '../../components/Firebase';
import ExpenseForm from '../../components/ExpenseForm';
import { Button, Card, notification } from 'antd';

class EditTransaction extends PureComponent {

  state = {
    expense: null,
    tags: [],
  }

  componentDidMount() {
    this.props.firebase.getExpenses().on('value', snapshot => {
      Object.entries(snapshot.val() || []).find(([key, value]) => {
        if (key === this.props.match.params.id) {
          this.setState({
            expense: value,
            uuid: key,
          });
          return true;
        }
        return false;
      });
    });

    this.props.firebase.getTags().on('value', snapshot => {
      const tags = [];
      Object.entries(snapshot.val() || []).forEach(
        ([key, value]) => tags.push({ ...value, uuid: key })
      );
      this.setState({ tags });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getExpenses().off();
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

  onSubmit = async () => {
    const { expense, uuid } = this.state;
    const result = await this.props.firebase.updateExpense(uuid, expense);

    notification.open({
      message: 'Expense',
      description: result ? 'successfully saved' : 'error',
    });
  }

  render() {

    const { expense, tags } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Card title="Edit expense" loading={expense === null}>
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

              <pre>{JSON.stringify(expense, null, 2)}</pre>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(withFirebase(EditTransaction));
