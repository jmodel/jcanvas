"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _MuiThemeProvider = _interopRequireDefault(require("@material-ui/core/styles/MuiThemeProvider"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _NavigationIcon = _interopRequireDefault(require("@material-ui/icons/Navigation"));
var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _EnhancedTable = _interopRequireDefault(require("../Mui/EnhancedTable"));

import { fromJS, List, Map as ImmutableMap } from 'immutable';

const compMap = ImmutableMap(
  {
    "Button": _Button.default,
    "NavigationIcon": _NavigationIcon.default,
    "Dialog": _Dialog.default,
    "DialogTitle": _DialogTitle.default,
    "DialogActions": _DialogActions.default,
    "EnhancedTable": _EnhancedTable.default
  });


function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]"
}

function setClassName(props, classes) {
  let retProps = {};
  let className = props["className"];
  if (typeof className !== 'undefined' && typeof classes !== 'undefined') {
    if (typeof classes[className] !== 'undefined') {
      Object.assign(retProps, props, { className: classes[className] });
      return retProps;
    }
  }
  return props;
}

export default function createComponent(props, defaultPropsMap, classes, componentIndex) {
  let type = props.get("type");
  let children = props.get("children");
  let overrideProps = props.toJS();
  overrideProps = setClassName(overrideProps, classes);
  let defaultProps;
  let finalProps = {};
  if (typeof defaultPropsMap !== 'undefined') {
    defaultProps = defaultPropsMap.get(type);
  }

  if (typeof defaultProps === 'undefined') {
    Object.assign(finalProps, overrideProps);
  } else {
    defaultProps = setClassName(defaultProps, classes);
    Object.assign(finalProps, defaultProps, overrideProps);
  }

  let childlist;
  if (typeof children !== 'undefined' && !isString(children)) {
    childlist = fromJS(children).map((childProps, childComponentIndex) => {
      if (isString(childProps)) {
        return childProps;
      } else {
        return createComponent(childProps, defaultPropsMap, classes, childComponentIndex);
      }
    });
  }

  let comp = compMap.get(type);
  if (isString(children)) {
    return _react.default.createElement("div", null, _react.default.createElement(comp, {
      ...finalProps
    }, children));
  } else {
    return _react.default.createElement("div", null, _react.default.createElement(comp, {
      ...finalProps
    }, childlist));
  }
}
