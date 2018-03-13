import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    fetchMessage() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <div>
                { this.props.message}
                <div>
                    <button onClick={() => this.fetchMessage() }>Fetch Message Again</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ feature: { message }}) {
    return {
        message
    };
}

export default connect(mapStateToProps, actions)(Feature);