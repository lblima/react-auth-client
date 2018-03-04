import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {

    renderField(field) {
        const { input, meta: { touched, error } } = field;
        const className = `form-group col-6 col-sm-6 col-lg-4 ${ touched && error ? 'has-danger' : '' }`;

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

    handleSubmitForm(values) {
        this.props.signUpUser(this.props.history, values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.handleSubmitForm.bind(this)) }>
                <Field type="text" label="E-mail" name="email" component={ this.renderField } />
                <Field type="password" label="Password" name="password" component={ this.renderField } />
                <Field type="password" label="Confirm Password" name="confirmPassword" component={ this.renderField } />
                <fieldset className="form-group col-4">
                    { this.renderAlert() }
                    <button type="submit" className="btn btn-primary">Sign up!</button>
                </fieldset>
            </form>
        )
    }
}

function mapStateToProps({ auth: { error }}) {
    return {
        errorMessage: error
    }
}

function validate(values) {
    const errors = {};

    if (!values.email)
        errors.email = "please, enter a valid e-mail address";

    if (!values.password)
        errors.password = "please, enter a valid password";

    if (!values.confirmPassword)
        errors.confirmPassword = "please, enter a valid password confirmation";

    if (values.password != values.confirmPassword)
        errors.confirmPassword = "the confirm password doesn´t match";

    return errors;
}

const signUpForm = reduxForm({
    form: 'signUp',
    validate
})(SignUp);

export default connect(mapStateToProps, actions)(signUpForm);