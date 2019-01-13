import React from 'react';
import { Card } from 'antd';
import ExpensesTable from '../../components/ExpensesTable';
import { withAuth } from '../../components/Firebase';

const Home = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <Card title="Expenses">
          <ExpensesTable />
        </Card>
      </div>
    </div>
  </div>
);

export default withAuth(Home);
