import React, { Component } from 'react';
import { fromJS } from 'immutable';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createComponent from './createComponent'

function createStyled(styles, options) {

  function Styled(props) {
    const { children, ...other } = props;
    return children(other);
  }

  return withStyles(styles, options)(Styled);
}

class Jcanvas extends Component {

  render() {

    const { ui, defaultPropsMap, css = {}, themes = {} } = this.props;

    const Styled = createStyled(css);

    const theme = createMuiTheme(themes);

    return (
      <Styled>
        {({ classes }) =>
          <MuiThemeProvider theme={theme}>
            {fromJS(ui).map((props, componentIndex) => {
              return createComponent(props, defaultPropsMap, classes, componentIndex);
            })}
          </MuiThemeProvider>}
      </Styled>
    );
  }
}

export default Jcanvas;
