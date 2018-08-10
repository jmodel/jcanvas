"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _MuiThemeProvider = _interopRequireDefault(require("@material-ui/core/styles/MuiThemeProvider"));

var _ChevronRightIcon = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));
var _ChevronLeftIcon = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));
var _InboxIcon = _interopRequireDefault(require("@material-ui/icons/Inbox"));
var _MenuIcon = _interopRequireDefault(require("@material-ui/icons/Menu"));
var _NavigationIcon = _interopRequireDefault(require("@material-ui/icons/Navigation"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));
var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _List = _interopRequireDefault(require("@material-ui/core/List"));
var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));
var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _EnhancedTable = _interopRequireDefault(require("../Mui/EnhancedTable"));
var _MiniDrawer = _interopRequireDefault(require("../Mui/MiniDrawer"));

import { fromJS, List, Map as ImmutableMap } from 'immutable';
import classNames from 'classnames';

const compMap = ImmutableMap(
  {
    "ChevronRightIcon": _ChevronRightIcon.default,
    "ChevronLeftIcon": _ChevronLeftIcon.default,
    "InboxIcon": _InboxIcon.default,
    "MenuIcon": _MenuIcon.default,
    "NavigationIcon": _NavigationIcon.default,

    "AppBar": _AppBar.default,
    "Button": _Button.default,
    "Dialog": _Dialog.default,
    "DialogActions": _DialogActions.default,
    "DialogTitle": _DialogTitle.default,
    "Divider": _Divider.default,
    "Drawer": _Drawer.default,
    "IconButton": _IconButton.default,
    "List": _List.default,
    "ListItem": _ListItem.default,
    "ListItemIcon": _ListItemIcon.default,
    "ListItemText": _ListItemText.default,
    "Toolbar": _Toolbar.default,
    "Typography": _Typography.default,

    "EnhancedTable": _EnhancedTable.default,
    "MiniDrawer": _MiniDrawer.default

  });


function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]"
}

function setClassName(props, globalClasses, entered) {

  let key, owns = Object.prototype.hasOwnProperty;
  for (key in props) {
    if (owns.call(props, key)) {
      if (key !== 'undefined') {
        if (key === 'classes') {
          let retProps = {};
          let x = ImmutableMap();
          x = x.set(key, setClassName(props[key], globalClasses, true));
          let className = x.get('classes').paper.className;
          Object.assign(retProps, props, { classes: { paper: className } });
          return retProps;
        } else if (key !== 'className' && entered) {
          let retProps = {};
          let x = ImmutableMap();
          x = x.set(key, setClassName(props[key], globalClasses, true));
          console.log(x.toJS());
          Object.assign(retProps, props, x.toJS());
          return retProps;
        } else if (key === 'className') {
          let className = props["className"];
          if (typeof className !== 'undefined' && typeof globalClasses !== 'undefined') {
            let validClasses = List()
            let key, owns = Object.prototype.hasOwnProperty;
            for (key in className) {
              if (owns.call(className, key)) {
                if (className[key] && typeof globalClasses[key] !== 'undefined') {
                  validClasses = validClasses.push(globalClasses[key]);
                }
              }
            }
            if (validClasses.size > 0) {
              let retProps = {};
              Object.assign(retProps, props, { className: classNames(validClasses.toArray()) });
              return retProps;
            }
          }
        }
      }
    }
  }

  return props;
}

export default function createComponent(props, defaultPropsMap, globalClasses, componentIndex) {
  let hidden = props.get("hidden");
  if (typeof hidden !== 'undefined' && hidden) {
    return;
  }

  let type = props.get("type");
  let children = props.get("children");
  let overrideProps = props.toJS();
  overrideProps = setClassName(overrideProps, globalClasses);
  let defaultProps;
  let finalProps = {};
  if (typeof defaultPropsMap !== 'undefined') {
    defaultProps = defaultPropsMap.get(type);
  }
  if (typeof defaultProps === 'undefined') {
    Object.assign(finalProps, overrideProps);
  } else {
    defaultProps = setClassName(defaultProps, globalClasses);
    Object.assign(finalProps, defaultProps, overrideProps);
  }
  if (typeof children !== 'undefined' && !isString(children)) {
    children = fromJS(children).map((childProps, childComponentIndex) => {
      if (isString(childProps)) {
        return childProps;
      } else {
        return createComponent(childProps, defaultPropsMap, globalClasses, childComponentIndex);
      }
    });
    if (children.size === 1) {
      children = children.get(0);
    }
  }

  let comp = compMap.get(type);
  return _react.default.createElement(typeof comp === 'undefined' ? type : comp, {
    ...finalProps
  }, children);
}
