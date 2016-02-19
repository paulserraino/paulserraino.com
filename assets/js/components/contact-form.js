import React, {Component, PropTypes} from 'react';
import request from 'superagent';

export class ContactForm extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        errors: {},
        emailSent: false,
        emailError: false
    };

    handleNameChange = (evt) => {
        this.setState({ name: evt.target.value }, () => {
            this.validateField('name', { required: true });
        });
    };

    handleEmailChange = (evt) => {
        this.setState({ email: evt.target.value }, () => {
            this.validateField('email', { required: true, email: true });
        });
    };

    handleMessageChange = (evt) => {
        this.setState({ message: evt.target.value }, () => {
            this.validateField('message', { required: true });
        });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();

        this.validateField('name', { required: true });
        this.validateField('email', { required: true, email: true });
        this.validateField('message', { required: true });

        setTimeout(() => {
            const {errors} = this.state;

            let fieldErrors = Object.keys(errors).filter(field => {
                return errors[field];
            });

            if (fieldErrors.length < 1) {
                request
                    .post('http://tinysatellites.com/api/mail')
                    .send(this.state)
                    .accept('json')
                    .withCredentials()
                    .end((err, res) => {
                        if (err) {
                            this.setState({ emailError: true });
                            throw new Error(err);
                            return;
                        }

                        this.setState({ emailSent: true });
                    });
            }
        }, 100);
    };

    validateField(field, options) {
        let error = null;
        let validate = this.getValidations();

        for (let k in options) {
            if (!options[k]) continue;

            let result = validate[k]( this.state[field] );
            if ( !result.isValid ) {
                error = field.charAt(0).toUpperCase() + field.slice(1) + result.message;
                break;
            }
        }

        this.setState(state => {
            state.errors[field] = error;
        });
    }

    getValidations() {
        return {
            required: function (val) {
                return { isValid: val.toString('utf-8') !== '', message: ' is required' };
            },
            email: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return { isValid: re.test(email), message: ' is invalid' };
            }
        }
    }


    render() {
        const {name, email, message, errors, emailSent, emailError} = this.state;

        return(
            <div className="contact-form">
                <form className="form">
                    <div className={"email-sent-message animated bounceInUp" + (emailSent ? '' : ' hide')}>
                        <strong>Message sent!</strong> We will follow up with you as soon as possible!
                    </div>
                    <div className={"email-error-message animated bounceInUp" + (emailError ? '' : ' hide')}>
                        <strong>Message failed:(</strong> please email tinysatellites99@gmail.com.
                    </div>
                    <div className="form-group">
                        <span className={"error-message" + (errors.name ? '' : ' hide')}>{errors.name}</span>
                        <input type="text"
                            name="name"
                            onChange={this.handleNameChange}
                            value={name}
                            placeholder={"Name"}
                            />
                    </div>
                    <div className="form-group">
                        <span className={"error-message" + (errors.email ? '' : ' hide')}>{errors.email}</span>
                        <input type="text"
                            name="email"
                            onChange={this.handleEmailChange}
                            value={email}
                            placeholder={"Email"}
                            />
                    </div>
                    <div className="form-group">
                        <span className={"error-message" + (errors.message ? '' : ' hide')}>{errors.message}</span>
                        <textarea name="message" rows="8" cols="40"
                            onChange={this.handleMessageChange}
                            value={message}
                            placeholder={"Message"}
                            />
                    </div>
                    <div className="form-group submit-container">
                        <button type="submit" className="submit-btn btn" onClick={this.handleSubmit}>submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
