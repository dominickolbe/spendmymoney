import React from 'react';
import {
  DatePicker,
  Input,
  InputNumber,
  Form,
  Select,
  Radio
} from 'antd';
import moment from 'moment';
import { transactionTypes } from '../../utils';

const { TextArea } = Input
const FormItem = Form.Item
const Option = Select.Option

const ExpenseForm = ({ expense, tags, onExpenseChange }) => {

  return (
    <div className="row">
      <div className="col-md-4">

        <FormItem label="Type">
          <Radio.Group
            defaultValue={expense.type}
            onChange={e => onExpenseChange({ type: e.target.value })}
          >
            {transactionTypes.map(type => (
              <Radio.Button key={type.id} value={type.id}>{type.title}</Radio.Button>
            ))}
          </Radio.Group>
        </FormItem>

      </div>
      <div className="col-md-4">

        <FormItem label="Amount">
          <InputNumber
            value={expense.amount}
            style={{ width: '100%' }}
            onChange={e => onExpenseChange({ amount: e })}
          />
        </FormItem>

      </div>
      <div className="col-md-4">

        <FormItem label="Tip">
          <InputNumber
            defaultValue={expense.tip}
            style={{ width: '100%' }}
            onChange={e => onExpenseChange({ tip: e })}
          />
        </FormItem>

      </div>
      <div className="col-md-4">

        <FormItem label="Date">
          <DatePicker
            showTime
            defaultValue={moment(expense.date)}
            onChange={e => onExpenseChange({ date: e.format() })}
            style={{ width: '100%' }}
          />
        </FormItem>

      </div>
      <div className="col-md-4">

        <FormItem label="Tags">
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="please select"
            onChange={e => onExpenseChange({ tags: e })}
            defaultValue={expense.tags}
          >
            {tags.map(tag => <Option key={tag.title}>{tag.title}</Option>)}
          </Select>
        </FormItem>

      </div>
      <div className="col-md-12">

        <TextArea
          rows={4}
          defaultValue={expense.comment}
          onChange={e => onExpenseChange({ comment: e.target.value })}
          placeholder="comment"
        />

      </div>
    </div>
  );
}

export default ExpenseForm;
