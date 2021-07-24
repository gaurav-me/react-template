import Grid from "@material-ui/core/Grid";
import { Icon } from "semantic-ui-react";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Icon name="home" size="massive" color="orange" />
        </Grid>
      </Grid>
    );
  }
}

export default HomePageContainer;
