import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {

    renderField(field) {
        const { input, meta: { touched, error } } = field;
        const className = `form-group col-6 col-sm-6 col-lg-4 ${ touched && error ? 'has-danger': ''}`;

        return (
            <fieldset className={ className }>
                <label>{ field.label }</label>
                <input { ...input } type={ field.type } className="form-control" />
                <div className="text-danger">{ touched ? error: '' }</div>
            </fieldset>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong> { this.props.errorMessage }
                </div>
            )
        }
    }

    handleFormSubmit({ email, password }) {
        this.props.signInUser(this.props.history, { email, password });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field name="email" label="E-mail" type="text" component={ this.renderField } />
                <Field name="password" label="Password" type="password" component={ this.renderField } />
                <fieldset className="form-group col-4">
                    { this.renderAlert() }
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </fieldset>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.email)
        errors.email = "please, enter a valid e-mail address";

    if (!values.password)
        errors.password = "please, enter a valid password";

    return errors;
}

function mapStateToProps({ auth: { error } }) {
    return {
        errorMessage: error
    };
}

const signInForm = reduxForm({
    form: 'signIn',
    validate
})(SignIn);

export default connect(mapStateToProps, actions)(signInForm);