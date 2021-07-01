import React, {Component} from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        update() {
            this.setState({
                loading: true,
                error: false
            });
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    });
                });
        };

        componentDidMount() {
            this.update();
        };

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            };
        };

        componentDidCatch(error, errorInfo) {
            this.setState({ error: true })
        };

        render() {

            const { data, loading, error } = this.state;

            if (loading) return <Spinner />;
            if (error) return <ErrorIndicator />

            return <View { ...this.props } data={ data } />
        };
    };
};

export default withData;