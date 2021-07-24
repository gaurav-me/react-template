import { Icon } from "semantic-ui-react";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	//   componentDidCatch(error, errorInfo) {
	//     // You can also log the error to an error reporting service
	//     logErrorToMyService(error, errorInfo);
	//   }

	render() {
		if (this.state.hasError) {
			return (
				<div
					css={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "center",
						height: 400,
					}}>
					<div>
						<Icon name="file excel" size="massive" />
						<h1>Oops. Something went wrong 😕</h1>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
