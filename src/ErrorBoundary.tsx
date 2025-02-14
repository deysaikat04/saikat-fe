import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: string | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  isApiCalled = false;

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // You can also log the error to an error reporting service
    window.addEventListener("popstate", this.resetError);
    this.setState({ error: error.stack });
    if (!this.isApiCalled) {
      this.isApiCalled = true;
    }
  }

  componentDidUpdate() {
    if (!this.state.hasError) {
      window.removeEventListener("popstate", this.resetError);
    }
  }

  resetError = () => {
    this.isApiCalled = false;
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center w-[80%] m-auto h-screen ">
          <h1 className="p-4 rounded bg-slate-800 text-white">ERROR!</h1>
          <div className="p-4 bg-slate-100 text-red-500 max-h-[400px] overflow-y-scroll">
            {JSON.stringify(this.state.error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
