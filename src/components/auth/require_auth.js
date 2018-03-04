import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
    class RequireAuth extends Component {

        componentWillMount() {
            if (!this.props.authenticated)
                this.props.history.replace("/");
        }

        componentWillUpdate() {
            if (!this.props.authenticated)
                this.props.history.replace("/");
        }

        render() {
            return (
                <ComposedComponent { ...this.props } />
            )
        }
    }

    function mapStateToProps({ auth: { authenticated }}) {
        return {
            authenticated
        }
    }

    return connect(mapStateToProps)(RequireAuth);
}