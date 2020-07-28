/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createEle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createEle */ \"./createEle.js\");\n\n\nclass Carousel {\n\t\n\tsetAttribute(name, value){          // attribute\n\t\tthis[name] = value;\n\t\tconsole.log(name, value);\n\t}\n\trender(){\n\t\treturn Object(_createEle__WEBPACK_IMPORTED_MODULE_0__[\"createEle\"])(\"template\", {\"type\":\"startTag\",\"tagName\":\"template\"}, \"\\r\\n\\t\",Object(_createEle__WEBPACK_IMPORTED_MODULE_0__[\"createEle\"])(\"div\", {\"type\":\"startTag\",\"tagName\":\"div\"}, \"\\r\\n\\t\\t\",Object(_createEle__WEBPACK_IMPORTED_MODULE_0__[\"createEle\"])(\"img\", {\"type\":\"startTag\",\"tagName\":\"img\",\"isSelfClosing\":true}, ),\"\\r\\n\\t\"),\"\\r\\n\");\n\t}\n\tmountTo(parent){\n\t\t// parent.appendChild(this.root);\n\t\tthis.render().mountTo(parent);\n\t}\n}\n\t\n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./createEle.js":
/*!**********************!*\
  !*** ./createEle.js ***!
  \**********************/
/*! exports provided: createEle, Text, Wrapper, MyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEle\", function() { return createEle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MyComponent\", function() { return MyComponent; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createEle(Cls, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  // 处理组件小写问题\n  var o;\n\n  if (typeof Cls === \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  console.log(arguments);\n\n  for (var name in attributes) {\n    // attribute == property ?\n    //o[name] = attributes[name];\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (child) {\n          if (_typeof(child) === \"object\" && child instanceof Array) {\n            visit(child);\n            continue;\n          } // 处理文字\n\n\n          if (typeof child === \"string\") {\n            child = new Text(child);\n          }\n\n          o.appendChild(child);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      this.root.setAttribute(name, value);\n      console.log(name, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n          console.log(\"child:\", child);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      // this.root.appendChild(child);\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\nvar MyComponent = /*#__PURE__*/function () {\n  function MyComponent(config) {\n    _classCallCheck(this, MyComponent);\n\n    this.children = []; // this.root = document.createElement(\"div\");\n  }\n\n  _createClass(MyComponent, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      this.slot.setAttribute(name, value);\n      console.log(name, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      // parent.appendChild(this.root);\n      this.slot = createEle(\"div\", null);\n\n      var _iterator3 = _createForOfIteratorHelper(this.children),\n          _step3;\n\n      try {\n        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n          var child = _step3.value;\n          this.slot.appendChild(child);\n        }\n      } catch (err) {\n        _iterator3.e(err);\n      } finally {\n        _iterator3.f();\n      }\n\n      this.render().mountTo(parent);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      this.children.push(child);\n      console.log(\"child:\", this.children);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return createEle(\"article\", null, createEle(\"header\", null, \"this is a header\"), this.slot, createEle(\"footer\", null, \"this is a footer\"));\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      // property\n      console.log(\"Parent::class\", v);\n    }\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      // property\n      console.log(\"Parent::id\", v);\n    }\n  }]);\n\n  return MyComponent;\n}();\n\n//# sourceURL=webpack:///./createEle.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createEle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createEle */ \"./createEle.js\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n\n\n/**\r\nclass Carousel {\r\n\tconstructor(config){\r\n\t\tthis.children = [];\r\n\t\tthis.attributes = new Map();\r\n\t\tthis.properties = new Map();\r\n\t\t// this.root = document.createElement(\"div\");\r\n\t}\r\n\t\r\n\tsetAttribute(name, value){          // attribute\r\n\t\tthis[name] = value;\r\n\t\tconsole.log(name, value);\r\n\t}\r\n\t\r\n\tmountTo(parent){\r\n\t\t// parent.appendChild(this.root);\r\n\t\tthis.render().mountTo(parent);\r\n\t}\r\n\tappendChild(child){                 // children\r\n\t\tthis.children.push(child);\r\n\t\tconsole.log(\"child:\",this.children)\r\n\t}\r\n\t\r\n\trender(){\r\n\t\tlet children = this.data.map( url => {\r\n\t\t\t\tlet element = <img src={url}/>;\r\n\t\t\t\telement.addEventListener(\"dragstart\", event => event.preventDefault());\r\n\t\t\t\treturn element;\r\n\t\t});\r\n\t\tlet root = <div class=\"carousel\">\r\n\t\t\t{children }\r\n\t\t</div>\r\n\t\t\r\n\t\tlet position = 0;\r\n\t\t\r\n\t\tlet nextPic = () => {\r\n\t\t\t\r\n\t\t\tlet nextPosition = (position + 1) % this.data.length;\r\n\t\t\tlet current = children[position];\r\n\t\t\tlet next = children[nextPosition];\r\n\t\t\t\r\n\t\t\t// 动画效果\r\n\t\t\tcurrent.style.transition = \"ease 0s\";\r\n\t\t\tnext.style.transition = \"ease 0s\";\r\n\t\t\t\r\n\t\t\tcurrent.style.transform = `translateX(${ -100 * position}%)`;\r\n\t\t\tnext.style.transform = `translateX(${100 -100 * nextPosition}%)`;\r\n\t\t\t\r\n\t\t\t// 此处亦可使用俩层requestAnimationFrame来实现\r\n\t\t\tsetTimeout(function(){\r\n\t\t\t\tcurrent.style.transition = \"\"; // \"\" means use css rule\r\n\t\t\t\tnext.style.transition = \"\";\r\n\t\t\t\r\n\t\t\t\tcurrent.style.transform = `translateX(${-100 -100 * position}%)`;\r\n\t\t\t\tnext.style.transform = `translateX(${-100 * nextPosition}%)`;\r\n\t\t\t\tposition = nextPosition;\r\n\t\t\t},16); // 16ms means 1000 / 60 , 现代屏幕刷新率1s60帧\r\n\t\t\t\r\n\t\t\t\r\n\t\t\tsetTimeout(nextPic, 3000);\r\n\t\t}\r\n\t\tsetTimeout(nextPic, 3000);\r\n\t\t\r\n\t\t\r\n\t\treturn root;\r\n\t}\r\n}\r\n*/\n// let component = <MyComponent id=\"a\" class=\"b\" style=\"width:100px;height:100px;background-color:lightgreen;\">\n// <MyComponent></MyComponent>\n// <MyComponent></MyComponent>\n// <p></p>\n// <MyComponent></MyComponent>\n// <div></div>\n// </MyComponent>\n// let component = <MyComponent id=\"a\" class=\"b\" style=\"width:100px;height:100px;background-color:lightgreen;\">\n// <div>test</div>\n// <div>{new Wrapper(\"span\")}</div>\n// </MyComponent>\n// component.id = \"c\";\n// component.mountTo(document.body);\n// console.log(component);\n// component.setAttribute(\"id\", \"a\");\n\nvar component = Object(_createEle__WEBPACK_IMPORTED_MODULE_0__[\"createEle\"])(_carousel_view__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });