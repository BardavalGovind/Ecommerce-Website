"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _braintreeWebDropIn = _interopRequireDefault(require("braintree-web-drop-in"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DropIn = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DropIn, _React$Component);

  var _super = _createSuper(DropIn);

  function DropIn() {
    var _this;

    (0, _classCallCheck2["default"])(this, DropIn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "wrapper", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "instance", void 0);
    return _this;
  }

  (0, _createClass2["default"])(DropIn, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _braintreeWebDropIn["default"].create(_objectSpread({
                  container: _reactDom["default"].findDOMNode(this.wrapper),
                  preselectVaultedPaymentMethod: this.props.preselectVaultedPaymentMethod
                }, this.props.options));

              case 3:
                this.instance = _context.sent;
                this.instance.on("noPaymentMethodRequestable", function () {
                  if (_this2.props.onNoPaymentMethodRequestable) {
                    var _this2$props;

                    (_this2$props = _this2.props).onNoPaymentMethodRequestable.apply(_this2$props, arguments);
                  }
                });
                this.instance.on("paymentMethodRequestable", function () {
                  if (_this2.props.onPaymentMethodRequestable) {
                    var _this2$props2;

                    (_this2$props2 = _this2.props).onPaymentMethodRequestable.apply(_this2$props2, arguments);
                  }
                });
                this.instance.on("paymentOptionSelected", function () {
                  if (_this2.props.onPaymentOptionSelected) {
                    var _this2$props3;

                    (_this2$props3 = _this2.props).onPaymentOptionSelected.apply(_this2$props3, arguments);
                  }
                });

                if (this.props.onInstance) {
                  this.props.onInstance(this.instance);
                }

                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (this.props.onError) {
                  this.props.onError(_context.t0);
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function () {
      var _componentWillUnmount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.instance) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.instance.teardown();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentWillUnmount() {
        return _componentWillUnmount.apply(this, arguments);
      }

      return componentWillUnmount;
    }()
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      // Static
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(_ref) {
          return _this3.wrapper = _ref;
        }
      });
    }
  }]);
  return DropIn;
}(_react["default"].Component);

exports["default"] = DropIn;
(0, _defineProperty2["default"])(DropIn, "displayName", "BraintreeWebDropIn");
(0, _defineProperty2["default"])(DropIn, "propTypes", {
  options: _propTypes["default"].object.isRequired,
  // @deprecated: Include inside options
  preselectVaultedPaymentMethod: _propTypes["default"].bool,
  onInstance: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  onNoPaymentMethodRequestable: _propTypes["default"].func,
  onPaymentMethodRequestable: _propTypes["default"].func,
  onPaymentOptionSelected: _propTypes["default"].func
});
(0, _defineProperty2["default"])(DropIn, "defaultProps", {
  preselectVaultedPaymentMethod: true
});
//# sourceMappingURL=index.js.map