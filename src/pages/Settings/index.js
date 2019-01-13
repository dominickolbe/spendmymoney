import React, { Component } from 'react';
import {
  Button,
  Card,
  Input,
  List,
} from 'antd';
import { withFirebase, withAuth } from '../../components/Firebase';

class Settings extends Component {

  state = {
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

  render() {
    const { tags, newTagValue } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Card title="Tags">
              <Input
                placeholder="Add new tag"
                value={newTagValue}
                onChange={e => this.setState({ newTagValue: e.target.value })}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    this.props.firebase.addTag(newTagValue);
                    this.setState({ newTagValue: '' });
                  }
                }}
              />
              <List
                dataSource={tags}
                renderItem={tag => (
                  <List.Item actions={[
                    <Button type="danger" onClick={() => {
                      this.props.firebase.removeTag(tag.uuid);
                    }}>Delete</Button>
                  ]}>
                    {tag.title}
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(withFirebase(Settings));
