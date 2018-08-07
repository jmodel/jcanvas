"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _MuiThemeProvider = _interopRequireDefault(require("@material-ui/core/styles/MuiThemeProvider"));

var _ChevronRightIcon = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));
var _MenuIcon = _interopRequireDefault(require("@material-ui/icons/Menu"));
var _NavigationIcon = _interopRequireDefault(require("@material-ui/icons/Navigation"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _EnhancedTable = _interopRequireDefault(require("../Mui/EnhancedTable"));

import { fromJS, List, Map as ImmutableMap } from 'immutable';
import classNames from 'classnames';

const compMap = ImmutableMap(
  {
    "ChevronRightIcon": _ChevronRightIcon.default,
    "MenuIcon": _MenuIcon.default,
    "NavigationIcon": _NavigationIcon.default,

    "AppBar": _AppBar.default,
    "Button": _Button.default,
    "Dialog": _Dialog.default,
    "DialogActions": _DialogActions.default,
    "DialogTitle": _DialogTitle.default,
    "Drawer": _Drawer.default,
    "IconButton": _IconButton.default,
    "Toolbar": _Toolbar.default,
    "Typography": _Typography.default,

    "EnhancedTable": _EnhancedTable.default

  });


function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]"
}

function setClassName(props, classes) {
  let retProps = {};
  let className = props["className"];
  if (typeof className !== 'undefined' && typeof classes !== 'undefined') {
    let validClasses = List()
    var key, owns = Object.prototype.hasOwnProperty;
    for (key in className) {
      if (owns.call(className, key)) {
        if (className[key] && typeof classes[key] !== 'undefined') {
          validClasses = validClasses.push(classes[key]);
        }
      }
    }
    if (validClasses.size > 0) {
      Object.assign(retProps, props, { className: classNames(validClasses.toArray()) });
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
    children = fromJS(children).map((childProps, childComponentIndex) => {
      if (isString(childProps)) {
        return childProps;
      } else {
        return createComponent(childProps, defaultPropsMap, classes, childComponentIndex);
      }
    });
  }

  let comp = compMap.get(type);
  return _react.default.createElement(typeof comp === 'undefined' ? type : comp, {
    ...finalProps
  }, children);
}
