'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">appwrite-backend documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"' : 'id="xs-controllers-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AppController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"' : 'id="xs-injectables-links-module-AppModule-d977469fc2a3262d7e3f911857addaff0a4f2879ce2541ad957b99cc03eef7522661740a8ca6de2e54beecc7bf5e59874588368ad27872ab3d9537d39dcbb887"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppwriteModule.html\" data-type=\"entity-link\" >AppwriteModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' : 'data-bs-target="#xs-injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' : 'id="xs-injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppwriteService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppwriteService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'id="xs-controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AuthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'id="xs-injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AppwriteSessionGuard.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppwriteSessionGuard</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ReservationModule.html\" data-type=\"entity-link\" >ReservationModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'data-bs-target="#xs-controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'id="xs-controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/ReservationController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ReservationController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'data-bs-target="#xs-injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'id="xs-injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ReservationRepository.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ReservationRepository</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ReservationService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ReservationService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-SharedModule-e6f1a043ba7917b7c3fa2e16dde80e10a35e48dc9a549fe24bc2f624f78527d211d306d7b34632ae7ee415ed22061821d546f8f87a396148621a17129baf6c49"' : 'data-bs-target="#xs-injectables-links-module-SharedModule-e6f1a043ba7917b7c3fa2e16dde80e10a35e48dc9a549fe24bc2f624f78527d211d306d7b34632ae7ee415ed22061821d546f8f87a396148621a17129baf6c49"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-SharedModule-e6f1a043ba7917b7c3fa2e16dde80e10a35e48dc9a549fe24bc2f624f78527d211d306d7b34632ae7ee415ed22061821d546f8f87a396148621a17129baf6c49"' : 'id="xs-injectables-links-module-SharedModule-e6f1a043ba7917b7c3fa2e16dde80e10a35e48dc9a549fe24bc2f624f78527d211d306d7b34632ae7ee415ed22061821d546f8f87a396148621a17129baf6c49"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ConfigService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ConfigService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ContextService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ContextService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/HeleprsService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HeleprsService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UserModule.html\" data-type=\"entity-link\" >UserModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'id="xs-controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UserController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'id="xs-injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/CreateReservationDto.html\" data-type=\"entity-link\" >CreateReservationDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RegisterUserDto.html\" data-type=\"entity-link\" >RegisterUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Reservation.html\" data-type=\"entity-link\" >Reservation</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateReservationDto.html\" data-type=\"entity-link\" >UpdateReservationDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/envConfig.html\" data-type=\"entity-link\" >envConfig</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));