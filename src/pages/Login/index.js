import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { withFirebase } from '../../components/Firebase';

class Login extends Component {

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) return this.props.history.push('/');
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  onClick = async () => {
    this.props.firebase.doSignIn();
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button
              type="primary"
              size="large"
              onClick={this.onClick}
            >
              <Icon type="google" />
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default withFirebase(Login);
