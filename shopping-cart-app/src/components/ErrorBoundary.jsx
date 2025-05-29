import { Component } from 'react';
import ErrorMessage from './ErrorMessage';

export default class ErrorBoundary extends Component {
  state = { error: null };
  
  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.error.message} />;
    }
    return this.props.children;
  }
}