/* eslint-disable no-bitwise, no-param-reassign */
/* inspired by https://codesandbox.io/s/98j0v46zj4. THIS CODE IS PEACE OF SHIT */
/* TODO refactor */
import React from 'react';
import { FormSpy } from 'react-final-form';
import diff from 'object-diff';


class AutoSave extends React.Component {
  static defaultProps = {
    debounced: [],
  };

  constructor(props) {
    super(props);
    this.state = { values: props.values, submitting: false };
  }

  componentWillReceiveProps(nextProps) {
    const { values, debounce, debounced } = nextProps;
    const debouncedValues = {};
    const immediateValues = {};

    Object.keys(values).forEach((key) => {
      if (~debounced.indexOf(key)) {
        debouncedValues[key] = values[key];
      } else {
        immediateValues[key] = values[key];
      }
    });
    if (Object.keys(immediateValues).length) {
      this.save(immediateValues);
    }
    if (Object.keys(debouncedValues).length) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.save(debouncedValues);
      }, debounce);
    }
  }

  save = async (data) => {
    if (this.promise) {
      await this.promise;
    }
    const { save } = this.props;
    const { values } = this.state;

    const changedValues = Object.keys(data).reduce((result, key) => {
      if (data[key] !== values[key]) {
        result[key] = data[key];
      }
      return result;
    }, {});
    if (Object.keys(changedValues).length) {
      diff(values);
      // values have changed
      this.setState((state) => ({
        submitting: true,
        values: { ...state.values, ...changedValues },
      }));
      this.promise = save(changedValues);
      await this.promise;
      delete this.promise;
      this.setState({ submitting: false });
    }
  };

  render() {
    const { submitting } = this.state;
    const { submittingComponent: SubmittingComponent } = this.props;
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return submitting && SubmittingComponent ? <SubmittingComponent /> : null;
  }
}

export default function AutoSaveHOC(props) {
  return <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />;
}
