exports.id = 856;
exports.ids = [856];
exports.modules = {

/***/ 1135:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @popperjs/core v2.11.6 - MIT License
 */



__webpack_unused_export__ = ({ value: true });

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = (/* unused pure expression or super */ null && (['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options']));
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect$2(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect$2,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;

    if (false) {}
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (false) {}

  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {}

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

__webpack_unused_export__ = applyStyles$1;
__webpack_unused_export__ = arrow$1;
__webpack_unused_export__ = computeStyles$1;
exports.fi = createPopper;
__webpack_unused_export__ = createPopper$1;
__webpack_unused_export__ = defaultModifiers;
__webpack_unused_export__ = detectOverflow;
__webpack_unused_export__ = eventListeners;
__webpack_unused_export__ = flip$1;
__webpack_unused_export__ = hide$1;
__webpack_unused_export__ = offset$1;
__webpack_unused_export__ = popperGenerator;
__webpack_unused_export__ = popperOffsets$1;
__webpack_unused_export__ = preventOverflow$1;
//# sourceMappingURL=popper.js.map


/***/ }),

/***/ 4899:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({ value: true });

var React = __webpack_require__(6689);
var devUtils = __webpack_require__(6635);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["as", "children", "contentId"],
    _excluded2 = ["as", "id"];
// The user may want to provide their own ID (maybe there are multiple nav
// menus on a page a use might want to skip at various points in tabbing?).
var defaultId = "reach-skip-nav"; ////////////////////////////////////////////////////////////////////////////////

/**
 * SkipNavLink
 *
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs https://reach.tech/skip-nav#skipnavlink
 */

var SkipNavLink = /*#__PURE__*/React.forwardRef(function SkipNavLink(_ref, forwardedRef) {
  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "a" : _ref$as,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? "Skip to content" : _ref$children,
      contentId = _ref.contentId,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var id = contentId || defaultId;
  devUtils.useCheckStyles("skip-nav");
  return /*#__PURE__*/React.createElement(Comp, _extends({}, props, {
    ref: forwardedRef,
    href: "#" + id // TODO: Remove in 1.0 (kept for back compat)
    ,
    "data-reach-skip-link": "",
    "data-reach-skip-nav-link": ""
  }), children);
});

/**
 * SkipNavContent
 *
 * Renders a div as the target for the link.
 *
 * @see Docs https://reach.tech/skip-nav#skipnavcontent
 */


var SkipNavContent = /*#__PURE__*/React.forwardRef(function SkipNavContent(_ref2, forwardedRef) {
  var _ref2$as = _ref2.as,
      Comp = _ref2$as === void 0 ? "div" : _ref2$as,
      idProp = _ref2.id,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  var id = idProp || defaultId;
  return /*#__PURE__*/React.createElement(Comp, _extends({}, props, {
    ref: forwardedRef,
    id: id,
    "data-reach-skip-nav-content": ""
  }));
});

exports.fN = SkipNavContent;
__webpack_unused_export__ = SkipNavLink;


/***/ }),

/***/ 6635:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(5177);
} else {}


/***/ }),

/***/ 5177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

__webpack_require__(6689);

/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Just a lil state logger
 *
 * @param state
 * @param DEBUG
 */

function useStateLogger(state, DEBUG) {
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */

function checkStyles(packageName) {
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example useCheckStyles("dialog") will check for styles for @reach/dialog
 */

function useCheckStyles(packageName) {
}
/**
 * Logs a warning in dev mode when a component switches from controlled to
 * uncontrolled, or vice versa
 *
 * A single prop should typically be used to determine whether or not a
 * component is controlled or not.
 *
 * @param controlledValue
 * @param controlledPropName
 * @param componentName
 */

function useControlledSwitchWarning(controlledValue, controlledPropName, componentName) {
}

exports.checkStyles = checkStyles;
exports.useCheckStyles = useCheckStyles;
exports.useControlledSwitchWarning = useControlledSwitchWarning;
exports.useStateLogger = useStateLogger;


/***/ }),

/***/ 9219:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _asyncToGenerator;
    }
}));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}


/***/ }),

/***/ 5321:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _extends;
    }
}));
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}


/***/ }),

/***/ 1322:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireDefault;
    }
}));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 6687:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireWildcard;
    }
}));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}


/***/ }),

/***/ 6239:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _objectWithoutPropertiesLoose;
    }
}));
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}


/***/ }),

/***/ 9752:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
/**!
 * FlexSearch.js v0.7.31 (Bundle)
 * Copyright 2018-2022 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';try{if(module)self=module}catch(e){}self._factory=_f;var t;function u(a){return"undefined"!==typeof a?a:!0}function aa(a){const b=Array(a);for(let c=0;c<a;c++)b[c]=v();return b}function v(){return Object.create(null)}function ba(a,b){return b.length-a.length}function x(a){return"string"===typeof a}function C(a){return"object"===typeof a}function D(a){return"function"===typeof a};function ca(a,b){var c=da;if(a&&(b&&(a=E(a,b)),this.H&&(a=E(a,this.H)),this.J&&1<a.length&&(a=E(a,this.J)),c||""===c)){a=a.split(c);if(this.filter){b=this.filter;c=a.length;const d=[];for(let e=0,f=0;e<c;e++){const g=a[e];g&&!b[g]&&(d[f++]=g)}a=d}return a}return a}const da=/[\p{Z}\p{S}\p{P}\p{C}]+/u,ea=/[\u0300-\u036f]/g;
function fa(a,b){const c=Object.keys(a),d=c.length,e=[];let f="",g=0;for(let h=0,k,m;h<d;h++)k=c[h],(m=a[k])?(e[g++]=F(b?"(?!\\b)"+k+"(\\b|_)":k),e[g++]=m):f+=(f?"|":"")+k;f&&(e[g++]=F(b?"(?!\\b)("+f+")(\\b|_)":"("+f+")"),e[g]="");return e}function E(a,b){for(let c=0,d=b.length;c<d&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a}function F(a){return new RegExp(a,"g")}function ha(a){let b="",c="";for(let d=0,e=a.length,f;d<e;d++)(f=a[d])!==c&&(b+=c=f);return b};var ja={encode:ia,F:!1,G:""};function ia(a){return ca.call(this,(""+a).toLowerCase(),!1)};const ka={},G={};function la(a){I(a,"add");I(a,"append");I(a,"search");I(a,"update");I(a,"remove")}function I(a,b){a[b+"Async"]=function(){const c=this,d=arguments;var e=d[d.length-1];let f;D(e)&&(f=e,delete d[d.length-1]);e=new Promise(function(g){setTimeout(function(){c.async=!0;const h=c[b].apply(c,d);c.async=!1;g(h)})});return f?(e.then(f),this):e}};function ma(a,b,c,d){const e=a.length;let f=[],g,h,k=0;d&&(d=[]);for(let m=e-1;0<=m;m--){const n=a[m],w=n.length,q=v();let r=!g;for(let l=0;l<w;l++){const p=n[l],z=p.length;if(z)for(let B=0,A,y;B<z;B++)if(y=p[B],g){if(g[y]){if(!m)if(c)c--;else if(f[k++]=y,k===b)return f;if(m||d)q[y]=1;r=!0}if(d&&(A=(h[y]||0)+1,h[y]=A,A<e)){const H=d[A-2]||(d[A-2]=[]);H[H.length]=y}}else q[y]=1}if(d)g||(h=q);else if(!r)return[];g=q}if(d)for(let m=d.length-1,n,w;0<=m;m--){n=d[m];w=n.length;for(let q=0,r;q<w;q++)if(r=
n[q],!g[r]){if(c)c--;else if(f[k++]=r,k===b)return f;g[r]=1}}return f}function na(a,b){const c=v(),d=v(),e=[];for(let f=0;f<a.length;f++)c[a[f]]=1;for(let f=0,g;f<b.length;f++){g=b[f];for(let h=0,k;h<g.length;h++)k=g[h],c[k]&&!d[k]&&(d[k]=1,e[e.length]=k)}return e};function J(a){this.l=!0!==a&&a;this.cache=v();this.h=[]}function oa(a,b,c){C(a)&&(a=a.query);let d=this.cache.get(a);d||(d=this.search(a,b,c),this.cache.set(a,d));return d}J.prototype.set=function(a,b){if(!this.cache[a]){var c=this.h.length;c===this.l?delete this.cache[this.h[c-1]]:c++;for(--c;0<c;c--)this.h[c]=this.h[c-1];this.h[0]=a}this.cache[a]=b};J.prototype.get=function(a){const b=this.cache[a];if(this.l&&b&&(a=this.h.indexOf(a))){const c=this.h[a-1];this.h[a-1]=this.h[a];this.h[a]=c}return b};const qa={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},"default":{}};function ra(a,b,c,d,e,f,g){setTimeout(function(){const h=a(c?c+"."+d:d,JSON.stringify(g));h&&h.then?h.then(function(){b.export(a,b,c,e,f+1)}):b.export(a,b,c,e,f+1)})};function K(a,b){if(!(this instanceof K))return new K(a);var c;if(a){x(a)?a=qa[a]:(c=a.preset)&&(a=Object.assign({},c[c],a));c=a.charset;var d=a.lang;x(c)&&(-1===c.indexOf(":")&&(c+=":default"),c=G[c]);x(d)&&(d=ka[d])}else a={};let e,f,g=a.context||{};this.encode=a.encode||c&&c.encode||ia;this.register=b||v();this.D=e=a.resolution||9;this.G=b=c&&c.G||a.tokenize||"strict";this.depth="strict"===b&&g.depth;this.l=u(g.bidirectional);this.s=f=u(a.optimize);this.m=u(a.fastupdate);this.B=a.minlength||1;this.C=
a.boost;this.map=f?aa(e):v();this.A=e=g.resolution||1;this.h=f?aa(e):v();this.F=c&&c.F||a.rtl;this.H=(b=a.matcher||d&&d.H)&&fa(b,!1);this.J=(b=a.stemmer||d&&d.J)&&fa(b,!0);if(c=b=a.filter||d&&d.filter){c=b;d=v();for(let h=0,k=c.length;h<k;h++)d[c[h]]=1;c=d}this.filter=c;this.cache=(b=a.cache)&&new J(b)}t=K.prototype;t.append=function(a,b){return this.add(a,b,!0)};
t.add=function(a,b,c,d){if(b&&(a||0===a)){if(!d&&!c&&this.register[a])return this.update(a,b);b=this.encode(b);if(d=b.length){const m=v(),n=v(),w=this.depth,q=this.D;for(let r=0;r<d;r++){let l=b[this.F?d-1-r:r];var e=l.length;if(l&&e>=this.B&&(w||!n[l])){var f=L(q,d,r),g="";switch(this.G){case "full":if(2<e){for(f=0;f<e;f++)for(var h=e;h>f;h--)if(h-f>=this.B){var k=L(q,d,r,e,f);g=l.substring(f,h);M(this,n,g,k,a,c)}break}case "reverse":if(1<e){for(h=e-1;0<h;h--)g=l[h]+g,g.length>=this.B&&M(this,n,
g,L(q,d,r,e,h),a,c);g=""}case "forward":if(1<e){for(h=0;h<e;h++)g+=l[h],g.length>=this.B&&M(this,n,g,f,a,c);break}default:if(this.C&&(f=Math.min(f/this.C(b,l,r)|0,q-1)),M(this,n,l,f,a,c),w&&1<d&&r<d-1)for(e=v(),g=this.A,f=l,h=Math.min(w+1,d-r),e[f]=1,k=1;k<h;k++)if((l=b[this.F?d-1-r-k:r+k])&&l.length>=this.B&&!e[l]){e[l]=1;const p=this.l&&l>f;M(this,m,p?f:l,L(g+(d/2>g?0:1),d,r,h-1,k-1),a,c,p?l:f)}}}}this.m||(this.register[a]=1)}}return this};
function L(a,b,c,d,e){return c&&1<a?b+(d||0)<=a?c+(e||0):(a-1)/(b+(d||0))*(c+(e||0))+1|0:0}function M(a,b,c,d,e,f,g){let h=g?a.h:a.map;if(!b[c]||g&&!b[c][g])a.s&&(h=h[d]),g?(b=b[c]||(b[c]=v()),b[g]=1,h=h[g]||(h[g]=v())):b[c]=1,h=h[c]||(h[c]=[]),a.s||(h=h[d]||(h[d]=[])),f&&h.includes(e)||(h[h.length]=e,a.m&&(a=a.register[e]||(a.register[e]=[]),a[a.length]=h))}
t.search=function(a,b,c){c||(!b&&C(a)?(c=a,a=c.query):C(b)&&(c=b));let d=[],e;let f,g=0;if(c){a=c.query||a;b=c.limit;g=c.offset||0;var h=c.context;f=c.suggest}if(a&&(a=this.encode(""+a),e=a.length,1<e)){c=v();var k=[];for(let n=0,w=0,q;n<e;n++)if((q=a[n])&&q.length>=this.B&&!c[q])if(this.s||f||this.map[q])k[w++]=q,c[q]=1;else return d;a=k;e=a.length}if(!e)return d;b||(b=100);h=this.depth&&1<e&&!1!==h;c=0;let m;h?(m=a[0],c=1):1<e&&a.sort(ba);for(let n,w;c<e;c++){w=a[c];h?(n=sa(this,d,f,b,g,2===e,w,
m),f&&!1===n&&d.length||(m=w)):n=sa(this,d,f,b,g,1===e,w);if(n)return n;if(f&&c===e-1){k=d.length;if(!k){if(h){h=0;c=-1;continue}return d}if(1===k)return ta(d[0],b,g)}}return ma(d,b,g,f)};
function sa(a,b,c,d,e,f,g,h){let k=[],m=h?a.h:a.map;a.s||(m=ua(m,g,h,a.l));if(m){let n=0;const w=Math.min(m.length,h?a.A:a.D);for(let q=0,r=0,l,p;q<w;q++)if(l=m[q])if(a.s&&(l=ua(l,g,h,a.l)),e&&l&&f&&(p=l.length,p<=e?(e-=p,l=null):(l=l.slice(e),e=0)),l&&(k[n++]=l,f&&(r+=l.length,r>=d)))break;if(n){if(f)return ta(k,d,0);b[b.length]=k;return}}return!c&&k}function ta(a,b,c){a=1===a.length?a[0]:[].concat.apply([],a);return c||a.length>b?a.slice(c,c+b):a}
function ua(a,b,c,d){c?(d=d&&b>c,a=(a=a[d?b:c])&&a[d?c:b]):a=a[b];return a}t.contain=function(a){return!!this.register[a]};t.update=function(a,b){return this.remove(a).add(a,b)};
t.remove=function(a,b){const c=this.register[a];if(c){if(this.m)for(let d=0,e;d<c.length;d++)e=c[d],e.splice(e.indexOf(a),1);else N(this.map,a,this.D,this.s),this.depth&&N(this.h,a,this.A,this.s);b||delete this.register[a];if(this.cache){b=this.cache;for(let d=0,e,f;d<b.h.length;d++)f=b.h[d],e=b.cache[f],e.includes(a)&&(b.h.splice(d--,1),delete b.cache[f])}}return this};
function N(a,b,c,d,e){let f=0;if(a.constructor===Array)if(e)b=a.indexOf(b),-1!==b?1<a.length&&(a.splice(b,1),f++):f++;else{e=Math.min(a.length,c);for(let g=0,h;g<e;g++)if(h=a[g])f=N(h,b,c,d,e),d||f||delete a[g]}else for(let g in a)(f=N(a[g],b,c,d,e))||delete a[g];return f}t.searchCache=oa;
t.export=function(a,b,c,d,e){let f,g;switch(e||(e=0)){case 0:f="reg";if(this.m){g=v();for(let h in this.register)g[h]=1}else g=this.register;break;case 1:f="cfg";g={doc:0,opt:this.s?1:0};break;case 2:f="map";g=this.map;break;case 3:f="ctx";g=this.h;break;default:return}ra(a,b||this,c,f,d,e,g);return!0};t.import=function(a,b){if(b)switch(x(b)&&(b=JSON.parse(b)),a){case "cfg":this.s=!!b.opt;break;case "reg":this.m=!1;this.register=b;break;case "map":this.map=b;break;case "ctx":this.h=b}};la(K.prototype);function va(a){a=a.data;var b=self._index;const c=a.args;var d=a.task;switch(d){case "init":d=a.options||{};a=a.factory;b=d.encode;d.cache=!1;b&&0===b.indexOf("function")&&(d.encode=Function("return "+b)());a?(Function("return "+a)()(self),self._index=new self.FlexSearch.Index(d),delete self.FlexSearch):self._index=new K(d);break;default:a=a.id,b=b[d].apply(b,c),postMessage("search"===d?{id:a,msg:b}:{id:a})}};let wa=0;function O(a){if(!(this instanceof O))return new O(a);var b;a?D(b=a.encode)&&(a.encode=b.toString()):a={};(b=(self||window)._factory)&&(b=b.toString());const c="undefined"===typeof window&&self.exports,d=this;this.o=xa(b,c,a.worker);this.h=v();if(this.o){if(c)this.o.on("message",function(e){d.h[e.id](e.msg);delete d.h[e.id]});else this.o.onmessage=function(e){e=e.data;d.h[e.id](e.msg);delete d.h[e.id]};this.o.postMessage({task:"init",factory:b,options:a})}}P("add");P("append");P("search");
P("update");P("remove");function P(a){O.prototype[a]=O.prototype[a+"Async"]=function(){const b=this,c=[].slice.call(arguments);var d=c[c.length-1];let e;D(d)&&(e=d,c.splice(c.length-1,1));d=new Promise(function(f){setTimeout(function(){b.h[++wa]=f;b.o.postMessage({task:a,id:wa,args:c})})});return e?(d.then(e),this):d}}
function xa(a,b,c){let d;try{d=b?eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")'):a?new Worker(URL.createObjectURL(new Blob(["onmessage="+va.toString()],{type:"text/javascript"}))):new Worker(x(c)?c:"worker/worker.js",{type:"module"})}catch(e){}return d};function Q(a){if(!(this instanceof Q))return new Q(a);var b=a.document||a.doc||a,c;this.K=[];this.h=[];this.A=[];this.register=v();this.key=(c=b.key||b.id)&&S(c,this.A)||"id";this.m=u(a.fastupdate);this.C=(c=b.store)&&!0!==c&&[];this.store=c&&v();this.I=(c=b.tag)&&S(c,this.A);this.l=c&&v();this.cache=(c=a.cache)&&new J(c);a.cache=!1;this.o=a.worker;this.async=!1;c=v();let d=b.index||b.field||b;x(d)&&(d=[d]);for(let e=0,f,g;e<d.length;e++)f=d[e],x(f)||(g=f,f=f.field),g=C(g)?Object.assign({},a,g):a,
this.o&&(c[f]=new O(g),c[f].o||(this.o=!1)),this.o||(c[f]=new K(g,this.register)),this.K[e]=S(f,this.A),this.h[e]=f;if(this.C)for(a=b.store,x(a)&&(a=[a]),b=0;b<a.length;b++)this.C[b]=S(a[b],this.A);this.index=c}function S(a,b){const c=a.split(":");let d=0;for(let e=0;e<c.length;e++)a=c[e],0<=a.indexOf("[]")&&(a=a.substring(0,a.length-2))&&(b[d]=!0),a&&(c[d++]=a);d<c.length&&(c.length=d);return 1<d?c:c[0]}function T(a,b){if(x(b))a=a[b];else for(let c=0;a&&c<b.length;c++)a=a[b[c]];return a}
function U(a,b,c,d,e){a=a[e];if(d===c.length-1)b[e]=a;else if(a)if(a.constructor===Array)for(b=b[e]=Array(a.length),e=0;e<a.length;e++)U(a,b,c,d,e);else b=b[e]||(b[e]=v()),e=c[++d],U(a,b,c,d,e)}function V(a,b,c,d,e,f,g,h){if(a=a[g])if(d===b.length-1){if(a.constructor===Array){if(c[d]){for(b=0;b<a.length;b++)e.add(f,a[b],!0,!0);return}a=a.join(" ")}e.add(f,a,h,!0)}else if(a.constructor===Array)for(g=0;g<a.length;g++)V(a,b,c,d,e,f,g,h);else g=b[++d],V(a,b,c,d,e,f,g,h)}t=Q.prototype;
t.add=function(a,b,c){C(a)&&(b=a,a=T(b,this.key));if(b&&(a||0===a)){if(!c&&this.register[a])return this.update(a,b);for(let d=0,e,f;d<this.h.length;d++)f=this.h[d],e=this.K[d],x(e)&&(e=[e]),V(b,e,this.A,0,this.index[f],a,e[0],c);if(this.I){let d=T(b,this.I),e=v();x(d)&&(d=[d]);for(let f=0,g,h;f<d.length;f++)if(g=d[f],!e[g]&&(e[g]=1,h=this.l[g]||(this.l[g]=[]),!c||!h.includes(a)))if(h[h.length]=a,this.m){const k=this.register[a]||(this.register[a]=[]);k[k.length]=h}}if(this.store&&(!c||!this.store[a])){let d;
if(this.C){d=v();for(let e=0,f;e<this.C.length;e++)f=this.C[e],x(f)?d[f]=b[f]:U(b,d,f,0,f[0])}this.store[a]=d||b}}return this};t.append=function(a,b){return this.add(a,b,!0)};t.update=function(a,b){return this.remove(a).add(a,b)};
t.remove=function(a){C(a)&&(a=T(a,this.key));if(this.register[a]){for(var b=0;b<this.h.length&&(this.index[this.h[b]].remove(a,!this.o),!this.m);b++);if(this.I&&!this.m)for(let c in this.l){b=this.l[c];const d=b.indexOf(a);-1!==d&&(1<b.length?b.splice(d,1):delete this.l[c])}this.store&&delete this.store[a];delete this.register[a]}return this};
t.search=function(a,b,c,d){c||(!b&&C(a)?(c=a,a=""):C(b)&&(c=b,b=0));let e=[],f=[],g,h,k,m,n,w,q=0;if(c)if(c.constructor===Array)k=c,c=null;else{a=c.query||a;k=(g=c.pluck)||c.index||c.field;m=c.tag;h=this.store&&c.enrich;n="and"===c.bool;b=c.limit||b||100;w=c.offset||0;if(m&&(x(m)&&(m=[m]),!a)){for(let l=0,p;l<m.length;l++)if(p=ya.call(this,m[l],b,w,h))e[e.length]=p,q++;return q?e:[]}x(k)&&(k=[k])}k||(k=this.h);n=n&&(1<k.length||m&&1<m.length);const r=!d&&(this.o||this.async)&&[];for(let l=0,p,z,B;l<
k.length;l++){let A;z=k[l];x(z)||(A=z,z=A.field,a=A.query||a,b=A.limit||b);if(r)r[l]=this.index[z].searchAsync(a,b,A||c);else{d?p=d[l]:p=this.index[z].search(a,b,A||c);B=p&&p.length;if(m&&B){const y=[];let H=0;n&&(y[0]=[p]);for(let X=0,pa,R;X<m.length;X++)if(pa=m[X],B=(R=this.l[pa])&&R.length)H++,y[y.length]=n?[R]:R;H&&(p=n?ma(y,b||100,w||0):na(p,y),B=p.length)}if(B)f[q]=z,e[q++]=p;else if(n)return[]}}if(r){const l=this;return new Promise(function(p){Promise.all(r).then(function(z){p(l.search(a,b,
c,z))})})}if(!q)return[];if(g&&(!h||!this.store))return e[0];for(let l=0,p;l<f.length;l++){p=e[l];p.length&&h&&(p=za.call(this,p));if(g)return p;e[l]={field:f[l],result:p}}return e};function ya(a,b,c,d){let e=this.l[a],f=e&&e.length-c;if(f&&0<f){if(f>b||c)e=e.slice(c,c+b);d&&(e=za.call(this,e));return{tag:a,result:e}}}function za(a){const b=Array(a.length);for(let c=0,d;c<a.length;c++)d=a[c],b[c]={id:d,doc:this.store[d]};return b}t.contain=function(a){return!!this.register[a]};t.get=function(a){return this.store[a]};
t.set=function(a,b){this.store[a]=b;return this};t.searchCache=oa;t.export=function(a,b,c,d,e){e||(e=0);d||(d=0);if(d<this.h.length){const f=this.h[d],g=this.index[f];b=this;setTimeout(function(){g.export(a,b,e?f:"",d,e++)||(d++,e=1,b.export(a,b,f,d,e))})}else{let f,g;switch(e){case 1:f="tag";g=this.l;break;case 2:f="store";g=this.store;break;default:return}ra(a,this,c,f,d,e,g)}};
t.import=function(a,b){if(b)switch(x(b)&&(b=JSON.parse(b)),a){case "tag":this.l=b;break;case "reg":this.m=!1;this.register=b;for(let d=0,e;d<this.h.length;d++)e=this.index[this.h[d]],e.register=b,e.m=!1;break;case "store":this.store=b;break;default:a=a.split(".");const c=a[0];a=a[1];c&&a&&this.index[c].import(a,b)}};la(Q.prototype);var Ba={encode:Aa,F:!1,G:""};const Ca=[F("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),"a",F("[\u00e8\u00e9\u00ea\u00eb]"),"e",F("[\u00ec\u00ed\u00ee\u00ef]"),"i",F("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),"o",F("[\u00f9\u00fa\u00fb\u00fc\u0171]"),"u",F("[\u00fd\u0177\u00ff]"),"y",F("\u00f1"),"n",F("[\u00e7c]"),"k",F("\u00df"),"s",F(" & ")," and "];function Aa(a){var b=a=""+a;b.normalize&&(b=b.normalize("NFD").replace(ea,""));return ca.call(this,b.toLowerCase(),!a.normalize&&Ca)};var Ea={encode:Da,F:!1,G:"strict"};const Fa=/[^a-z0-9]+/,Ga={b:"p",v:"f",w:"f",z:"s",x:"s","\u00df":"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Da(a){a=Aa.call(this,a).join(" ");const b=[];if(a){const c=a.split(Fa),d=c.length;for(let e=0,f,g=0;e<d;e++)if((a=c[e])&&(!this.filter||!this.filter[a])){f=a[0];let h=Ga[f]||f,k=h;for(let m=1;m<a.length;m++){f=a[m];const n=Ga[f]||f;n&&n!==k&&(h+=n,k=n)}b[g++]=h}}return b};var Ia={encode:Ha,F:!1,G:""};const Ja=[F("ae"),"a",F("oe"),"o",F("sh"),"s",F("th"),"t",F("ph"),"f",F("pf"),"f",F("(?![aeo])h(?![aeo])"),"",F("(?!^[aeo])h(?!^[aeo])"),""];function Ha(a,b){a&&(a=Da.call(this,a).join(" "),2<a.length&&(a=E(a,Ja)),b||(1<a.length&&(a=ha(a)),a&&(a=a.split(" "))));return a||[]};var La={encode:Ka,F:!1,G:""};const Ma=F("(?!\\b)[aeo]");function Ka(a){a&&(a=Ha.call(this,a,!0),1<a.length&&(a=a.replace(Ma,"")),1<a.length&&(a=ha(a)),a&&(a=a.split(" ")));return a||[]};G["latin:default"]=ja;G["latin:simple"]=Ba;G["latin:balance"]=Ea;G["latin:advanced"]=Ia;G["latin:extra"]=La;const W=self;let Y;const Z={Index:K,Document:Q,Worker:O,registerCharset:function(a,b){G[a]=b},registerLanguage:function(a,b){ka[a]=b}};(Y=W.define)&&Y.amd?Y([],function(){return Z}):W.exports?W.exports=Z:W.FlexSearch=Z;}(this));


/***/ }),

/***/ 2297:
/***/ (function() {

(function (global, factory) {
   true ? factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * Applies the :focus-visible polyfill at the given scope.
   * A scope in this case is either the top-level Document or a Shadow Root.
   *
   * @param {(Document|ShadowRoot)} scope
   * @see https://github.com/WICG/focus-visible
   */
  function applyFocusVisiblePolyfill(scope) {
    var hadKeyboardEvent = true;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    var inputTypesAllowlist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      'datetime-local': true
    };

    /**
     * Helper function for legacy browsers and iframes which sometimes focus
     * elements like document, body, and non-interactive SVG.
     * @param {Element} el
     */
    function isValidFocusTarget(el) {
      if (
        el &&
        el !== document &&
        el.nodeName !== 'HTML' &&
        el.nodeName !== 'BODY' &&
        'classList' in el &&
        'contains' in el.classList
      ) {
        return true;
      }
      return false;
    }

    /**
     * Computes whether the given element should automatically trigger the
     * `focus-visible` class being added, i.e. whether it should always match
     * `:focus-visible` when focused.
     * @param {Element} el
     * @return {boolean}
     */
    function focusTriggersKeyboardModality(el) {
      var type = el.type;
      var tagName = el.tagName;

      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
      }

      if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
      }

      if (el.isContentEditable) {
        return true;
      }

      return false;
    }

    /**
     * Add the `focus-visible` class to the given element if it was not added by
     * the author.
     * @param {Element} el
     */
    function addFocusVisibleClass(el) {
      if (el.classList.contains('focus-visible')) {
        return;
      }
      el.classList.add('focus-visible');
      el.setAttribute('data-focus-visible-added', '');
    }

    /**
     * Remove the `focus-visible` class from the given element if it was not
     * originally added by the author.
     * @param {Element} el
     */
    function removeFocusVisibleClass(el) {
      if (!el.hasAttribute('data-focus-visible-added')) {
        return;
      }
      el.classList.remove('focus-visible');
      el.removeAttribute('data-focus-visible-added');
    }

    /**
     * If the most recent user interaction was via the keyboard;
     * and the key press did not include a meta, alt/option, or control key;
     * then the modality is keyboard. Otherwise, the modality is not keyboard.
     * Apply `focus-visible` to any current active element and keep track
     * of our keyboard modality state with `hadKeyboardEvent`.
     * @param {KeyboardEvent} e
     */
    function onKeyDown(e) {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (isValidFocusTarget(scope.activeElement)) {
        addFocusVisibleClass(scope.activeElement);
      }

      hadKeyboardEvent = true;
    }

    /**
     * If at any point a user clicks with a pointing device, ensure that we change
     * the modality away from keyboard.
     * This avoids the situation where a user presses a key on an already focused
     * element, and then clicks on a different element, focusing it with a
     * pointing device, while we still think we're in keyboard modality.
     * @param {Event} e
     */
    function onPointerDown(e) {
      hadKeyboardEvent = false;
    }

    /**
     * On `focus`, add the `focus-visible` class to the target if:
     * - the target received focus as a result of keyboard navigation, or
     * - the event target is an element that will likely require interaction
     *   via the keyboard (e.g. a text box)
     * @param {Event} e
     */
    function onFocus(e) {
      // Prevent IE from focusing the document or HTML element.
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
        addFocusVisibleClass(e.target);
      }
    }

    /**
     * On `blur`, remove the `focus-visible` class from the target.
     * @param {Event} e
     */
    function onBlur(e) {
      if (!isValidFocusTarget(e.target)) {
        return;
      }

      if (
        e.target.classList.contains('focus-visible') ||
        e.target.hasAttribute('data-focus-visible-added')
      ) {
        // To detect a tab/window switch, we look for a blur event followed
        // rapidly by a visibility change.
        // If we don't see a visibility change within 100ms, it's probably a
        // regular focus change.
        hadFocusVisibleRecently = true;
        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
          hadFocusVisibleRecently = false;
        }, 100);
        removeFocusVisibleClass(e.target);
      }
    }

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     * @param {Event} e
     */
    function onVisibilityChange(e) {
      if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
        if (hadFocusVisibleRecently) {
          hadKeyboardEvent = true;
        }
        addInitialPointerMoveListeners();
      }
    }

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    function addInitialPointerMoveListeners() {
      document.addEventListener('mousemove', onInitialPointerMove);
      document.addEventListener('mousedown', onInitialPointerMove);
      document.addEventListener('mouseup', onInitialPointerMove);
      document.addEventListener('pointermove', onInitialPointerMove);
      document.addEventListener('pointerdown', onInitialPointerMove);
      document.addEventListener('pointerup', onInitialPointerMove);
      document.addEventListener('touchmove', onInitialPointerMove);
      document.addEventListener('touchstart', onInitialPointerMove);
      document.addEventListener('touchend', onInitialPointerMove);
    }

    function removeInitialPointerMoveListeners() {
      document.removeEventListener('mousemove', onInitialPointerMove);
      document.removeEventListener('mousedown', onInitialPointerMove);
      document.removeEventListener('mouseup', onInitialPointerMove);
      document.removeEventListener('pointermove', onInitialPointerMove);
      document.removeEventListener('pointerdown', onInitialPointerMove);
      document.removeEventListener('pointerup', onInitialPointerMove);
      document.removeEventListener('touchmove', onInitialPointerMove);
      document.removeEventListener('touchstart', onInitialPointerMove);
      document.removeEventListener('touchend', onInitialPointerMove);
    }

    /**
     * When the polfyill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     * @param {Event} e
     */
    function onInitialPointerMove(e) {
      // Work around a Safari quirk that fires a mousemove on <html> whenever the
      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
        return;
      }

      hadKeyboardEvent = false;
      removeInitialPointerMoveListeners();
    }

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();

    // For focus and blur, we specifically care about state changes in the local
    // scope. This is because focus / blur events that originate from within a
    // shadow root are not re-dispatched from the host element if it was already
    // the active element in its own scope:
    scope.addEventListener('focus', onFocus, true);
    scope.addEventListener('blur', onBlur, true);

    // We detect that a node is a ShadowRoot by ensuring that it is a
    // DocumentFragment and also has a host property. This check covers native
    // implementation and polyfill implementation transparently. If we only cared
    // about the native implementation, we could just check if the scope was
    // an instance of a ShadowRoot.
    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
      // Since a ShadowRoot is a special kind of DocumentFragment, it does not
      // have a root element to add a class to. So, we add this attribute to the
      // host element instead:
      scope.host.setAttribute('data-js-focus-visible', '');
    } else if (scope.nodeType === Node.DOCUMENT_NODE) {
      document.documentElement.classList.add('js-focus-visible');
      document.documentElement.setAttribute('data-js-focus-visible', '');
    }
  }

  // It is important to wrap all references to global window and document in
  // these checks to support server-side rendering use cases
  // @see https://github.com/WICG/focus-visible/issues/199
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Make the polyfill helper globally available. This can be used as a signal
    // to interested libraries that wish to coordinate with the polyfill for e.g.,
    // applying the polyfill to a shadow root:
    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

    // Notify interested libraries of the polyfill's presence, in case the
    // polyfill was loaded lazily:
    var event;

    try {
      event = new CustomEvent('focus-visible-polyfill-ready');
    } catch (error) {
      // IE11 does not support using CustomEvent as a constructor directly:
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
    }

    window.dispatchEvent(event);
  }

  if (typeof document !== 'undefined') {
    // Apply the polyfill to the global document, so that no JavaScript
    // coordination is required to use the polyfill in the top-level document:
    applyFocusVisiblePolyfill(document);
  }

})));


/***/ }),

/***/ 6407:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Dependencies

var parseUrl = __webpack_require__(8593),
    isSsh = __webpack_require__(2895);

/**
 * gitUp
 * Parses the input url.
 *
 * @name gitUp
 * @function
 * @param {String} input The input url.
 * @return {Object} An object containing the following fields:
 *
 *  - `protocols` (Array): An array with the url protocols (usually it has one element).
 *  - `port` (null|Number): The domain port.
 *  - `resource` (String): The url domain (including subdomains).
 *  - `user` (String): The authentication user (usually for ssh urls).
 *  - `pathname` (String): The url pathname.
 *  - `hash` (String): The url hash.
 *  - `search` (String): The url querystring value.
 *  - `href` (String): The input url.
 *  - `protocol` (String): The git url protocol.
 *  - `token` (String): The oauth token (could appear in the https urls).
 */
function gitUp(input) {
    var output = parseUrl(input);
    output.token = "";

    if (output.password === "x-oauth-basic") {
        output.token = output.user;
    } else if (output.user === "x-token-auth") {
        output.token = output.password;
    }

    if (isSsh(output.protocols) || output.protocols.length === 0 && isSsh(input)) {
        output.protocol = "ssh";
    } else if (output.protocols.length) {
        output.protocol = output.protocols[0];
    } else {
        output.protocol = "file";
        output.protocols = ["file"];
    }

    output.href = output.href.replace(/\/$/, "");
    return output;
}

module.exports = gitUp;

/***/ }),

/***/ 4728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var gitUp = __webpack_require__(6407);

/**
 * gitUrlParse
 * Parses a Git url.
 *
 * @name gitUrlParse
 * @function
 * @param {String} url The Git url to parse.
 * @return {GitUrl} The `GitUrl` object containing:
 *
 *  - `protocols` (Array): An array with the url protocols (usually it has one element).
 *  - `port` (null|Number): The domain port.
 *  - `resource` (String): The url domain (including subdomains).
 *  - `user` (String): The authentication user (usually for ssh urls).
 *  - `pathname` (String): The url pathname.
 *  - `hash` (String): The url hash.
 *  - `search` (String): The url querystring value.
 *  - `href` (String): The input url.
 *  - `protocol` (String): The git url protocol.
 *  - `token` (String): The oauth token (could appear in the https urls).
 *  - `source` (String): The Git provider (e.g. `"github.com"`).
 *  - `owner` (String): The repository owner.
 *  - `name` (String): The repository name.
 *  - `ref` (String): The repository ref (e.g., "master" or "dev").
 *  - `filepath` (String): A filepath relative to the repository root.
 *  - `filepathtype` (String): The type of filepath in the url ("blob" or "tree").
 *  - `full_name` (String): The owner and name values in the `owner/name` format.
 *  - `toString` (Function): A function to stringify the parsed url into another url type.
 *  - `organization` (String): The organization the owner belongs to. This is CloudForge specific.
 *  - `git_suffix` (Boolean): Whether to add the `.git` suffix or not.
 *
 */
function gitUrlParse(url) {

    if (typeof url !== "string") {
        throw new Error("The url must be a string.");
    }

    var shorthandRe = /^([a-z\d-]{1,39})\/([-\.\w]{1,100})$/i;

    if (shorthandRe.test(url)) {
        url = "https://github.com/" + url;
    }

    var urlInfo = gitUp(url),
        sourceParts = urlInfo.resource.split("."),
        splits = null;

    urlInfo.toString = function (type) {
        return gitUrlParse.stringify(this, type);
    };

    urlInfo.source = sourceParts.length > 2 ? sourceParts.slice(1 - sourceParts.length).join(".") : urlInfo.source = urlInfo.resource;

    // Note: Some hosting services (e.g. Visual Studio Team Services) allow whitespace characters
    // in the repository and owner names so we decode the URL pieces to get the correct result
    urlInfo.git_suffix = /\.git$/.test(urlInfo.pathname);
    urlInfo.name = decodeURIComponent((urlInfo.pathname || urlInfo.href).replace(/(^\/)|(\/$)/g, '').replace(/\.git$/, ""));
    urlInfo.owner = decodeURIComponent(urlInfo.user);

    switch (urlInfo.source) {
        case "git.cloudforge.com":
            urlInfo.owner = urlInfo.user;
            urlInfo.organization = sourceParts[0];
            urlInfo.source = "cloudforge.com";
            break;
        case "visualstudio.com":
            // Handle VSTS SSH URLs
            if (urlInfo.resource === 'vs-ssh.visualstudio.com') {
                splits = urlInfo.name.split("/");
                if (splits.length === 4) {
                    urlInfo.organization = splits[1];
                    urlInfo.owner = splits[2];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = splits[2] + '/' + splits[3];
                }
                break;
            } else {
                splits = urlInfo.name.split("/");
                if (splits.length === 2) {
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[1];
                    urlInfo.full_name = '_git/' + urlInfo.name;
                } else if (splits.length === 3) {
                    urlInfo.name = splits[2];
                    if (splits[0] === 'DefaultCollection') {
                        urlInfo.owner = splits[2];
                        urlInfo.organization = splits[0];
                        urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
                    } else {
                        urlInfo.owner = splits[0];
                        urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
                    }
                } else if (splits.length === 4) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
                }
                break;
            }

        // Azure DevOps (formerly Visual Studio Team Services)
        case "dev.azure.com":
        case "azure.com":
            if (urlInfo.resource === 'ssh.dev.azure.com') {
                splits = urlInfo.name.split("/");
                if (splits.length === 4) {
                    urlInfo.organization = splits[1];
                    urlInfo.owner = splits[2];
                    urlInfo.name = splits[3];
                }
                break;
            } else {
                splits = urlInfo.name.split("/");
                if (splits.length === 5) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[4];
                    urlInfo.full_name = '_git/' + urlInfo.name;
                } else if (splits.length === 3) {
                    urlInfo.name = splits[2];
                    if (splits[0] === 'DefaultCollection') {
                        urlInfo.owner = splits[2];
                        urlInfo.organization = splits[0];
                        urlInfo.full_name = urlInfo.organization + '/_git/' + urlInfo.name;
                    } else {
                        urlInfo.owner = splits[0];
                        urlInfo.full_name = urlInfo.owner + '/_git/' + urlInfo.name;
                    }
                } else if (splits.length === 4) {
                    urlInfo.organization = splits[0];
                    urlInfo.owner = splits[1];
                    urlInfo.name = splits[3];
                    urlInfo.full_name = urlInfo.organization + '/' + urlInfo.owner + '/_git/' + urlInfo.name;
                }
                if (urlInfo.query && urlInfo.query['path']) {
                    urlInfo.filepath = urlInfo.query['path'].replace(/^\/+/g, ''); // Strip leading slash (/)
                }
                if (urlInfo.query && urlInfo.query['version']) {
                    // version=GB<branch>
                    urlInfo.ref = urlInfo.query['version'].replace(/^GB/, ''); // remove GB
                }
                break;
            }
        default:
            splits = urlInfo.name.split("/");
            var nameIndex = splits.length - 1;
            if (splits.length >= 2) {
                var dashIndex = splits.indexOf("-", 2);
                var blobIndex = splits.indexOf("blob", 2);
                var treeIndex = splits.indexOf("tree", 2);
                var commitIndex = splits.indexOf("commit", 2);
                var srcIndex = splits.indexOf("src", 2);
                var rawIndex = splits.indexOf("raw", 2);
                var editIndex = splits.indexOf("edit", 2);
                nameIndex = dashIndex > 0 ? dashIndex - 1 : blobIndex > 0 ? blobIndex - 1 : treeIndex > 0 ? treeIndex - 1 : commitIndex > 0 ? commitIndex - 1 : srcIndex > 0 ? srcIndex - 1 : rawIndex > 0 ? rawIndex - 1 : editIndex > 0 ? editIndex - 1 : nameIndex;

                urlInfo.owner = splits.slice(0, nameIndex).join('/');
                urlInfo.name = splits[nameIndex];
                if (commitIndex) {
                    urlInfo.commit = splits[nameIndex + 2];
                }
            }

            urlInfo.ref = "";
            urlInfo.filepathtype = "";
            urlInfo.filepath = "";
            var offsetNameIndex = splits.length > nameIndex && splits[nameIndex + 1] === "-" ? nameIndex + 1 : nameIndex;

            if (splits.length > offsetNameIndex + 2 && ["raw", "src", "blob", "tree", "edit"].indexOf(splits[offsetNameIndex + 1]) >= 0) {
                urlInfo.filepathtype = splits[offsetNameIndex + 1];
                urlInfo.ref = splits[offsetNameIndex + 2];
                if (splits.length > offsetNameIndex + 3) {
                    urlInfo.filepath = splits.slice(offsetNameIndex + 3).join('/');
                }
            }
            urlInfo.organization = urlInfo.owner;
            break;
    }

    if (!urlInfo.full_name) {
        urlInfo.full_name = urlInfo.owner;
        if (urlInfo.name) {
            urlInfo.full_name && (urlInfo.full_name += "/");
            urlInfo.full_name += urlInfo.name;
        }
    }
    // Bitbucket Server
    if (urlInfo.owner.startsWith("scm/")) {
        urlInfo.source = "bitbucket-server";
        urlInfo.owner = urlInfo.owner.replace("scm/", "");
        urlInfo.organization = urlInfo.owner;
        urlInfo.full_name = urlInfo.owner + "/" + urlInfo.name;
    }

    var bitbucket = /(projects|users)\/(.*?)\/repos\/(.*?)((\/.*$)|$)/;
    var matches = bitbucket.exec(urlInfo.pathname);
    if (matches != null) {
        urlInfo.source = "bitbucket-server";
        if (matches[1] === "users") {
            urlInfo.owner = "~" + matches[2];
        } else {
            urlInfo.owner = matches[2];
        }

        urlInfo.organization = urlInfo.owner;
        urlInfo.name = matches[3];

        splits = matches[4].split("/");
        if (splits.length > 1) {
            if (["raw", "browse"].indexOf(splits[1]) >= 0) {
                urlInfo.filepathtype = splits[1];
                if (splits.length > 2) {
                    urlInfo.filepath = splits.slice(2).join('/');
                }
            } else if (splits[1] === "commits" && splits.length > 2) {
                urlInfo.commit = splits[2];
            }
        }
        urlInfo.full_name = urlInfo.owner + "/" + urlInfo.name;

        if (urlInfo.query.at) {
            urlInfo.ref = urlInfo.query.at;
        } else {
            urlInfo.ref = "";
        }
    }
    return urlInfo;
}

/**
 * stringify
 * Stringifies a `GitUrl` object.
 *
 * @name stringify
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @param {String} type The type of the stringified url (default `obj.protocol`).
 * @return {String} The stringified url.
 */
gitUrlParse.stringify = function (obj, type) {
    type = type || (obj.protocols && obj.protocols.length ? obj.protocols.join('+') : obj.protocol);
    var port = obj.port ? ":" + obj.port : '';
    var user = obj.user || 'git';
    var maybeGitSuffix = obj.git_suffix ? ".git" : "";
    switch (type) {
        case "ssh":
            if (port) return "ssh://" + user + "@" + obj.resource + port + "/" + obj.full_name + maybeGitSuffix;else return user + "@" + obj.resource + ":" + obj.full_name + maybeGitSuffix;
        case "git+ssh":
        case "ssh+git":
        case "ftp":
        case "ftps":
            return type + "://" + user + "@" + obj.resource + port + "/" + obj.full_name + maybeGitSuffix;
        case "http":
        case "https":
            var auth = obj.token ? buildToken(obj) : obj.user && (obj.protocols.includes('http') || obj.protocols.includes('https')) ? obj.user + "@" : "";
            return type + "://" + auth + obj.resource + port + "/" + buildPath(obj) + maybeGitSuffix;
        default:
            return obj.href;
    }
};

/*!
 * buildToken
 * Builds OAuth token prefix (helper function)
 *
 * @name buildToken
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @return {String} token prefix
 */
function buildToken(obj) {
    switch (obj.source) {
        case "bitbucket.org":
            return "x-token-auth:" + obj.token + "@";
        default:
            return obj.token + "@";
    }
}

function buildPath(obj) {
    switch (obj.source) {
        case "bitbucket-server":
            return "scm/" + obj.full_name;
        default:
            return "" + obj.full_name;

    }
}

module.exports = gitUrlParse;

/***/ }),

/***/ 8799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const regex = __webpack_require__(5775)

module.exports = BananaSlug

const own = Object.hasOwnProperty

function BananaSlug () {
  const self = this

  if (!(self instanceof BananaSlug)) return new BananaSlug()

  self.reset()
}

/**
 * Generate a unique slug.
 * @param  {string} value String of text to slugify
 * @param  {boolean} [false] Keep the current case, otherwise make all lowercase
 * @return {string}       A unique slug string
 */
BananaSlug.prototype.slug = function (value, maintainCase) {
  const self = this
  let slug = slugger(value, maintainCase === true)
  const originalSlug = slug

  while (own.call(self.occurrences, slug)) {
    self.occurrences[originalSlug]++
    slug = originalSlug + '-' + self.occurrences[originalSlug]
  }

  self.occurrences[slug] = 0

  return slug
}

/**
 * Reset - Forget all previous slugs
 * @return void
 */
BananaSlug.prototype.reset = function () {
  this.occurrences = Object.create(null)
}

function slugger (string, maintainCase) {
  if (typeof string !== 'string') return ''
  if (!maintainCase) string = string.toLowerCase()
  return string.replace(regex, '').replace(/ /g, '-')
}

BananaSlug.slug = slugger


/***/ }),

/***/ 5775:
/***/ ((module) => {

// This module is generated by `script/`.
/* eslint-disable no-control-regex, no-misleading-character-class, no-useless-escape */
module.exports = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g


/***/ }),

/***/ 5983:
/***/ (() => {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}

/**
 * Returns the embedding frame element, if any.
 * @param {!Document} doc
 * @return {!Element}
 */
function getFrameElement(doc) {
  try {
    return doc.defaultView && doc.defaultView.frameElement || null;
  } catch (e) {
    // Ignore the error.
    return null;
  }
}

/**
 * A local reference to the root document.
 */
var document = (function(startDoc) {
  var doc = startDoc;
  var frame = getFrameElement(doc);
  while (frame) {
    doc = frame.ownerDocument;
    frame = getFrameElement(doc);
  }
  return doc;
})(window.document);

/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];

/**
 * The signal updater for cross-origin intersection. When not null, it means
 * that the polyfill is configured to work in a cross-origin mode.
 * @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
 */
var crossOriginUpdater = null;

/**
 * The current cross-origin intersection. Only used in the cross-origin mode.
 * @type {DOMRect|ClientRect}
 */
var crossOriginRect = null;


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = ensureDOMRect(entry.rootBounds);
  this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
  this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (
    options.root &&
    options.root.nodeType != 1 &&
    options.root.nodeType != 9
  ) {
    throw new Error('root must be a Document or Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');

  /** @private @const {!Array<!Document>} */
  this._monitoringDocuments = [];
  /** @private @const {!Array<function()>} */
  this._monitoringUnsubscribes = [];
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Sets up the polyfill in the cross-origin mode. The result is the
 * updater function that accepts two arguments: `boundingClientRect` and
 * `intersectionRect` - just as these fields would be available to the
 * parent via `IntersectionObserverEntry`. This function should be called
 * each time the iframe receives intersection information from the parent
 * window, e.g. via messaging.
 * @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
 */
IntersectionObserver._setupCrossOriginUpdater = function() {
  if (!crossOriginUpdater) {
    /**
     * @param {DOMRect|ClientRect} boundingClientRect
     * @param {DOMRect|ClientRect} intersectionRect
     */
    crossOriginUpdater = function(boundingClientRect, intersectionRect) {
      if (!boundingClientRect || !intersectionRect) {
        crossOriginRect = getEmptyRect();
      } else {
        crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
      }
      registry.forEach(function(observer) {
        observer._checkForIntersections();
      });
    };
  }
  return crossOriginUpdater;
};


/**
 * Resets the cross-origin mode.
 */
IntersectionObserver._resetCrossOriginUpdater = function() {
  crossOriginUpdater = null;
  crossOriginRect = null;
};


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections(target.ownerDocument);
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {
        return item.element != target;
      });
  this._unmonitorIntersections(target.ownerDocument);
  if (this._observationTargets.length == 0) {
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorAllIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function(doc) {
  var win = doc.defaultView;
  if (!win) {
    // Already destroyed.
    return;
  }
  if (this._monitoringDocuments.indexOf(doc) != -1) {
    // Already monitoring.
    return;
  }

  // Private state for monitoring.
  var callback = this._checkForIntersections;
  var monitoringInterval = null;
  var domObserver = null;

  // If a poll interval is set, use polling instead of listening to
  // resize and scroll events or DOM mutations.
  if (this.POLL_INTERVAL) {
    monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
  } else {
    addEvent(win, 'resize', callback, true);
    addEvent(doc, 'scroll', callback, true);
    if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
      domObserver = new win.MutationObserver(callback);
      domObserver.observe(doc, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  this._monitoringDocuments.push(doc);
  this._monitoringUnsubscribes.push(function() {
    // Get the window object again. When a friendly iframe is destroyed, it
    // will be null.
    var win = doc.defaultView;

    if (win) {
      if (monitoringInterval) {
        win.clearInterval(monitoringInterval);
      }
      removeEvent(win, 'resize', callback, true);
    }

    removeEvent(doc, 'scroll', callback, true);
    if (domObserver) {
      domObserver.disconnect();
    }
  });

  // Also monitor the parent.
  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;
  if (doc != rootDoc) {
    var frame = getFrameElement(doc);
    if (frame) {
      this._monitorIntersections(frame.ownerDocument);
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function(doc) {
  var index = this._monitoringDocuments.indexOf(doc);
  if (index == -1) {
    return;
  }

  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;

  // Check if any dependent targets are still remaining.
  var hasDependentTargets =
      this._observationTargets.some(function(item) {
        var itemDoc = item.element.ownerDocument;
        // Target is in this context.
        if (itemDoc == doc) {
          return true;
        }
        // Target is nested in this context.
        while (itemDoc && itemDoc != rootDoc) {
          var frame = getFrameElement(itemDoc);
          itemDoc = frame && frame.ownerDocument;
          if (itemDoc == doc) {
            return true;
          }
        }
        return false;
      });
  if (hasDependentTargets) {
    return;
  }

  // Unsubscribe.
  var unsubscribe = this._monitoringUnsubscribes[index];
  this._monitoringDocuments.splice(index, 1);
  this._monitoringUnsubscribes.splice(index, 1);
  unsubscribe();

  // Also unmonitor the parent.
  if (doc != rootDoc) {
    var frame = getFrameElement(doc);
    if (frame) {
      this._unmonitorIntersections(frame.ownerDocument);
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._unmonitorAllIntersections = function() {
  var unsubscribes = this._monitoringUnsubscribes.slice(0);
  this._monitoringDocuments.length = 0;
  this._monitoringUnsubscribes.length = 0;
  for (var i = 0; i < unsubscribes.length; i++) {
    unsubscribes[i]();
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  if (!this.root && crossOriginUpdater && !crossOriginRect) {
    // Cross origin monitoring, but no initial data available yet.
    return;
  }

  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, targetRect, rootRect);

    var rootBounds = null;
    if (!this._rootContainsTarget(target)) {
      rootBounds = getEmptyRect();
    } else if (!crossOriginUpdater || this.root) {
      rootBounds = rootRect;
    }

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootBounds,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} targetRect The bounding rect of the target.
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, targetRect, rootRect) {
  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot && parent) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return null;

    if (parent == this.root || parent.nodeType == /* DOCUMENT */ 9) {
      atRoot = true;
      if (parent == this.root || parent == document) {
        if (crossOriginUpdater && !this.root) {
          if (!crossOriginRect ||
              crossOriginRect.width == 0 && crossOriginRect.height == 0) {
            // A 0-size cross-origin intersection means no-intersection.
            parent = null;
            parentRect = null;
            intersectionRect = null;
          } else {
            parentRect = crossOriginRect;
          }
        } else {
          parentRect = rootRect;
        }
      } else {
        // Check if there's a frame that can be navigated to.
        var frame = getParentNode(parent);
        var frameRect = frame && getBoundingClientRect(frame);
        var frameIntersect =
            frame &&
            this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
        if (frameRect && frameIntersect) {
          parent = frame;
          parentRect = convertFromParentRect(frameRect, frameIntersect);
        } else {
          parent = null;
          intersectionRect = null;
        }
      }
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      var doc = parent.ownerDocument;
      if (parent != doc.body &&
          parent != doc.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);
    }
    if (!intersectionRect) break;
    parent = parent && getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {ClientRect} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root && !isDoc(this.root)) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var doc = isDoc(this.root) ? this.root : document;
    var html = doc.documentElement;
    var body = doc.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {DOMRect|ClientRect} rect The rect object to expand.
 * @return {ClientRect} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;
  return (
    containsDeep(rootDoc, target) &&
    (!this.root || rootDoc == target.ownerDocument)
  );
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detachEvent == 'function') {
    node.detachEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object|?ClientRect} The intersection rect or undefined if no
 *     intersection is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  } || null;
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {ClientRect} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}


/**
 * Ensure that the result has all of the necessary fields of the DOMRect.
 * Specifically this ensures that `x` and `y` fields are set.
 *
 * @param {?DOMRect|?ClientRect} rect
 * @return {?DOMRect}
 */
function ensureDOMRect(rect) {
  // A `DOMRect` object has `x` and `y` fields.
  if (!rect || 'x' in rect) {
    return rect;
  }
  // A IE's `ClientRect` type does not have `x` and `y`. The same is the case
  // for internally calculated Rect objects. For the purposes of
  // `IntersectionObserver`, it's sufficient to simply mirror `left` and `top`
  // for these fields.
  return {
    top: rect.top,
    y: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height
  };
}


/**
 * Inverts the intersection and bounding rect from the parent (frame) BCR to
 * the local BCR space.
 * @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
 * @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
 * @return {ClientRect} The local root bounding rect for the parent's children.
 */
function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
  var top = parentIntersectionRect.top - parentBoundingRect.top;
  var left = parentIntersectionRect.left - parentBoundingRect.left;
  return {
    top: top,
    left: left,
    height: parentIntersectionRect.height,
    width: parentIntersectionRect.width,
    bottom: top + parentIntersectionRect.height,
    right: left + parentIntersectionRect.width
  };
}


/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (node.nodeType == /* DOCUMENT */ 9 && node != document) {
    // If this node is a document node, look for the embedding frame.
    return getFrameElement(node);
  }

  // If the parent has element that is assigned through shadow root slot
  if (parent && parent.assignedSlot) {
    parent = parent.assignedSlot.parentNode
  }

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  return parent;
}

/**
 * Returns true if `node` is a Document.
 * @param {!Node} node
 * @returns {boolean}
 */
function isDoc(node) {
  return node && node.nodeType === 9;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


/***/ }),

/***/ 2895:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Dependencies
var protocols = __webpack_require__(6097);

/**
 * isSsh
 * Checks if an input value is a ssh url or not.
 *
 * @name isSsh
 * @function
 * @param {String|Array} input The input url or an array of protocols.
 * @return {Boolean} `true` if the input is a ssh url, `false` otherwise.
 */
function isSsh(input) {

    if (Array.isArray(input)) {
        return input.indexOf("ssh") !== -1 || input.indexOf("rsync") !== -1;
    }

    if (typeof input !== "string") {
        return false;
    }

    var prots = protocols(input);
    input = input.substring(input.indexOf("://") + 3);
    if (isSsh(prots)) {
        return true;
    }

    // TODO This probably could be improved :)
    var urlPortPattern = new RegExp('\.([a-zA-Z\\d]+):(\\d+)\/');
    return !input.match(urlPortPattern) && input.indexOf("@") < input.indexOf(":");
}

module.exports = isSsh;

/***/ }),

/***/ 3292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({ value: true });

var _extends = __webpack_require__(9222);
var removeAccents = __webpack_require__(6593);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var removeAccents__default = /*#__PURE__*/_interopDefaultLegacy(removeAccents);

var rankings = {
  CASE_SENSITIVE_EQUAL: 7,
  EQUAL: 6,
  STARTS_WITH: 5,
  WORD_STARTS_WITH: 4,
  CONTAINS: 3,
  ACRONYM: 2,
  MATCHES: 1,
  NO_MATCH: 0
};
matchSorter.rankings = rankings;

var defaultBaseSortFn = function defaultBaseSortFn(a, b) {
  return String(a.rankedValue).localeCompare(String(b.rankedValue));
};
/**
 * Takes an array of items and a value and returns a new array with the items that match the given value
 * @param {Array} items - the items to sort
 * @param {String} value - the value to use for ranking
 * @param {Object} options - Some options to configure the sorter
 * @return {Array} - the new sorted array
 */


function matchSorter(items, value, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      keys = _options.keys,
      _options$threshold = _options.threshold,
      threshold = _options$threshold === void 0 ? rankings.MATCHES : _options$threshold,
      _options$baseSort = _options.baseSort,
      baseSort = _options$baseSort === void 0 ? defaultBaseSortFn : _options$baseSort,
      _options$sorter = _options.sorter,
      sorter = _options$sorter === void 0 ? function (matchedItems) {
    return matchedItems.sort(function (a, b) {
      return sortRankedValues(a, b, baseSort);
    });
  } : _options$sorter;
  var matchedItems = items.reduce(reduceItemsToRanked, []);
  return sorter(matchedItems).map(function (_ref) {
    var item = _ref.item;
    return item;
  });

  function reduceItemsToRanked(matches, item, index) {
    var rankingInfo = getHighestRanking(item, keys, value, options);
    var rank = rankingInfo.rank,
        _rankingInfo$keyThres = rankingInfo.keyThreshold,
        keyThreshold = _rankingInfo$keyThres === void 0 ? threshold : _rankingInfo$keyThres;

    if (rank >= keyThreshold) {
      matches.push(_extends__default['default']({}, rankingInfo, {
        item: item,
        index: index
      }));
    }

    return matches;
  }
}
/**
 * Gets the highest ranking for value for the given item based on its values for the given keys
 * @param {*} item - the item to rank
 * @param {Array} keys - the keys to get values from the item for the ranking
 * @param {String} value - the value to rank against
 * @param {Object} options - options to control the ranking
 * @return {{rank: Number, keyIndex: Number, keyThreshold: Number}} - the highest ranking
 */


function getHighestRanking(item, keys, value, options) {
  if (!keys) {
    // if keys is not specified, then we assume the item given is ready to be matched
    var stringItem = item;
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: stringItem,
      rank: getMatchRanking(stringItem, value, options),
      keyIndex: -1,
      keyThreshold: options.threshold
    };
  }

  var valuesToRank = getAllValuesToRank(item, keys);
  return valuesToRank.reduce(function (_ref2, _ref3, i) {
    var rank = _ref2.rank,
        rankedValue = _ref2.rankedValue,
        keyIndex = _ref2.keyIndex,
        keyThreshold = _ref2.keyThreshold;
    var itemValue = _ref3.itemValue,
        attributes = _ref3.attributes;
    var newRank = getMatchRanking(itemValue, value, options);
    var newRankedValue = rankedValue;
    var minRanking = attributes.minRanking,
        maxRanking = attributes.maxRanking,
        threshold = attributes.threshold;

    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }

    if (newRank > rank) {
      rank = newRank;
      keyIndex = i;
      keyThreshold = threshold;
      newRankedValue = itemValue;
    }

    return {
      rankedValue: newRankedValue,
      rank: rank,
      keyIndex: keyIndex,
      keyThreshold: keyThreshold
    };
  }, {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    keyIndex: -1,
    keyThreshold: options.threshold
  });
}
/**
 * Gives a rankings score based on how well the two strings match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @param {Object} options - options for the match (like keepDiacritics for comparison)
 * @returns {Number} the ranking for how well stringToRank matches testString
 */


function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options); // too long

  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  } // case sensitive equals


  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  } // Lower casing before further comparison


  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase(); // case insensitive equals

  if (testString === stringToRank) {
    return rankings.EQUAL;
  } // starts with


  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  } // word starts with


  if (testString.includes(" " + stringToRank)) {
    return rankings.WORD_STARTS_WITH;
  } // contains


  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    // If the only character in the given stringToRank
    //   isn't even contained in the testString, then
    //   it's definitely not a match.
    return rankings.NO_MATCH;
  } // acronym


  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  } // will return a number between rankings.MATCHES and
  // rankings.MATCHES + 1 depending  on how close of a match it is.


  return getClosenessRanking(testString, stringToRank);
}
/**
 * Generates an acronym for a string.
 *
 * @param {String} string the string for which to produce the acronym
 * @returns {String} the acronym
 */


function getAcronym(string) {
  var acronym = '';
  var wordsInString = string.split(' ');
  wordsInString.forEach(function (wordInString) {
    var splitByHyphenWords = wordInString.split('-');
    splitByHyphenWords.forEach(function (splitByHyphenWord) {
      acronym += splitByHyphenWord.substr(0, 1);
    });
  });
  return acronym;
}
/**
 * Returns a score based on how spread apart the
 * characters from the stringToRank are within the testString.
 * A number close to rankings.MATCHES represents a loose match. A number close
 * to rankings.MATCHES + 1 represents a tighter match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @returns {Number} the number between rankings.MATCHES and
 * rankings.MATCHES + 1 for how well stringToRank matches testString
 */


function getClosenessRanking(testString, stringToRank) {
  var matchingInOrderCharCount = 0;
  var charNumber = 0;

  function findMatchingCharacter(matchChar, string, index) {
    for (var j = index, J = string.length; j < J; j++) {
      var stringChar = string[j];

      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }

    return -1;
  }

  function getRanking(spread) {
    var spreadPercentage = 1 / spread;
    var inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    var ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }

  var firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);

  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }

  charNumber = firstIndex;

  for (var i = 1, I = stringToRank.length; i < I; i++) {
    var matchChar = stringToRank[i];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    var found = charNumber > -1;

    if (!found) {
      return rankings.NO_MATCH;
    }
  }

  var spread = charNumber - firstIndex;
  return getRanking(spread);
}
/**
 * Sorts items that have a rank, index, and keyIndex
 * @param {Object} a - the first item to sort
 * @param {Object} b - the second item to sort
 * @return {Number} -1 if a should come first, 1 if b should come first, 0 if equal
 */


function sortRankedValues(a, b, baseSort) {
  var aFirst = -1;
  var bFirst = 1;
  var aRank = a.rank,
      aKeyIndex = a.keyIndex;
  var bRank = b.rank,
      bKeyIndex = b.keyIndex;
  var same = aRank === bRank;

  if (same) {
    if (aKeyIndex === bKeyIndex) {
      // use the base sort function as a tie-breaker
      return baseSort(a, b);
    } else {
      return aKeyIndex < bKeyIndex ? aFirst : bFirst;
    }
  } else {
    return aRank > bRank ? aFirst : bFirst;
  }
}
/**
 * Prepares value for comparison by stringifying it, removing diacritics (if specified)
 * @param {String} value - the value to clean
 * @param {Object} options - {keepDiacritics: whether to remove diacritics}
 * @return {String} the prepared value
 */


function prepareValueForComparison(value, _ref4) {
  var keepDiacritics = _ref4.keepDiacritics;
  // value might not actually be a string at this point (we don't get to choose)
  // so part of preparing the value for comparison is ensure that it is a string
  value = "" + value; // toString

  if (!keepDiacritics) {
    value = removeAccents__default['default'](value);
  }

  return value;
}
/**
 * Gets value for key in item at arbitrarily nested keypath
 * @param {Object} item - the item
 * @param {Object|Function} key - the potentially nested keypath or property callback
 * @return {Array} - an array containing the value(s) at the nested keypath
 */


function getItemValues(item, key) {
  if (typeof key === 'object') {
    key = key.key;
  }

  var value;

  if (typeof key === 'function') {
    value = key(item);
  } else if (item == null) {
    value = null;
  } else if (Object.hasOwnProperty.call(item, key)) {
    value = item[key];
  } else if (key.includes('.')) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return getNestedValues(key, item);
  } else {
    value = null;
  } // because `value` can also be undefined


  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [String(value)];
}
/**
 * Given path: "foo.bar.baz"
 * And item: {foo: {bar: {baz: 'buzz'}}}
 *   -> 'buzz'
 * @param path a dot-separated set of keys
 * @param item the item to get the value from
 */


function getNestedValues(path, item) {
  var keys = path.split('.');
  var values = [item];

  for (var i = 0, I = keys.length; i < I; i++) {
    var nestedKey = keys[i];
    var nestedValues = [];

    for (var j = 0, J = values.length; j < J; j++) {
      var nestedItem = values[j];
      if (nestedItem == null) continue;

      if (Object.hasOwnProperty.call(nestedItem, nestedKey)) {
        var nestedValue = nestedItem[nestedKey];

        if (nestedValue != null) {
          nestedValues.push(nestedValue);
        }
      } else if (nestedKey === '*') {
        // ensure that values is an array
        nestedValues = nestedValues.concat(nestedItem);
      }
    }

    values = nestedValues;
  }

  if (Array.isArray(values[0])) {
    // keep allowing the implicit wildcard for an array of strings at the end of
    // the path; don't use `.flat()` because that's not available in node.js v10
    var result = [];
    return result.concat.apply(result, values);
  } // Based on our logic it should be an array of strings by now...
  // assuming the user's path terminated in strings


  return values;
}
/**
 * Gets all the values for the given keys in the given item and returns an array of those values
 * @param item - the item from which the values will be retrieved
 * @param keys - the keys to use to retrieve the values
 * @return objects with {itemValue, attributes}
 */


function getAllValuesToRank(item, keys) {
  var allValues = [];

  for (var j = 0, J = keys.length; j < J; j++) {
    var key = keys[j];
    var attributes = getKeyAttributes(key);
    var itemValues = getItemValues(item, key);

    for (var i = 0, I = itemValues.length; i < I; i++) {
      allValues.push({
        itemValue: itemValues[i],
        attributes: attributes
      });
    }
  }

  return allValues;
}

var defaultKeyAttributes = {
  maxRanking: Infinity,
  minRanking: -Infinity
};
/**
 * Gets all the attributes for the given key
 * @param key - the key from which the attributes will be retrieved
 * @return object containing the key's attributes
 */

function getKeyAttributes(key) {
  if (typeof key === 'string') {
    return defaultKeyAttributes;
  }

  return _extends__default['default']({}, defaultKeyAttributes, key);
}
/*
eslint
  no-continue: "off",
*/

__webpack_unused_export__ = defaultBaseSortFn;
exports.Lu = matchSorter;
__webpack_unused_export__ = rankings;


/***/ }),

/***/ 5047:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;
var React = __webpack_require__(6689);
var Head = __webpack_require__(968);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Head__default = /*#__PURE__*/_interopDefaultLegacy(Head);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded$x = ["keyOverride"];
var defaults = {
  templateTitle: '',
  noindex: false,
  nofollow: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0
};
var buildOpenGraphMediaTags = function buildOpenGraphMediaTags(mediaType, media, _temp) {
  if (media === void 0) {
    media = [];
  }
  var _ref = _temp === void 0 ? {} : _temp,
    defaultWidth = _ref.defaultWidth,
    defaultHeight = _ref.defaultHeight;
  return media.reduce(function (tags, medium, index) {
    tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "og:" + mediaType + ":0" + index,
      property: "og:" + mediaType,
      content: medium.url
    }));
    if (medium.alt) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":alt0" + index,
        property: "og:" + mediaType + ":alt",
        content: medium.alt
      }));
    }
    if (medium.secureUrl) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":secure_url0" + index,
        property: "og:" + mediaType + ":secure_url",
        content: medium.secureUrl.toString()
      }));
    }
    if (medium.type) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":type0" + index,
        property: "og:" + mediaType + ":type",
        content: medium.type.toString()
      }));
    }
    if (medium.width) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":width0" + index,
        property: "og:" + mediaType + ":width",
        content: medium.width.toString()
      }));
    } else if (defaultWidth) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":width0" + index,
        property: "og:" + mediaType + ":width",
        content: defaultWidth.toString()
      }));
    }
    if (medium.height) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":height" + index,
        property: "og:" + mediaType + ":height",
        content: medium.height.toString()
      }));
    } else if (defaultHeight) {
      tags.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:" + mediaType + ":height" + index,
        property: "og:" + mediaType + ":height",
        content: defaultHeight.toString()
      }));
    }
    return tags;
  }, []);
};
var buildTags = function buildTags(config) {
  var _config$openGraph, _config$openGraph3, _config$additionalLin;
  var tagsToRender = [];
  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }
  var updatedTitle = '';
  if (config.title) {
    updatedTitle = config.title;
    if (defaults.templateTitle) {
      updatedTitle = defaults.templateTitle.replace(/%s/g, function () {
        return updatedTitle;
      });
    }
  } else if (config.defaultTitle) {
    updatedTitle = config.defaultTitle;
  }
  if (updatedTitle) {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("title", {
      key: "title"
    }, updatedTitle));
  }
  var noindex = config.noindex || defaults.noindex || config.dangerouslySetAllPagesToNoIndex;
  var nofollow = config.nofollow || defaults.nofollow || config.dangerouslySetAllPagesToNoFollow;
  var robotsParams = '';
  if (config.robotsProps) {
    var _config$robotsProps = config.robotsProps,
      nosnippet = _config$robotsProps.nosnippet,
      maxSnippet = _config$robotsProps.maxSnippet,
      maxImagePreview = _config$robotsProps.maxImagePreview,
      maxVideoPreview = _config$robotsProps.maxVideoPreview,
      noarchive = _config$robotsProps.noarchive,
      noimageindex = _config$robotsProps.noimageindex,
      notranslate = _config$robotsProps.notranslate,
      unavailableAfter = _config$robotsProps.unavailableAfter;
    robotsParams = "" + (nosnippet ? ',nosnippet' : '') + (maxSnippet ? ",max-snippet:" + maxSnippet : '') + (maxImagePreview ? ",max-image-preview:" + maxImagePreview : '') + (noarchive ? ',noarchive' : '') + (unavailableAfter ? ",unavailable_after:" + unavailableAfter : '') + (noimageindex ? ',noimageindex' : '') + (maxVideoPreview ? ",max-video-preview:" + maxVideoPreview : '') + (notranslate ? ',notranslate' : '');
  }
  if (noindex || nofollow) {
    if (config.dangerouslySetAllPagesToNoIndex) {
      defaults.noindex = true;
    }
    if (config.dangerouslySetAllPagesToNoFollow) {
      defaults.nofollow = true;
    }
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "robots",
      name: "robots",
      content: (noindex ? 'noindex' : 'index') + "," + (nofollow ? 'nofollow' : 'follow') + robotsParams
    }));
  } else {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "robots",
      name: "robots",
      content: "index,follow" + robotsParams
    }));
  }
  if (config.description) {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "description",
      name: "description",
      content: config.description
    }));
  }
  if (config.themeColor) {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "theme-color",
      name: "theme-color",
      content: config.themeColor
    }));
  }
  if (config.mobileAlternate) {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("link", {
      rel: "alternate",
      key: "mobileAlternate",
      media: config.mobileAlternate.media,
      href: config.mobileAlternate.href
    }));
  }
  if (config.languageAlternates && config.languageAlternates.length > 0) {
    config.languageAlternates.forEach(function (languageAlternate) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("link", {
        rel: "alternate",
        key: "languageAlternate-" + languageAlternate.hrefLang,
        hrefLang: languageAlternate.hrefLang,
        href: languageAlternate.href
      }));
    });
  }
  if (config.twitter) {
    if (config.twitter.cardType) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "twitter:card",
        name: "twitter:card",
        content: config.twitter.cardType
      }));
    }
    if (config.twitter.site) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "twitter:site",
        name: "twitter:site",
        content: config.twitter.site
      }));
    }
    if (config.twitter.handle) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "twitter:creator",
        name: "twitter:creator",
        content: config.twitter.handle
      }));
    }
  }
  if (config.facebook) {
    if (config.facebook.appId) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "fb:app_id",
        property: "fb:app_id",
        content: config.facebook.appId
      }));
    }
  }
  if ((_config$openGraph = config.openGraph) != null && _config$openGraph.title || updatedTitle) {
    var _config$openGraph2;
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "og:title",
      property: "og:title",
      content: ((_config$openGraph2 = config.openGraph) == null ? void 0 : _config$openGraph2.title) || updatedTitle
    }));
  }
  if ((_config$openGraph3 = config.openGraph) != null && _config$openGraph3.description || config.description) {
    var _config$openGraph4;
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
      key: "og:description",
      property: "og:description",
      content: ((_config$openGraph4 = config.openGraph) == null ? void 0 : _config$openGraph4.description) || config.description
    }));
  }
  if (config.openGraph) {
    if (config.openGraph.url || config.canonical) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:url",
        property: "og:url",
        content: config.openGraph.url || config.canonical
      }));
    }
    if (config.openGraph.type) {
      var type = config.openGraph.type.toLowerCase();
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:type",
        property: "og:type",
        content: type
      }));
      if (type === 'profile' && config.openGraph.profile) {
        if (config.openGraph.profile.firstName) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "profile:first_name",
            property: "profile:first_name",
            content: config.openGraph.profile.firstName
          }));
        }
        if (config.openGraph.profile.lastName) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "profile:last_name",
            property: "profile:last_name",
            content: config.openGraph.profile.lastName
          }));
        }
        if (config.openGraph.profile.username) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "profile:username",
            property: "profile:username",
            content: config.openGraph.profile.username
          }));
        }
        if (config.openGraph.profile.gender) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "profile:gender",
            property: "profile:gender",
            content: config.openGraph.profile.gender
          }));
        }
      } else if (type === 'book' && config.openGraph.book) {
        if (config.openGraph.book.authors && config.openGraph.book.authors.length) {
          config.openGraph.book.authors.forEach(function (author, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "book:author:0" + index,
              property: "book:author",
              content: author
            }));
          });
        }
        if (config.openGraph.book.isbn) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "book:isbn",
            property: "book:isbn",
            content: config.openGraph.book.isbn
          }));
        }
        if (config.openGraph.book.releaseDate) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "book:release_date",
            property: "book:release_date",
            content: config.openGraph.book.releaseDate
          }));
        }
        if (config.openGraph.book.tags && config.openGraph.book.tags.length) {
          config.openGraph.book.tags.forEach(function (tag, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "book:tag:0" + index,
              property: "book:tag",
              content: tag
            }));
          });
        }
      } else if (type === 'article' && config.openGraph.article) {
        if (config.openGraph.article.publishedTime) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "article:published_time",
            property: "article:published_time",
            content: config.openGraph.article.publishedTime
          }));
        }
        if (config.openGraph.article.modifiedTime) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "article:modified_time",
            property: "article:modified_time",
            content: config.openGraph.article.modifiedTime
          }));
        }
        if (config.openGraph.article.expirationTime) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "article:expiration_time",
            property: "article:expiration_time",
            content: config.openGraph.article.expirationTime
          }));
        }
        if (config.openGraph.article.authors && config.openGraph.article.authors.length) {
          config.openGraph.article.authors.forEach(function (author, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "article:author:0" + index,
              property: "article:author",
              content: author
            }));
          });
        }
        if (config.openGraph.article.section) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "article:section",
            property: "article:section",
            content: config.openGraph.article.section
          }));
        }
        if (config.openGraph.article.tags && config.openGraph.article.tags.length) {
          config.openGraph.article.tags.forEach(function (tag, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "article:tag:0" + index,
              property: "article:tag",
              content: tag
            }));
          });
        }
      } else if ((type === 'video.movie' || type === 'video.episode' || type === 'video.tv_show' || type === 'video.other') && config.openGraph.video) {
        if (config.openGraph.video.actors && config.openGraph.video.actors.length) {
          config.openGraph.video.actors.forEach(function (actor, index) {
            if (actor.profile) {
              tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
                key: "video:actor:0" + index,
                property: "video:actor",
                content: actor.profile
              }));
            }
            if (actor.role) {
              tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
                key: "video:actor:role:0" + index,
                property: "video:actor:role",
                content: actor.role
              }));
            }
          });
        }
        if (config.openGraph.video.directors && config.openGraph.video.directors.length) {
          config.openGraph.video.directors.forEach(function (director, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "video:director:0" + index,
              property: "video:director",
              content: director
            }));
          });
        }
        if (config.openGraph.video.writers && config.openGraph.video.writers.length) {
          config.openGraph.video.writers.forEach(function (writer, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "video:writer:0" + index,
              property: "video:writer",
              content: writer
            }));
          });
        }
        if (config.openGraph.video.duration) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "video:duration",
            property: "video:duration",
            content: config.openGraph.video.duration.toString()
          }));
        }
        if (config.openGraph.video.releaseDate) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "video:release_date",
            property: "video:release_date",
            content: config.openGraph.video.releaseDate
          }));
        }
        if (config.openGraph.video.tags && config.openGraph.video.tags.length) {
          config.openGraph.video.tags.forEach(function (tag, index) {
            tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
              key: "video:tag:0" + index,
              property: "video:tag",
              content: tag
            }));
          });
        }
        if (config.openGraph.video.series) {
          tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
            key: "video:series",
            property: "video:series",
            content: config.openGraph.video.series
          }));
        }
      }
    }
    // images
    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }
    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }
    if (config.openGraph.images && config.openGraph.images.length) {
      tagsToRender.push.apply(tagsToRender, buildOpenGraphMediaTags('image', config.openGraph.images, {
        defaultWidth: defaults.defaultOpenGraphImageWidth,
        defaultHeight: defaults.defaultOpenGraphImageHeight
      }));
    }
    // videos
    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }
    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }
    if (config.openGraph.videos && config.openGraph.videos.length) {
      tagsToRender.push.apply(tagsToRender, buildOpenGraphMediaTags('video', config.openGraph.videos, {
        defaultWidth: defaults.defaultOpenGraphVideoWidth,
        defaultHeight: defaults.defaultOpenGraphVideoHeight
      }));
    }
    // audio
    if (config.openGraph.audio) {
      tagsToRender.push.apply(tagsToRender, buildOpenGraphMediaTags('audio', config.openGraph.audio));
    }
    if (config.openGraph.locale) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:locale",
        property: "og:locale",
        content: config.openGraph.locale
      }));
    }
    if (config.openGraph.siteName || config.openGraph.site_name) {
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", {
        key: "og:site_name",
        property: "og:site_name",
        content: config.openGraph.siteName || config.openGraph.site_name
      }));
    }
  }
  if (config.canonical) {
    tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("link", {
      rel: "canonical",
      href: config.canonical,
      key: "canonical"
    }));
  }
  if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
    config.additionalMetaTags.forEach(function (_ref2) {
      var _ref3, _ref4;
      var keyOverride = _ref2.keyOverride,
        tag = _objectWithoutPropertiesLoose(_ref2, _excluded$x);
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("meta", _extends({
        key: "meta:" + ((_ref3 = (_ref4 = keyOverride != null ? keyOverride : tag.name) != null ? _ref4 : tag.property) != null ? _ref3 : tag.httpEquiv)
      }, tag)));
    });
  }
  if ((_config$additionalLin = config.additionalLinkTags) != null && _config$additionalLin.length) {
    config.additionalLinkTags.forEach(function (tag) {
      var _tag$keyOverride;
      tagsToRender.push( /*#__PURE__*/React__default["default"].createElement("link", _extends({
        key: "link" + ((_tag$keyOverride = tag.keyOverride) != null ? _tag$keyOverride : tag.href) + tag.rel
      }, tag)));
    });
  }
  return tagsToRender;
};

var WithHead = function WithHead(props) {
  return /*#__PURE__*/React__default["default"].createElement(Head__default["default"], null, buildTags(props));
};

var DefaultSeo = function DefaultSeo(_ref) {
  var title = _ref.title,
    titleTemplate = _ref.titleTemplate,
    defaultTitle = _ref.defaultTitle,
    themeColor = _ref.themeColor,
    _ref$dangerouslySetAl = _ref.dangerouslySetAllPagesToNoIndex,
    dangerouslySetAllPagesToNoIndex = _ref$dangerouslySetAl === void 0 ? false : _ref$dangerouslySetAl,
    _ref$dangerouslySetAl2 = _ref.dangerouslySetAllPagesToNoFollow,
    dangerouslySetAllPagesToNoFollow = _ref$dangerouslySetAl2 === void 0 ? false : _ref$dangerouslySetAl2,
    description = _ref.description,
    canonical = _ref.canonical,
    facebook = _ref.facebook,
    openGraph = _ref.openGraph,
    additionalMetaTags = _ref.additionalMetaTags,
    twitter = _ref.twitter,
    defaultOpenGraphImageWidth = _ref.defaultOpenGraphImageWidth,
    defaultOpenGraphImageHeight = _ref.defaultOpenGraphImageHeight,
    defaultOpenGraphVideoWidth = _ref.defaultOpenGraphVideoWidth,
    defaultOpenGraphVideoHeight = _ref.defaultOpenGraphVideoHeight,
    mobileAlternate = _ref.mobileAlternate,
    languageAlternates = _ref.languageAlternates,
    additionalLinkTags = _ref.additionalLinkTags,
    robotsProps = _ref.robotsProps;
  return /*#__PURE__*/React__default["default"].createElement(WithHead, {
    title: title,
    titleTemplate: titleTemplate,
    defaultTitle: defaultTitle,
    themeColor: themeColor,
    dangerouslySetAllPagesToNoIndex: dangerouslySetAllPagesToNoIndex,
    dangerouslySetAllPagesToNoFollow: dangerouslySetAllPagesToNoFollow,
    description: description,
    canonical: canonical,
    facebook: facebook,
    openGraph: openGraph,
    additionalMetaTags: additionalMetaTags,
    twitter: twitter,
    defaultOpenGraphImageWidth: defaultOpenGraphImageWidth,
    defaultOpenGraphImageHeight: defaultOpenGraphImageHeight,
    defaultOpenGraphVideoWidth: defaultOpenGraphVideoWidth,
    defaultOpenGraphVideoHeight: defaultOpenGraphVideoHeight,
    mobileAlternate: mobileAlternate,
    languageAlternates: languageAlternates,
    additionalLinkTags: additionalLinkTags,
    robotsProps: robotsProps
  });
};

var NextSeo = function NextSeo(_ref) {
  var title = _ref.title,
    themeColor = _ref.themeColor,
    _ref$noindex = _ref.noindex,
    noindex = _ref$noindex === void 0 ? false : _ref$noindex,
    nofollow = _ref.nofollow,
    robotsProps = _ref.robotsProps,
    description = _ref.description,
    canonical = _ref.canonical,
    openGraph = _ref.openGraph,
    facebook = _ref.facebook,
    twitter = _ref.twitter,
    additionalMetaTags = _ref.additionalMetaTags,
    titleTemplate = _ref.titleTemplate,
    defaultTitle = _ref.defaultTitle,
    mobileAlternate = _ref.mobileAlternate,
    languageAlternates = _ref.languageAlternates,
    additionalLinkTags = _ref.additionalLinkTags,
    _ref$useAppDir = _ref.useAppDir,
    useAppDir = _ref$useAppDir === void 0 ? false : _ref$useAppDir;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, useAppDir ? buildTags({
    title: title,
    themeColor: themeColor,
    noindex: noindex,
    nofollow: nofollow,
    robotsProps: robotsProps,
    description: description,
    canonical: canonical,
    facebook: facebook,
    openGraph: openGraph,
    additionalMetaTags: additionalMetaTags,
    twitter: twitter,
    titleTemplate: titleTemplate,
    defaultTitle: defaultTitle,
    mobileAlternate: mobileAlternate,
    languageAlternates: languageAlternates,
    additionalLinkTags: additionalLinkTags
  }) : /*#__PURE__*/React__default["default"].createElement(WithHead, {
    title: title,
    themeColor: themeColor,
    noindex: noindex,
    nofollow: nofollow,
    robotsProps: robotsProps,
    description: description,
    canonical: canonical,
    facebook: facebook,
    openGraph: openGraph,
    additionalMetaTags: additionalMetaTags,
    twitter: twitter,
    titleTemplate: titleTemplate,
    defaultTitle: defaultTitle,
    mobileAlternate: mobileAlternate,
    languageAlternates: languageAlternates,
    additionalLinkTags: additionalLinkTags
  }));
};

var toJson = function toJson(type, jsonld) {
  var data = jsonld;
  if (Array.isArray(data) && data.length === 1) {
    data = _extends({}, jsonld[0]);
  }
  var jsonLdObject = Array.isArray(data) ? data.map(function (item) {
    return formatObjectForSchema(type, item);
  }) : formatObjectForSchema(type, data);
  return {
    __html: JSON.stringify(jsonLdObject, safeJsonLdReplacer)
  };
};
var formatObjectForSchema = function formatObjectForSchema(type, jsonld) {
  var _jsonld$id = jsonld.id,
    id = _jsonld$id === void 0 ? undefined : _jsonld$id;
  var updated = _extends({}, id ? {
    '@id': jsonld.id
  } : {}, jsonld);
  delete updated.id;
  return _extends({
    '@context': 'https://schema.org',
    '@type': type
  }, updated);
};
var ESCAPE_ENTITIES = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
});
var ESCAPE_REGEX = new RegExp("[" + Object.keys(ESCAPE_ENTITIES).join('') + "]", 'g');
var ESCAPE_REPLACER = function ESCAPE_REPLACER(t) {
  return ESCAPE_ENTITIES[t];
};
/**
 * A replacer for JSON.stringify to strip JSON-LD of illegal HTML entities
 * per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 */
var safeJsonLdReplacer = function () {
  // Replace per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
  // Solution from https://stackoverflow.com/a/5499821/864313
  return function (_, value) {
    switch (typeof value) {
      case 'object':
        // Omit null values.
        if (value === null) {
          return undefined;
        }
        return value;
      // JSON.stringify will recursively call replacer.
      case 'number':
      case 'boolean':
      case 'bigint':
        return value;
      // These values are not risky.
      case 'string':
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);
      default:
        {
          // JSON.stringify will remove this element.
          return undefined;
        }
    }
  };
}();

var _excluded$w = ["type", "keyOverride", "scriptKey", "scriptId", "dataArray", "useAppDir"];
function JsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Thing' : _ref$type,
    keyOverride = _ref.keyOverride,
    scriptKey = _ref.scriptKey,
    _ref$scriptId = _ref.scriptId,
    scriptId = _ref$scriptId === void 0 ? undefined : _ref$scriptId,
    dataArray = _ref.dataArray,
    _ref$useAppDir = _ref.useAppDir,
    useAppDir = _ref$useAppDir === void 0 ? false : _ref$useAppDir,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$w);
  var JsonLdScript = function JsonLdScript() {
    return /*#__PURE__*/React__default["default"].createElement("script", {
      type: "application/ld+json",
      id: scriptId,
      "data-testid": scriptId,
      dangerouslySetInnerHTML: toJson(type, dataArray === undefined ? _extends({}, rest) : dataArray),
      key: "jsonld-" + scriptKey + (keyOverride ? "-" + keyOverride : '')
    });
  };
  if (useAppDir) {
    return /*#__PURE__*/React__default["default"].createElement(JsonLdScript, null);
  }
  return /*#__PURE__*/React__default["default"].createElement(Head__default["default"], null, JsonLdScript());
}

/**
 * Include name and url
 * @param author
 * @returns
 */
function includeNameAndUrl(author) {
  return typeof author === 'object' && !!(author.name && author.url);
}
/**
 * Generate author information
 * @param author
 * @returns
 */
function generateAuthorInfo(author) {
  if (typeof author === 'string') {
    return {
      '@type': 'Person',
      name: author
    };
  } else if (includeNameAndUrl(author)) {
    return {
      '@type': 'Person',
      name: author.name,
      url: author.url
    };
  }
  return;
}
function setAuthor(author) {
  if (Array.isArray(author)) {
    return author.map(function (item) {
      return generateAuthorInfo(item);
    }).filter(function (item) {
      return !!item;
    });
  } else if (author) {
    return generateAuthorInfo(author);
  }
  return;
}

function setImage(image) {
  if (image) {
    return {
      '@type': 'ImageObject',
      url: image
    };
  }
  return undefined;
}

function setPublisher(publisherName, publisherLogo) {
  if (!publisherName) {
    return undefined;
  }
  return {
    '@type': 'Organization',
    name: publisherName,
    logo: setImage(publisherLogo)
  };
}

function setReviewRating(rating) {
  if (rating) {
    return _extends({}, rating, {
      '@type': 'Rating'
    });
  }
  return undefined;
}

var _excluded$v = ["reviewRating", "author", "publisher"];
function setReviews(reviews) {
  function mapReview(_ref) {
    var reviewRating = _ref.reviewRating,
      author = _ref.author,
      publisher = _ref.publisher,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$v);
    return _extends({}, rest, {
      '@type': 'Review'
    }, author && {
      author: setAuthor(author)
    }, reviewRating && {
      reviewRating: setReviewRating(reviewRating)
    }, publisher && {
      publisher: setPublisher(publisher.name)
    });
  }
  if (Array.isArray(reviews)) {
    return reviews.map(mapReview);
  } else if (reviews) {
    return mapReview(reviews);
  }
  return undefined;
}

function setNutrition(calories) {
  if (calories) {
    return {
      '@type': 'NutritionInformation',
      calories: calories + " calories"
    };
  }
  return undefined;
}

function setAggregateRating(aggregateRating) {
  if (aggregateRating) {
    return {
      '@type': 'AggregateRating',
      ratingCount: aggregateRating.ratingCount,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      ratingValue: aggregateRating.ratingValue
    };
  }
  return undefined;
}

function setClip(clips) {
  function mapClip(clip) {
    return _extends({}, clip, {
      '@type': 'Clip'
    });
  }
  if (Array.isArray(clips)) {
    return clips.map(mapClip);
  } else if (clips) {
    return mapClip(clips);
  }
  return undefined;
}

function setInteractionStatistic(watchCount) {
  if (watchCount) {
    return {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WatchAction',
      userInteractionCount: watchCount
    };
  }
  return undefined;
}

function setBroadcastEvent(publication) {
  function mapBroadcastEvent(publication) {
    return _extends({}, publication, {
      '@type': 'BroadcastEvent'
    });
  }
  if (publication) {
    if (Array.isArray(publication)) {
      return publication.map(mapBroadcastEvent);
    }
    return mapBroadcastEvent(publication);
  }
  return undefined;
}

var _excluded$u = ["thumbnailUrls", "hasPart", "watchCount", "publication"];
function setVideo(video, setContext) {
  if (setContext === void 0) {
    setContext = false;
  }
  function mapVideo(_ref, context) {
    var thumbnailUrls = _ref.thumbnailUrls,
      hasPart = _ref.hasPart,
      watchCount = _ref.watchCount,
      publication = _ref.publication,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$u);
    return _extends({}, rest, {
      '@type': 'VideoObject'
    }, context && {
      '@context': 'https://schema.org'
    }, {
      thumbnailUrl: thumbnailUrls,
      hasPart: setClip(hasPart),
      interactionStatistic: setInteractionStatistic(watchCount),
      publication: setBroadcastEvent(publication)
    });
  }
  if (video) {
    return mapVideo(video, setContext);
  }
  return undefined;
}

function setInstruction(instruction) {
  if (instruction) {
    return _extends({}, instruction, {
      '@type': 'HowToStep'
    });
  }
  return undefined;
}

var _excluded$t = ["type", "keyOverride", "ofType", "data"],
  _excluded2$1 = ["authorName", "images", "yields", "category", "calories", "aggregateRating", "video", "ingredients", "instructions", "cuisine"];
function CarouselJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Carousel' : _ref$type,
    keyOverride = _ref.keyOverride,
    ofType = _ref.ofType,
    data = _ref.data,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$t);
  function generateList(data, ofType) {
    switch (ofType) {
      case 'default':
        return data.map(function (item, index) {
          return {
            '@type': 'ListItem',
            position: "" + (index + 1),
            url: item.url
          };
        });
      case 'course':
        return data.map(function (item, index) {
          return {
            '@type': 'ListItem',
            position: "" + (index + 1),
            item: {
              '@context': 'https://schema.org',
              '@type': 'Course',
              url: item.url,
              name: item.courseName,
              description: item.description,
              provider: {
                '@type': 'Organization',
                name: item.providerName,
                sameAs: item.providerUrl
              }
            }
          };
        });
      case 'movie':
        return data.map(function (item, index) {
          return {
            '@type': 'ListItem',
            position: "" + (index + 1),
            item: {
              '@context': 'https://schema.org',
              '@type': 'Movie',
              name: item.name,
              url: item.url,
              image: item.image,
              dateCreated: item.dateCreated,
              director: item.director ? Array.isArray(item.director) ? item.director.map(function (director) {
                return {
                  '@type': 'Person',
                  name: director.name
                };
              }) : {
                '@type': 'Person',
                name: item.director.name
              } : undefined,
              review: setReviews(item.review)
            }
          };
        });
      case 'recipe':
        return data.map(function (_ref2, index) {
          var authorName = _ref2.authorName,
            images = _ref2.images,
            yields = _ref2.yields,
            category = _ref2.category,
            calories = _ref2.calories,
            aggregateRating = _ref2.aggregateRating,
            video = _ref2.video,
            ingredients = _ref2.ingredients,
            instructions = _ref2.instructions,
            cuisine = _ref2.cuisine,
            rest = _objectWithoutPropertiesLoose(_ref2, _excluded2$1);
          return {
            '@type': 'ListItem',
            position: "" + (index + 1),
            item: _extends({
              '@context': 'https://schema.org',
              '@type': 'Recipe'
            }, rest, {
              author: setAuthor(authorName),
              image: images,
              recipeYield: yields,
              recipeCategory: category,
              recipeCuisine: cuisine,
              nutrition: setNutrition(calories),
              aggregateRating: setAggregateRating(aggregateRating),
              video: setVideo(video),
              recipeIngredient: ingredients,
              recipeInstructions: instructions.map(setInstruction)
            })
          };
        });
    }
  }
  var jsonLdData = _extends({
    '@type': 'ItemList',
    itemListElement: generateList(data, ofType)
  }, rest);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, jsonLdData, {
    scriptKey: "Carousel"
  }));
}

var _excluded$s = ["type", "keyOverride", "url", "title", "images", "section", "dateCreated", "datePublished", "dateModified", "authorName", "publisherName", "publisherLogo", "body", "isAccessibleForFree"];
function NewsArticleJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'NewsArticle' : _ref$type,
    keyOverride = _ref.keyOverride,
    url = _ref.url,
    title = _ref.title,
    images = _ref.images,
    section = _ref.section,
    dateCreated = _ref.dateCreated,
    datePublished = _ref.datePublished,
    dateModified = _ref.dateModified,
    authorName = _ref.authorName,
    publisherName = _ref.publisherName,
    publisherLogo = _ref.publisherLogo,
    body = _ref.body,
    isAccessibleForFree = _ref.isAccessibleForFree,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$s);
  var data = _extends({}, rest, {
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    image: images,
    articleSection: section,
    dateCreated: dateCreated || datePublished,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: setAuthor(authorName),
    publisher: setPublisher(publisherName, publisherLogo),
    articleBody: body,
    isAccessibleForFree: isAccessibleForFree
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "NewsArticle"
  }));
}

var _excluded$r = ["type", "keyOverride", "baseSalary", "hiringOrganization", "applicantLocationRequirements", "experienceRequirements", "jobLocation"];
function JobPostingJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'JobPosting' : _ref$type,
    keyOverride = _ref.keyOverride,
    baseSalary = _ref.baseSalary,
    hiringOrganization = _ref.hiringOrganization,
    applicantLocationRequirements = _ref.applicantLocationRequirements,
    experienceRequirements = _ref.experienceRequirements,
    jobLocation = _ref.jobLocation,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$r);
  function setBaseSalary(baseSalary) {
    if (baseSalary) {
      return {
        '@type': 'MonetaryAmount',
        currency: baseSalary.currency,
        value: _extends({
          '@type': 'QuantitativeValue',
          unitText: baseSalary.unitText
        }, Array.isArray(baseSalary.value) ? {
          minValue: baseSalary.value[0],
          maxValue: baseSalary.value[1]
        } : {
          value: baseSalary.value
        })
      };
    }
    return undefined;
  }
  function setHiringOrganization(org) {
    return {
      '@type': 'Organization',
      name: org.name,
      sameAs: org.sameAs,
      logo: org.logo
    };
  }
  function setJobLocation(location) {
    if (location) {
      return {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: location.addressCountry,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          streetAddress: location.streetAddress
        }
      };
    }
    return undefined;
  }
  function setApplicantLocationRequirements(requirements) {
    if (requirements) {
      return {
        '@type': 'Country',
        name: requirements
      };
    }
    return undefined;
  }
  function setOccupationalExperienceRequirements(requirements) {
    if (requirements) {
      return {
        '@type': requirements['@type'] ? requirements['@type'] : 'OccupationalExperienceRequirements',
        monthsOfExperience: requirements.minimumMonthsOfExperience
      };
    }
    return undefined;
  }
  function setEducationalOccupationalCredential(requirements) {
    if (requirements) {
      return {
        '@type': requirements['@type'] ? requirements['@type'] : 'EducationalOccupationalCredential',
        credentialCategory: requirements.credentialCategory
      };
    }
    return undefined;
  }
  var data = _extends({}, rest, {
    baseSalary: setBaseSalary(baseSalary),
    hiringOrganization: setHiringOrganization(hiringOrganization),
    jobLocation: setJobLocation(jobLocation),
    applicantLocationRequirements: setApplicantLocationRequirements(applicantLocationRequirements),
    experienceRequirements: setOccupationalExperienceRequirements(experienceRequirements == null ? void 0 : experienceRequirements.occupational),
    educationRequirements: setEducationalOccupationalCredential(experienceRequirements == null ? void 0 : experienceRequirements.educational),
    experienceInPlaceOfEducation: experienceRequirements == null ? void 0 : experienceRequirements.experienceInPlaceOfEducation
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "JobPosting"
  }));
}

function setAddress(address) {
  if (!address) return undefined;
  if (!Array.isArray(address)) return toPostalAddress(address);
  // If array of one address, replace with single address
  if (address.length === 1) return toPostalAddress(address[0]);
  // If array, return mapped array of PostalAddresses
  return address.map(toPostalAddress);
}
function toPostalAddress(address) {
  return _extends({
    '@type': 'PostalAddress'
  }, address);
}

function setGeo(geo) {
  if (geo) {
    return _extends({}, geo, {
      '@type': 'GeoCoordinates'
    });
  }
  return undefined;
}

function setAction(action) {
  if (action) {
    return {
      '@type': action.actionType,
      name: action.actionName,
      target: action.target
    };
  }
  return undefined;
}

function setGeoCircle(geoCircle) {
  if (geoCircle) {
    return {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: geoCircle.geoMidpoint.latitude,
        longitude: geoCircle.geoMidpoint.longitude
      },
      geoRadius: geoCircle.geoRadius
    };
  }
  return undefined;
}

function setOffer(offer) {
  function setPriceSpecification(priceSpecification) {
    if (priceSpecification) {
      return {
        '@type': priceSpecification.type,
        priceCurrency: priceSpecification.priceCurrency,
        price: priceSpecification.price
      };
    }
    return undefined;
  }
  function setItemOffered(itemOffered) {
    if (itemOffered) {
      return _extends({}, itemOffered, {
        '@type': 'Service'
      });
    }
    return undefined;
  }
  if (offer) {
    return _extends({}, offer, {
      '@type': 'Offer',
      priceSpecification: setPriceSpecification(offer.priceSpecification),
      itemOffered: setItemOffered(offer.itemOffered)
    });
  }
  return undefined;
}

function setOpeningHours(openingHours) {
  if (openingHours) {
    return _extends({}, openingHours, {
      '@type': 'OpeningHoursSpecification'
    });
  }
  return undefined;
}

var _excluded$q = ["type", "keyOverride", "address", "geo", "rating", "review", "action", "areaServed", "makesOffer", "openingHours", "images"];
function LocalBusinessJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'LocalBusiness' : _ref$type,
    keyOverride = _ref.keyOverride,
    address = _ref.address,
    geo = _ref.geo,
    rating = _ref.rating,
    review = _ref.review,
    action = _ref.action,
    areaServed = _ref.areaServed,
    makesOffer = _ref.makesOffer,
    openingHours = _ref.openingHours,
    images = _ref.images,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$q);
  var data = _extends({}, rest, {
    image: images,
    address: setAddress(address),
    geo: setGeo(geo),
    aggregateRating: setAggregateRating(rating),
    review: setReviews(review),
    potentialAction: setAction(action),
    areaServed: areaServed && areaServed.map(setGeoCircle),
    makesOffer: makesOffer == null ? void 0 : makesOffer.map(setOffer),
    openingHoursSpecification: Array.isArray(openingHours) ? openingHours.map(setOpeningHours) : setOpeningHours(openingHours)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "LocalBusiness"
  }));
}

var _excluded$p = ["type", "keyOverride", "mainEntity"],
  _excluded2 = ["upvoteCount"];
function QAPageJsonLd(_ref) {
  var _mainEntity$author, _mainEntity$acceptedA, _mainEntity$acceptedA2;
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'QAPage' : _ref$type,
    keyOverride = _ref.keyOverride,
    mainEntity = _ref.mainEntity,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$p);
  var data = _extends({}, rest, {
    mainEntity: _extends({}, mainEntity, {
      '@type': 'Question',
      author: setAuthor((_mainEntity$author = mainEntity.author) == null ? void 0 : _mainEntity$author.name)
    }, mainEntity.acceptedAnswer && {
      acceptedAnswer: _extends({}, mainEntity.acceptedAnswer, {
        '@type': 'Answer',
        author: setAuthor((_mainEntity$acceptedA = mainEntity.acceptedAnswer) == null ? void 0 : (_mainEntity$acceptedA2 = _mainEntity$acceptedA.author) == null ? void 0 : _mainEntity$acceptedA2.name)
      })
    }, mainEntity.suggestedAnswer && {
      suggestedAnswer: mainEntity.suggestedAnswer.map(function (_ref2) {
        var _rest$author;
        var upvoteCount = _ref2.upvoteCount,
          rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
        return _extends({}, rest, {
          '@type': 'Answer',
          upvoteCount: upvoteCount || 0,
          author: setAuthor((_rest$author = rest.author) == null ? void 0 : _rest$author.name)
        });
      })
    })
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "QAPage"
  }));
}

function setItemListElements(items) {
  if (items && items.length) {
    return items.map(function (item) {
      return {
        '@type': 'ListItem',
        position: item.position,
        item: {
          '@id': item.item,
          name: item.name
        }
      };
    });
  }
  return undefined;
}

var _excluded$o = ["type", "keyOverride", "breadcrumb"];
function ProfilePageJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'ProfilePage' : _ref$type,
    keyOverride = _ref.keyOverride,
    breadcrumb = _ref.breadcrumb,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$o);
  var data = _extends({}, rest, {
    breadcrumb: Array.isArray(breadcrumb) ? {
      '@type': 'BreadcrumbList',
      itemListElement: setItemListElements(breadcrumb)
    } : breadcrumb
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "ProfilePage"
  }));
}

var _excluded$n = ["type", "keyOverride", "potentialActions"];
function SiteLinksSearchBoxJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'WebSite' : _ref$type,
    keyOverride = _ref.keyOverride,
    potentialActions = _ref.potentialActions,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$n);
  function setPotentialAction(action) {
    if (action) {
      var target = action.target,
        queryInput = action.queryInput;
      return {
        '@type': 'SearchAction',
        target: target + "={" + queryInput + "}",
        'query-input': "required name=" + queryInput
      };
    }
    return undefined;
  }
  var data = _extends({}, rest, {
    potentialAction: potentialActions.map(setPotentialAction)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "jsonld-siteLinksSearchBox"
  }));
}

var _excluded$m = ["type", "keyOverride", "authorName", "images", "yields", "category", "cuisine", "calories", "aggregateRating", "video", "ingredients", "instructions"];
function RecipeJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Recipe' : _ref$type,
    keyOverride = _ref.keyOverride,
    authorName = _ref.authorName,
    images = _ref.images,
    yields = _ref.yields,
    category = _ref.category,
    cuisine = _ref.cuisine,
    calories = _ref.calories,
    aggregateRating = _ref.aggregateRating,
    video = _ref.video,
    ingredients = _ref.ingredients,
    instructions = _ref.instructions,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$m);
  var data = _extends({}, rest, {
    author: setAuthor(authorName),
    image: images,
    recipeYield: yields,
    recipeCategory: category,
    recipeCuisine: cuisine,
    nutrition: setNutrition(calories),
    aggregateRating: setAggregateRating(aggregateRating),
    video: setVideo(video),
    recipeIngredient: ingredients,
    recipeInstructions: instructions ? instructions.map(setInstruction) : undefined
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "recipe"
  }));
}

function setLocation(location) {
  if (!location) {
    return undefined;
  }
  if ('url' in location) {
    return setVirtualLocation(location);
  } else {
    return setPlace(location);
  }
}
function setVirtualLocation(location) {
  return _extends({}, location, {
    '@type': 'VirtualLocation'
  });
}
function setPlace(location) {
  return _extends({}, location, {
    address: setAddress(location.address),
    '@type': 'Place'
  });
}

var _excluded$l = ["type"];
function setPerformer(performer) {
  if (performer) {
    var type = performer.type,
      restPerformer = _objectWithoutPropertiesLoose(performer, _excluded$l);
    return _extends({}, restPerformer, {
      '@type': type || 'PerformingGroup'
    });
  }
  return undefined;
}

var _excluded$k = ["seller"];
function setOffers(offers) {
  function mapOffer(_ref) {
    var seller = _ref.seller,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$k);
    return _extends({}, rest, {
      '@type': 'Offer'
    }, seller && {
      seller: {
        '@type': 'Organization',
        name: seller.name
      }
    });
  }
  if (Array.isArray(offers)) {
    return offers.map(mapOffer);
  } else if (offers) {
    return mapOffer(offers);
  }
  return undefined;
}

function setAggregateOffer(aggregateOffer) {
  if (aggregateOffer) {
    return {
      '@type': 'AggregateOffer',
      priceCurrency: aggregateOffer.priceCurrency,
      highPrice: aggregateOffer.highPrice,
      lowPrice: aggregateOffer.lowPrice,
      offerCount: aggregateOffer.offerCount,
      offers: setOffers(aggregateOffer.offers)
    };
  }
  return undefined;
}

var _excluded$j = ["type"];
function setOrganizer(organizer) {
  if (organizer) {
    var type = organizer.type,
      restOrganizer = _objectWithoutPropertiesLoose(organizer, _excluded$j);
    return _extends({}, restOrganizer, {
      '@type': type || 'Person'
    });
  }
  return undefined;
}

var _excluded$i = ["type", "keyOverride", "location", "images", "offers", "aggregateOffer", "performers", "organizer", "eventStatus", "eventAttendanceMode"];
function EventJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Event' : _ref$type,
    keyOverride = _ref.keyOverride,
    location = _ref.location,
    images = _ref.images,
    offers = _ref.offers,
    aggregateOffer = _ref.aggregateOffer,
    performers = _ref.performers,
    organizer = _ref.organizer,
    eventStatus = _ref.eventStatus,
    eventAttendanceMode = _ref.eventAttendanceMode,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);
  var data = _extends({}, rest, {
    location: setLocation(location),
    image: images,
    offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
    performer: Array.isArray(performers) ? performers.map(setPerformer) : setPerformer(performers),
    organizer: Array.isArray(organizer) ? organizer.map(setOrganizer) : setOrganizer(organizer),
    eventStatus: "https://schema.org/" + eventStatus,
    eventAttendanceMode: "https://schema.org/" + eventAttendanceMode
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "Event"
  }));
}

function setContactPoint(contactPoint) {
  if (contactPoint) {
    return _extends({}, contactPoint, {
      '@type': 'ContactPoint'
    });
  }
  return undefined;
}

var _excluded$h = ["type", "keyOverride", "contactPoint"];
function CorporateContactJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Organization' : _ref$type,
    keyOverride = _ref.keyOverride,
    contactPoint = _ref.contactPoint,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  var data = _extends({}, rest, {
    contactPoint: contactPoint.map(setContactPoint)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "CorporateContact"
  }));
}

function setCreativeWork(creativeWork) {
  if (creativeWork) {
    return _extends({}, creativeWork, {
      '@type': 'CreativeWork'
    });
  }
  return undefined;
}

var _excluded$g = ["type", "keyOverride", "hasPart"];
function CollectionPageJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'CollectionPage' : _ref$type,
    keyOverride = _ref.keyOverride,
    hasPart = _ref.hasPart,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$g);
  var data = _extends({}, rest, {
    hasPart: hasPart.map(setCreativeWork)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "CollectionPage"
  }));
}

function setManufacturer(manufacturer) {
  if (manufacturer && (manufacturer.manufacturerName || manufacturer.manufacturerLogo)) {
    return {
      '@type': 'Organization',
      name: manufacturer.manufacturerName,
      logo: setImage(manufacturer.manufacturerLogo)
    };
  }
  return undefined;
}

function setBrand(brand) {
  if (brand) {
    return {
      '@type': 'Brand',
      name: brand
    };
  }
  return undefined;
}

var _excluded$f = ["type", "keyOverride", "images", "brand", "reviews", "aggregateRating", "manufacturerLogo", "manufacturerName", "offers", "aggregateOffer", "productName"];
function ProductJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Product' : _ref$type,
    keyOverride = _ref.keyOverride,
    images = _ref.images,
    brand = _ref.brand,
    reviews = _ref.reviews,
    aggregateRating = _ref.aggregateRating,
    manufacturerLogo = _ref.manufacturerLogo,
    manufacturerName = _ref.manufacturerName,
    offers = _ref.offers,
    aggregateOffer = _ref.aggregateOffer,
    productName = _ref.productName,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$f);
  var data = _extends({}, rest, {
    image: images,
    brand: setBrand(brand),
    review: setReviews(reviews),
    aggregateRating: setAggregateRating(aggregateRating),
    manufacturer: setManufacturer({
      manufacturerLogo: manufacturerLogo,
      manufacturerName: manufacturerName
    }),
    offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
    name: productName
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "Product"
  }));
}

var _excluded$e = ["type", "keyOverride", "priceCurrency", "price", "aggregateRating", "review"];
function SoftwareAppJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'SoftwareApplication' : _ref$type,
    keyOverride = _ref.keyOverride,
    priceCurrency = _ref.priceCurrency,
    price = _ref.price,
    aggregateRating = _ref.aggregateRating,
    review = _ref.review,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$e);
  var data = _extends({}, rest, {
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: priceCurrency
    },
    aggregateRating: setAggregateRating(aggregateRating),
    review: setReviews(review)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "SoftwareApp"
  }));
}

var _excluded$d = ["type", "keyOverride"];
function VideoJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Video' : _ref$type,
    keyOverride = _ref.keyOverride,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$d);
  var data = setVideo(rest, true);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "Video"
  }));
}

function setProducer(producer) {
  if (producer) {
    return {
      '@type': 'Organization',
      sameAs: producer.url,
      name: producer.name
    };
  }
  return undefined;
}

function setProvider(provider) {
  if (provider) {
    return {
      '@type': provider.type || 'Organization',
      name: provider.name,
      sameAs: provider.url
    };
  }
  return undefined;
}

var _excluded$c = ["type", "keyOverride", "aggregateRating", "trailer", "reviews", "image", "authorName", "provider", "producerName", "producerUrl", "offers", "operatingSystemName", "platformName", "translatorName", "languageName", "genreName", "publisherName"];
function VideoGameJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'VideoGame' : _ref$type,
    keyOverride = _ref.keyOverride,
    aggregateRating = _ref.aggregateRating,
    trailer = _ref.trailer,
    reviews = _ref.reviews,
    image = _ref.image,
    authorName = _ref.authorName,
    provider = _ref.provider,
    producerName = _ref.producerName,
    producerUrl = _ref.producerUrl,
    offers = _ref.offers,
    operatingSystemName = _ref.operatingSystemName,
    platformName = _ref.platformName,
    translatorName = _ref.translatorName,
    languageName = _ref.languageName,
    genreName = _ref.genreName,
    publisherName = _ref.publisherName,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$c);
  var data = _extends({}, rest, {
    aggregateRating: setAggregateRating(aggregateRating),
    trailer: setVideo(trailer),
    review: setReviews(reviews),
    image: setImage(image),
    author: setAuthor(authorName),
    provider: setProvider(provider),
    producer: setProducer({
      name: producerName,
      url: producerUrl
    }),
    offers: setOffers(offers),
    operatingSystem: operatingSystemName,
    gamePlatform: platformName,
    translator: translatorName,
    inLanguage: languageName,
    genre: genreName,
    publisher: publisherName
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "VideoGame"
  }));
}

function setContactPoints(contactPoint) {
  if (contactPoint && contactPoint.length) {
    return contactPoint.map(function (contactPoint) {
      return _extends({
        '@type': 'ContactPoint'
      }, contactPoint);
    });
  }
  return undefined;
}

var _excluded$b = ["type", "keyOverride", "address", "contactPoints", "contactPoint"];
function OrganizationJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Organization' : _ref$type,
    keyOverride = _ref.keyOverride,
    address = _ref.address,
    contactPoints = _ref.contactPoints,
    contactPoint = _ref.contactPoint,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$b);
  var data = _extends({}, rest, {
    address: setAddress(address),
    contactPoint: setContactPoints(contactPoint || contactPoints)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "organization"
  }));
}

function setQuestions(questions) {
  if (questions && questions.length) {
    return questions.map(function (question) {
      return {
        '@type': 'Question',
        name: question.questionName,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.acceptedAnswerText
        }
      };
    });
  }
  return undefined;
}

var _excluded$a = ["type", "keyOverride", "mainEntity"];
function FAQPageJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'FAQPage' : _ref$type,
    keyOverride = _ref.keyOverride,
    mainEntity = _ref.mainEntity,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  var data = _extends({}, rest, {
    mainEntity: setQuestions(mainEntity)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "faq-page"
  }));
}

var _excluded$9 = ["type", "keyOverride"];
function LogoJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Organization' : _ref$type,
    keyOverride = _ref.keyOverride,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, rest, {
    scriptKey: "Logo"
  }));
}

var _excluded$8 = ["type", "keyOverride"];
function DatasetJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Dataset' : _ref$type,
    keyOverride = _ref.keyOverride,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, rest, {
    scriptKey: "dataset"
  }));
}

var _excluded$7 = ["type", "keyOverride", "courseName", "provider"];
function CourseJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Course' : _ref$type,
    keyOverride = _ref.keyOverride,
    courseName = _ref.courseName,
    provider = _ref.provider,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  var data = _extends({
    name: courseName
  }, rest, {
    provider: setProvider(provider)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "course"
  }));
}

var _excluded$6 = ["type", "keyOverride", "itemListElements"];
function BreadCrumbJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'BreadcrumbList' : _ref$type,
    keyOverride = _ref.keyOverride,
    itemListElements = _ref.itemListElements,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  var data = _extends({}, rest, {
    itemListElement: setItemListElements(itemListElements)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "breadcrumb"
  }));
}

var _excluded$5 = ["type", "id", "keyOverride", "aggregateRating"];
function BrandJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Brand' : _ref$type,
    id = _ref.id,
    keyOverride = _ref.keyOverride,
    aggregateRating = _ref.aggregateRating,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  var data = _extends({
    aggregateRating: setAggregateRating(aggregateRating),
    '@id': id
  }, rest);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "brand"
  }));
}

var _excluded$4 = ["type", "keyOverride", "url", "title", "images", "datePublished", "dateModified", "authorName", "publisherName", "publisherLogo", "description", "isAccessibleForFree"];
function ArticleJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Article' : _ref$type,
    keyOverride = _ref.keyOverride,
    url = _ref.url,
    title = _ref.title,
    images = _ref.images,
    datePublished = _ref.datePublished,
    dateModified = _ref.dateModified,
    authorName = _ref.authorName,
    _ref$publisherName = _ref.publisherName,
    publisherName = _ref$publisherName === void 0 ? undefined : _ref$publisherName,
    _ref$publisherLogo = _ref.publisherLogo,
    publisherLogo = _ref$publisherLogo === void 0 ? undefined : _ref$publisherLogo,
    description = _ref.description,
    isAccessibleForFree = _ref.isAccessibleForFree,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  var data = _extends({
    datePublished: datePublished,
    description: description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    image: images,
    dateModified: dateModified || datePublished,
    author: setAuthor(authorName),
    publisher: setPublisher(publisherName, publisherLogo),
    isAccessibleForFree: isAccessibleForFree
  }, rest);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "article"
  }));
}

function setReviewedBy(reviewedBy) {
  if (reviewedBy) {
    return _extends({
      '@type': (reviewedBy == null ? void 0 : reviewedBy.type) || 'Organization'
    }, reviewedBy);
  }
  return undefined;
}

var _excluded$3 = ["keyOverride", "reviewedBy"];
function WebPageJsonLd(_ref) {
  var keyOverride = _ref.keyOverride,
    reviewedBy = _ref.reviewedBy,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  var data = _extends({}, rest, {
    reviewedBy: setReviewedBy(reviewedBy)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    keyOverride: keyOverride
  }, data, {
    type: "WebPage",
    scriptKey: "WebPage"
  }));
}

var _excluded$2 = ["type", "keyOverride"];
function SocialProfileJsonLd(_ref) {
  var type = _ref.type,
    keyOverride = _ref.keyOverride,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, rest, {
    scriptKey: "social"
  }));
}

function setCost(cost) {
  if (cost) {
    return _extends({}, cost, {
      '@type': 'MonetaryAmount'
    });
  }
  return undefined;
}

function setSupply(supply) {
  if (supply) {
    return supply.map(function (supplyItem) {
      return {
        '@type': 'HowToSupply',
        name: supplyItem
      };
    });
  }
  return undefined;
}

function setTool(tool) {
  if (tool) {
    return tool.map(function (toolItem) {
      return {
        '@type': 'HowToTool',
        name: toolItem
      };
    });
  }
  return undefined;
}

function setStep(step) {
  if (step) {
    return step.map(function (stepElement) {
      var itemListElement = stepElement.itemListElement,
        image = stepElement.image;
      var currentListElements = itemListElement == null ? void 0 : itemListElement.map(function (_ref) {
        var type = _ref.type,
          text = _ref.text;
        return {
          '@type': type,
          text: text
        };
      });
      return _extends({}, stepElement, {
        '@type': 'HowToStep',
        itemListElement: currentListElements,
        image: setImage(image)
      });
    });
  }
  return undefined;
}

var _excluded$1 = ["type", "keyOverride", "image", "estimatedCost", "supply", "tool", "step"];
function howToJsonLd(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'HowTo' : _ref$type,
    keyOverride = _ref.keyOverride,
    image = _ref.image,
    estimatedCost = _ref.estimatedCost,
    supply = _ref.supply,
    tool = _ref.tool,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var data = _extends({}, rest, {
    image: setImage(image),
    estimatedCost: setCost(estimatedCost),
    supply: setSupply(supply),
    tool: setTool(tool),
    step: setStep(step)
  });
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({
    type: type,
    keyOverride: keyOverride
  }, data, {
    scriptKey: "howTo"
  }));
}

var _excluded = ["keyOverride", "images"];
function ImageJsonLd(_ref) {
  var keyOverride = _ref.keyOverride,
    images = _ref.images,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React__default["default"].createElement(JsonLd, _extends({}, rest, {
    type: "ImageObject",
    keyOverride: keyOverride,
    dataArray: images,
    scriptKey: "image"
  }));
}

__webpack_unused_export__ = ArticleJsonLd;
__webpack_unused_export__ = BrandJsonLd;
__webpack_unused_export__ = BreadCrumbJsonLd;
__webpack_unused_export__ = CarouselJsonLd;
__webpack_unused_export__ = CollectionPageJsonLd;
__webpack_unused_export__ = CorporateContactJsonLd;
__webpack_unused_export__ = CourseJsonLd;
__webpack_unused_export__ = DatasetJsonLd;
__webpack_unused_export__ = DefaultSeo;
__webpack_unused_export__ = EventJsonLd;
__webpack_unused_export__ = FAQPageJsonLd;
__webpack_unused_export__ = howToJsonLd;
__webpack_unused_export__ = ImageJsonLd;
__webpack_unused_export__ = JobPostingJsonLd;
__webpack_unused_export__ = LocalBusinessJsonLd;
__webpack_unused_export__ = LogoJsonLd;
__webpack_unused_export__ = NewsArticleJsonLd;
exports.PB = NextSeo;
__webpack_unused_export__ = OrganizationJsonLd;
__webpack_unused_export__ = ProductJsonLd;
__webpack_unused_export__ = ProfilePageJsonLd;
__webpack_unused_export__ = QAPageJsonLd;
__webpack_unused_export__ = RecipeJsonLd;
__webpack_unused_export__ = SiteLinksSearchBoxJsonLd;
__webpack_unused_export__ = SocialProfileJsonLd;
__webpack_unused_export__ = SoftwareAppJsonLd;
__webpack_unused_export__ = VideoGameJsonLd;
__webpack_unused_export__ = VideoJsonLd;
__webpack_unused_export__ = WebPageJsonLd;


/***/ }),

/***/ 2562:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var e=__webpack_require__(6689);function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=/*#__PURE__*/t(e);const r=["light","dark"],a="(prefers-color-scheme: dark)",o="undefined"==typeof window,s=/*#__PURE__*/e.createContext(void 0),l={setTheme:e=>{},themes:[]},c=["light","dark"],m=({forcedTheme:t,disableTransitionOnChange:o=!1,enableSystem:l=!0,enableColorScheme:m=!0,storageKey:f="theme",themes:y=c,defaultTheme:v=(l?"system":"light"),attribute:$="data-theme",value:g,children:b,nonce:S})=>{const[T,p]=e.useState(()=>d(f,v)),[w,C]=e.useState(()=>d(f)),E=g?Object.values(g):y,k=e.useCallback(e=>{let t=e;if(!t)return;"system"===e&&l&&(t=h());const n=g?g[t]:t,a=o?u():null,s=document.documentElement;if("class"===$?(s.classList.remove(...E),n&&s.classList.add(n)):n?s.setAttribute($,n):s.removeAttribute($),m){const e=r.includes(v)?v:null,n=r.includes(t)?t:e;s.style.colorScheme=n}null==a||a()},[]),x=e.useCallback(e=>{p(e);try{localStorage.setItem(f,e)}catch(e){}},[t]),L=e.useCallback(e=>{const n=h(e);C(n),"system"===T&&l&&!t&&k("system")},[T,t]);e.useEffect(()=>{const e=window.matchMedia(a);return e.addListener(L),L(e),()=>e.removeListener(L)},[L]),e.useEffect(()=>{const e=e=>{e.key===f&&x(e.newValue||v)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[x]),e.useEffect(()=>{k(null!=t?t:T)},[t,T]);const I=e.useMemo(()=>({theme:T,setTheme:x,forcedTheme:t,resolvedTheme:"system"===T?w:T,themes:l?[...y,"system"]:y,systemTheme:l?w:void 0}),[T,x,t,w,l,y]);/*#__PURE__*/return n.default.createElement(s.Provider,{value:I},/*#__PURE__*/n.default.createElement(i,{forcedTheme:t,disableTransitionOnChange:o,enableSystem:l,enableColorScheme:m,storageKey:f,themes:y,defaultTheme:v,attribute:$,value:g,children:b,attrs:E,nonce:S}),b)},i=/*#__PURE__*/e.memo(({forcedTheme:e,storageKey:t,attribute:o,enableSystem:s,enableColorScheme:l,defaultTheme:c,value:m,attrs:i,nonce:d})=>{const u="system"===c,h="class"===o?`var d=document.documentElement,c=d.classList;c.remove(${i.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${o}',s='setAttribute';`,f=l?r.includes(c)&&c?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${c}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",y=(e,t=!1,n=!0)=>{const a=m?m[e]:e,s=t?e+"|| ''":`'${a}'`;let c="";return l&&n&&!t&&r.includes(e)&&(c+=`d.style.colorScheme = '${e}';`),"class"===o?c+=t||a?`c.add(${s})`:"null":a&&(c+=`d[s](n,${s})`),c},v=e?`!function(){${h}${y(e)}}()`:s?`!function(){try{${h}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${a}',m=window.matchMedia(t);if(m.media!==t||m.matches){${y("dark")}}else{${y("light")}}}else if(e){${m?`var x=${JSON.stringify(m)};`:""}${y(m?"x[e]":"e",!0)}}${u?"":"else{"+y(c,!1,!1)+"}"}${f}}catch(e){}}()`:`!function(){try{${h}var e=localStorage.getItem('${t}');if(e){${m?`var x=${JSON.stringify(m)};`:""}${y(m?"x[e]":"e",!0)}}else{${y(c,!1,!1)};}${f}}catch(t){}}();`;/*#__PURE__*/return n.default.createElement("script",{nonce:d,dangerouslySetInnerHTML:{__html:v}})},()=>!0),d=(e,t)=>{if(o)return;let n;try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t},u=()=>{const e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},h=e=>(e||(e=window.matchMedia(a)),e.matches?"dark":"light");exports.f=t=>e.useContext(s)?/*#__PURE__*/n.default.createElement(e.Fragment,null,t.children):/*#__PURE__*/n.default.createElement(m,t),exports.F=()=>{var t;return null!==(t=e.useContext(s))&&void 0!==t?t:l};


/***/ }),

/***/ 591:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addBasePath = addBasePath;
var _addPathPrefix = __webpack_require__(1751);
var _normalizeTrailingSlash = __webpack_require__(3032);
const basePath =  false || "";
function addBasePath(path, required) {
    if (false) {}
    return (0, _normalizeTrailingSlash).normalizePathTrailingSlash((0, _addPathPrefix).addPathPrefix(path, basePath));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 7759:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addLocale = void 0;
var _normalizeTrailingSlash = __webpack_require__(3032);
const addLocale = (path, ...args)=>{
    if (false) {}
    return path;
};
exports.addLocale = addLocale;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 6325:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.detectDomainLocale = void 0;
const detectDomainLocale = (...args)=>{
    if (false) {}
};
exports.detectDomainLocale = detectDomainLocale;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=detect-domain-locale.js.map


/***/ }),

/***/ 4321:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getDomainLocale = getDomainLocale;
const basePath = (/* unused pure expression or super */ null && ( false || ""));
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-domain-locale.js.map


/***/ }),

/***/ 8031:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.hasBasePath = hasBasePath;
var _pathHasPrefix = __webpack_require__(4567);
const basePath =  false || "";
function hasBasePath(path) {
    return (0, _pathHasPrefix).pathHasPrefix(path, basePath);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-base-path.js.map


/***/ }),

/***/ 9601:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = initHeadManager;
exports.isEqualNode = isEqualNode;
exports.DOMAttributeNames = void 0;
function initHeadManager() {
    return {
        mountedInstances: new Set(),
        updateHead: (head)=>{
            const tags = {};
            head.forEach((h)=>{
                if (// it won't be inlined. In this case revert to the original behavior
                h.type === "link" && h.props["data-optimized-fonts"]) {
                    if (document.querySelector(`style[data-href="${h.props["data-href"]}"]`)) {
                        return;
                    } else {
                        h.props.href = h.props["data-href"];
                        h.props["data-href"] = undefined;
                    }
                }
                const components = tags[h.type] || [];
                components.push(h);
                tags[h.type] = components;
            });
            const titleComponent = tags.title ? tags.title[0] : null;
            let title = "";
            if (titleComponent) {
                const { children  } = titleComponent.props;
                title = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
            }
            if (title !== document.title) document.title = title;
            [
                "meta",
                "base",
                "link",
                "style",
                "script"
            ].forEach((type)=>{
                updateElements(type, tags[type] || []);
            });
        }
    };
}
const DOMAttributeNames = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv",
    noModule: "noModule"
};
exports.DOMAttributeNames = DOMAttributeNames;
function reactElementToDOM({ type , props  }) {
    const el = document.createElement(type);
    for(const p in props){
        if (!props.hasOwnProperty(p)) continue;
        if (p === "children" || p === "dangerouslySetInnerHTML") continue;
        // we don't render undefined props to the DOM
        if (props[p] === undefined) continue;
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (type === "script" && (attr === "async" || attr === "defer" || attr === "noModule")) {
            el[attr] = !!props[p];
        } else {
            el.setAttribute(attr, props[p]);
        }
    }
    const { children , dangerouslySetInnerHTML  } = props;
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || "";
    } else if (children) {
        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
    }
    return el;
}
function isEqualNode(oldTag, newTag) {
    if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
        const nonce = newTag.getAttribute("nonce");
        // Only strip the nonce if `oldTag` has had it stripped. An element's nonce attribute will not
        // be stripped if there is no content security policy response header that includes a nonce.
        if (nonce && !oldTag.getAttribute("nonce")) {
            const cloneTag = newTag.cloneNode(true);
            cloneTag.setAttribute("nonce", "");
            cloneTag.nonce = nonce;
            return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
        }
    }
    return oldTag.isEqualNode(newTag);
}
function updateElements(type, components) {
    const headEl = document.getElementsByTagName("head")[0];
    const headCountEl = headEl.querySelector("meta[name=next-head-count]");
    if (false) {}
    const headCount = Number(headCountEl.content);
    const oldTags = [];
    for(let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null){
        var ref;
        if ((j == null ? void 0 : (ref = j.tagName) == null ? void 0 : ref.toLowerCase()) === type) {
            oldTags.push(j);
        }
    }
    const newTags = components.map(reactElementToDOM).filter((newTag)=>{
        for(let k = 0, len = oldTags.length; k < len; k++){
            const oldTag = oldTags[k];
            if (isEqualNode(oldTag, newTag)) {
                oldTags.splice(k, 1);
                return false;
            }
        }
        return true;
    });
    oldTags.forEach((t)=>{
        var ref;
        return (ref = t.parentNode) == null ? void 0 : ref.removeChild(t);
    });
    newTags.forEach((t)=>headEl.insertBefore(t, headCountEl));
    headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head-manager.js.map


/***/ }),

/***/ 9015:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

"use client";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = Image;
var _extends = (__webpack_require__(5321)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(6687)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(6239)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(6689));
var _head = _interop_require_default(__webpack_require__(4957));
var _imageBlurSvg = __webpack_require__(4486);
var _imageConfig = __webpack_require__(5843);
var _imageConfigContext = __webpack_require__(744);
var _warnOnce = __webpack_require__(618);
var _imageLoader = _interop_require_default(__webpack_require__(9552));
function Image(_param) {
    var { src , sizes , unoptimized =false , priority =false , loading , className , quality , width , height , fill , style , onLoad , onLoadingComplete , placeholder ="empty" , blurDataURL , layout , objectFit , objectPosition , lazyBoundary , lazyRoot  } = _param, all = _object_without_properties_loose(_param, [
        "src",
        "sizes",
        "unoptimized",
        "priority",
        "loading",
        "className",
        "quality",
        "width",
        "height",
        "fill",
        "style",
        "onLoad",
        "onLoadingComplete",
        "placeholder",
        "blurDataURL",
        "layout",
        "objectFit",
        "objectPosition",
        "lazyBoundary",
        "lazyRoot"
    ]);
    const configContext = (0, _react).useContext(_imageConfigContext.ImageConfigContext);
    const config = (0, _react).useMemo(()=>{
        const c = configEnv || configContext || _imageConfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        return _extends({}, c, {
            allSizes,
            deviceSizes
        });
    }, [
        configContext
    ]);
    let rest = all;
    let loader = rest.loader || _imageLoader.default;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    if ("__next_img_default" in loader) {
        // This special value indicates that the user
        // didn't define a "loader" prop or config.
        if (config.loader === "custom") {
            throw new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`);
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        var _tmp;
        _tmp = (obj)=>{
            const { config: _  } = obj, opts = _object_without_properties_loose(obj, [
                "config"
            ]);
            return customImageLoader(opts);
        }, loader = _tmp, _tmp;
    }
    if (layout) {
        if (layout === "fill") {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: "100%",
                height: "auto"
            },
            responsive: {
                width: "100%",
                height: "auto"
            }
        };
        const layoutToSizes = {
            responsive: "100vw",
            fill: "100vw"
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = _extends({}, style, layoutStyle);
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = "";
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio1 = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio1);
            }
        }
    }
    src = typeof src === "string" ? src : staticSrc;
    let isLazy = !priority && (loading === "lazy" || typeof loading === "undefined");
    if (src.startsWith("data:") || src.startsWith("blob:")) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    const [blurComplete, setBlurComplete] = (0, _react).useState(false);
    const [showAltText, setShowAltText] = (0, _react).useState(false);
    const qualityInt = getInt(quality);
    if (false) {}
    const imgStyle = Object.assign(fill ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: "transparent"
    }, style);
    const blurStyle = placeholder === "blur" && blurDataURL && !blurComplete ? {
        backgroundSize: imgStyle.objectFit || "cover",
        backgroundPosition: imgStyle.objectPosition || "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,${(0, _imageBlurSvg).getImageBlurSvg({
            widthInt,
            heightInt,
            blurWidth,
            blurHeight,
            blurDataURL
        })}")`
    } : {};
    if (false) {}
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    let srcString = src;
    if (false) {}
    const linkProps = {
        // @ts-expect-error upgrade react types to react 18
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: rest.crossOrigin
    };
    const onLoadRef = (0, _react).useRef(onLoad);
    (0, _react).useEffect(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react).useRef(onLoadingComplete);
    (0, _react).useEffect(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const imgElementArgs = _extends({
        isLazy,
        imgAttributes,
        heightInt,
        widthInt,
        qualityInt,
        className,
        imgStyle,
        blurStyle,
        loading,
        config,
        fill,
        unoptimized,
        placeholder,
        loader,
        srcString,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        setShowAltText
    }, rest);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(ImageElement, Object.assign({}, imgElementArgs)), priority ? // for browsers that do not support `imagesrcset`, and in those cases
    // it would likely cause the incorrect image to be preloaded.
    //
    // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
    /*#__PURE__*/ _react.default.createElement(_head.default, null, /*#__PURE__*/ _react.default.createElement("link", Object.assign({
        key: "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
        rel: "preload",
        as: "image",
        href: imgAttributes.srcSet ? undefined : imgAttributes.src
    }, linkProps))) : null);
}
"use client";
const configEnv = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":false,"unoptimized":false};
const allImgs = new Map();
let perfObserver;
if (true) {
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
const VALID_LOADING_VALUES = (/* unused pure expression or super */ null && ([
    "lazy",
    "eager",
    undefined
]));
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return typeof src === "object" && (isStaticRequire(src) || isStaticImageData(src));
}
function getWidths({ deviceSizes , allSizes  }, width, sizes) {
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: "w"
            };
        }
        return {
            widths: allSizes,
            kind: "w"
        };
    }
    if (typeof width !== "number") {
        return {
            widths: deviceSizes,
            kind: "w"
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: "x"
    };
}
function generateImgAttrs({ config , src , unoptimized , width , quality , sizes , loader  }) {
    if (unoptimized) {
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths , kind  } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === "w" ? "100vw" : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === "w" ? w : i + 1}${kind}`).join(", "),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getInt(x) {
    if (typeof x === "number" || typeof x === "undefined") {
        return x;
    }
    if (typeof x === "string" && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, src, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized) {
    if (!img || img["data-loaded-src"] === src) {
        return;
    }
    img["data-loaded-src"] = src;
    const p = "decode" in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentNode) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder === "blur") {
            setBlurComplete(true);
        }
        if (onLoadRef == null ? void 0 : onLoadRef.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event("load");
            Object.defineProperty(event, "target", {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current(_extends({}, event, {
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            }));
        }
        if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
            onLoadingCompleteRef.current(img);
        }
        if (false) {}
    });
}
const ImageElement = (_param)=>{
    var { imgAttributes , heightInt , widthInt , qualityInt , className , imgStyle , blurStyle , isLazy , fill , placeholder , loading , srcString , config , unoptimized , loader , onLoadRef , onLoadingCompleteRef , setBlurComplete , setShowAltText , onLoad , onError  } = _param, rest = _object_without_properties_loose(_param, [
        "imgAttributes",
        "heightInt",
        "widthInt",
        "qualityInt",
        "className",
        "imgStyle",
        "blurStyle",
        "isLazy",
        "fill",
        "placeholder",
        "loading",
        "srcString",
        "config",
        "unoptimized",
        "loader",
        "onLoadRef",
        "onLoadingCompleteRef",
        "setBlurComplete",
        "setShowAltText",
        "onLoad",
        "onError"
    ]);
    loading = isLazy ? "lazy" : loading;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
        width: widthInt,
        height: heightInt,
        decoding: "async",
        "data-nimg": fill ? "fill" : "1",
        className: className,
        // @ts-ignore - TODO: upgrade to `@types/react@17`
        loading: loading,
        style: _extends({}, imgStyle, blurStyle),
        ref: (0, _react).useCallback((img)=>{
            if (!img) {
                return;
            }
            if (onError) {
                // If the image has an error before react hydrates, then the error is lost.
                // The workaround is to wait until the image is mounted which is after hydration,
                // then we set the src again to trigger the error handler (if there was an error).
                // eslint-disable-next-line no-self-assign
                img.src = img.src;
            }
            if (false) {}
            if (img.complete) {
                handleLoading(img, srcString, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
            }
        }, [
            srcString,
            placeholder,
            onLoadRef,
            onLoadingCompleteRef,
            setBlurComplete,
            onError,
            unoptimized
        ]),
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, srcString, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder === "blur") {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    })));
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image.js.map


/***/ }),

/***/ 7457:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

"use client";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(6239)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(6689));
var _router = __webpack_require__(5692);
var _formatUrl = __webpack_require__(3938);
var _addLocale = __webpack_require__(7759);
var _routerContext = __webpack_require__(4964);
var _appRouterContext = __webpack_require__(3280);
var _useIntersection = __webpack_require__(5068);
var _getDomainLocale = __webpack_require__(4321);
var _addBasePath = __webpack_require__(591);
"use client";
const prefetched = new Set();
function prefetch(router, href, as, options) {
    if (true) {
        return;
    }
    if (!(0, _router).isLocalURL(href)) {
        return;
    }
    // We should only dedupe requests when experimental.optimisticClientCache is
    // disabled.
    if (!options.bypassPrefetchedCheck) {
        const locale = typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : undefined;
        const prefetchedKey = href + "%" + as + "%" + locale;
        // If we've already fetched the key, then don't prefetch it again!
        if (prefetched.has(prefetchedKey)) {
            return;
        }
        // Mark this URL as prefetched.
        prefetched.add(prefetchedKey);
    }
    // Prefetch the JSON page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    Promise.resolve(router.prefetch(href, as, options)).catch((err)=>{
        if (false) {}
    });
}
function isModifiedEvent(event) {
    const { target  } = event.currentTarget;
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
    const { nodeName  } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || !(0, _router).isLocalURL(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                forceOptimisticNavigation: !prefetchEnabled
            });
        }
    };
    if (isAppRouter) {
        // @ts-expect-error startTransition exists.
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
        return urlObjOrString;
    }
    return (0, _formatUrl).formatUrl(urlObjOrString);
}
/**
 * React Component that enables client-side transitions between routes.
 */ const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    if (false) {}
    let children;
    const { href: hrefProp , as: asProp , children: childrenProp , prefetch: prefetchProp , passHref , replace , shallow , scroll , locale , onClick , onMouseEnter: onMouseEnterProp , onTouchStart: onTouchStartProp , legacyBehavior =Boolean(true) !== true  } = props, restProps = _object_without_properties_loose(props, [
        "href",
        "as",
        "children",
        "prefetch",
        "passHref",
        "replace",
        "shallow",
        "scroll",
        "locale",
        "onClick",
        "onMouseEnter",
        "onTouchStart",
        "legacyBehavior"
    ]);
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /*#__PURE__*/ _react.default.createElement("a", null, children);
    }
    const prefetchEnabled = prefetchProp !== false;
    const pagesRouter = _react.default.useContext(_routerContext.RouterContext);
    const appRouter = _react.default.useContext(_appRouterContext.AppRouterContext);
    const router = pagesRouter != null ? pagesRouter : appRouter;
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const { href , as  } = _react.default.useMemo(()=>{
        if (!pagesRouter) {
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
        const [resolvedHref1, resolvedAs] = (0, _router).resolveHref(pagesRouter, hrefProp, true);
        return {
            href: resolvedHref1,
            as: asProp ? (0, _router).resolveHref(pagesRouter, asProp) : resolvedAs || resolvedHref1
        };
    }, [
        pagesRouter,
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (false) {} else {
            child = _react.default.Children.only(children);
        }
    } else {
        if (false) { var ref; }
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useIntersection).useIntersection({
        rootMargin: "200px"
    });
    const setRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
            if (typeof childRef === "function") childRef(el);
            else if (typeof childRef === "object") {
                childRef.current = el;
            }
        }
    }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        if (!router) {
            return;
        }
        // If we don't need to prefetch the URL, don't do prefetch.
        if (!isVisible || !prefetchEnabled) {
            return;
        }
        // Prefetch the URL.
        prefetch(router, href, as, {
            locale
        });
    }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if (false) {}
            if (!legacyBehavior && typeof onClick === "function") {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            });
        },
        onTouchStart (e) {
            if (!legacyBehavior && typeof onTouchStartProp === "function") {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            });
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user
    if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        // we only render domain locales if we are currently on a domain locale
        // so that locale links are still visitable in development/preview envs
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getDomainLocale).getDomainLocale(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addBasePath).addBasePath((0, _addLocale).addLocale(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ _react.default.createElement("a", Object.assign({}, restProps, childProps), children);
});
var _default = Link;
exports["default"] = _default;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map


/***/ }),

/***/ 3032:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.normalizePathTrailingSlash = void 0;
var _removeTrailingSlash = __webpack_require__(3297);
var _parsePath = __webpack_require__(8854);
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith("/") || undefined) {
        return path;
    }
    const { pathname , query , hash  } = (0, _parsePath).parsePath(path);
    if (false) {}
    return `${(0, _removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
};
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 96:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.removeBasePath = removeBasePath;
var _hasBasePath = __webpack_require__(8031);
const basePath =  false || "";
function removeBasePath(path) {
    if (false) {}
    path = path.slice(basePath.length);
    if (!path.startsWith("/")) path = `/${path}`;
    return path;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-base-path.js.map


/***/ }),

/***/ 7924:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.removeLocale = removeLocale;
var _parsePath = __webpack_require__(8854);
function removeLocale(path, locale) {
    if (false) {}
    return path;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-locale.js.map


/***/ }),

/***/ 1461:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
exports.requestIdleCallback = requestIdleCallback;
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
exports.cancelIdleCallback = cancelIdleCallback;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 597:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.createRouteLoader = createRouteLoader;
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _getAssetPathFromRoute = _interop_require_default(__webpack_require__(9565));
var _trustedTypes = __webpack_require__(526);
var _requestIdleCallback = __webpack_require__(1461);
// 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.
const MS_MAX_IDLE_DELAY = 3800;
function withFuture(key, map, generator) {
    let entry = map.get(key);
    if (entry) {
        if ("future" in entry) {
            return entry.future;
        }
        return Promise.resolve(entry);
    }
    let resolver;
    const prom = new Promise((resolve)=>{
        resolver = resolve;
    });
    map.set(key, entry = {
        resolve: resolver,
        future: prom
    });
    return generator ? generator() // eslint-disable-next-line no-sequences
    .then((value)=>(resolver(value), value)).catch((err)=>{
        map.delete(key);
        throw err;
    }) : prom;
}
const ASSET_LOAD_ERROR = Symbol("ASSET_LOAD_ERROR");
function markAssetError(err) {
    return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}
function isAssetError(err) {
    return err && ASSET_LOAD_ERROR in err;
}
function hasPrefetch(link) {
    try {
        link = document.createElement("link");
        return(// with relList.support
        !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports("prefetch"));
    } catch (e) {
        return false;
    }
}
const canPrefetch = hasPrefetch();
function prefetchViaDom(href, as, link) {
    return new Promise((resolve, reject)=>{
        const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
        if (document.querySelector(selector)) {
            return resolve();
        }
        link = document.createElement("link");
        // The order of property assignment here is intentional:
        if (as) link.as = as;
        link.rel = `prefetch`;
        link.crossOrigin = undefined;
        link.onload = resolve;
        link.onerror = ()=>reject(markAssetError(new Error(`Failed to prefetch: ${href}`)));
        // `href` should always be last:
        link.href = href;
        document.head.appendChild(link);
    });
}
function appendScript(src, script) {
    return new Promise((resolve, reject)=>{
        script = document.createElement("script");
        // The order of property assignment here is intentional.
        // 1. Setup success/failure hooks in case the browser synchronously
        //    executes when `src` is set.
        script.onload = resolve;
        script.onerror = ()=>reject(markAssetError(new Error(`Failed to load script: ${src}`)));
        // 2. Configure the cross-origin attribute before setting `src` in case the
        //    browser begins to fetch.
        script.crossOrigin = undefined;
        // 3. Finally, set the source and inject into the DOM in case the child
        //    must be appended for fetching to start.
        script.src = src;
        document.body.appendChild(script);
    });
}
// We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.
let devBuildPromise;
// Resolve a promise that times out after given amount of milliseconds.
function resolvePromiseWithTimeout(p, ms, err) {
    return new Promise((resolve, reject)=>{
        let cancelled = false;
        p.then((r)=>{
            // Resolved, cancel the timeout
            cancelled = true;
            resolve(r);
        }).catch(reject);
        // We wrap these checks separately for better dead-code elimination in
        // production bundles.
        if (false) {}
        if (true) {
            (0, _requestIdleCallback).requestIdleCallback(()=>setTimeout(()=>{
                    if (!cancelled) {
                        reject(err);
                    }
                }, ms));
        }
    });
}
function getClientBuildManifest() {
    if (self.__BUILD_MANIFEST) {
        return Promise.resolve(self.__BUILD_MANIFEST);
    }
    const onBuildManifest = new Promise((resolve)=>{
        // Mandatory because this is not concurrent safe:
        const cb = self.__BUILD_MANIFEST_CB;
        self.__BUILD_MANIFEST_CB = ()=>{
            resolve(self.__BUILD_MANIFEST);
            cb && cb();
        };
    });
    return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client build manifest")));
}
function getFilesForRoute(assetPrefix, route) {
    if (false) {}
    return getClientBuildManifest().then((manifest)=>{
        if (!(route in manifest)) {
            throw markAssetError(new Error(`Failed to lookup route: ${route}`));
        }
        const allFiles = manifest[route].map((entry)=>assetPrefix + "/_next/" + encodeURI(entry));
        return {
            scripts: allFiles.filter((v)=>v.endsWith(".js")).map((v)=>(0, _trustedTypes).__unsafeCreateTrustedScriptURL(v)),
            css: allFiles.filter((v)=>v.endsWith(".css"))
        };
    });
}
function createRouteLoader(assetPrefix) {
    const entrypoints = new Map();
    const loadedScripts = new Map();
    const styleSheets = new Map();
    const routes = new Map();
    function maybeExecuteScript(src) {
        // With HMR we might need to "reload" scripts when they are
        // disposed and readded. Executing scripts twice has no functional
        // differences
        if (true) {
            let prom = loadedScripts.get(src.toString());
            if (prom) {
                return prom;
            }
            // Skip executing script if it's already in the DOM:
            if (document.querySelector(`script[src^="${src}"]`)) {
                return Promise.resolve();
            }
            loadedScripts.set(src.toString(), prom = appendScript(src));
            return prom;
        } else {}
    }
    function fetchStyleSheet(href) {
        let prom = styleSheets.get(href);
        if (prom) {
            return prom;
        }
        styleSheets.set(href, prom = fetch(href).then((res)=>{
            if (!res.ok) {
                throw new Error(`Failed to load stylesheet: ${href}`);
            }
            return res.text().then((text)=>({
                    href: href,
                    content: text
                }));
        }).catch((err)=>{
            throw markAssetError(err);
        }));
        return prom;
    }
    return {
        whenEntrypoint (route) {
            return withFuture(route, entrypoints);
        },
        onEntrypoint (route, execute) {
            (execute ? Promise.resolve().then(()=>execute()).then((exports1)=>({
                    component: exports1 && exports1.default || exports1,
                    exports: exports1
                }), (err)=>({
                    error: err
                })) : Promise.resolve(undefined)).then((input)=>{
                const old = entrypoints.get(route);
                if (old && "resolve" in old) {
                    if (input) {
                        entrypoints.set(route, input);
                        old.resolve(input);
                    }
                } else {
                    if (input) {
                        entrypoints.set(route, input);
                    } else {
                        entrypoints.delete(route);
                    }
                    // when this entrypoint has been resolved before
                    // the route is outdated and we want to invalidate
                    // this cache entry
                    routes.delete(route);
                }
            });
        },
        loadRoute (route, prefetch) {
            return withFuture(route, routes, ()=>{
                let devBuildPromiseResolve;
                if (false) {}
                return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({ scripts , css  })=>{
                    return Promise.all([
                        entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)),
                        Promise.all(css.map(fetchStyleSheet))
                    ]);
                }).then((res)=>{
                    return this.whenEntrypoint(route).then((entrypoint)=>({
                            entrypoint,
                            styles: res[1]
                        }));
                }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({ entrypoint , styles  })=>{
                    const res = Object.assign({
                        styles: styles
                    }, entrypoint);
                    return "error" in entrypoint ? entrypoint : res;
                }).catch((err)=>{
                    if (prefetch) {
                        // we don't want to cache errors during prefetch
                        throw err;
                    }
                    return {
                        error: err
                    };
                }).finally(()=>{
                    return devBuildPromiseResolve == null ? void 0 : devBuildPromiseResolve();
                });
            });
        },
        prefetch (route) {
            // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
            // License: Apache 2.0
            let cn;
            if (cn = navigator.connection) {
                // Don't prefetch if using 2G or if Save-Data is enabled.
                if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
            }
            return getFilesForRoute(assetPrefix, route).then((output)=>Promise.all(canPrefetch ? output.scripts.map((script)=>prefetchViaDom(script.toString(), "script")) : [])).then(()=>{
                (0, _requestIdleCallback).requestIdleCallback(()=>this.loadRoute(route, true).catch(()=>{}));
            }).catch(()=>{});
        }
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=route-loader.js.map


/***/ }),

/***/ 921:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

"use client";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.handleClientScriptLoad = handleClientScriptLoad;
exports.initScriptLoader = initScriptLoader;
exports["default"] = void 0;
var _extends = (__webpack_require__(5321)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(6687)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(6239)/* ["default"] */ .Z);
var _reactDom = _interop_require_default(__webpack_require__(6405));
var _react = _interop_require_wildcard(__webpack_require__(6689));
var _headManagerContext = __webpack_require__(2796);
var _headManager = __webpack_require__(9601);
var _requestIdleCallback = __webpack_require__(1461);
"use client";
const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = [
    "onLoad",
    "onReady",
    "dangerouslySetInnerHTML",
    "children",
    "onError",
    "strategy"
];
const loadScript = (props)=>{
    const { src , id , onLoad =()=>{} , onReady =null , dangerouslySetInnerHTML , children ="" , strategy ="afterInteractive" , onError  } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    /** Execute after the script first loaded */ const afterLoad = ()=>{
        // Run onReady for the first time after load event
        if (onReady) {
            onReady();
        }
        // add cacheKey to LoadCache when load successfully
        LoadCache.add(cacheKey);
    };
    const el = document.createElement("script");
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener("load", function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
            afterLoad();
        });
        el.addEventListener("error", function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        el.innerHTML = dangerouslySetInnerHTML.__html || "";
        afterLoad();
    } else if (children) {
        el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
        afterLoad();
    } else if (src) {
        el.src = src;
        // do not add cacheKey into LoadCache for remote script here
        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
        ScriptCache.set(src, loadPromise);
    }
    for (const [k, value] of Object.entries(props)){
        if (value === undefined || ignoreProps.includes(k)) {
            continue;
        }
        const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
        el.setAttribute(attr, value);
    }
    if (strategy === "worker") {
        el.setAttribute("type", "text/partytown");
    }
    el.setAttribute("data-nscript", strategy);
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy ="afterInteractive"  } = props;
    if (strategy === "lazyOnload") {
        window.addEventListener("load", ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props));
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === "complete") {
        (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props));
    } else {
        window.addEventListener("load", ()=>{
            (0, _requestIdleCallback).requestIdleCallback(()=>loadScript(props));
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute("src");
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
function Script(props) {
    const { id , src ="" , onLoad =()=>{} , onReady =null , strategy ="afterInteractive" , onError  } = props, restProps = _object_without_properties_loose(props, [
        "id",
        "src",
        "onLoad",
        "onReady",
        "strategy",
        "onError"
    ]);
    // Context is available only during SSR
    const { updateScripts , scripts , getIsSsr , appDir , nonce  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
    /**
   * - First mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
   *      Once the script is loaded, the onLoad and onReady will be called by then
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   *
   * - Second mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
   *      onReady is called, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. The script is already loaded, loadScript bails out
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   */ const hasOnReadyEffectCalled = (0, _react).useRef(false);
    (0, _react).useEffect(()=>{
        const cacheKey = id || src;
        if (!hasOnReadyEffectCalled.current) {
            // Run onReady if script has loaded before but component is re-mounted
            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
                onReady();
            }
            hasOnReadyEffectCalled.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    const hasLoadScriptEffectCalled = (0, _react).useRef(false);
    (0, _react).useEffect(()=>{
        if (!hasLoadScriptEffectCalled.current) {
            if (strategy === "afterInteractive") {
                loadScript(props);
            } else if (strategy === "lazyOnload") {
                loadLazyScript(props);
            }
            hasLoadScriptEffectCalled.current = true;
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === "beforeInteractive" || strategy === "worker") {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                _extends({
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError
                }, restProps)
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript(props);
        }
    }
    // For the app directory, we need React Float to preload these scripts.
    if (appDir) {
        // Before interactive scripts need to be loaded by Next.js' runtime instead
        // of native <script> tags, because they no longer have `defer`.
        if (strategy === "beforeInteractive") {
            if (!src) {
                // For inlined scripts, we put the content in `children`.
                if (restProps.dangerouslySetInnerHTML) {
                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
                    delete restProps.dangerouslySetInnerHTML;
                }
                return /*#__PURE__*/ _react.default.createElement("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            0,
                            _extends({}, restProps)
                        ])})`
                    }
                });
            }
            // @ts-ignore
            _reactDom.default.preload(src, restProps.integrity ? {
                as: "script",
                integrity: restProps.integrity
            } : {
                as: "script"
            });
            return /*#__PURE__*/ _react.default.createElement("script", {
                nonce: nonce,
                dangerouslySetInnerHTML: {
                    __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                        src
                    ])})`
                }
            });
        } else if (strategy === "afterInteractive") {
            if (src) {
                // @ts-ignore
                _reactDom.default.preload(src, restProps.integrity ? {
                    as: "script",
                    integrity: restProps.integrity
                } : {
                    as: "script"
                });
            }
        }
    }
    return null;
}
Object.defineProperty(Script, "__nextScript", {
    value: true
});
var _default = Script;
exports["default"] = _default;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map


/***/ }),

/***/ 526:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.__unsafeCreateTrustedScriptURL = __unsafeCreateTrustedScriptURL;
/**
 * Stores the Trusted Types Policy. Starts as undefined and can be set to null
 * if Trusted Types is not supported in the browser.
 */ let policy;
/**
 * Getter for the Trusted Types Policy. If it is undefined, it is instantiated
 * here or set to null if Trusted Types is not supported in the browser.
 */ function getPolicy() {
    if (typeof policy === "undefined" && "undefined" !== "undefined") { var ref; }
    return policy;
}
function __unsafeCreateTrustedScriptURL(url) {
    var ref;
    return ((ref = getPolicy()) == null ? void 0 : ref.createScriptURL(url)) || url;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=trusted-types.js.map


/***/ }),

/***/ 5068:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useIntersection = useIntersection;
var _react = __webpack_require__(6689);
var _requestIdleCallback = __webpack_require__(1461);
const hasIntersectionObserver = typeof IntersectionObserver === "function";
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id , observer , elements  } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection({ rootRef , rootMargin , disabled  }) {
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react).useState(false);
    const [element, setElement] = (0, _react).useState(null);
    (0, _react).useEffect(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestIdleCallback).requestIdleCallback(()=>setVisible(true));
                return ()=>(0, _requestIdleCallback).cancelIdleCallback(idleCallback);
            }
        }
    }, [
        element,
        isDisabled,
        rootMargin,
        rootRef,
        visible
    ]);
    const resetVisible = (0, _react).useCallback(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


/***/ }),

/***/ 5692:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.matchesMiddleware = matchesMiddleware;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.createKey = createKey;
exports["default"] = void 0;
var _async_to_generator = (__webpack_require__(9219)/* ["default"] */ .Z);
var _extends = (__webpack_require__(5321)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(1322)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(6687)/* ["default"] */ .Z);
var _normalizeTrailingSlash = __webpack_require__(3032);
var _removeTrailingSlash = __webpack_require__(3297);
var _routeLoader = __webpack_require__(597);
var _script = __webpack_require__(921);
var _isError = _interop_require_wildcard(__webpack_require__(4067));
var _denormalizePagePath = __webpack_require__(4406);
var _normalizeLocalePath = __webpack_require__(4014);
var _mitt = _interop_require_default(__webpack_require__(8020));
var _utils = __webpack_require__(9232);
var _isDynamic = __webpack_require__(1428);
var _parseRelativeUrl = __webpack_require__(1292);
var _querystring = __webpack_require__(979);
var _resolveRewrites = _interop_require_default(__webpack_require__(6052));
var _routeMatcher = __webpack_require__(4226);
var _routeRegex = __webpack_require__(5052);
var _formatUrl = __webpack_require__(3938);
var _detectDomainLocale = __webpack_require__(6325);
var _parsePath = __webpack_require__(8854);
var _addLocale = __webpack_require__(7759);
var _removeLocale = __webpack_require__(7924);
var _removeBasePath = __webpack_require__(96);
var _addBasePath = __webpack_require__(591);
var _hasBasePath = __webpack_require__(8031);
var _getNextPathnameInfo = __webpack_require__(5789);
var _formatNextPathnameInfo = __webpack_require__(299);
var _compareStates = __webpack_require__(6220);
var _isBot = __webpack_require__(1897);
function buildCancellationError() {
    return Object.assign(new Error("Route Cancelled"), {
        cancelled: true
    });
}
function matchesMiddleware(options) {
    return _matchesMiddleware.apply(this, arguments);
}
function _matchesMiddleware() {
    _matchesMiddleware = _async_to_generator(function*(options) {
        const matchers = yield Promise.resolve(options.router.pageLoader.getMiddleware());
        if (!matchers) return false;
        const { pathname: asPathname  } = (0, _parsePath).parsePath(options.asPath);
        // remove basePath first since path prefix has to be in the order of `/${basePath}/${locale}`
        const cleanedAs = (0, _hasBasePath).hasBasePath(asPathname) ? (0, _removeBasePath).removeBasePath(asPathname) : asPathname;
        const asWithBasePathAndLocale = (0, _addBasePath).addBasePath((0, _addLocale).addLocale(cleanedAs, options.locale));
        // Check only path match on client. Matching "has" should be done on server
        // where we can access more info such as headers, HttpOnly cookie, etc.
        return matchers.some((m)=>new RegExp(m.regexp).test(asWithBasePathAndLocale));
    });
    return _matchesMiddleware.apply(this, arguments);
}
function stripOrigin(url) {
    const origin = (0, _utils).getLocationOrigin();
    return url.startsWith(origin) ? url.substring(origin.length) : url;
}
function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key)=>{
        if (!keys.includes(key)) {
            omitted[key] = object[key];
        }
    });
    return omitted;
}
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils).isAbsoluteUrl(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils).getLocationOrigin();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasBasePath).hasBasePath(resolved.pathname);
    } catch (_) {
        return false;
    }
}
function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = "";
    const dynamicRegex = (0, _routeRegex).getRouteRegex(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : "") || // Fall back to reading the values from the href
    // TODO: should this take priority; also need to change in the router.
    query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param)=>{
        let value = dynamicMatches[param] || "";
        const { repeat , optional  } = dynamicGroups[param];
        // support single-level catch-all
        // TODO: more robust handling for user-error (passing `/`)
        let replaced = `[${repeat ? "..." : ""}${param}]`;
        if (optional) {
            replaced = `${!value ? "/" : ""}[${replaced}]`;
        }
        if (repeat && !Array.isArray(value)) value = [
            value
        ];
        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(// path delimiter escaped since they are being inserted
        // into the URL and we expect URL encoded segments
        // when parsing dynamic route params
        (segment)=>encodeURIComponent(segment)).join("/") : encodeURIComponent(value)) || "/");
    })) {
        interpolatedRoute = "" // did not satisfy all requirements
        ;
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
    }
    return {
        params,
        result: interpolatedRoute
    };
}
function resolveHref(router, href, resolveAs) {
    // we use a dummy base url for relative urls
    let base;
    let urlAsString = typeof href === "string" ? href : (0, _formatUrl).formatWithValidation(href);
    // repeated slashes and backslashes in the URL are considered
    // invalid and will never match a Next.js page/file
    const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split("?");
    if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
        console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
        const normalizedUrl = (0, _utils).normalizeRepeatedSlashes(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
    }
    // Return because it cannot be routed by the Next.js router
    if (!isLocalURL(urlAsString)) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
    try {
        base = new URL(urlAsString.startsWith("#") ? router.asPath : router.pathname, "http://n");
    } catch (_) {
        // fallback to / for invalid asPath values e.g. //
        base = new URL("/", "http://n");
    }
    try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
        let interpolatedAs = "";
        if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
            const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
            const { result , params  } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);
            if (result) {
                interpolatedAs = (0, _formatUrl).formatWithValidation({
                    pathname: result,
                    hash: finalUrl.hash,
                    query: omit(query, params)
                });
            }
        }
        // if the origin didn't change, it means we received a relative href
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
            resolvedHref,
            interpolatedAs || resolvedHref
        ] : resolvedHref;
    } catch (_1) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
}
function prepareUrlAs(router, url, as) {
    // If url and as provided as an object representation,
    // we'll format them into the string version here.
    let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
    const origin = (0, _utils).getLocationOrigin();
    const hrefHadOrigin = resolvedHref.startsWith(origin);
    const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
    resolvedHref = stripOrigin(resolvedHref);
    resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
    const preparedUrl = hrefHadOrigin ? resolvedHref : (0, _addBasePath).addBasePath(resolvedHref);
    const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
    return {
        url: preparedUrl,
        as: asHadOrigin ? preparedAs : (0, _addBasePath).addBasePath(preparedAs)
    };
}
function resolveDynamicRoute(pathname, pages) {
    const cleanPathname = (0, _removeTrailingSlash).removeTrailingSlash((0, _denormalizePagePath).denormalizePagePath(pathname));
    if (cleanPathname === "/404" || cleanPathname === "/_error") {
        return pathname;
    }
    // handle resolving href for dynamic routes
    if (!pages.includes(cleanPathname)) {
        // eslint-disable-next-line array-callback-return
        pages.some((page)=>{
            if ((0, _isDynamic).isDynamicRoute(page) && (0, _routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
                pathname = page;
                return true;
            }
        });
    }
    return (0, _removeTrailingSlash).removeTrailingSlash(pathname);
}
function getMiddlewareData(source, response, options) {
    const nextConfig = {
        basePath: options.router.basePath,
        i18n: {
            locales: options.router.locales
        },
        trailingSlash: Boolean(false)
    };
    const rewriteHeader = response.headers.get("x-nextjs-rewrite");
    let rewriteTarget = rewriteHeader || response.headers.get("x-nextjs-matched-path");
    const matchedPath = response.headers.get("x-matched-path");
    if (matchedPath && !rewriteTarget && !matchedPath.includes("__next_data_catchall") && !matchedPath.includes("/_error") && !matchedPath.includes("/404")) {
        // leverage x-matched-path to detect next.config.js rewrites
        rewriteTarget = matchedPath;
    }
    if (rewriteTarget) {
        if (rewriteTarget.startsWith("/")) {
            const parsedRewriteTarget = (0, _parseRelativeUrl).parseRelativeUrl(rewriteTarget);
            const pathnameInfo = (0, _getNextPathnameInfo).getNextPathnameInfo(parsedRewriteTarget.pathname, {
                nextConfig,
                parseData: true
            });
            let fsPathname = (0, _removeTrailingSlash).removeTrailingSlash(pathnameInfo.pathname);
            return Promise.all([
                options.router.pageLoader.getPageList(),
                (0, _routeLoader).getClientBuildManifest()
            ]).then(([pages, { __rewrites: rewrites  }])=>{
                let as = (0, _addLocale).addLocale(pathnameInfo.pathname, pathnameInfo.locale);
                if ((0, _isDynamic).isDynamicRoute(as) || !rewriteHeader && pages.includes((0, _normalizeLocalePath).normalizeLocalePath((0, _removeBasePath).removeBasePath(as), options.router.locales).pathname)) {
                    const parsedSource = (0, _getNextPathnameInfo).getNextPathnameInfo((0, _parseRelativeUrl).parseRelativeUrl(source).pathname, {
                        parseData: true
                    });
                    as = (0, _addBasePath).addBasePath(parsedSource.pathname);
                    parsedRewriteTarget.pathname = as;
                }
                if (false) {} else if (!pages.includes(fsPathname)) {
                    const resolvedPathname = resolveDynamicRoute(fsPathname, pages);
                    if (resolvedPathname !== fsPathname) {
                        fsPathname = resolvedPathname;
                    }
                }
                const resolvedHref = !pages.includes(fsPathname) ? resolveDynamicRoute((0, _normalizeLocalePath).normalizeLocalePath((0, _removeBasePath).removeBasePath(parsedRewriteTarget.pathname), options.router.locales).pathname, pages) : fsPathname;
                if ((0, _isDynamic).isDynamicRoute(resolvedHref)) {
                    const matches = (0, _routeMatcher).getRouteMatcher((0, _routeRegex).getRouteRegex(resolvedHref))(as);
                    Object.assign(parsedRewriteTarget.query, matches || {});
                }
                return {
                    type: "rewrite",
                    parsedAs: parsedRewriteTarget,
                    resolvedHref
                };
            });
        }
        const src = (0, _parsePath).parsePath(source);
        const pathname = (0, _formatNextPathnameInfo).formatNextPathnameInfo(_extends({}, (0, _getNextPathnameInfo).getNextPathnameInfo(src.pathname, {
            nextConfig,
            parseData: true
        }), {
            defaultLocale: options.router.defaultLocale,
            buildId: ""
        }));
        return Promise.resolve({
            type: "redirect-external",
            destination: `${pathname}${src.query}${src.hash}`
        });
    }
    const redirectTarget = response.headers.get("x-nextjs-redirect");
    if (redirectTarget) {
        if (redirectTarget.startsWith("/")) {
            const src1 = (0, _parsePath).parsePath(redirectTarget);
            const pathname1 = (0, _formatNextPathnameInfo).formatNextPathnameInfo(_extends({}, (0, _getNextPathnameInfo).getNextPathnameInfo(src1.pathname, {
                nextConfig,
                parseData: true
            }), {
                defaultLocale: options.router.defaultLocale,
                buildId: ""
            }));
            return Promise.resolve({
                type: "redirect-internal",
                newAs: `${pathname1}${src1.query}${src1.hash}`,
                newUrl: `${pathname1}${src1.query}${src1.hash}`
            });
        }
        return Promise.resolve({
            type: "redirect-external",
            destination: redirectTarget
        });
    }
    return Promise.resolve({
        type: "next"
    });
}
function withMiddlewareEffects(options) {
    return matchesMiddleware(options).then((matches)=>{
        if (matches && options.fetchData) {
            return options.fetchData().then((data)=>getMiddlewareData(data.dataHref, data.response, options).then((effect)=>({
                        dataHref: data.dataHref,
                        cacheKey: data.cacheKey,
                        json: data.json,
                        response: data.response,
                        text: data.text,
                        effect
                    }))).catch((_err)=>{
                /**
           * TODO: Revisit this in the future.
           * For now we will not consider middleware data errors to be fatal.
           * maybe we should revisit in the future.
           */ return null;
            });
        }
        return null;
    });
}
const manualScrollRestoration = (/* unused pure expression or super */ null && ( false && 0));
const SSG_DATA_NOT_FOUND = Symbol("SSG_DATA_NOT_FOUND");
function fetchRetry(url, attempts, options) {
    return fetch(url, {
        // Cookies are required to be present for Next.js' SSG "Preview Mode".
        // Cookies may also be required for `getServerSideProps`.
        //
        // > `fetch` won’t send cookies, unless you set the credentials init
        // > option.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        //
        // > For maximum browser compatibility when it comes to sending &
        // > receiving cookies, always supply the `credentials: 'same-origin'`
        // > option instead of relying on the default.
        // https://github.com/github/fetch#caveats
        credentials: "same-origin",
        method: options.method || "GET",
        headers: Object.assign({}, options.headers, {
            "x-nextjs-data": "1"
        })
    }).then((response)=>{
        return !response.ok && attempts > 1 && response.status >= 500 ? fetchRetry(url, attempts - 1, options) : response;
    });
}
function handleSmoothScroll(fn) {
    const htmlElement = document.documentElement;
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = "auto";
    fn();
    htmlElement.style.scrollBehavior = existing;
}
function tryToParseAsJSON(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return null;
    }
}
function fetchNextData({ dataHref , inflightCache , isPrefetch , hasMiddleware , isServerRender , parseJSON , persistCache , isBackground , unstable_skipClientCache  }) {
    const { href: cacheKey  } = new URL(dataHref, window.location.href);
    var ref1;
    const getData = (params)=>{
        return fetchRetry(dataHref, isServerRender ? 3 : 1, {
            headers: Object.assign({}, isPrefetch ? {
                purpose: "prefetch"
            } : {}, isPrefetch && hasMiddleware ? {
                "x-middleware-prefetch": "1"
            } : {}),
            method: (ref1 = params == null ? void 0 : params.method) != null ? ref1 : "GET"
        }).then((response)=>{
            if (response.ok && (params == null ? void 0 : params.method) === "HEAD") {
                return {
                    dataHref,
                    response,
                    text: "",
                    json: {},
                    cacheKey
                };
            }
            return response.text().then((text)=>{
                if (!response.ok) {
                    /**
             * When the data response is a redirect because of a middleware
             * we do not consider it an error. The headers must bring the
             * mapped location.
             * TODO: Change the status code in the handler.
             */ if (hasMiddleware && [
                        301,
                        302,
                        307,
                        308
                    ].includes(response.status)) {
                        return {
                            dataHref,
                            response,
                            text,
                            json: {},
                            cacheKey
                        };
                    }
                    if (!hasMiddleware && response.status === 404) {
                        var ref;
                        if ((ref = tryToParseAsJSON(text)) == null ? void 0 : ref.notFound) {
                            return {
                                dataHref,
                                json: {
                                    notFound: SSG_DATA_NOT_FOUND
                                },
                                response,
                                text,
                                cacheKey
                            };
                        }
                    }
                    const error = new Error(`Failed to load static props`);
                    /**
             * We should only trigger a server-side transition if this was
             * caused on a client-side transition. Otherwise, we'd get into
             * an infinite loop.
             */ if (!isServerRender) {
                        (0, _routeLoader).markAssetError(error);
                    }
                    throw error;
                }
                return {
                    dataHref,
                    json: parseJSON ? tryToParseAsJSON(text) : null,
                    response,
                    text,
                    cacheKey
                };
            });
        }).then((data)=>{
            if (!persistCache || "production" !== "production" || data.response.headers.get("x-middleware-cache") === "no-cache") {
                delete inflightCache[cacheKey];
            }
            return data;
        }).catch((err)=>{
            if (!unstable_skipClientCache) {
                delete inflightCache[cacheKey];
            }
            if (err.message === "Failed to fetch") {
                (0, _routeLoader).markAssetError(err);
            }
            throw err;
        });
    };
    // when skipping client cache we wait to update
    // inflight cache until successful data response
    // this allows racing click event with fetching newer data
    // without blocking navigation when stale data is available
    if (unstable_skipClientCache && persistCache) {
        return getData({}).then((data)=>{
            inflightCache[cacheKey] = Promise.resolve(data);
            return data;
        });
    }
    if (inflightCache[cacheKey] !== undefined) {
        return inflightCache[cacheKey];
    }
    return inflightCache[cacheKey] = getData(isBackground ? {
        method: "HEAD"
    } : {});
}
function createKey() {
    return Math.random().toString(36).slice(2, 10);
}
function handleHardNavigation({ url , router  }) {
    // ensure we don't trigger a hard navigation to the same
    // URL as this can end up with an infinite refresh
    if (url === (0, _addBasePath).addBasePath((0, _addLocale).addLocale(router.asPath, router.locale))) {
        throw new Error(`Invariant: attempted to hard navigate to the same URL ${url} ${location.href}`);
    }
    window.location.href = url;
}
const getCancelledHandler = ({ route , router  })=>{
    let cancelled = false;
    const cancel = router.clc = ()=>{
        cancelled = true;
    };
    const handleCancelled = ()=>{
        if (cancelled) {
            const error = new Error(`Abort fetching component for route: "${route}"`);
            error.cancelled = true;
            throw error;
        }
        if (cancel === router.clc) {
            router.clc = null;
        }
    };
    return handleCancelled;
};
class Router {
    reload() {
        window.location.reload();
    }
    /**
   * Go back in history
   */ back() {
        window.history.back();
    }
    /**
   * Go forward in history
   */ forward() {
        window.history.forward();
    }
    /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ push(url, as, options = {}) {
        if (false) {}
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change("pushState", url, as, options);
    }
    /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */ replace(url, as, options = {}) {
        ({ url , as  } = prepareUrlAs(this, url, as));
        return this.change("replaceState", url, as, options);
    }
    change(method, url, as, options, forcedScroll) {
        var _this = this;
        return _async_to_generator(function*() {
            if (!isLocalURL(url)) {
                handleHardNavigation({
                    url,
                    router: _this
                });
                return false;
            }
            // WARNING: `_h` is an internal option for handing Next.js client-side
            // hydration. Your app should _never_ use this property. It may change at
            // any time without notice.
            const isQueryUpdating = options._h;
            let shouldResolveHref = isQueryUpdating || options._shouldResolveHref || (0, _parsePath).parsePath(url).pathname === (0, _parsePath).parsePath(as).pathname;
            const nextState = _extends({}, _this.state);
            // for static pages with query params in the URL we delay
            // marking the router ready until after the query is updated
            // or a navigation has occurred
            const readyStateChange = _this.isReady !== true;
            _this.isReady = true;
            const isSsr = _this.isSsr;
            if (!isQueryUpdating) {
                _this.isSsr = false;
            }
            // if a route transition is already in progress before
            // the query updating is triggered ignore query updating
            if (isQueryUpdating && _this.clc) {
                return false;
            }
            const prevLocale = nextState.locale;
            if (false) { var ref; }
            // marking route changes as a navigation start entry
            if (_utils.ST) {
                performance.mark("routeChange");
            }
            const { shallow =false , scroll =true  } = options;
            const routeProps = {
                shallow
            };
            if (_this._inFlightRoute && _this.clc) {
                if (!isSsr) {
                    Router.events.emit("routeChangeError", buildCancellationError(), _this._inFlightRoute, routeProps);
                }
                _this.clc();
                _this.clc = null;
            }
            as = (0, _addBasePath).addBasePath((0, _addLocale).addLocale((0, _hasBasePath).hasBasePath(as) ? (0, _removeBasePath).removeBasePath(as) : as, options.locale, _this.defaultLocale));
            const cleanedAs = (0, _removeLocale).removeLocale((0, _hasBasePath).hasBasePath(as) ? (0, _removeBasePath).removeBasePath(as) : as, nextState.locale);
            _this._inFlightRoute = as;
            const localeChange = prevLocale !== nextState.locale;
            // If the url change is only related to a hash change
            // We should not proceed. We should only change the state.
            if (!isQueryUpdating && _this.onlyAHashChange(cleanedAs) && !localeChange) {
                nextState.asPath = cleanedAs;
                Router.events.emit("hashChangeStart", as, routeProps);
                // TODO: do we need the resolved href when only a hash change?
                _this.changeState(method, url, as, _extends({}, options, {
                    scroll: false
                }));
                if (scroll) {
                    _this.scrollToHash(cleanedAs);
                }
                try {
                    yield _this.set(nextState, _this.components[nextState.route], null);
                } catch (err) {
                    if ((0, _isError).default(err) && err.cancelled) {
                        Router.events.emit("routeChangeError", err, cleanedAs, routeProps);
                    }
                    throw err;
                }
                Router.events.emit("hashChangeComplete", as, routeProps);
                return true;
            }
            let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
            let { pathname , query  } = parsed;
            // The build manifest needs to be loaded before auto-static dynamic pages
            // get their query parameters to allow ensuring they can be parsed properly
            // when rewritten to
            let pages, rewrites;
            try {
                [pages, { __rewrites: rewrites  }] = yield Promise.all([
                    _this.pageLoader.getPageList(),
                    (0, _routeLoader).getClientBuildManifest(),
                    _this.pageLoader.getMiddleware()
                ]);
            } catch (err1) {
                // If we fail to resolve the page list or client-build manifest, we must
                // do a server-side transition:
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                return false;
            }
            // If asked to change the current URL we should reload the current page
            // (not location.reload() but reload getInitialProps and other Next.js stuffs)
            // We also need to set the method = replaceState always
            // as this should not go into the history (That's how browsers work)
            // We should compare the new asPath to the current asPath, not the url
            if (!_this.urlIsNew(cleanedAs) && !localeChange) {
                method = "replaceState";
            }
            // we need to resolve the as value using rewrites for dynamic SSG
            // pages to allow building the data URL correctly
            let resolvedAs = as;
            // url and as should always be prefixed with basePath by this
            // point by either next/link or router.push/replace so strip the
            // basePath from the pathname to match the pages dir 1-to-1
            pathname = pathname ? (0, _removeTrailingSlash).removeTrailingSlash((0, _removeBasePath).removeBasePath(pathname)) : pathname;
            let route = (0, _removeTrailingSlash).removeTrailingSlash(pathname);
            const parsedAsPathname = as.startsWith("/") && (0, _parseRelativeUrl).parseRelativeUrl(as).pathname;
            const isMiddlewareRewrite = !!(parsedAsPathname && route !== parsedAsPathname && (!(0, _isDynamic).isDynamicRoute(route) || !(0, _routeMatcher).getRouteMatcher((0, _routeRegex).getRouteRegex(route))(parsedAsPathname)));
            // we don't attempt resolve asPath when we need to execute
            // middleware as the resolving will occur server-side
            const isMiddlewareMatch = yield matchesMiddleware({
                asPath: as,
                locale: nextState.locale,
                router: _this
            });
            if (options.shallow && isMiddlewareMatch) {
                pathname = _this.pathname;
            }
            if (isQueryUpdating && isMiddlewareMatch) {
                shouldResolveHref = false;
            }
            if (shouldResolveHref && pathname !== "/_error") {
                options._shouldResolveHref = true;
                if (false) {} else {
                    parsed.pathname = resolveDynamicRoute(pathname, pages);
                    if (parsed.pathname !== pathname) {
                        pathname = parsed.pathname;
                        parsed.pathname = (0, _addBasePath).addBasePath(pathname);
                        if (!isMiddlewareMatch) {
                            url = (0, _formatUrl).formatWithValidation(parsed);
                        }
                    }
                }
            }
            if (!isLocalURL(as)) {
                if (false) {}
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                return false;
            }
            resolvedAs = (0, _removeLocale).removeLocale((0, _removeBasePath).removeBasePath(resolvedAs), nextState.locale);
            route = (0, _removeTrailingSlash).removeTrailingSlash(pathname);
            let routeMatch = false;
            if ((0, _isDynamic).isDynamicRoute(route)) {
                const parsedAs1 = (0, _parseRelativeUrl).parseRelativeUrl(resolvedAs);
                const asPathname = parsedAs1.pathname;
                const routeRegex = (0, _routeRegex).getRouteRegex(route);
                routeMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(asPathname);
                const shouldInterpolate = route === asPathname;
                const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};
                if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
                    const missingParams = Object.keys(routeRegex.groups).filter((param)=>!query[param] && !routeRegex.groups[param].optional);
                    if (missingParams.length > 0 && !isMiddlewareMatch) {
                        if (false) {}
                        throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? "href-interpolation-failed" : "incompatible-href-as"}`);
                    }
                } else if (shouldInterpolate) {
                    as = (0, _formatUrl).formatWithValidation(Object.assign({}, parsedAs1, {
                        pathname: interpolatedAs.result,
                        query: omit(query, interpolatedAs.params)
                    }));
                } else {
                    // Merge params into `query`, overwriting any specified in search
                    Object.assign(query, routeMatch);
                }
            }
            if (!isQueryUpdating) {
                Router.events.emit("routeChangeStart", as, routeProps);
            }
            try {
                var ref2, ref3;
                let routeInfo = yield _this.getRouteInfo({
                    route,
                    pathname,
                    query,
                    as,
                    resolvedAs,
                    routeProps,
                    locale: nextState.locale,
                    isPreview: nextState.isPreview,
                    hasMiddleware: isMiddlewareMatch,
                    unstable_skipClientCache: options.unstable_skipClientCache,
                    isQueryUpdating: isQueryUpdating && !_this.isFallback,
                    isMiddlewareRewrite
                });
                if ("route" in routeInfo && isMiddlewareMatch) {
                    pathname = routeInfo.route || route;
                    route = pathname;
                    if (!routeProps.shallow) {
                        query = Object.assign({}, routeInfo.query || {}, query);
                    }
                    const cleanedParsedPathname = (0, _hasBasePath).hasBasePath(parsed.pathname) ? (0, _removeBasePath).removeBasePath(parsed.pathname) : parsed.pathname;
                    if (routeMatch && pathname !== cleanedParsedPathname) {
                        Object.keys(routeMatch).forEach((key)=>{
                            if (routeMatch && query[key] === routeMatch[key]) {
                                delete query[key];
                            }
                        });
                    }
                    if ((0, _isDynamic).isDynamicRoute(pathname)) {
                        const prefixedAs = !routeProps.shallow && routeInfo.resolvedAs ? routeInfo.resolvedAs : (0, _addBasePath).addBasePath((0, _addLocale).addLocale(new URL(as, location.href).pathname, nextState.locale), true);
                        let rewriteAs = prefixedAs;
                        if ((0, _hasBasePath).hasBasePath(rewriteAs)) {
                            rewriteAs = (0, _removeBasePath).removeBasePath(rewriteAs);
                        }
                        if (false) {}
                        const routeRegex1 = (0, _routeRegex).getRouteRegex(pathname);
                        const curRouteMatch = (0, _routeMatcher).getRouteMatcher(routeRegex1)(new URL(rewriteAs, location.href).pathname);
                        if (curRouteMatch) {
                            Object.assign(query, curRouteMatch);
                        }
                    }
                }
                // If the routeInfo brings a redirect we simply apply it.
                if ("type" in routeInfo) {
                    if (routeInfo.type === "redirect-internal") {
                        return _this.change(method, routeInfo.newUrl, routeInfo.newAs, options);
                    } else {
                        handleHardNavigation({
                            url: routeInfo.destination,
                            router: _this
                        });
                        return new Promise(()=>{});
                    }
                }
                let { error , props , __N_SSG , __N_SSP  } = routeInfo;
                const component = routeInfo.Component;
                if (component && component.unstable_scriptLoader) {
                    const scripts = [].concat(component.unstable_scriptLoader());
                    scripts.forEach((script)=>{
                        (0, _script).handleClientScriptLoad(script.props);
                    });
                }
                // handle redirect on client-transition
                if ((__N_SSG || __N_SSP) && props) {
                    if (props.pageProps && props.pageProps.__N_REDIRECT) {
                        // Use the destination from redirect without adding locale
                        options.locale = false;
                        const destination = props.pageProps.__N_REDIRECT;
                        // check if destination is internal (resolves to a page) and attempt
                        // client-navigation if it is falling back to hard navigation if
                        // it's not
                        if (destination.startsWith("/") && props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
                            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
                            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
                            const { url: newUrl , as: newAs  } = prepareUrlAs(_this, destination, destination);
                            return _this.change(method, newUrl, newAs, options);
                        }
                        handleHardNavigation({
                            url: destination,
                            router: _this
                        });
                        return new Promise(()=>{});
                    }
                    nextState.isPreview = !!props.__N_PREVIEW;
                    // handle SSG data 404
                    if (props.notFound === SSG_DATA_NOT_FOUND) {
                        let notFoundRoute;
                        try {
                            yield _this.fetchComponent("/404");
                            notFoundRoute = "/404";
                        } catch (_) {
                            notFoundRoute = "/_error";
                        }
                        routeInfo = yield _this.getRouteInfo({
                            route: notFoundRoute,
                            pathname: notFoundRoute,
                            query,
                            as,
                            resolvedAs,
                            routeProps: {
                                shallow: false
                            },
                            locale: nextState.locale,
                            isPreview: nextState.isPreview
                        });
                        if ("type" in routeInfo) {
                            throw new Error(`Unexpected middleware effect on /404`);
                        }
                    }
                }
                Router.events.emit("beforeHistoryChange", as, routeProps);
                _this.changeState(method, url, as, options);
                if (isQueryUpdating && pathname === "/_error" && ((ref2 = self.__NEXT_DATA__.props) == null ? void 0 : (ref3 = ref2.pageProps) == null ? void 0 : ref3.statusCode) === 500 && (props == null ? void 0 : props.pageProps)) {
                    // ensure statusCode is still correct for static 500 page
                    // when updating query information
                    props.pageProps.statusCode = 500;
                }
                var _route;
                // shallow routing is only allowed for same page URL changes.
                const isValidShallowRoute = options.shallow && nextState.route === ((_route = routeInfo.route) != null ? _route : route);
                var _scroll;
                const shouldScroll = (_scroll = options.scroll) != null ? _scroll : !options._h && !isValidShallowRoute;
                const resetScroll = shouldScroll ? {
                    x: 0,
                    y: 0
                } : null;
                // the new state that the router gonna set
                const upcomingRouterState = _extends({}, nextState, {
                    route,
                    pathname,
                    query,
                    asPath: cleanedAs,
                    isFallback: false
                });
                const upcomingScrollState = forcedScroll != null ? forcedScroll : resetScroll;
                // for query updates we can skip it if the state is unchanged and we don't
                // need to scroll
                // https://github.com/vercel/next.js/issues/37139
                const canSkipUpdating = options._h && !upcomingScrollState && !readyStateChange && !localeChange && (0, _compareStates).compareRouterStates(upcomingRouterState, _this.state);
                if (!canSkipUpdating) {
                    yield _this.set(upcomingRouterState, routeInfo, upcomingScrollState).catch((e)=>{
                        if (e.cancelled) error = error || e;
                        else throw e;
                    });
                    if (error) {
                        if (!isQueryUpdating) {
                            Router.events.emit("routeChangeError", error, cleanedAs, routeProps);
                        }
                        throw error;
                    }
                    if (false) {}
                    if (!isQueryUpdating) {
                        Router.events.emit("routeChangeComplete", as, routeProps);
                    }
                    // A hash mark # is the optional last part of a URL
                    const hashRegex = /#.+$/;
                    if (shouldScroll && hashRegex.test(as)) {
                        _this.scrollToHash(as);
                    }
                }
                return true;
            } catch (err11) {
                if ((0, _isError).default(err11) && err11.cancelled) {
                    return false;
                }
                throw err11;
            }
        })();
    }
    changeState(method, url, as, options = {}) {
        if (false) {}
        if (method !== "pushState" || (0, _utils).getURL() !== as) {
            this._shallow = options.shallow;
            window.history[method]({
                url,
                as,
                options,
                __N: true,
                key: this._key = method !== "pushState" ? this._key : createKey()
            }, // Passing the empty string here should be safe against future changes to the method.
            // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
            "", as);
        }
    }
    handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
        var _this = this;
        return _async_to_generator(function*() {
            console.error(err);
            if (err.cancelled) {
                // bubble up cancellation errors
                throw err;
            }
            if ((0, _routeLoader).isAssetError(err) || loadErrorFail) {
                Router.events.emit("routeChangeError", err, as, routeProps);
                // If we can't load the page it could be one of following reasons
                //  1. Page doesn't exists
                //  2. Page does exist in a different zone
                //  3. Internal error while loading the page
                // So, doing a hard reload is the proper way to deal with this.
                handleHardNavigation({
                    url: as,
                    router: _this
                });
                // Changing the URL doesn't block executing the current code path.
                // So let's throw a cancellation error stop the routing logic.
                throw buildCancellationError();
            }
            try {
                let props;
                const { page: Component , styleSheets  } = yield _this.fetchComponent("/_error");
                const routeInfo = {
                    props,
                    Component,
                    styleSheets,
                    err,
                    error: err
                };
                if (!routeInfo.props) {
                    try {
                        routeInfo.props = yield _this.getInitialProps(Component, {
                            err,
                            pathname,
                            query
                        });
                    } catch (gipErr) {
                        console.error("Error in error page `getInitialProps`: ", gipErr);
                        routeInfo.props = {};
                    }
                }
                return routeInfo;
            } catch (routeInfoErr) {
                return _this.handleRouteInfoError((0, _isError).default(routeInfoErr) ? routeInfoErr : new Error(routeInfoErr + ""), pathname, query, as, routeProps, true);
            }
        })();
    }
    getRouteInfo({ route: requestedRoute , pathname , query , as , resolvedAs , routeProps , locale , hasMiddleware , isPreview , unstable_skipClientCache , isQueryUpdating , isMiddlewareRewrite  }) {
        var _this = this;
        return _async_to_generator(function*() {
            /**
     * This `route` binding can change if there's a rewrite
     * so we keep a reference to the original requested route
     * so we can store the cache for it and avoid re-requesting every time
     * for shallow routing purposes.
     */ let route = requestedRoute;
            try {
                var ref, ref4, ref5, ref6;
                const handleCancelled = getCancelledHandler({
                    route,
                    router: _this
                });
                let existingInfo = _this.components[route];
                if (routeProps.shallow && existingInfo && _this.route === route) {
                    return existingInfo;
                }
                if (hasMiddleware) {
                    existingInfo = undefined;
                }
                let cachedRouteInfo = existingInfo && !("initial" in existingInfo) && "production" !== "development" ? existingInfo : undefined;
                const isBackground = isQueryUpdating;
                const fetchNextDataParams = {
                    dataHref: _this.pageLoader.getDataHref({
                        href: (0, _formatUrl).formatWithValidation({
                            pathname,
                            query
                        }),
                        skipInterpolation: true,
                        asPath: resolvedAs,
                        locale
                    }),
                    hasMiddleware: true,
                    isServerRender: _this.isSsr,
                    parseJSON: true,
                    inflightCache: isBackground ? _this.sbc : _this.sdc,
                    persistCache: !isPreview,
                    isPrefetch: false,
                    unstable_skipClientCache,
                    isBackground
                };
                const data = isQueryUpdating && !isMiddlewareRewrite ? {} : yield withMiddlewareEffects({
                    fetchData: ()=>fetchNextData(fetchNextDataParams),
                    asPath: resolvedAs,
                    locale: locale,
                    router: _this
                }).catch((err)=>{
                    // we don't hard error during query updating
                    // as it's un-necessary and doesn't need to be fatal
                    // unless it is a fallback route and the props can't
                    // be loaded
                    if (isQueryUpdating) {
                        return {};
                    }
                    throw err;
                });
                if (isQueryUpdating) {
                    data.json = self.__NEXT_DATA__.props;
                }
                handleCancelled();
                if ((data == null ? void 0 : (ref = data.effect) == null ? void 0 : ref.type) === "redirect-internal" || (data == null ? void 0 : (ref4 = data.effect) == null ? void 0 : ref4.type) === "redirect-external") {
                    return data.effect;
                }
                if ((data == null ? void 0 : (ref5 = data.effect) == null ? void 0 : ref5.type) === "rewrite") {
                    const resolvedRoute = (0, _removeTrailingSlash).removeTrailingSlash(data.effect.resolvedHref);
                    const pages = yield _this.pageLoader.getPageList();
                    // during query updating the page must match although during
                    // client-transition a redirect that doesn't match a page
                    // can be returned and this should trigger a hard navigation
                    // which is valid for incremental migration
                    if (!isQueryUpdating || pages.includes(resolvedRoute)) {
                        route = resolvedRoute;
                        pathname = data.effect.resolvedHref;
                        query = _extends({}, query, data.effect.parsedAs.query);
                        resolvedAs = (0, _removeBasePath).removeBasePath((0, _normalizeLocalePath).normalizeLocalePath(data.effect.parsedAs.pathname, _this.locales).pathname);
                        // Check again the cache with the new destination.
                        existingInfo = _this.components[route];
                        if (routeProps.shallow && existingInfo && _this.route === route && !hasMiddleware) {
                            // If we have a match with the current route due to rewrite,
                            // we can copy the existing information to the rewritten one.
                            // Then, we return the information along with the matched route.
                            return _extends({}, existingInfo, {
                                route
                            });
                        }
                    }
                }
                if (route === "/api" || route.startsWith("/api/")) {
                    handleHardNavigation({
                        url: as,
                        router: _this
                    });
                    return new Promise(()=>{});
                }
                const routeInfo = cachedRouteInfo || (yield _this.fetchComponent(route).then((res)=>({
                        Component: res.page,
                        styleSheets: res.styleSheets,
                        __N_SSG: res.mod.__N_SSG,
                        __N_SSP: res.mod.__N_SSP
                    })));
                if (false) {}
                const wasBailedPrefetch = data == null ? void 0 : (ref6 = data.response) == null ? void 0 : ref6.headers.get("x-middleware-skip");
                const shouldFetchData = routeInfo.__N_SSG || routeInfo.__N_SSP;
                // For non-SSG prefetches that bailed before sending data
                // we clear the cache to fetch full response
                if (wasBailedPrefetch) {
                    delete _this.sdc[data == null ? void 0 : data.dataHref];
                }
                const { props , cacheKey  } = yield _this._getData(_async_to_generator(function*() {
                    if (shouldFetchData) {
                        const { json , cacheKey: _cacheKey  } = (data == null ? void 0 : data.json) && !wasBailedPrefetch ? data : yield fetchNextData({
                            dataHref: (data == null ? void 0 : data.json) ? data == null ? void 0 : data.dataHref : _this.pageLoader.getDataHref({
                                href: (0, _formatUrl).formatWithValidation({
                                    pathname,
                                    query
                                }),
                                asPath: resolvedAs,
                                locale
                            }),
                            isServerRender: _this.isSsr,
                            parseJSON: true,
                            inflightCache: wasBailedPrefetch ? {} : _this.sdc,
                            persistCache: !isPreview,
                            isPrefetch: false,
                            unstable_skipClientCache
                        });
                        return {
                            cacheKey: _cacheKey,
                            props: json || {}
                        };
                    }
                    return {
                        headers: {},
                        cacheKey: "",
                        props: yield _this.getInitialProps(routeInfo.Component, {
                            pathname,
                            query,
                            asPath: as,
                            locale,
                            locales: _this.locales,
                            defaultLocale: _this.defaultLocale
                        })
                    };
                }));
                // Only bust the data cache for SSP routes although
                // middleware can skip cache per request with
                // x-middleware-cache: no-cache as well
                if (routeInfo.__N_SSP && fetchNextDataParams.dataHref) {
                    delete _this.sdc[cacheKey];
                }
                // we kick off a HEAD request in the background
                // when a non-prefetch request is made to signal revalidation
                if (!_this.isPreview && routeInfo.__N_SSG && "production" !== "development" && !isQueryUpdating) {
                    fetchNextData(Object.assign({}, fetchNextDataParams, {
                        isBackground: true,
                        persistCache: false,
                        inflightCache: _this.sbc
                    })).catch(()=>{});
                }
                props.pageProps = Object.assign({}, props.pageProps);
                routeInfo.props = props;
                routeInfo.route = route;
                routeInfo.query = query;
                routeInfo.resolvedAs = resolvedAs;
                _this.components[route] = routeInfo;
                return routeInfo;
            } catch (err) {
                return _this.handleRouteInfoError((0, _isError).getProperError(err), pathname, query, as, routeProps);
            }
        })();
    }
    set(state, data, resetScroll) {
        this.state = state;
        return this.sub(data, this.components["/_app"].Component, resetScroll);
    }
    /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */ beforePopState(cb) {
        this._bps = cb;
    }
    onlyAHashChange(as) {
        if (!this.asPath) return false;
        const [oldUrlNoHash, oldHash] = this.asPath.split("#");
        const [newUrlNoHash, newHash] = as.split("#");
        // Makes sure we scroll to the provided hash if the url/hash are the same
        if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
            return true;
        }
        // If the urls are change, there's more than a hash change
        if (oldUrlNoHash !== newUrlNoHash) {
            return false;
        }
        // If the hash has changed, then it's a hash only change.
        // This check is necessary to handle both the enter and
        // leave hash === '' cases. The identity case falls through
        // and is treated as a next reload.
        return oldHash !== newHash;
    }
    scrollToHash(as) {
        const [, hash = ""] = as.split("#");
        // Scroll to top if the hash is just `#` with no value or `#top`
        // To mirror browsers
        if (hash === "" || hash === "top") {
            handleSmoothScroll(()=>window.scrollTo(0, 0));
            return;
        }
        // Decode hash to make non-latin anchor works.
        const rawHash = decodeURIComponent(hash);
        // First we check if the element by id is found
        const idEl = document.getElementById(rawHash);
        if (idEl) {
            handleSmoothScroll(()=>idEl.scrollIntoView());
            return;
        }
        // If there's no element with the id, we check the `name` property
        // To mirror browsers
        const nameEl = document.getElementsByName(rawHash)[0];
        if (nameEl) {
            handleSmoothScroll(()=>nameEl.scrollIntoView());
        }
    }
    urlIsNew(asPath) {
        return this.asPath !== asPath;
    }
    /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */ prefetch(url, asPath = url, options = {}) {
        var _this = this;
        return _async_to_generator(function*() {
            if (false) {}
            let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
            let { pathname , query  } = parsed;
            const originalPathname = pathname;
            if (false) {}
            const pages = yield _this.pageLoader.getPageList();
            let resolvedAs = asPath;
            const locale = typeof options.locale !== "undefined" ? options.locale || undefined : _this.locale;
            const isMiddlewareMatch = yield matchesMiddleware({
                asPath: asPath,
                locale: locale,
                router: _this
            });
            if (false) {}
            parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);
            if ((0, _isDynamic).isDynamicRoute(parsed.pathname)) {
                pathname = parsed.pathname;
                parsed.pathname = pathname;
                Object.assign(query, (0, _routeMatcher).getRouteMatcher((0, _routeRegex).getRouteRegex(parsed.pathname))((0, _parsePath).parsePath(asPath).pathname) || {});
                if (!isMiddlewareMatch) {
                    url = (0, _formatUrl).formatWithValidation(parsed);
                }
            }
            // Prefetch is not supported in development mode because it would trigger on-demand-entries
            if (false) {}
            const data =  false ? 0 : yield withMiddlewareEffects({
                fetchData: ()=>fetchNextData({
                        dataHref: _this.pageLoader.getDataHref({
                            href: (0, _formatUrl).formatWithValidation({
                                pathname: originalPathname,
                                query
                            }),
                            skipInterpolation: true,
                            asPath: resolvedAs,
                            locale
                        }),
                        hasMiddleware: true,
                        isServerRender: _this.isSsr,
                        parseJSON: true,
                        inflightCache: _this.sdc,
                        persistCache: !_this.isPreview,
                        isPrefetch: true
                    }),
                asPath: asPath,
                locale: locale,
                router: _this
            });
            /**
     * If there was a rewrite we apply the effects of the rewrite on the
     * current parameters for the prefetch.
     */ if ((data == null ? void 0 : data.effect.type) === "rewrite") {
                parsed.pathname = data.effect.resolvedHref;
                pathname = data.effect.resolvedHref;
                query = _extends({}, query, data.effect.parsedAs.query);
                resolvedAs = data.effect.parsedAs.pathname;
                url = (0, _formatUrl).formatWithValidation(parsed);
            }
            /**
     * If there is a redirect to an external destination then we don't have
     * to prefetch content as it will be unused.
     */ if ((data == null ? void 0 : data.effect.type) === "redirect-external") {
                return;
            }
            const route = (0, _removeTrailingSlash).removeTrailingSlash(pathname);
            yield Promise.all([
                _this.pageLoader._isSsg(route).then((isSsg)=>{
                    return isSsg ? fetchNextData({
                        dataHref: (data == null ? void 0 : data.json) ? data == null ? void 0 : data.dataHref : _this.pageLoader.getDataHref({
                            href: url,
                            asPath: resolvedAs,
                            locale: locale
                        }),
                        isServerRender: false,
                        parseJSON: true,
                        inflightCache: _this.sdc,
                        persistCache: !_this.isPreview,
                        isPrefetch: true,
                        unstable_skipClientCache: options.unstable_skipClientCache || options.priority && !!true
                    }).then(()=>false) : false;
                }),
                _this.pageLoader[options.priority ? "loadPage" : "prefetch"](route)
            ]);
        })();
    }
    fetchComponent(route) {
        var _this = this;
        return _async_to_generator(function*() {
            const handleCancelled = getCancelledHandler({
                route,
                router: _this
            });
            try {
                const componentResult = yield _this.pageLoader.loadPage(route);
                handleCancelled();
                return componentResult;
            } catch (err) {
                handleCancelled();
                throw err;
            }
        })();
    }
    _getData(fn) {
        let cancelled = false;
        const cancel = ()=>{
            cancelled = true;
        };
        this.clc = cancel;
        return fn().then((data)=>{
            if (cancel === this.clc) {
                this.clc = null;
            }
            if (cancelled) {
                const err = new Error("Loading initial props cancelled");
                err.cancelled = true;
                throw err;
            }
            return data;
        });
    }
    _getFlightData(dataHref) {
        // Do not cache RSC flight response since it's not a static resource
        return fetchNextData({
            dataHref,
            isServerRender: true,
            parseJSON: false,
            inflightCache: this.sdc,
            persistCache: false,
            isPrefetch: false
        }).then(({ text  })=>({
                data: text
            }));
    }
    getInitialProps(Component, ctx) {
        const { Component: App  } = this.components["/_app"];
        const AppTree = this._wrapApp(App);
        ctx.AppTree = AppTree;
        return (0, _utils).loadGetInitialProps(App, {
            AppTree,
            Component,
            router: this,
            ctx
        });
    }
    get route() {
        return this.state.route;
    }
    get pathname() {
        return this.state.pathname;
    }
    get query() {
        return this.state.query;
    }
    get asPath() {
        return this.state.asPath;
    }
    get locale() {
        return this.state.locale;
    }
    get isFallback() {
        return this.state.isFallback;
    }
    get isPreview() {
        return this.state.isPreview;
    }
    constructor(pathname1, query1, as1, { initialProps , pageLoader , App , wrapApp , Component , err , subscription , isFallback , locale , locales , defaultLocale , domainLocales , isPreview  }){
        // Server Data Cache (full data requests)
        this.sdc = {};
        // Server Background Cache (HEAD requests)
        this.sbc = {};
        this.isFirstPopStateEvent = true;
        this._key = createKey();
        this.onPopState = (e)=>{
            const { isFirstPopStateEvent  } = this;
            this.isFirstPopStateEvent = false;
            const state = e.state;
            if (!state) {
                // We get state as undefined for two reasons.
                //  1. With older safari (< 8) and older chrome (< 34)
                //  2. When the URL changed with #
                //
                // In the both cases, we don't need to proceed and change the route.
                // (as it's already changed)
                // But we can simply replace the state with the new changes.
                // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
                // So, doing the following for (1) does no harm.
                const { pathname , query  } = this;
                this.changeState("replaceState", (0, _formatUrl).formatWithValidation({
                    pathname: (0, _addBasePath).addBasePath(pathname),
                    query
                }), (0, _utils).getURL());
                return;
            }
            // __NA is used to identify if the history entry can be handled by the app-router.
            if (state.__NA) {
                window.location.reload();
                return;
            }
            if (!state.__N) {
                return;
            }
            // Safari fires popstateevent when reopening the browser.
            if (isFirstPopStateEvent && this.locale === state.options.locale && state.as === this.asPath) {
                return;
            }
            let forcedScroll;
            const { url , as , options , key  } = state;
            if (false) {}
            this._key = key;
            const { pathname: pathname1  } = (0, _parseRelativeUrl).parseRelativeUrl(url);
            // Make sure we don't re-render on initial load,
            // can be caused by navigating back from an external site
            if (this.isSsr && as === (0, _addBasePath).addBasePath(this.asPath) && pathname1 === (0, _addBasePath).addBasePath(this.pathname)) {
                return;
            }
            // If the downstream application returns falsy, return.
            // They will then be responsible for handling the event.
            if (this._bps && !this._bps(state)) {
                return;
            }
            this.change("replaceState", url, as, Object.assign({}, options, {
                shallow: options.shallow && this._shallow,
                locale: options.locale || this.defaultLocale,
                // @ts-ignore internal value not exposed on types
                _h: 0
            }), forcedScroll);
        };
        // represents the current component key
        const route = (0, _removeTrailingSlash).removeTrailingSlash(pathname1);
        // set up the component cache (by route keys)
        this.components = {};
        // We should not keep the cache, if there's an error
        // Otherwise, this cause issues when when going back and
        // come again to the errored page.
        if (pathname1 !== "/_error") {
            this.components[route] = {
                Component,
                initial: true,
                props: initialProps,
                err,
                __N_SSG: initialProps && initialProps.__N_SSG,
                __N_SSP: initialProps && initialProps.__N_SSP
            };
        }
        this.components["/_app"] = {
            Component: App,
            styleSheets: []
        };
        // Backwards compat for Router.router.events
        // TODO: Should be remove the following major version as it was never documented
        this.events = Router.events;
        this.pageLoader = pageLoader;
        // if auto prerendered and dynamic route wait to update asPath
        // until after mount to prevent hydration mismatch
        const autoExportDynamic = (0, _isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;
        this.basePath =  false || "";
        this.sub = subscription;
        this.clc = null;
        this._wrapApp = wrapApp;
        // make sure to ignore extra popState in safari on navigating
        // back from external site
        this.isSsr = true;
        this.isLocaleDomain = false;
        this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !false);
        if (false) {}
        this.state = {
            route,
            pathname: pathname1,
            query: query1,
            asPath: autoExportDynamic ? pathname1 : as1,
            isPreview: !!isPreview,
            locale:  false ? 0 : undefined,
            isFallback
        };
        this._initialMatchesMiddlewarePromise = Promise.resolve(false);
        if (false) {}
    }
}
Router.events = (0, _mitt).default();
exports["default"] = Router; //# sourceMappingURL=router.js.map


/***/ }),

/***/ 599:
/***/ (() => {



/***/ }),

/***/ 7113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(9015)


/***/ }),

/***/ 5024:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(7457)


/***/ }),

/***/ 1314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "UW": () => (/* binding */ Callout),
  "OK": () => (/* binding */ Tab),
  "mQ": () => (/* binding */ Tabs),
  "ZP": () => (/* binding */ Layout)
});

// UNUSED EXPORTS: Bleed, Collapse, Navbar, NotFoundPage, ServerSideErrorPage, ThemeSwitch, useConfig, useMDXComponents, useTheme

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/.pnpm/focus-visible@5.2.0/node_modules/focus-visible/dist/focus-visible.js
var focus_visible = __webpack_require__(2297);
// EXTERNAL MODULE: ./node_modules/.pnpm/@reach+skip-nav@0.17.0_biqbaboplfbrettd7655fr4n2y/node_modules/@reach/skip-nav/dist/reach-skip-nav.cjs.prod.js
var reach_skip_nav_cjs_prod = __webpack_require__(4899);
// EXTERNAL MODULE: external "clsx"
var external_clsx_ = __webpack_require__(8103);
var external_clsx_default = /*#__PURE__*/__webpack_require__.n(external_clsx_);
// EXTERNAL MODULE: ./node_modules/.pnpm/@mdx-js+react@2.1.5_react@18.2.0/node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__(8631);
;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.0.5_biqbaboplfbrettd7655fr4n2y/node_modules/next/package.json
const package_namespaceObject = {"i8":"13.0.5"};
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.0.5_biqbaboplfbrettd7655fr4n2y/node_modules/next/link.js
var next_link = __webpack_require__(5024);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-themes@0.2.1_7iuvftg57tblwyxclfkwku5xo4/node_modules/next-themes/dist/index.js
var dist = __webpack_require__(2562);
// EXTERNAL MODULE: ./node_modules/.pnpm/git-url-parse@13.1.0/node_modules/git-url-parse/lib/index.js
var git_url_parse_lib = __webpack_require__(4728);
var lib_default = /*#__PURE__*/__webpack_require__.n(git_url_parse_lib);
// EXTERNAL MODULE: ./node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/dist/cjs/popper.js
var cjs_popper = __webpack_require__(1135);
// EXTERNAL MODULE: ./node_modules/.pnpm/flexsearch@0.7.31/node_modules/flexsearch/dist/flexsearch.bundle.js
var flexsearch_bundle = __webpack_require__(9752);
var flexsearch_bundle_default = /*#__PURE__*/__webpack_require__.n(flexsearch_bundle);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/match.js
function match_u(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,match_u),t}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/render.js
var S=(a=>(a[a.None=0]="None",a[a.RenderStrategy=1]="RenderStrategy",a[a.Static=2]="Static",a))(S||{}),render_j=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(render_j||{});function $({ourProps:r,theirProps:t,slot:e,defaultTag:a,features:o,visible:n=!0,name:l}){let s=T(t,r);if(n)return p(s,e,a,l);let u=o!=null?o:0;if(u&2){let{static:i=!1,...d}=s;if(i)return p(d,e,a,l)}if(u&1){let{unmount:i=!0,...d}=s;return match_u(i?0:1,{[0](){return null},[1](){return p({...d,hidden:!0,style:{display:"none"}},e,a,l)}})}return p(s,e,a,l)}function p(r,t={},e,a){let{as:o=e,children:n,refName:l="ref",...s}=m(r,["unmount","static"]),u=r.ref!==void 0?{[l]:r.ref}:{},i=typeof n=="function"?n(t):n;s.className&&typeof s.className=="function"&&(s.className=s.className(t));let d={};if(t){let f=!1,y=[];for(let[h,g]of Object.entries(t))typeof g=="boolean"&&(f=!0),g===!0&&y.push(h);f&&(d["data-headlessui-state"]=y.join(" "))}if(o===external_react_.Fragment&&Object.keys(F(s)).length>0){if(!(0,external_react_.isValidElement)(i)||Array.isArray(i)&&i.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${a} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map(f=>`  - ${f}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(f=>`  - ${f}`).join(`
`)].join(`
`));return (0,external_react_.cloneElement)(i,Object.assign({},T(i.props,F(m(s,["ref"]))),d,u,w(i.ref,u.ref)))}return (0,external_react_.createElement)(o,Object.assign({},m(s,["ref"]),o!==external_react_.Fragment&&u,o!==external_react_.Fragment&&d),i)}function w(...r){return{ref:r.every(t=>t==null)?void 0:t=>{for(let e of r)e!=null&&(typeof e=="function"?e(t):e.current=t)}}}function T(...r){var a;if(r.length===0)return{};if(r.length===1)return r[0];let t={},e={};for(let o of r)for(let n in o)n.startsWith("on")&&typeof o[n]=="function"?((a=e[n])!=null||(e[n]=[]),e[n].push(o[n])):t[n]=o[n];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(e).map(o=>[o,void 0])));for(let o in e)Object.assign(t,{[o](n,...l){let s=e[o];for(let u of s){if((n instanceof Event||(n==null?void 0:n.nativeEvent)instanceof Event)&&n.defaultPrevented)return;u(n,...l)}}});return t}function C(r){var t;return Object.assign((0,external_react_.forwardRef)(r),{displayName:(t=r.displayName)!=null?t:r.name})}function F(r){let t=Object.assign({},r);for(let e in t)t[e]===void 0&&delete t[e];return t}function m(r,t=[]){let e=Object.assign({},r);for(let a of t)a in e&&delete e[a];return e}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/open-closed.js
let o=(0,external_react_.createContext)(null);o.displayName="OpenClosedContext";var open_closed_p=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(open_closed_p||{});function open_closed_s(){return (0,external_react_.useContext)(o)}function open_closed_C({value:t,children:n}){return external_react_.createElement(o.Provider,{value:t},n)}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/ssr.js
const e=typeof window=="undefined"||typeof document=="undefined";

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
let use_iso_morphic_effect_s=e?external_react_.useEffect:external_react_.useLayoutEffect;

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
function f(){let e=(0,external_react_.useRef)(!1);return use_iso_morphic_effect_s(()=>(e.current=!0,()=>{e.current=!1}),[]),e}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function use_latest_value_s(e){let r=(0,external_react_.useRef)(e);return use_iso_morphic_effect_s(()=>{r.current=e},[e]),r}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
let r={serverHandoffComplete:!1};function use_server_handoff_complete_a(){let[e,f]=(0,external_react_.useState)(r.serverHandoffComplete);return (0,external_react_.useEffect)(()=>{e!==!0&&f(!0)},[e]),(0,external_react_.useEffect)(()=>{r.serverHandoffComplete===!1&&(r.serverHandoffComplete=!0)},[]),e}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-event.js
let use_event_o=function(t){let e=use_latest_value_s(t);return external_react_.useCallback((...r)=>e.current(...r),[e])};

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
let u=Symbol();function use_sync_refs_T(t,n=!0){return Object.assign(t,{[u]:n})}function use_sync_refs_y(...t){let n=(0,external_react_.useRef)(t);(0,external_react_.useEffect)(()=>{n.current=t},[t]);let c=use_event_o(e=>{for(let o of n.current)o!=null&&(typeof o=="function"?o(e):o.current=e)});return t.every(e=>e==null||(e==null?void 0:e[u]))?void 0:c}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/once.js
function l(r){let e={called:!1};return(...t)=>{if(!e.called)return e.called=!0,r(...t)}}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/micro-task.js
function micro_task_t(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(o=>setTimeout(()=>{throw o}))}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/disposables.js
function disposables_m(){let n=[],i=[],r={enqueue(e){i.push(e)},addEventListener(e,t,a,o){return e.addEventListener(t,a,o),r.add(()=>e.removeEventListener(t,a,o))},requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return r.add(()=>cancelAnimationFrame(t))},nextFrame(...e){return r.requestAnimationFrame(()=>r.requestAnimationFrame(...e))},setTimeout(...e){let t=setTimeout(...e);return r.add(()=>clearTimeout(t))},microTask(...e){let t={current:!0};return micro_task_t(()=>{t.current&&e[0]()}),r.add(()=>{t.current=!1})},add(e){return n.push(e),()=>{let t=n.indexOf(e);if(t>=0){let[a]=n.splice(t,1);a()}}},dispose(){for(let e of n.splice(0))e()},async workQueue(){for(let e of i.splice(0))await e()}};return r}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/transitions/utils/transition.js
function transition_f(t,...e){t&&e.length>0&&t.classList.add(...e)}function v(t,...e){t&&e.length>0&&t.classList.remove(...e)}var transition_T=(n=>(n.Ended="ended",n.Cancelled="cancelled",n))(transition_T||{});function c(t,e){let n=disposables_m();if(!t)return n.dispose;let{transitionDuration:d,transitionDelay:o}=getComputedStyle(t),[s,u]=[d,o].map(i=>{let[a=0]=i.split(",").filter(Boolean).map(r=>r.includes("ms")?parseFloat(r):parseFloat(r)*1e3).sort((r,l)=>l-r);return a});if(s+u!==0){let i=[];i.push(n.addEventListener(t,"transitionrun",a=>{a.target===a.currentTarget&&(i.splice(0).forEach(r=>r()),i.push(n.addEventListener(t,"transitionend",r=>{r.target===r.currentTarget&&(e("ended"),i.splice(0).forEach(l=>l()))}),n.addEventListener(t,"transitioncancel",r=>{r.target===r.currentTarget&&(e("cancelled"),i.splice(0).forEach(l=>l()))})))}))}else e("ended");return n.add(()=>e("cancelled")),n.dispose}function transition_C(t,e,n,d){let o=n?"enter":"leave",s=disposables_m(),u=d!==void 0?l(d):()=>{};o==="enter"&&(t.removeAttribute("hidden"),t.style.display="");let m=match_u(o,{enter:()=>e.enter,leave:()=>e.leave}),i=match_u(o,{enter:()=>e.enterTo,leave:()=>e.leaveTo}),a=match_u(o,{enter:()=>e.enterFrom,leave:()=>e.leaveFrom});return v(t,...e.enter,...e.enterTo,...e.enterFrom,...e.leave,...e.leaveFrom,...e.leaveTo,...e.entered),transition_f(t,...m,...a),s.nextFrame(()=>{v(t,...a),transition_f(t,...i),c(t,r=>(r==="ended"&&(v(t,...m),transition_f(t,...e.entered)),u(r)))}),s.dispose}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-disposables.js
function use_disposables_p(){let[e]=(0,external_react_.useState)(disposables_m);return (0,external_react_.useEffect)(()=>()=>e.dispose(),[e]),e}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-transition.js
function I({container:o,direction:t,classes:s,onStart:a,onStop:u}){let c=f(),d=use_disposables_p(),r=use_latest_value_s(t);use_iso_morphic_effect_s(()=>{let e=disposables_m();d.add(e.dispose);let n=o.current;if(!!n&&r.current!=="idle"&&!!c.current)return e.dispose(),a.current(r.current),e.add(transition_C(n,s.current,r.current==="enter",l=>{e.dispose(),match_u(l,{[transition_T.Ended](){u.current(r.current)},[transition_T.Cancelled]:()=>{}})})),e.dispose},[t])}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/transitions/transition.js
function x(r=""){return r.split(" ").filter(e=>e.trim().length>1)}let transition_F=(0,external_react_.createContext)(null);transition_F.displayName="TransitionContext";var ve=(s=>(s.Visible="visible",s.Hidden="hidden",s))(ve||{});function Ce(){let r=(0,external_react_.useContext)(transition_F);if(r===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return r}function ge(){let r=(0,external_react_.useContext)(M);if(r===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return r}let M=(0,external_react_.createContext)(null);M.displayName="NestingContext";function transition_I(r){return"children"in r?transition_I(r.children):r.current.filter(({el:e})=>e.current!==null).filter(({state:e})=>e==="visible").length>0}function ee(r,e){let s=use_latest_value_s(r),n=(0,external_react_.useRef)([]),m=f(),D=use_disposables_p(),b=use_event_o((l,i=render_j.Hidden)=>{let t=n.current.findIndex(({el:o})=>o===l);t!==-1&&(match_u(i,{[render_j.Unmount](){n.current.splice(t,1)},[render_j.Hidden](){n.current[t].state="hidden"}}),D.microTask(()=>{var o;!transition_I(n)&&m.current&&((o=s.current)==null||o.call(s))}))}),E=use_event_o(l=>{let i=n.current.find(({el:t})=>t===l);return i?i.state!=="visible"&&(i.state="visible"):n.current.push({el:l,state:"visible"}),()=>b(l,render_j.Unmount)}),S=(0,external_react_.useRef)([]),u=(0,external_react_.useRef)(Promise.resolve()),p=(0,external_react_.useRef)({enter:[],leave:[],idle:[]}),d=use_event_o((l,i,t)=>{S.current.splice(0),e&&(e.chains.current[i]=e.chains.current[i].filter(([o])=>o!==l)),e==null||e.chains.current[i].push([l,new Promise(o=>{S.current.push(o)})]),e==null||e.chains.current[i].push([l,new Promise(o=>{Promise.all(p.current[i].map(([f,a])=>a)).then(()=>o())})]),i==="enter"?u.current=u.current.then(()=>e==null?void 0:e.wait.current).then(()=>t(i)):t(i)}),h=use_event_o((l,i,t)=>{Promise.all(p.current[i].splice(0).map(([o,f])=>f)).then(()=>{var o;(o=S.current.shift())==null||o()}).then(()=>t(i))});return (0,external_react_.useMemo)(()=>({children:n,register:E,unregister:b,onStart:d,onStop:h,wait:u,chains:p}),[E,b,n,d,h,p,u])}function be(){}let Ee=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function te(r){var s;let e={};for(let n of Ee)e[n]=(s=r[n])!=null?s:be;return e}function Se(r){let e=(0,external_react_.useRef)(te(r));return (0,external_react_.useEffect)(()=>{e.current=te(r)},[r]),e}let xe="div",ne=S.RenderStrategy,re=C(function(e,s){let{beforeEnter:n,afterEnter:m,beforeLeave:D,afterLeave:b,enter:E,enterFrom:S,enterTo:u,entered:p,leave:d,leaveFrom:h,leaveTo:l,...i}=e,t=(0,external_react_.useRef)(null),o=use_sync_refs_y(t,s),f=i.unmount?render_j.Unmount:render_j.Hidden,{show:a,appear:P,initial:ie}=Ce(),[v,_]=(0,external_react_.useState)(a?"visible":"hidden"),z=ge(),{register:N,unregister:V}=z,j=(0,external_react_.useRef)(null);(0,external_react_.useEffect)(()=>N(t),[N,t]),(0,external_react_.useEffect)(()=>{if(f===render_j.Hidden&&!!t.current){if(a&&v!=="visible"){_("visible");return}return match_u(v,{["hidden"]:()=>V(t),["visible"]:()=>N(t)})}},[v,t,N,V,a,f]);let oe=use_latest_value_s({enter:x(E),enterFrom:x(S),enterTo:x(u),entered:x(p),leave:x(d),leaveFrom:x(h),leaveTo:x(l)}),L=Se({beforeEnter:n,afterEnter:m,beforeLeave:D,afterLeave:b}),U=use_server_handoff_complete_a();(0,external_react_.useEffect)(()=>{if(U&&v==="visible"&&t.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[t,v,U]);let k=ie&&!P,se=(()=>!U||k||j.current===a?"idle":a?"enter":"leave")(),le=use_event_o(C=>match_u(C,{enter:()=>L.current.beforeEnter(),leave:()=>L.current.beforeLeave(),idle:()=>{}})),ae=use_event_o(C=>match_u(C,{enter:()=>L.current.afterEnter(),leave:()=>L.current.afterLeave(),idle:()=>{}})),w=ee(()=>{_("hidden"),V(t)},z);I({container:t,classes:oe,direction:se,onStart:use_latest_value_s(C=>{w.onStart(t,C,le)}),onStop:use_latest_value_s(C=>{w.onStop(t,C,ae),C==="leave"&&!transition_I(w)&&(_("hidden"),V(t))})}),(0,external_react_.useEffect)(()=>{!k||(f===render_j.Hidden?j.current=null:j.current=a)},[a,k,v]);let ue=i,de={ref:o};return external_react_.createElement(M.Provider,{value:w},external_react_.createElement(open_closed_C,{value:match_u(v,{["visible"]:open_closed_p.Open,["hidden"]:open_closed_p.Closed})},$({ourProps:de,theirProps:ue,defaultTag:xe,features:ne,visible:v==="visible",name:"Transition.Child"})))}),q=C(function(e,s){let{show:n,appear:m=!1,unmount:D,...b}=e,E=(0,external_react_.useRef)(null),S=use_sync_refs_y(E,s);use_server_handoff_complete_a();let u=open_closed_s();if(n===void 0&&u!==null&&(n=match_u(u,{[open_closed_p.Open]:!0,[open_closed_p.Closed]:!1})),![!0,!1].includes(n))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[p,d]=(0,external_react_.useState)(n?"visible":"hidden"),h=ee(()=>{d("hidden")}),[l,i]=(0,external_react_.useState)(!0),t=(0,external_react_.useRef)([n]);use_iso_morphic_effect_s(()=>{l!==!1&&t.current[t.current.length-1]!==n&&(t.current.push(n),i(!1))},[t,n]);let o=(0,external_react_.useMemo)(()=>({show:n,appear:m,initial:l}),[n,m,l]);(0,external_react_.useEffect)(()=>{if(n)d("visible");else if(!transition_I(h))d("hidden");else{let a=E.current;if(!a)return;let P=a.getBoundingClientRect();P.x===0&&P.y===0&&P.width===0&&P.height===0&&d("hidden")}},[n,h]);let f={unmount:D};return external_react_.createElement(M.Provider,{value:h},external_react_.createElement(transition_F.Provider,{value:o},$({ourProps:{...f,as:external_react_.Fragment,children:external_react_.createElement(re,{ref:S,...f,...b})},theirProps:{},defaultTag:external_react_.Fragment,features:ne,visible:p==="visible",name:"Transition"})))}),Pe=C(function(e,s){let n=(0,external_react_.useContext)(transition_F)!==null,m=open_closed_s()!==null;return external_react_.createElement(external_react_.Fragment,null,!n&&m?external_react_.createElement(q,{ref:s,...e}):external_react_.createElement(re,{ref:s,...e}))}),We=Object.assign(q,{Child:Pe,Root:q});

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-id.js
var use_id_u;let use_id_l=0;function use_id_r(){return++use_id_l}let use_id_I=(use_id_u=external_react_.useId)!=null?use_id_u:function(){let n=use_server_handoff_complete_a(),[e,o]=external_react_.useState(n?use_id_r:null);return use_iso_morphic_effect_s(()=>{e===null&&o(use_id_r())},[e]),e!=null?""+e:void 0};

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-computed.js
function use_computed_i(e,o){let[u,t]=(0,external_react_.useState)(e),r=use_latest_value_s(e);return use_iso_morphic_effect_s(()=>t(r.current),[r,t,...o]),u}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/keyboard.js
var keyboard_o=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(keyboard_o||{});

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function calculate_active_index_f(r){throw new Error("Unexpected object: "+r)}var calculate_active_index_a=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(calculate_active_index_a||{});function calculate_active_index_x(r,n){let t=n.resolveItems();if(t.length<=0)return null;let l=n.resolveActiveIndex(),s=l!=null?l:-1,d=(()=>{switch(r.focus){case 0:return t.findIndex(e=>!n.resolveDisabled(e));case 1:{let e=t.slice().reverse().findIndex((i,c,u)=>s!==-1&&u.length-c-1>=s?!1:!n.resolveDisabled(i));return e===-1?e:t.length-1-e}case 2:return t.findIndex((e,i)=>i<=s?!1:!n.resolveDisabled(e));case 3:{let e=t.slice().reverse().findIndex(i=>!n.resolveDisabled(i));return e===-1?e:t.length-1-e}case 4:return t.findIndex(e=>n.resolveId(e)===r.id);case 5:return null;default:calculate_active_index_f(r)}})();return d===-1?l:d}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/bugs.js
function bugs_r(n){let e=n.parentElement,l=null;for(;e&&!(e instanceof HTMLFieldSetElement);)e instanceof HTMLLegendElement&&(l=e),e=e.parentElement;let t=(e==null?void 0:e.getAttribute("disabled"))==="";return t&&i(l)?!1:t}function i(n){if(!n)return!1;let e=n.previousElementSibling;for(;e!==null;){if(e instanceof HTMLLegendElement)return!1;e=e.previousElementSibling}return!0}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/owner.js
function owner_e(r){return e?null:r instanceof Node?r.ownerDocument:r!=null&&r.hasOwnProperty("current")&&r.current instanceof Node?r.current.ownerDocument:document}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/focus-management.js
let focus_management_m=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var focus_management_T=(n=>(n[n.First=1]="First",n[n.Previous=2]="Previous",n[n.Next=4]="Next",n[n.Last=8]="Last",n[n.WrapAround=16]="WrapAround",n[n.NoScroll=32]="NoScroll",n))(focus_management_T||{}),focus_management_M=(o=>(o[o.Error=0]="Error",o[o.Overflow=1]="Overflow",o[o.Success=2]="Success",o[o.Underflow=3]="Underflow",o))(focus_management_M||{}),b=(r=>(r[r.Previous=-1]="Previous",r[r.Next=1]="Next",r))(b||{});function d(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(focus_management_m))}var focus_management_N=(r=>(r[r.Strict=0]="Strict",r[r.Loose=1]="Loose",r))(focus_management_N||{});function focus_management_F(e,t=0){var r;return e===((r=owner_e(e))==null?void 0:r.body)?!1:match_u(t,{[0](){return e.matches(focus_management_m)},[1](){let l=e;for(;l!==null;){if(l.matches(focus_management_m))return!0;l=l.parentElement}return!1}})}function focus_management_I(e){let t=owner_e(e);disposables_m().nextFrame(()=>{t&&!focus_management_F(t.activeElement,0)&&h(e)})}function h(e){e==null||e.focus({preventScroll:!0})}let focus_management_w=["textarea","input"].join(",");function H(e){var t,r;return(r=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,focus_management_w))!=null?r:!1}function focus_management_S(e,t=r=>r){return e.slice().sort((r,l)=>{let o=t(r),s=t(l);if(o===null||s===null)return 0;let n=o.compareDocumentPosition(s);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function D(e,t){return O(d(),t,!0,e)}function O(e,t,r=!0,l=null){let o=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,s=Array.isArray(e)?r?focus_management_S(e):e:d(e);l=l!=null?l:o.activeElement;let n=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),E=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,s.indexOf(l))-1;if(t&4)return Math.max(0,s.indexOf(l))+1;if(t&8)return s.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),x=t&32?{preventScroll:!0}:{},f=0,i=s.length,u;do{if(f>=i||f+i<=0)return 0;let a=E+f;if(t&16)a=(a+i)%i;else{if(a<0)return 3;if(a>=i)return 1}u=s[a],u==null||u.focus(x),f+=n}while(u!==o.activeElement);return t&6&&H(u)&&u.select(),u.hasAttribute("tabindex")||u.setAttribute("tabindex","0"),2}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
function use_resolve_button_type_i(t){var n;if(t.type)return t.type;let e=(n=t.as)!=null?n:"button";if(typeof e=="string"&&e.toLowerCase()==="button")return"button"}function use_resolve_button_type_s(t,e){let[n,u]=(0,external_react_.useState)(()=>use_resolve_button_type_i(t));return use_iso_morphic_effect_s(()=>{u(use_resolve_button_type_i(t))},[t.type,t.as]),use_iso_morphic_effect_s(()=>{n||!e.current||e.current instanceof HTMLButtonElement&&!e.current.hasAttribute("type")&&u("button")},[n,e]),n}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-document-event.js
function use_document_event_d(e,r,n){let o=use_latest_value_s(r);(0,external_react_.useEffect)(()=>{function t(u){o.current(u)}return document.addEventListener(e,t,n),()=>document.removeEventListener(e,t,n)},[e,n])}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-outside-click.js
function L(E,m,c=!0){let i=(0,external_react_.useRef)(!1);(0,external_react_.useEffect)(()=>{requestAnimationFrame(()=>{i.current=c})},[c]);function f(e,o){if(!i.current||e.defaultPrevented)return;let l=function r(t){return typeof t=="function"?r(t()):Array.isArray(t)||t instanceof Set?t:[t]}(E),n=o(e);if(n!==null&&!!n.getRootNode().contains(n)){for(let r of l){if(r===null)continue;let t=r instanceof HTMLElement?r:r.current;if(t!=null&&t.contains(n))return}return!focus_management_F(n,focus_management_N.Loose)&&n.tabIndex!==-1&&e.preventDefault(),m(e,n)}}let u=(0,external_react_.useRef)(null);use_document_event_d("mousedown",e=>{var o,l;i.current&&(u.current=((l=(o=e.composedPath)==null?void 0:o.call(e))==null?void 0:l[0])||e.target)},!0),use_document_event_d("click",e=>{!u.current||(f(e,()=>u.current),u.current=null)},!0),use_document_event_d("blur",e=>f(e,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/hidden.js
let a="div";var hidden_s=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(hidden_s||{});let hidden_h=C(function(t,o){let{features:e=1,...r}=t,d={ref:o,"aria-hidden":(e&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(e&4)===4&&(e&2)!==2&&{display:"none"}}};return $({ourProps:d,theirProps:r,slot:{},defaultTag:a,name:"Hidden"})});

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/utils/form.js
function form_e(n={},r=null,t=[]){for(let[i,o]of Object.entries(n))form_f(t,s(r,i),o);return t}function s(n,r){return n?n+"["+r+"]":r}function form_f(n,r,t){if(Array.isArray(t))for(let[i,o]of t.entries())form_f(n,s(r,i.toString()),o);else t instanceof Date?n.push([r,t.toISOString()]):typeof t=="boolean"?n.push([r,t?"1":"0"]):typeof t=="string"?n.push([r,t]):typeof t=="number"?n.push([r,`${t}`]):t==null?n.push([r,""]):form_e(t,r,n)}function form_p(n){var t;let r=(t=n==null?void 0:n.form)!=null?t:n.closest("form");if(!!r){for(let i of r.elements)if(i.tagName==="INPUT"&&i.type==="submit"||i.tagName==="BUTTON"&&i.type==="submit"||i.nodeName==="INPUT"&&i.type==="image"){i.click();return}}}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-controllable.js
function use_controllable_T(l,r,c){let[i,s]=(0,external_react_.useState)(c),e=l!==void 0,t=(0,external_react_.useRef)(e),u=(0,external_react_.useRef)(!1),d=(0,external_react_.useRef)(!1);return e&&!t.current&&!u.current?(u.current=!0,t.current=e,console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")):!e&&t.current&&!d.current&&(d.current=!0,t.current=e,console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")),[e?l:i,use_event_o(n=>(e||s(n),r==null?void 0:r(n)))]}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/listbox/listbox.js
var ye=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))(ye||{}),listbox_xe=(n=>(n[n.Single=0]="Single",n[n.Multi=1]="Multi",n))(listbox_xe||{}),Oe=(n=>(n[n.Pointer=0]="Pointer",n[n.Other=1]="Other",n))(Oe||{}),me=(r=>(r[r.OpenListbox=0]="OpenListbox",r[r.CloseListbox=1]="CloseListbox",r[r.SetDisabled=2]="SetDisabled",r[r.SetOrientation=3]="SetOrientation",r[r.GoToOption=4]="GoToOption",r[r.Search=5]="Search",r[r.ClearSearch=6]="ClearSearch",r[r.RegisterOption=7]="RegisterOption",r[r.UnregisterOption=8]="UnregisterOption",r))(me||{});function j(t,i=n=>n){let n=t.activeOptionIndex!==null?t.options[t.activeOptionIndex]:null,e=focus_management_S(i(t.options.slice()),u=>u.dataRef.current.domRef.current),o=n?e.indexOf(n):null;return o===-1&&(o=null),{options:e,activeOptionIndex:o}}let listbox_ge={[1](t){return t.disabled||t.listboxState===1?t:{...t,activeOptionIndex:null,listboxState:1}},[0](t){if(t.disabled||t.listboxState===0)return t;let i=t.activeOptionIndex,{value:n,mode:e,compare:o}=t.propsRef.current,u=t.options.findIndex(l=>{let s=l.dataRef.current.value;return match_u(e,{[1]:()=>n.some(r=>o(r,s)),[0]:()=>o(n,s)})});return u!==-1&&(i=u),{...t,listboxState:0,activeOptionIndex:i}},[2](t,i){return t.disabled===i.disabled?t:{...t,disabled:i.disabled}},[3](t,i){return t.orientation===i.orientation?t:{...t,orientation:i.orientation}},[4](t,i){var o;if(t.disabled||t.listboxState===1)return t;let n=j(t),e=calculate_active_index_x(i,{resolveItems:()=>n.options,resolveActiveIndex:()=>n.activeOptionIndex,resolveId:u=>u.id,resolveDisabled:u=>u.dataRef.current.disabled});return{...t,...n,searchQuery:"",activeOptionIndex:e,activationTrigger:(o=i.trigger)!=null?o:1}},[5]:(t,i)=>{if(t.disabled||t.listboxState===1)return t;let e=t.searchQuery!==""?0:1,o=t.searchQuery+i.value.toLowerCase(),l=(t.activeOptionIndex!==null?t.options.slice(t.activeOptionIndex+e).concat(t.options.slice(0,t.activeOptionIndex+e)):t.options).find(d=>{var r;return!d.dataRef.current.disabled&&((r=d.dataRef.current.textValue)==null?void 0:r.startsWith(o))}),s=l?t.options.indexOf(l):-1;return s===-1||s===t.activeOptionIndex?{...t,searchQuery:o}:{...t,searchQuery:o,activeOptionIndex:s,activationTrigger:1}},[6](t){return t.disabled||t.listboxState===1||t.searchQuery===""?t:{...t,searchQuery:""}},[7]:(t,i)=>{let n={id:i.id,dataRef:i.dataRef},e=j(t,o=>[...o,n]);if(t.activeOptionIndex===null){let{value:o,mode:u,compare:l}=t.propsRef.current,s=i.dataRef.current.value;match_u(u,{[1]:()=>o.some(r=>l(r,s)),[0]:()=>l(o,s)})&&(e.activeOptionIndex=e.options.indexOf(n))}return{...t,...e}},[8]:(t,i)=>{let n=j(t,e=>{let o=e.findIndex(u=>u.id===i.id);return o!==-1&&e.splice(o,1),e});return{...t,...n,activationTrigger:1}}},K=(0,external_react_.createContext)(null);K.displayName="ListboxContext";function listbox_w(t){let i=(0,external_react_.useContext)(K);if(i===null){let n=new Error(`<${t} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,listbox_w),n}return i}function Re(t,i){return match_u(i.type,listbox_ge,t,i)}let listbox_ve=external_react_.Fragment,Le=C(function(i,n){let{value:e,defaultValue:o,name:u,onChange:l,by:s=(p,T)=>p===T,disabled:d=!1,horizontal:r=!1,multiple:x=!1,...S}=i;const g=r?"horizontal":"vertical";let O=use_sync_refs_y(n),[m,f]=use_controllable_T(e,l,o),b=(0,external_react_.useReducer)(Re,{listboxState:1,propsRef:{current:{value:m,onChange:f,mode:x?1:0,compare:use_event_o(typeof s=="string"?(p,T)=>{let C=s;return(p==null?void 0:p[C])===(T==null?void 0:T[C])}:s)}},labelRef:(0,external_react_.createRef)(),buttonRef:(0,external_react_.createRef)(),optionsRef:(0,external_react_.createRef)(),disabled:d,orientation:g,options:[],searchQuery:"",activeOptionIndex:null,activationTrigger:1}),[{listboxState:a,propsRef:c,optionsRef:P,buttonRef:D},M]=b;c.current.value=m,c.current.mode=x?1:0,use_iso_morphic_effect_s(()=>{c.current.onChange=p=>match_u(c.current.mode,{[0](){return f(p)},[1](){let T=c.current.value.slice(),{compare:C}=c.current,W=T.findIndex(X=>C(X,p));return W===-1?T.push(p):T.splice(W,1),f(T)}})},[f,c]),use_iso_morphic_effect_s(()=>M({type:2,disabled:d}),[d]),use_iso_morphic_effect_s(()=>M({type:3,orientation:g}),[g]),L([D,P],(p,T)=>{var C;M({type:1}),focus_management_F(T,focus_management_N.Loose)||(p.preventDefault(),(C=D.current)==null||C.focus())},a===0);let N=(0,external_react_.useMemo)(()=>({open:a===0,disabled:d,value:m}),[a,d,m]),R={ref:O};return external_react_.createElement(K.Provider,{value:b},external_react_.createElement(open_closed_C,{value:match_u(a,{[0]:open_closed_p.Open,[1]:open_closed_p.Closed})},u!=null&&m!=null&&form_e({[u]:m}).map(([p,T])=>external_react_.createElement(hidden_h,{features:hidden_s.Hidden,...F({key:p,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:p,value:T})})),$({ourProps:R,theirProps:S,slot:N,defaultTag:listbox_ve,name:"Listbox"})))}),listbox_Se="button",Ae=C(function(i,n){var f;let[e,o]=listbox_w("Listbox.Button"),u=use_sync_refs_y(e.buttonRef,n),l=`headlessui-listbox-button-${use_id_I()}`,s=use_disposables_p(),d=use_event_o(b=>{switch(b.key){case keyboard_o.Space:case keyboard_o.Enter:case keyboard_o.ArrowDown:b.preventDefault(),o({type:0}),s.nextFrame(()=>{e.propsRef.current.value||o({type:4,focus:calculate_active_index_a.First})});break;case keyboard_o.ArrowUp:b.preventDefault(),o({type:0}),s.nextFrame(()=>{e.propsRef.current.value||o({type:4,focus:calculate_active_index_a.Last})});break}}),r=use_event_o(b=>{switch(b.key){case keyboard_o.Space:b.preventDefault();break}}),x=use_event_o(b=>{if(bugs_r(b.currentTarget))return b.preventDefault();e.listboxState===0?(o({type:1}),s.nextFrame(()=>{var a;return(a=e.buttonRef.current)==null?void 0:a.focus({preventScroll:!0})})):(b.preventDefault(),o({type:0}))}),S=use_computed_i(()=>{if(!!e.labelRef.current)return[e.labelRef.current.id,l].join(" ")},[e.labelRef.current,l]),g=(0,external_react_.useMemo)(()=>({open:e.listboxState===0,disabled:e.disabled,value:e.propsRef.current.value}),[e]),O=i,m={ref:u,id:l,type:use_resolve_button_type_s(i,e.buttonRef),"aria-haspopup":!0,"aria-controls":(f=e.optionsRef.current)==null?void 0:f.id,"aria-expanded":e.disabled?void 0:e.listboxState===0,"aria-labelledby":S,disabled:e.disabled,onKeyDown:d,onKeyUp:r,onClick:x};return $({ourProps:m,theirProps:O,slot:g,defaultTag:listbox_Se,name:"Listbox.Button"})}),he="label",listbox_Pe=C(function(i,n){let[e]=listbox_w("Listbox.Label"),o=`headlessui-listbox-label-${use_id_I()}`,u=use_sync_refs_y(e.labelRef,n),l=use_event_o(()=>{var x;return(x=e.buttonRef.current)==null?void 0:x.focus({preventScroll:!0})}),s=(0,external_react_.useMemo)(()=>({open:e.listboxState===0,disabled:e.disabled}),[e]);return $({ourProps:{ref:u,id:o,onClick:l},theirProps:i,slot:s,defaultTag:he,name:"Listbox.Label"})}),listbox_Ce="ul",De=S.RenderStrategy|S.Static,Me=C(function(i,n){var b;let[e,o]=listbox_w("Listbox.Options"),u=use_sync_refs_y(e.optionsRef,n),l=`headlessui-listbox-options-${use_id_I()}`,s=use_disposables_p(),d=use_disposables_p(),r=open_closed_s(),x=(()=>r!==null?r===open_closed_p.Open:e.listboxState===0)();(0,external_react_.useEffect)(()=>{var c;let a=e.optionsRef.current;!a||e.listboxState===0&&a!==((c=owner_e(a))==null?void 0:c.activeElement)&&a.focus({preventScroll:!0})},[e.listboxState,e.optionsRef]);let S=use_event_o(a=>{switch(d.dispose(),a.key){case keyboard_o.Space:if(e.searchQuery!=="")return a.preventDefault(),a.stopPropagation(),o({type:5,value:a.key});case keyboard_o.Enter:if(a.preventDefault(),a.stopPropagation(),e.activeOptionIndex!==null){let{dataRef:c}=e.options[e.activeOptionIndex];e.propsRef.current.onChange(c.current.value)}e.propsRef.current.mode===0&&(o({type:1}),disposables_m().nextFrame(()=>{var c;return(c=e.buttonRef.current)==null?void 0:c.focus({preventScroll:!0})}));break;case match_u(e.orientation,{vertical:keyboard_o.ArrowDown,horizontal:keyboard_o.ArrowRight}):return a.preventDefault(),a.stopPropagation(),o({type:4,focus:calculate_active_index_a.Next});case match_u(e.orientation,{vertical:keyboard_o.ArrowUp,horizontal:keyboard_o.ArrowLeft}):return a.preventDefault(),a.stopPropagation(),o({type:4,focus:calculate_active_index_a.Previous});case keyboard_o.Home:case keyboard_o.PageUp:return a.preventDefault(),a.stopPropagation(),o({type:4,focus:calculate_active_index_a.First});case keyboard_o.End:case keyboard_o.PageDown:return a.preventDefault(),a.stopPropagation(),o({type:4,focus:calculate_active_index_a.Last});case keyboard_o.Escape:return a.preventDefault(),a.stopPropagation(),o({type:1}),s.nextFrame(()=>{var c;return(c=e.buttonRef.current)==null?void 0:c.focus({preventScroll:!0})});case keyboard_o.Tab:a.preventDefault(),a.stopPropagation();break;default:a.key.length===1&&(o({type:5,value:a.key}),d.setTimeout(()=>o({type:6}),350));break}}),g=use_computed_i(()=>{var a,c,P;return(P=(a=e.labelRef.current)==null?void 0:a.id)!=null?P:(c=e.buttonRef.current)==null?void 0:c.id},[e.labelRef.current,e.buttonRef.current]),O=(0,external_react_.useMemo)(()=>({open:e.listboxState===0}),[e]),m=i,f={"aria-activedescendant":e.activeOptionIndex===null||(b=e.options[e.activeOptionIndex])==null?void 0:b.id,"aria-multiselectable":e.propsRef.current.mode===1?!0:void 0,"aria-labelledby":g,"aria-orientation":e.orientation,id:l,onKeyDown:S,role:"listbox",tabIndex:0,ref:u};return $({ourProps:f,theirProps:m,slot:O,defaultTag:listbox_Ce,features:De,visible:x,name:"Listbox.Options"})}),listbox_Ee="li",Ie=C(function(i,n){let{disabled:e=!1,value:o,...u}=i,[l,s]=listbox_w("Listbox.Option"),d=`headlessui-listbox-option-${use_id_I()}`,r=l.activeOptionIndex!==null?l.options[l.activeOptionIndex].id===d:!1,{value:x,compare:S}=l.propsRef.current,g=match_u(l.propsRef.current.mode,{[1]:()=>x.some(R=>S(R,o)),[0]:()=>S(x,o)}),O=(0,external_react_.useRef)(null),m=use_sync_refs_y(n,O);use_iso_morphic_effect_s(()=>{if(l.listboxState!==0||!r||l.activationTrigger===0)return;let R=disposables_m();return R.requestAnimationFrame(()=>{var p,T;(T=(p=O.current)==null?void 0:p.scrollIntoView)==null||T.call(p,{block:"nearest"})}),R.dispose},[O,r,l.listboxState,l.activationTrigger,l.activeOptionIndex]);let f=(0,external_react_.useRef)({disabled:e,value:o,domRef:O});use_iso_morphic_effect_s(()=>{f.current.disabled=e},[f,e]),use_iso_morphic_effect_s(()=>{f.current.value=o},[f,o]),use_iso_morphic_effect_s(()=>{var R,p;f.current.textValue=(p=(R=O.current)==null?void 0:R.textContent)==null?void 0:p.toLowerCase()},[f,O]);let b=use_event_o(()=>l.propsRef.current.onChange(o));use_iso_morphic_effect_s(()=>(s({type:7,id:d,dataRef:f}),()=>s({type:8,id:d})),[f,d]);let a=use_event_o(R=>{if(e)return R.preventDefault();b(),l.propsRef.current.mode===0&&(s({type:1}),disposables_m().nextFrame(()=>{var p;return(p=l.buttonRef.current)==null?void 0:p.focus({preventScroll:!0})}))}),c=use_event_o(()=>{if(e)return s({type:4,focus:calculate_active_index_a.Nothing});s({type:4,focus:calculate_active_index_a.Specific,id:d})}),P=use_event_o(()=>{e||r||s({type:4,focus:calculate_active_index_a.Specific,id:d,trigger:0})}),D=use_event_o(()=>{e||!r||s({type:4,focus:calculate_active_index_a.Nothing})}),M=(0,external_react_.useMemo)(()=>({active:r,selected:g,disabled:e}),[r,g,e]);return $({ourProps:{id:d,ref:m,role:"option",tabIndex:e===!0?void 0:-1,"aria-disabled":e===!0?!0:void 0,"aria-selected":g,disabled:void 0,onClick:a,onFocus:c,onPointerMove:P,onMouseMove:P,onPointerLeave:D,onMouseLeave:D},theirProps:u,slot:M,defaultTag:listbox_Ee,name:"Listbox.Option"})}),pt=Object.assign(Le,{Button:Ae,Label:listbox_Pe,Options:Me,Option:Ie});

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(6405);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-seo@5.14.1_7iuvftg57tblwyxclfkwku5xo4/node_modules/next-seo/lib/next-seo.js
var next_seo = __webpack_require__(5047);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
function use_tree_walker_F({container:e,accept:t,walk:r,enabled:c=!0}){let o=(0,external_react_.useRef)(t),l=(0,external_react_.useRef)(r);(0,external_react_.useEffect)(()=>{o.current=t,l.current=r},[t,r]),use_iso_morphic_effect_s(()=>{if(!e||!c)return;let n=owner_e(e);if(!n)return;let f=o.current,p=l.current,d=Object.assign(i=>f(i),{acceptNode:f}),u=n.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,d,!1);for(;u.nextNode();)p(u.currentNode)},[e,c,o,l])}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/hooks/use-owner.js
function use_owner_n(...e){return (0,external_react_.useMemo)(()=>owner_e(...e),[...e])}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/menu/menu.js
var ue=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(ue||{}),se=(o=>(o[o.Pointer=0]="Pointer",o[o.Other=1]="Other",o))(se||{}),le=(n=>(n[n.OpenMenu=0]="OpenMenu",n[n.CloseMenu=1]="CloseMenu",n[n.GoToItem=2]="GoToItem",n[n.Search=3]="Search",n[n.ClearSearch=4]="ClearSearch",n[n.RegisterItem=5]="RegisterItem",n[n.UnregisterItem=6]="UnregisterItem",n))(le||{});function k(t,i=o=>o){let o=t.activeItemIndex!==null?t.items[t.activeItemIndex]:null,e=focus_management_S(i(t.items.slice()),u=>u.dataRef.current.domRef.current),r=o?e.indexOf(o):null;return r===-1&&(r=null),{items:e,activeItemIndex:r}}let ce={[1](t){return t.menuState===1?t:{...t,activeItemIndex:null,menuState:1}},[0](t){return t.menuState===0?t:{...t,menuState:0}},[2]:(t,i)=>{var r;let o=k(t),e=calculate_active_index_x(i,{resolveItems:()=>o.items,resolveActiveIndex:()=>o.activeItemIndex,resolveId:u=>u.id,resolveDisabled:u=>u.dataRef.current.disabled});return{...t,...o,searchQuery:"",activeItemIndex:e,activationTrigger:(r=i.trigger)!=null?r:1}},[3]:(t,i)=>{let e=t.searchQuery!==""?0:1,r=t.searchQuery+i.value.toLowerCase(),s=(t.activeItemIndex!==null?t.items.slice(t.activeItemIndex+e).concat(t.items.slice(0,t.activeItemIndex+e)):t.items).find(p=>{var c;return((c=p.dataRef.current.textValue)==null?void 0:c.startsWith(r))&&!p.dataRef.current.disabled}),n=s?t.items.indexOf(s):-1;return n===-1||n===t.activeItemIndex?{...t,searchQuery:r}:{...t,searchQuery:r,activeItemIndex:n,activationTrigger:1}},[4](t){return t.searchQuery===""?t:{...t,searchQuery:"",searchActiveItemIndex:null}},[5]:(t,i)=>{let o=k(t,e=>[...e,{id:i.id,dataRef:i.dataRef}]);return{...t,...o}},[6]:(t,i)=>{let o=k(t,e=>{let r=e.findIndex(u=>u.id===i.id);return r!==-1&&e.splice(r,1),e});return{...t,...o,activationTrigger:1}}},menu_w=(0,external_react_.createContext)(null);menu_w.displayName="MenuContext";function menu_C(t){let i=(0,external_react_.useContext)(menu_w);if(i===null){let o=new Error(`<${t} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,menu_C),o}return i}function pe(t,i){return match_u(i.type,ce,t,i)}let de=external_react_.Fragment,menu_me=C(function(i,o){let e=(0,external_react_.useReducer)(pe,{menuState:1,buttonRef:(0,external_react_.createRef)(),itemsRef:(0,external_react_.createRef)(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:r,itemsRef:u,buttonRef:s},n]=e,p=use_sync_refs_y(o);L([s,u],(A,M)=>{var l;n({type:1}),focus_management_F(M,focus_management_N.Loose)||(A.preventDefault(),(l=s.current)==null||l.focus())},r===0);let c=use_event_o(()=>{n({type:1})}),b=(0,external_react_.useMemo)(()=>({open:r===0,close:c}),[r,c]),m=i,g={ref:p};return external_react_.createElement(menu_w.Provider,{value:e},external_react_.createElement(open_closed_C,{value:match_u(r,{[0]:open_closed_p.Open,[1]:open_closed_p.Closed})},$({ourProps:g,theirProps:m,slot:b,defaultTag:de,name:"Menu"})))}),fe="button",Te=C(function(i,o){var M;let[e,r]=menu_C("Menu.Button"),u=use_sync_refs_y(e.buttonRef,o),s=`headlessui-menu-button-${use_id_I()}`,n=use_disposables_p(),p=use_event_o(l=>{switch(l.key){case keyboard_o.Space:case keyboard_o.Enter:case keyboard_o.ArrowDown:l.preventDefault(),l.stopPropagation(),r({type:0}),n.nextFrame(()=>r({type:2,focus:calculate_active_index_a.First}));break;case keyboard_o.ArrowUp:l.preventDefault(),l.stopPropagation(),r({type:0}),n.nextFrame(()=>r({type:2,focus:calculate_active_index_a.Last}));break}}),c=use_event_o(l=>{switch(l.key){case keyboard_o.Space:l.preventDefault();break}}),b=use_event_o(l=>{if(bugs_r(l.currentTarget))return l.preventDefault();i.disabled||(e.menuState===0?(r({type:1}),n.nextFrame(()=>{var R;return(R=e.buttonRef.current)==null?void 0:R.focus({preventScroll:!0})})):(l.preventDefault(),r({type:0})))}),m=(0,external_react_.useMemo)(()=>({open:e.menuState===0}),[e]),g=i,A={ref:u,id:s,type:use_resolve_button_type_s(i,e.buttonRef),"aria-haspopup":!0,"aria-controls":(M=e.itemsRef.current)==null?void 0:M.id,"aria-expanded":i.disabled?void 0:e.menuState===0,onKeyDown:p,onKeyUp:c,onClick:b};return $({ourProps:A,theirProps:g,slot:m,defaultTag:fe,name:"Menu.Button"})}),menu_ye="div",menu_Ie=S.RenderStrategy|S.Static,menu_ge=C(function(i,o){var R,S;let[e,r]=menu_C("Menu.Items"),u=use_sync_refs_y(e.itemsRef,o),s=use_owner_n(e.itemsRef),n=`headlessui-menu-items-${use_id_I()}`,p=use_disposables_p(),c=open_closed_s(),b=(()=>c!==null?c===open_closed_p.Open:e.menuState===0)();(0,external_react_.useEffect)(()=>{let a=e.itemsRef.current;!a||e.menuState===0&&a!==(s==null?void 0:s.activeElement)&&a.focus({preventScroll:!0})},[e.menuState,e.itemsRef,s]),use_tree_walker_F({container:e.itemsRef.current,enabled:e.menuState===0,accept(a){return a.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:a.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(a){a.setAttribute("role","none")}});let m=use_event_o(a=>{var T,y;switch(p.dispose(),a.key){case keyboard_o.Space:if(e.searchQuery!=="")return a.preventDefault(),a.stopPropagation(),r({type:3,value:a.key});case keyboard_o.Enter:if(a.preventDefault(),a.stopPropagation(),r({type:1}),e.activeItemIndex!==null){let{dataRef:v}=e.items[e.activeItemIndex];(y=(T=v.current)==null?void 0:T.domRef.current)==null||y.click()}focus_management_I(e.buttonRef.current);break;case keyboard_o.ArrowDown:return a.preventDefault(),a.stopPropagation(),r({type:2,focus:calculate_active_index_a.Next});case keyboard_o.ArrowUp:return a.preventDefault(),a.stopPropagation(),r({type:2,focus:calculate_active_index_a.Previous});case keyboard_o.Home:case keyboard_o.PageUp:return a.preventDefault(),a.stopPropagation(),r({type:2,focus:calculate_active_index_a.First});case keyboard_o.End:case keyboard_o.PageDown:return a.preventDefault(),a.stopPropagation(),r({type:2,focus:calculate_active_index_a.Last});case keyboard_o.Escape:a.preventDefault(),a.stopPropagation(),r({type:1}),disposables_m().nextFrame(()=>{var v;return(v=e.buttonRef.current)==null?void 0:v.focus({preventScroll:!0})});break;case keyboard_o.Tab:a.preventDefault(),a.stopPropagation(),r({type:1}),disposables_m().nextFrame(()=>{D(e.buttonRef.current,a.shiftKey?focus_management_T.Previous:focus_management_T.Next)});break;default:a.key.length===1&&(r({type:3,value:a.key}),p.setTimeout(()=>r({type:4}),350));break}}),g=use_event_o(a=>{switch(a.key){case keyboard_o.Space:a.preventDefault();break}}),A=(0,external_react_.useMemo)(()=>({open:e.menuState===0}),[e]),M=i,l={"aria-activedescendant":e.activeItemIndex===null||(R=e.items[e.activeItemIndex])==null?void 0:R.id,"aria-labelledby":(S=e.buttonRef.current)==null?void 0:S.id,id:n,onKeyDown:m,onKeyUp:g,role:"menu",tabIndex:0,ref:u};return $({ourProps:l,theirProps:M,slot:A,defaultTag:menu_ye,features:menu_Ie,visible:b,name:"Menu.Items"})}),menu_Me=external_react_.Fragment,menu_Re=C(function(i,o){let{disabled:e=!1,...r}=i,[u,s]=menu_C("Menu.Item"),n=`headlessui-menu-item-${use_id_I()}`,p=u.activeItemIndex!==null?u.items[u.activeItemIndex].id===n:!1,c=(0,external_react_.useRef)(null),b=use_sync_refs_y(o,c);use_iso_morphic_effect_s(()=>{if(u.menuState!==0||!p||u.activationTrigger===0)return;let T=disposables_m();return T.requestAnimationFrame(()=>{var y,v;(v=(y=c.current)==null?void 0:y.scrollIntoView)==null||v.call(y,{block:"nearest"})}),T.dispose},[c,p,u.menuState,u.activationTrigger,u.activeItemIndex]);let m=(0,external_react_.useRef)({disabled:e,domRef:c});use_iso_morphic_effect_s(()=>{m.current.disabled=e},[m,e]),use_iso_morphic_effect_s(()=>{var T,y;m.current.textValue=(y=(T=c.current)==null?void 0:T.textContent)==null?void 0:y.toLowerCase()},[m,c]),use_iso_morphic_effect_s(()=>(s({type:5,id:n,dataRef:m}),()=>s({type:6,id:n})),[m,n]);let g=use_event_o(()=>{s({type:1})}),A=use_event_o(T=>{if(e)return T.preventDefault();s({type:1}),focus_management_I(u.buttonRef.current)}),M=use_event_o(()=>{if(e)return s({type:2,focus:calculate_active_index_a.Nothing});s({type:2,focus:calculate_active_index_a.Specific,id:n})}),l=use_event_o(()=>{e||p||s({type:2,focus:calculate_active_index_a.Specific,id:n,trigger:0})}),R=use_event_o(()=>{e||!p||s({type:2,focus:calculate_active_index_a.Nothing})}),S=(0,external_react_.useMemo)(()=>({active:p,disabled:e,close:g}),[p,e,g]);return $({ourProps:{id:n,ref:b,role:"menuitem",tabIndex:e===!0?void 0:-1,"aria-disabled":e===!0?!0:void 0,disabled:void 0,onClick:A,onFocus:M,onPointerMove:l,onMouseMove:l,onPointerLeave:R,onMouseLeave:R},theirProps:r,slot:S,defaultTag:menu_Me,name:"Menu.Item"})}),qe=Object.assign(menu_me,{Button:Te,Items:menu_ge,Item:menu_Re});

// EXTERNAL MODULE: ./node_modules/.pnpm/github-slugger@1.5.0/node_modules/github-slugger/index.js
var github_slugger = __webpack_require__(8799);
var github_slugger_default = /*#__PURE__*/__webpack_require__.n(github_slugger);
;// CONCATENATED MODULE: ./node_modules/.pnpm/compute-scroll-into-view@1.0.20/node_modules/compute-scroll-into-view/dist/index.mjs
function t(t){return"object"==typeof t&&null!=t&&1===t.nodeType}function dist_e(t,e){return(!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return dist_e(r.overflowY,n)||dist_e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return!1}function dist_r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}var dist_i=function(e,i){var o=window,l=i.scrollMode,d=i.block,f=i.inline,h=i.boundary,u=i.skipOverflowHiddenElements,s="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var a,c,g=document.scrollingElement||document.documentElement,p=[],m=e;t(m)&&s(m);){if((m=null==(c=(a=m).parentElement)?a.getRootNode().host||null:c)===g){p.push(m);break}null!=m&&m===document.body&&n(m)&&!n(document.documentElement)||null!=m&&n(m,u)&&p.push(m)}for(var w=o.visualViewport?o.visualViewport.width:innerWidth,v=o.visualViewport?o.visualViewport.height:innerHeight,W=window.scrollX||pageXOffset,H=window.scrollY||pageYOffset,b=e.getBoundingClientRect(),y=b.height,E=b.width,M=b.top,V=b.right,x=b.bottom,I=b.left,C="start"===d||"nearest"===d?M:"end"===d?x:M+y/2,R="center"===f?I+E/2:"end"===f?V:I,T=[],k=0;k<p.length;k++){var B=p[k],D=B.getBoundingClientRect(),O=D.height,X=D.width,Y=D.top,L=D.right,S=D.bottom,j=D.left;if("if-needed"===l&&M>=0&&I>=0&&x<=v&&V<=w&&M>=Y&&x<=S&&I>=j&&V<=L)return T;var N=getComputedStyle(B),q=parseInt(N.borderLeftWidth,10),z=parseInt(N.borderTopWidth,10),A=parseInt(N.borderRightWidth,10),F=parseInt(N.borderBottomWidth,10),G=0,J=0,K="offsetWidth"in B?B.offsetWidth-B.clientWidth-q-A:0,P="offsetHeight"in B?B.offsetHeight-B.clientHeight-z-F:0,Q="offsetWidth"in B?0===B.offsetWidth?0:X/B.offsetWidth:0,U="offsetHeight"in B?0===B.offsetHeight?0:O/B.offsetHeight:0;if(g===B)G="start"===d?C:"end"===d?C-v:"nearest"===d?dist_r(H,H+v,v,z,F,H+C,H+C+y,y):C-v/2,J="start"===f?R:"center"===f?R-w/2:"end"===f?R-w:dist_r(W,W+w,w,q,A,W+R,W+R+E,E),G=Math.max(0,G+H),J=Math.max(0,J+W);else{G="start"===d?C-Y-z:"end"===d?C-S+F+P:"nearest"===d?dist_r(Y,S,O,z,F+P,C,C+y,y):C-(Y+O/2)+P/2,J="start"===f?R-j-q:"center"===f?R-(j+X/2)+K/2:"end"===f?R-L+A+K:dist_r(j,L,X,q,A+K,R,R+E,E);var Z=B.scrollLeft,$=B.scrollTop;C+=$-(G=Math.max(0,Math.min($+G/U,B.scrollHeight-O/U+P))),R+=Z-(J=Math.max(0,Math.min(Z+J/Q,B.scrollWidth-X/Q+K)))}T.push({el:B,top:G,left:J})}return T};
//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/.pnpm/scroll-into-view-if-needed@2.2.31/node_modules/scroll-into-view-if-needed/es/index.js

function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}
function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }
  var canSmoothScroll = ('scrollBehavior' in document.body.style);
  actions.forEach(function (_ref) {
    var el = _ref.el,
      top = _ref.top,
      left = _ref.left;
    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}
function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }
  if (isOptionsObject(options)) {
    return options;
  }
  return {
    block: 'start',
    inline: 'nearest'
  };
}
function scrollIntoView(target, options) {
  var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);
  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(isTargetAttached ? dist_i(target, options) : []);
  }
  if (!isTargetAttached) {
    return;
  }
  var computeOptions = getOptions(options);
  return defaultBehavior(dist_i(target, computeOptions), computeOptions.behavior);
}
/* harmony default export */ const es = (scrollIntoView);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/internal/focus-sentinel.js
function focus_sentinel_p({onFocus:n}){let[r,o]=(0,external_react_.useState)(!0);return r?external_react_.createElement(hidden_h,{as:"button",type:"button",features:hidden_s.Focusable,onFocus:a=>{a.preventDefault();let e,u=50;function t(){if(u--<=0){e&&cancelAnimationFrame(e);return}if(n()){o(!1),cancelAnimationFrame(e);return}e=requestAnimationFrame(t)}e=requestAnimationFrame(t)}}):null}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@headlessui+react@1.7.4_biqbaboplfbrettd7655fr4n2y/node_modules/@headlessui/react/dist/components/tabs/tabs.js
var tabs_de=(n=>(n[n.SetSelectedIndex=0]="SetSelectedIndex",n[n.RegisterTab=1]="RegisterTab",n[n.UnregisterTab=2]="UnregisterTab",n[n.RegisterPanel=3]="RegisterPanel",n[n.UnregisterPanel=4]="UnregisterPanel",n))(tabs_de||{});let tabs_pe={[0](e,t){let r=e.tabs.filter(i=>{var l;return!((l=i.current)!=null&&l.hasAttribute("disabled"))});if(t.index<0)return{...e,selectedIndex:e.tabs.indexOf(r[0])};if(t.index>e.tabs.length)return{...e,selectedIndex:e.tabs.indexOf(r[r.length-1])};let o=e.tabs.slice(0,t.index),n=[...e.tabs.slice(t.index),...o].find(i=>r.includes(i));return n?{...e,selectedIndex:e.tabs.indexOf(n)}:e},[1](e,t){var n;if(e.tabs.includes(t.tab))return e;let r=e.tabs[e.selectedIndex],o=focus_management_S([...e.tabs,t.tab],i=>i.current),s=(n=o.indexOf(r))!=null?n:e.selectedIndex;return s===-1&&(s=e.selectedIndex),{...e,tabs:o,selectedIndex:s}},[2](e,t){return{...e,tabs:e.tabs.filter(r=>r!==t.tab)}},[3](e,t){return e.panels.includes(t.panel)?e:{...e,panels:focus_management_S([...e.panels,t.panel],r=>r.current)}},[4](e,t){return{...e,panels:e.panels.filter(r=>r!==t.panel)}}},z=(0,external_react_.createContext)(null);z.displayName="TabsSSRContext";function V(e){let t=(0,external_react_.useContext)(z);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,V),r}return t}let tabs_q=(0,external_react_.createContext)(null);tabs_q.displayName="TabsDataContext";function tabs_D(e){let t=(0,external_react_.useContext)(tabs_q);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,tabs_D),r}return t}let J=(0,external_react_.createContext)(null);J.displayName="TabsActionsContext";function Q(e){let t=(0,external_react_.useContext)(J);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,Q),r}return t}function tabs_fe(e,t){return match_u(t.type,tabs_pe,e,t)}let tabs_be=external_react_.Fragment,tabs_Te=C(function(t,r){let{defaultIndex:o=0,vertical:s=!1,manual:n=!1,onChange:i,selectedIndex:l=null,...y}=t;const p=s?"vertical":"horizontal",S=n?"manual":"auto";let b=l!==null,u=use_sync_refs_y(r),[c,f]=(0,external_react_.useReducer)(tabs_fe,{selectedIndex:l!=null?l:o,tabs:[],panels:[]}),T=(0,external_react_.useMemo)(()=>({selectedIndex:c.selectedIndex}),[c.selectedIndex]),x=use_latest_value_s(i||(()=>{})),R=use_latest_value_s(c.tabs),E=(0,external_react_.useMemo)(()=>({orientation:p,activation:S,...c}),[p,S,c]),A=use_latest_value_s(b?t.selectedIndex:c.selectedIndex),L=(0,external_react_.useMemo)(()=>({registerTab(d){return f({type:1,tab:d}),()=>f({type:2,tab:d})},registerPanel(d){return f({type:3,panel:d}),()=>f({type:4,panel:d})},change(d){A.current!==d&&x.current(d),b||f({type:0,index:d})}}),[f,b]);use_iso_morphic_effect_s(()=>{f({type:0,index:l!=null?l:o})},[l]);let k=(0,external_react_.useRef)({tabs:[],panels:[]}),G={ref:u};return external_react_.createElement(z.Provider,{value:k},external_react_.createElement(J.Provider,{value:L},external_react_.createElement(tabs_q.Provider,{value:E},E.tabs.length<=0&&external_react_.createElement(focus_sentinel_p,{onFocus:()=>{var d,U;for(let M of R.current)if(((d=M.current)==null?void 0:d.tabIndex)===0)return(U=M.current)==null||U.focus(),!0;return!1}}),$({ourProps:G,theirProps:y,slot:T,defaultTag:tabs_be,name:"Tabs"}))))}),tabs_me="div",tabs_Pe=C(function(t,r){let{orientation:o,selectedIndex:s}=tabs_D("Tab.List"),n=use_sync_refs_y(r);return $({ourProps:{ref:n,role:"tablist","aria-orientation":o},theirProps:t,slot:{selectedIndex:s},defaultTag:tabs_me,name:"Tabs.List"})}),tabs_xe="button",tabs_ge=C(function(t,r){var M,X;let o=`headlessui-tabs-tab-${use_id_I()}`,{orientation:s,activation:n,selectedIndex:i,tabs:l,panels:y}=tabs_D("Tab"),p=Q("Tab"),S=tabs_D("Tab"),b=V("Tab"),u=(0,external_react_.useRef)(null),c=use_sync_refs_y(u,r);use_iso_morphic_effect_s(()=>p.registerTab(u),[p,u]);let f=b.current.tabs.indexOf(o);f===-1&&(f=b.current.tabs.push(o)-1);let T=l.indexOf(u);T===-1&&(T=f);let x=T===i,R=use_event_o(a=>{var j;let g=a();if(g===focus_management_M.Success&&n==="auto"){let W=(j=owner_e(u))==null?void 0:j.activeElement,Y=S.tabs.findIndex(ne=>ne.current===W);Y!==-1&&p.change(Y)}return g}),E=use_event_o(a=>{let g=l.map(W=>W.current).filter(Boolean);if(a.key===keyboard_o.Space||a.key===keyboard_o.Enter){a.preventDefault(),a.stopPropagation(),p.change(T);return}switch(a.key){case keyboard_o.Home:case keyboard_o.PageUp:return a.preventDefault(),a.stopPropagation(),R(()=>O(g,focus_management_T.First));case keyboard_o.End:case keyboard_o.PageDown:return a.preventDefault(),a.stopPropagation(),R(()=>O(g,focus_management_T.Last))}if(R(()=>match_u(s,{vertical(){return a.key===keyboard_o.ArrowUp?O(g,focus_management_T.Previous|focus_management_T.WrapAround):a.key===keyboard_o.ArrowDown?O(g,focus_management_T.Next|focus_management_T.WrapAround):focus_management_M.Error},horizontal(){return a.key===keyboard_o.ArrowLeft?O(g,focus_management_T.Previous|focus_management_T.WrapAround):a.key===keyboard_o.ArrowRight?O(g,focus_management_T.Next|focus_management_T.WrapAround):focus_management_M.Error}}))===focus_management_M.Success)return a.preventDefault()}),A=(0,external_react_.useRef)(!1),L=use_event_o(()=>{var a;A.current||(A.current=!0,(a=u.current)==null||a.focus(),p.change(T),micro_task_t(()=>{A.current=!1}))}),k=use_event_o(a=>{a.preventDefault()}),G=(0,external_react_.useMemo)(()=>({selected:x}),[x]),d=t,U={ref:c,onKeyDown:E,onMouseDown:k,onClick:L,id:o,role:"tab",type:use_resolve_button_type_s(t,u),"aria-controls":(X=(M=y[T])==null?void 0:M.current)==null?void 0:X.id,"aria-selected":x,tabIndex:x?0:-1};return $({ourProps:U,theirProps:d,slot:G,defaultTag:tabs_xe,name:"Tabs.Tab"})}),tabs_ye="div",tabs_Re=C(function(t,r){let{selectedIndex:o}=tabs_D("Tab.Panels"),s=use_sync_refs_y(r),n=(0,external_react_.useMemo)(()=>({selectedIndex:o}),[o]);return $({ourProps:{ref:s},theirProps:t,slot:n,defaultTag:tabs_ye,name:"Tabs.Panels"})}),tabs_Ae="div",tabs_Ee=S.RenderStrategy|S.Static,tabs_Se=C(function(t,r){var R,E,A,L;let{selectedIndex:o,tabs:s,panels:n}=tabs_D("Tab.Panel"),i=Q("Tab.Panel"),l=V("Tab.Panel"),y=`headlessui-tabs-panel-${use_id_I()}`,p=(0,external_react_.useRef)(null),S=use_sync_refs_y(p,r);use_iso_morphic_effect_s(()=>i.registerPanel(p),[i,p]);let b=l.current.panels.indexOf(y);b===-1&&(b=l.current.panels.push(y)-1);let u=n.indexOf(p);u===-1&&(u=b);let c=u===o,f=(0,external_react_.useMemo)(()=>({selected:c}),[c]),T=t,x={ref:S,id:y,role:"tabpanel","aria-labelledby":(E=(R=s[u])==null?void 0:R.current)==null?void 0:E.id,tabIndex:c?0:-1};return!c&&((A=t.unmount)!=null?A:!0)&&!((L=t.static)!=null&&L)?external_react_.createElement(hidden_h,{as:"span",...x}):$({ourProps:x,theirProps:T,slot:f,defaultTag:tabs_Ae,features:tabs_Ee,visible:c,name:"Tabs.Panel"})}),tabs_qe=Object.assign(tabs_ge,{Group:tabs_Te,List:tabs_Pe,Panels:tabs_Re,Panel:tabs_Se});

// EXTERNAL MODULE: ./node_modules/.pnpm/match-sorter@6.3.1/node_modules/match-sorter/dist/match-sorter.cjs.js
var match_sorter_cjs = __webpack_require__(3292);
// EXTERNAL MODULE: ./node_modules/.pnpm/intersection-observer@0.12.2/node_modules/intersection-observer/intersection-observer.js
var intersection_observer = __webpack_require__(5983);
;// CONCATENATED MODULE: ./node_modules/.pnpm/nextra-theme-docs@2.0.1_7iuvftg57tblwyxclfkwku5xo4/node_modules/nextra-theme-docs/dist/index.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.tsx







// src/constants.tsx



// src/components/anchor.tsx




// src/contexts/active-anchor.tsx

var ActiveAnchorContext = (0,external_react_.createContext)({});
var SetActiveAnchorContext = (0,external_react_.createContext)((v) => v);
var useActiveAnchor = () => (0,external_react_.useContext)(ActiveAnchorContext);
var useSetActiveAnchor = () => (0,external_react_.useContext)(SetActiveAnchorContext);
var ActiveAnchorProvider = ({
  children
}) => {
  const [activeAnchor, setActiveAnchor2] = (0,external_react_.useState)({});
  return /* @__PURE__ */ external_react_default().createElement(ActiveAnchorContext.Provider, {
    value: activeAnchor
  }, /* @__PURE__ */ external_react_default().createElement(SetActiveAnchorContext.Provider, {
    value: setActiveAnchor2
  }, children));
};

// src/contexts/config.tsx



// src/contexts/menu.ts

var MenuContext = (0,external_react_.createContext)({
  menu: false,
  setMenu: () => {
  }
});
var useMenu = () => (0,external_react_.useContext)(MenuContext);
var MenuProvider = MenuContext.Provider;

// src/contexts/config.tsx
var ConfigContext = (0,external_react_.createContext)(__spreadValues({
  title: "",
  frontMatter: {}
}, DEFAULT_THEME));
var useConfig = () => (0,external_react_.useContext)(ConfigContext);
var ConfigProvider = ({
  children,
  value
}) => {
  const [menu, setMenu] = (0,external_react_.useState)(false);
  const { themeConfig, pageOpts } = value;
  const extendedConfig = __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, DEFAULT_THEME), themeConfig), {
    flexsearch: pageOpts.flexsearch,
    newNextLinkBehavior: pageOpts.newNextLinkBehavior,
    title: pageOpts.title,
    frontMatter: pageOpts.frontMatter
  }), Object.fromEntries(
    DEEP_OBJECT_KEYS.map(
      (key) => typeof themeConfig[key] === "object" ? [
        key,
        __spreadValues(__spreadValues({}, DEFAULT_THEME[key]), themeConfig[key])
      ] : []
    )
  ));
  const { nextThemes } = extendedConfig;
  if (false) {}
  return /* @__PURE__ */ external_react_default().createElement(dist/* ThemeProvider */.f, {
    attribute: "class",
    disableTransitionOnChange: true,
    defaultTheme: nextThemes.defaultTheme,
    storageKey: nextThemes.storageKey,
    forcedTheme: nextThemes.forcedTheme
  }, /* @__PURE__ */ external_react_default().createElement(ConfigContext.Provider, {
    value: extendedConfig
  }, /* @__PURE__ */ external_react_default().createElement(MenuProvider, {
    value: { menu, setMenu }
  }, children)));
};

// src/contexts/details.ts

var DetailsContext = (0,external_react_.createContext)((v) => v);
var useDetails = () => (0,external_react_.useContext)(DetailsContext);
var DetailsProvider = DetailsContext.Provider;

// src/components/anchor.tsx
var nextVersion = Number(package_namespaceObject.i8.split(".")[0]);
var Anchor = (0,external_react_.forwardRef)(function(_a, forwardedRef) {
  var _b = _a, { href = "", children, newWindow } = _b, props = __objRest(_b, ["href", "children", "newWindow"]);
  const config = useConfig();
  if (newWindow) {
    return /* @__PURE__ */ external_react_default().createElement("a", __spreadValues({
      ref: forwardedRef,
      href,
      target: "_blank",
      rel: "noreferrer"
    }, props), children, /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-sr-only"
    }, " (opens in a new tab)"));
  }
  if (!href) {
    return /* @__PURE__ */ external_react_default().createElement("a", __spreadValues({
      ref: forwardedRef
    }, props), children);
  }
  if (nextVersion > 12 || config.newNextLinkBehavior) {
    return /* @__PURE__ */ external_react_default().createElement((link_default()), __spreadValues({
      ref: forwardedRef,
      href
    }, props), children);
  }
  return /* @__PURE__ */ external_react_default().createElement((link_default()), {
    href,
    passHref: true
  }, /* @__PURE__ */ external_react_default().createElement("a", __spreadValues({
    ref: forwardedRef
  }, props), children));
});

// src/components/banner.tsx


// ../nextra/dist/chunk-HIDP27A7.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __objRest2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async2 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../nextra/dist/chunk-XXFR3PNG.mjs













function ArrowRightIcon(_a) {
  var _b = _a, {
    pathClassName
  } = _b, props = __objRest2(_b, [
    "pathClassName"
  ]);
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M9 5l7 7-7 7",
    className: pathClassName
  }));
}
function CheckIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    viewBox: "0 0 20 20",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}
function CopyIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ external_react_default().createElement("path", {
    d: "M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function DiscordIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    width: "24",
    height: "24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 5 30.67 23.25"
  }, props), /* @__PURE__ */ external_react_default().createElement("title", null, "Discord"), /* @__PURE__ */ external_react_default().createElement("path", {
    d: "M26.0015 6.9529C24.0021 6.03845 21.8787 5.37198 19.6623 5C19.3833 5.48048 19.0733 6.13144 18.8563 6.64292C16.4989 6.30193 14.1585 6.30193 11.8336 6.64292C11.6166 6.13144 11.2911 5.48048 11.0276 5C8.79575 5.37198 6.67235 6.03845 4.6869 6.9529C0.672601 12.8736 -0.41235 18.6548 0.130124 24.3585C2.79599 26.2959 5.36889 27.4739 7.89682 28.2489C8.51679 27.4119 9.07477 26.5129 9.55525 25.5675C8.64079 25.2265 7.77283 24.808 6.93587 24.312C7.15286 24.1571 7.36986 23.9866 7.57135 23.8161C12.6241 26.1255 18.0969 26.1255 23.0876 23.8161C23.3046 23.9866 23.5061 24.1571 23.7231 24.312C22.8861 24.808 22.0182 25.2265 21.1037 25.5675C21.5842 26.5129 22.1422 27.4119 22.7621 28.2489C25.2885 27.4739 27.8769 26.2959 30.5288 24.3585C31.1952 17.7559 29.4733 12.0212 26.0015 6.9529ZM10.2527 20.8402C8.73376 20.8402 7.49382 19.4608 7.49382 17.7714C7.49382 16.082 8.70276 14.7025 10.2527 14.7025C11.7871 14.7025 13.0425 16.082 13.0115 17.7714C13.0115 19.4608 11.7871 20.8402 10.2527 20.8402ZM20.4373 20.8402C18.9183 20.8402 17.6768 19.4608 17.6768 17.7714C17.6768 16.082 18.8873 14.7025 20.4373 14.7025C21.9717 14.7025 23.2271 16.082 23.1961 17.7714C23.1961 19.4608 21.9872 20.8402 20.4373 20.8402Z"
  }));
}
function GitHubIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    width: "24",
    height: "24",
    fill: "currentColor",
    viewBox: "3 3 18 18"
  }, props), /* @__PURE__ */ external_react_default().createElement("title", null, "GitHub"), /* @__PURE__ */ external_react_default().createElement("path", {
    d: "M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
  }));
}
function GlobeIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    viewBox: "2 2 16 16",
    width: "12",
    height: "12",
    fill: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    fillRule: "evenodd",
    d: "M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z",
    clipRule: "evenodd"
  }));
}
function InformationCircleIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    width: "20",
    height: "20"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
  }));
}
function MenuIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    fill: "none",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("g", null, /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 6h16"
  })), /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 12h16"
  }), /* @__PURE__ */ external_react_default().createElement("g", null, /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 18h16"
  })));
}
function MoonIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    fill: "none",
    viewBox: "2 2 20 20",
    width: "12",
    height: "12",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    fill: "currentColor",
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  }));
}
function SpinnerIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24"
  }, props), /* @__PURE__ */ external_react_default().createElement("circle", {
    className: "nx-opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /* @__PURE__ */ external_react_default().createElement("path", {
    className: "nx-opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }));
}
function SunIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    fill: "none",
    viewBox: "3 3 18 18",
    width: "12",
    height: "12",
    stroke: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    fill: "currentColor",
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  }));
}
function WordWrapIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    viewBox: "0 0 24 24",
    width: "24",
    height: "24"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    fill: "currentColor",
    d: "M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
  }));
}
function XIcon(props) {
  return /* @__PURE__ */ external_react_default().createElement("svg", __spreadValues2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, props), /* @__PURE__ */ external_react_default().createElement("path", {
    fillRule: "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

// src/components/banner.tsx


// src/utils/get-fs-route.ts
var template = "https://nextra.vercel.app";
var getFSRoute = (asPath, locale) => {
  const pathname = new URL(asPath, template).pathname;
  const cleanedPath = locale ? pathname.replace(new RegExp(`.${locale}(/|$)`), "$1") : pathname;
  return cleanedPath.replace(new RegExp("/index(/|$)"), "$1").split("#")[0] || "/";
};

// src/utils/get-git-edit-url.ts

var getGitEditUrl = (filePath) => {
  const config = useConfig();
  const repo = lib_default()(config.docsRepositoryBase || "");
  if (!repo)
    throw new Error("Invalid `docsRepositoryBase` URL!");
  return `${repo.href}/${filePath}`;
};

// src/utils/get-git-issue-url.ts

var getGitIssueUrl = ({
  repository = "",
  title,
  labels
}) => {
  const repo = lib_default()(repository);
  if (!repo)
    throw new Error("Invalid `docsRepositoryBase` URL!");
  if (repo.resource.includes("gitlab")) {
    return `${repo.protocol}://${repo.resource}/${repo.owner}/${repo.name}/-/issues/new?issue[title]=${encodeURIComponent(title)}`;
  } else if (repo.resource.includes("github")) {
    return `${repo.protocol}://${repo.resource}/${repo.owner}/${repo.name}/issues/new?title=${encodeURIComponent(title)}&labels=${labels || ""}`;
  } else {
    return "#";
  }
};

// src/utils/get-heading-text.ts
function getHeadingText(heading) {
  return heading.value || "";
}

// src/utils/normalize-pages.ts
function extendMeta(meta = {}, fallback) {
  if (typeof meta === "string") {
    meta = { title: meta };
  }
  const theme = Object.assign({}, fallback.theme, meta.theme);
  return Object.assign({}, fallback, meta, { theme });
}
function findFirstRoute(items) {
  for (const item of items) {
    if (item.route)
      return item.route;
    if (item.children) {
      const route = findFirstRoute(item.children);
      if (route)
        return route;
    }
  }
}
var CUSTOM_ERROR_PAGES = ["/404", "/500"];
function normalizePages({
  list,
  locale,
  defaultLocale,
  route,
  docsRoot = "",
  underCurrentDocsRoot = false,
  pageThemeContext = DEFAULT_PAGE_THEME
}) {
  let _meta;
  for (let item of list) {
    if (item.kind === "Meta") {
      if (item.locale === locale) {
        _meta = item.data;
        break;
      }
      if (!_meta) {
        _meta = item.data;
      }
    }
  }
  const meta = _meta || {};
  const metaKeys = Object.keys(meta);
  for (let key of metaKeys) {
    if (typeof meta[key] === "string") {
      meta[key] = {
        title: meta[key]
      };
    }
  }
  const directories = [];
  const flatDirectories = [];
  const docsDirectories = [];
  const flatDocsDirectories = [];
  const topLevelNavbarItems = [];
  let activeType;
  let activeIndex = 0;
  let activeThemeContext = pageThemeContext;
  let activePath = [];
  let metaKeyIndex = -1;
  const fallbackMeta = meta["*"] || {};
  delete fallbackMeta.title;
  delete fallbackMeta.href;
  const items = list.filter(
    (a) => a.kind !== "Meta" && !a.name.startsWith("_") && (a.locale === locale || a.locale === defaultLocale || !a.locale)
  ).sort((a, b) => {
    const indexA = metaKeys.indexOf(a.name);
    const indexB = metaKeys.indexOf(b.name);
    if (indexA === -1 && indexB === -1)
      return a.name < b.name ? -1 : 1;
    if (indexA === -1)
      return 1;
    if (indexB === -1)
      return -1;
    return indexA - indexB;
  }).flatMap((item) => {
    const items2 = [];
    const index = metaKeys.indexOf(item.name);
    let extendedItem;
    if (index !== -1) {
      for (let i = metaKeyIndex + 1; i < index; i++) {
        const key = metaKeys[i];
        if (key !== "*") {
          items2.push(__spreadValues({
            name: key,
            route: ""
          }, meta[key]));
        }
      }
      metaKeyIndex = index;
      extendedItem = __spreadValues(__spreadValues({}, meta[item.name]), item);
    }
    items2.push(extendedItem || item);
    return items2;
  });
  for (let i = metaKeyIndex + 1; i < metaKeys.length; i++) {
    const key = metaKeys[i];
    if (key !== "*") {
      items.push(__spreadValues({
        name: key,
        route: "#"
      }, meta[key]));
    }
  }
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    if (i + 1 < items.length && a.name === items[i + 1].name) {
      items[i + 1] = __spreadProps(__spreadValues({}, items[i + 1]), { withIndexPage: true });
      if (a.children && !items[i + 1].children) {
        items[i + 1].children = a.children;
      }
      continue;
    }
    const extendedMeta = extendMeta(meta[a.name], fallbackMeta);
    const { display, type = "doc" } = extendedMeta;
    const extendedPageThemeContext = __spreadValues(__spreadValues({}, pageThemeContext), extendedMeta.theme);
    const isCurrentDocsTree = route.startsWith(docsRoot);
    const normalizedChildren = a.children && normalizePages({
      list: a.children,
      locale,
      defaultLocale,
      route,
      docsRoot: type === "page" || type === "menu" ? a.route : docsRoot,
      underCurrentDocsRoot: underCurrentDocsRoot || isCurrentDocsTree,
      pageThemeContext: extendedPageThemeContext
    });
    const title = extendedMeta.title || type !== "separator" && a.name;
    const getItem = () => __spreadValues(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, a), {
      type
    }), title && { title }), display && { display }), normalizedChildren && { children: [] });
    const item = getItem();
    const docsItem = getItem();
    const pageItem = getItem();
    docsItem.isUnderCurrentDocsTree = isCurrentDocsTree;
    if (type === "separator") {
      item.isUnderCurrentDocsTree = isCurrentDocsTree;
    }
    if (a.route === route) {
      activePath = [item];
      activeType = type;
      activeThemeContext = __spreadValues(__spreadValues({}, activeThemeContext), extendedPageThemeContext);
      switch (type) {
        case "page":
        case "menu":
          activeIndex = topLevelNavbarItems.length;
          break;
        case "doc":
          activeIndex = flatDocsDirectories.length;
      }
    }
    if (display === "hidden" || CUSTOM_ERROR_PAGES.includes(a.route))
      continue;
    if (normalizedChildren) {
      if (normalizedChildren.activeIndex !== void 0 && normalizedChildren.activeType !== void 0) {
        activeThemeContext = normalizedChildren.activeThemeContext;
        activeType = normalizedChildren.activeType;
        activePath = [item, ...normalizedChildren.activePath];
        switch (activeType) {
          case "page":
          case "menu":
            activeIndex = topLevelNavbarItems.length + normalizedChildren.activeIndex;
            break;
          case "doc":
            activeIndex = flatDocsDirectories.length + normalizedChildren.activeIndex;
            break;
        }
        if (a.withIndexPage) {
          if (type === "doc") {
            activeIndex++;
          }
        }
      }
      switch (type) {
        case "page":
        case "menu":
          pageItem.children.push(...normalizedChildren.directories);
          docsDirectories.push(...normalizedChildren.docsDirectories);
          if (normalizedChildren.flatDirectories.length) {
            pageItem.firstChildRoute = findFirstRoute(
              normalizedChildren.flatDirectories
            );
            topLevelNavbarItems.push(pageItem);
          } else if (pageItem.withIndexPage) {
            topLevelNavbarItems.push(pageItem);
          }
          break;
        case "doc":
          if (Array.isArray(docsItem.children)) {
            docsItem.children.push(...normalizedChildren.docsDirectories);
          }
          if (item.withIndexPage) {
            if (display !== "children") {
              flatDocsDirectories.push(docsItem);
            }
          }
      }
      flatDirectories.push(...normalizedChildren.flatDirectories);
      flatDocsDirectories.push(...normalizedChildren.flatDocsDirectories);
      if (Array.isArray(item.children)) {
        item.children.push(...normalizedChildren.directories);
      }
    } else {
      flatDirectories.push(item);
      switch (type) {
        case "page":
        case "menu":
          topLevelNavbarItems.push(pageItem);
          break;
        case "doc":
          flatDocsDirectories.push(docsItem);
      }
    }
    if (type === "doc" && display === "children") {
      if (docsItem.children) {
        directories.push(...docsItem.children);
        docsDirectories.push(...docsItem.children);
      }
    } else {
      directories.push(item);
    }
    switch (type) {
      case "page":
      case "menu":
        docsDirectories.push(pageItem);
        break;
      case "doc":
        if (display !== "children") {
          docsDirectories.push(docsItem);
        }
        break;
      case "separator":
        docsDirectories.push(item);
    }
  }
  return {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    directories,
    flatDirectories,
    docsDirectories,
    flatDocsDirectories,
    topLevelNavbarItems
  };
}

// src/utils/render.tsx

function renderComponent(ComponentOrNode, props) {
  if (!ComponentOrNode)
    return null;
  if (typeof ComponentOrNode !== "function")
    return ComponentOrNode;
  return /* @__PURE__ */ external_react_default().createElement(ComponentOrNode, __spreadValues({}, props));
}
function renderString(stringOrFunction, props = {}) {
  const result = typeof stringOrFunction === "function" ? stringOrFunction(props) : stringOrFunction;
  return result || "";
}

// src/utils/use-popper.ts


function usePopper(options) {
  const reference = (0,external_react_.useRef)(null);
  const popper = (0,external_react_.useRef)(null);
  const cleanupCallback = (0,external_react_.useRef)(() => {
  });
  let instantiatePopper = (0,external_react_.useCallback)(() => {
    if (!reference.current)
      return;
    if (!popper.current)
      return;
    if (cleanupCallback.current)
      cleanupCallback.current();
    cleanupCallback.current = (0,cjs_popper/* createPopper */.fi)(
      reference.current,
      popper.current,
      options
    ).destroy;
  }, [reference, popper, cleanupCallback, options]);
  return (0,external_react_.useMemo)(
    () => [
      (referenceDomNode) => {
        reference.current = referenceDomNode;
        instantiatePopper();
      },
      (popperDomNode) => {
        popper.current = popperDomNode;
        instantiatePopper();
      }
    ],
    [reference, popper, instantiatePopper]
  );
}

// src/components/banner.tsx
function Banner() {
  const { banner } = useConfig();
  if (!banner.text) {
    return null;
  }
  const hideBannerScript = `try{if(localStorage.getItem(${JSON.stringify(
    banner.key
  )})==='0'){document.body.classList.add('nextra-banner-hidden')}}catch(e){}`;
  return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("script", {
    dangerouslySetInnerHTML: { __html: hideBannerScript }
  }), /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-relative nx-z-20 nx-flex nx-items-center nx-justify-center",
      "nx-bg-neutral-900 nx-text-sm nx-font-medium nx-text-slate-50",
      "nx-h-[var(--nextra-banner-height)] [body.nextra-banner-hidden_&]:nx-hidden",
      "dark:nx-bg-[linear-gradient(1deg,#383838,#212121)] dark:nx-text-white",
      "nx-py-1 nx-pl-[max(env(safe-area-inset-left),2.5rem)] nx-pr-[max(env(safe-area-inset-right),2.5rem)]"
    )
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-max-w-[90rem] nx-truncate"
  }, renderComponent(banner.text)), banner.dismissible && /* @__PURE__ */ external_react_default().createElement("button", {
    className: "nx-absolute nx-opacity-80 hover:nx-opacity-100 ltr:nx-right-0 rtl:nx-left-0",
    onClick: () => {
      try {
        localStorage.setItem(banner.key, "0");
      } catch (e) {
      }
      document.body.classList.add("nextra-banner-hidden");
    }
  }, /* @__PURE__ */ external_react_default().createElement(XIcon, {
    className: "nx-mx-4 nx-h-4 nx-w-4"
  }))));
}

// src/components/bleed.tsx


function Bleed({
  full,
  children
}) {
  return /* @__PURE__ */ React16.createElement("div", {
    className: cn2(
      "nextra-bleed nx-relative -nx-mx-6 nx-mt-6 md:-nx-mx-8 2xl:-nx-mx-24",
      full && [
        "ltr:xl:nx-ml-[calc(50%-50vw+16rem)] ltr:xl:nx-mr-[calc(50%-50vw)]",
        "rtl:xl:nx-ml-[calc(50%-50vw)] rtl:xl:nx-mr-[calc(50%-50vw+16rem)]"
      ]
    )
  }, children);
}

// src/components/breadcrumb.tsx


function Breadcrumb({
  activePath
}) {
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nextra-breadcrumb nx-mt-2.5 nx-flex nx-items-center nx-gap-1 nx-overflow-hidden nx-text-sm nx-text-gray-500 contrast-more:nx-text-current"
  }, activePath.map((item, index) => {
    const isLink = !item.children || item.withIndexPage;
    const isActive = index === activePath.length - 1;
    return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, {
      key: item.route + item.name
    }, index > 0 && /* @__PURE__ */ external_react_default().createElement(ArrowRightIcon, {
      className: "nx-w-3.5 nx-shrink-0"
    }), /* @__PURE__ */ external_react_default().createElement("div", {
      className: external_clsx_default()(
        "nx-whitespace-nowrap nx-transition-colors",
        isActive ? "nx-font-medium nx-text-gray-700 contrast-more:nx-font-bold contrast-more:nx-text-current dark:nx-text-gray-400 contrast-more:dark:nx-text-current" : [
          "nx-min-w-[24px] nx-overflow-hidden nx-text-ellipsis",
          isLink && "hover:nx-text-gray-900 dark:hover:nx-text-gray-200"
        ]
      ),
      title: item.title
    }, isLink && !isActive ? /* @__PURE__ */ external_react_default().createElement(Anchor, {
      href: item.route
    }, item.title) : item.title));
  }));
}

// src/components/callout.tsx


var TypeToEmoji = {
  default: "\u{1F4A1}",
  error: "\u{1F6AB}",
  info: /* @__PURE__ */ external_react_default().createElement(InformationCircleIcon, {
    className: "nx-mt-1"
  }),
  warning: "\u26A0\uFE0F"
};
var classes = {
  default: external_clsx_default()(
    "nx-border-orange-100 nx-bg-orange-50 nx-text-orange-800 dark:nx-border-orange-400/30 dark:nx-bg-orange-400/20 dark:nx-text-orange-300"
  ),
  error: external_clsx_default()(
    "nx-border-red-200 nx-bg-red-100 nx-text-red-900 dark:nx-border-red-200/30 dark:nx-bg-red-900/30 dark:nx-text-red-200"
  ),
  info: external_clsx_default()(
    "nx-border-blue-200 nx-bg-blue-100 nx-text-blue-900 dark:nx-border-blue-200/30 dark:nx-bg-blue-900/30 dark:nx-text-blue-200"
  ),
  warning: external_clsx_default()(
    "nx-border-yellow-100 nx-bg-yellow-50 nx-text-yellow-900 dark:nx-bg-yellow-700/30 dark:nx-text-yellow-200"
  )
};
function Callout({
  children,
  type = "default",
  emoji = TypeToEmoji[type]
}) {
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nextra-callout nx-mt-6 nx-flex nx-rounded-lg nx-border nx-py-2 ltr:nx-pr-4 rtl:nx-pl-4",
      "contrast-more:nx-border-current contrast-more:dark:nx-border-current",
      classes[type]
    )
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-select-none nx-text-xl ltr:nx-pl-3 ltr:nx-pr-2 rtl:nx-pr-3 rtl:nx-pl-2",
    style: {
      fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  }, emoji), /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-w-full nx-min-w-0 nx-leading-7"
  }, children));
}

// src/components/collapse.tsx


function Collapse({
  children,
  className,
  open
}) {
  const containerRef = (0,external_react_.useRef)(null);
  const innerRef = (0,external_react_.useRef)(null);
  const animationRef = (0,external_react_.useRef)();
  const initialRender = (0,external_react_.useRef)(true);
  const initialState = (0,external_react_.useRef)(open);
  (0,external_react_.useEffect)(() => {
    if (initialRender.current)
      return;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    if (open) {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (container && inner) {
        const contentHeight = innerRef.current.clientHeight;
        container.style.maxHeight = contentHeight + "px";
        container.classList.remove("nx-duration-500");
        container.classList.add("nx-duration-300");
        inner.style.opacity = "1";
        animationRef.current = setTimeout(() => {
          const container2 = containerRef.current;
          if (container2) {
            container2.style.removeProperty("max-height");
          }
        }, 300);
      }
    } else {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (container && inner) {
        const contentHeight = innerRef.current.clientHeight;
        container.style.maxHeight = contentHeight + "px";
        container.classList.remove("nx-duration-300");
        container.classList.add("nx-duration-500");
        inner.style.opacity = "0";
        setTimeout(() => {
          const container2 = containerRef.current;
          if (container2) {
            container2.style.maxHeight = "0px";
          }
        }, 0);
      }
    }
  }, [open]);
  (0,external_react_.useEffect)(() => {
    initialRender.current = false;
  }, []);
  return /* @__PURE__ */ external_react_default().createElement("div", {
    ref: containerRef,
    className: "nx-transform-gpu nx-overflow-hidden nx-transition-all nx-duration-300 nx-ease-in-out motion-reduce:nx-transition-none",
    style: {
      maxHeight: initialState.current ? void 0 : 0
    }
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    ref: innerRef,
    className: external_clsx_default()(
      "nx-transform-gpu nx-overflow-hidden nx-p-2 nx-transition-opacity nx-duration-500 nx-ease-in-out motion-reduce:nx-transition-none",
      className
    ),
    style: {
      opacity: initialState.current ? 1 : 0
    }
  }, children));
}

// src/components/flexsearch.tsx





// src/components/search.tsx




// ../nextra/dist/hooks/index.mjs

function useMounted() {
  const [mounted, setMounted] = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// src/components/input.tsx


var Input = (0,external_react_.forwardRef)(
  (_a, forwardedRef) => {
    var _b = _a, { className, suffix } = _b, props = __objRest(_b, ["className", "suffix"]);
    return /* @__PURE__ */ external_react_default().createElement("div", {
      className: "nx-relative nx-flex nx-items-center nx-text-gray-900 contrast-more:nx-text-gray-800 dark:nx-text-gray-300 contrast-more:dark:nx-text-gray-300"
    }, /* @__PURE__ */ external_react_default().createElement("input", __spreadValues({
      ref: forwardedRef,
      spellCheck: false,
      className: external_clsx_default()(
        className,
        "nx-block nx-w-full nx-appearance-none nx-rounded-lg nx-px-3 nx-py-2 nx-transition-colors",
        "nx-text-base nx-leading-tight md:nx-text-sm",
        "nx-bg-black/[.05] dark:nx-bg-gray-50/10",
        "focus:nx-bg-white dark:focus:nx-bg-dark",
        "placeholder:nx-text-gray-500 dark:placeholder:nx-text-gray-400",
        "contrast-more:nx-border contrast-more:nx-border-current"
      )
    }, props)), suffix);
  }
);

// src/components/search.tsx

var INPUTS = ["input", "select", "button", "textarea"];
function Search({
  className,
  overlayClassName,
  value,
  onChange,
  onActive,
  loading,
  results
}) {
  const [show, setShow] = (0,external_react_.useState)(false);
  const config = useConfig();
  const [active, setActive] = (0,external_react_.useState)(0);
  const router = (0,router_.useRouter)();
  const { setMenu } = useMenu();
  const input = (0,external_react_.useRef)(null);
  const ulRef = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    setActive(0);
  }, [value]);
  (0,external_react_.useEffect)(() => {
    onActive && onActive(show);
  }, [show]);
  (0,external_react_.useEffect)(() => {
    const down = (e) => {
      var _a;
      const tagName = (_a = document.activeElement) == null ? void 0 : _a.tagName.toLowerCase();
      if (!input.current || !tagName || INPUTS.includes(tagName))
        return;
      if (e.key === "/" || e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        input.current.focus();
      } else if (e.key === "Escape") {
        setShow(false);
        input.current.blur();
      }
    };
    window.addEventListener("keydown", down);
    return () => {
      window.removeEventListener("keydown", down);
    };
  }, []);
  const handleKeyDown = (0,external_react_.useCallback)(
    function(e) {
      var _a, _b, _c;
      switch (e.key) {
        case "ArrowDown": {
          if (active + 1 < results.length) {
            const el = (_a = ulRef.current) == null ? void 0 : _a.querySelector(
              `li:nth-of-type(${active + 2}) > a`
            );
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "ArrowUp": {
          if (active - 1 >= 0) {
            const el = (_b = ulRef.current) == null ? void 0 : _b.querySelector(
              `li:nth-of-type(${active}) > a`
            );
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "Enter": {
          const result = results[active];
          if (result) {
            router.push(result.route);
            finishSearch();
          }
          break;
        }
        case "Escape": {
          setShow(false);
          (_c = input.current) == null ? void 0 : _c.blur();
          break;
        }
      }
    },
    [active, results, router]
  );
  const finishSearch = () => {
    var _a;
    (_a = input.current) == null ? void 0 : _a.blur();
    onChange("");
    setShow(false);
    setMenu(false);
  };
  const mounted = useMounted();
  const renderList = show && Boolean(value);
  const icon = /* @__PURE__ */ external_react_default().createElement(We, {
    show: mounted && (!show || Boolean(value)),
    as: (external_react_default()).Fragment,
    enter: "nx-transition-opacity",
    enterFrom: "nx-opacity-0",
    enterTo: "nx-opacity-100",
    leave: "nx-transition-opacity",
    leaveFrom: "nx-opacity-100",
    leaveTo: "nx-opacity-0"
  }, /* @__PURE__ */ external_react_default().createElement("kbd", {
    className: external_clsx_default()(
      "nx-absolute nx-my-1.5 nx-select-none ltr:nx-right-1.5 rtl:nx-left-1.5",
      "nx-h-5 nx-rounded nx-bg-white nx-px-1.5 nx-font-mono nx-text-[10px] nx-font-medium nx-text-gray-500",
      "nx-border dark:nx-border-gray-100/20 dark:nx-bg-dark/50",
      "contrast-more:nx-border-current contrast-more:nx-text-current contrast-more:dark:nx-border-current",
      "nx-items-center nx-gap-1 nx-transition-opacity",
      value ? "nx-z-20 nx-flex nx-cursor-pointer hover:nx-opacity-70" : "nx-pointer-events-none nx-hidden sm:nx-flex"
    ),
    title: value ? "Clear" : void 0,
    onClick: () => {
      onChange("");
    }
  }, value ? "ESC" : mounted && (navigator.userAgent.includes("Macintosh") ? /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-text-xs"
  }, "\u2318"), "K") : "CTRL K")));
  const handleActive = (0,external_react_.useCallback)(
    (e) => {
      const { index } = e.currentTarget.dataset;
      setActive(Number(index));
    },
    []
  );
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()("nextra-search nx-relative md:nx-w-64", className)
  }, renderList && /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-fixed nx-inset-0 nx-z-10",
    onClick: () => setShow(false)
  }), /* @__PURE__ */ external_react_default().createElement(Input, {
    ref: input,
    value,
    onChange: (e) => {
      const { value: value2 } = e.target;
      onChange(value2);
      setShow(Boolean(value2));
    },
    type: "search",
    placeholder: renderString(config.search.placeholder),
    onKeyDown: handleKeyDown,
    suffix: icon
  }), /* @__PURE__ */ external_react_default().createElement(We, {
    show: renderList,
    as: We.Child,
    leave: "nx-transition-opacity nx-duration-100",
    leaveFrom: "nx-opacity-100",
    leaveTo: "nx-opacity-0"
  }, /* @__PURE__ */ external_react_default().createElement("ul", {
    className: external_clsx_default()(
      "nextra-scrollbar",
      "nx-border nx-border-gray-200 nx-bg-white nx-text-gray-100 dark:nx-border-neutral-800 dark:nx-bg-neutral-900",
      "nx-absolute nx-top-full nx-z-20 nx-mt-2 nx-overflow-auto nx-overscroll-contain nx-rounded-xl nx-py-2.5 nx-shadow-xl",
      "nx-max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)]",
      "md:nx-max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)]",
      "nx-inset-x-0 ltr:md:nx-left-auto rtl:md:nx-right-auto",
      "contrast-more:nx-border contrast-more:nx-border-gray-900 contrast-more:dark:nx-border-gray-50",
      overlayClassName
    ),
    ref: ulRef,
    style: {
      transition: "max-height .2s ease"
    }
  }, loading ? /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-flex nx-select-none nx-justify-center nx-gap-2 nx-p-8 nx-text-center nx-text-sm nx-text-gray-400"
  }, /* @__PURE__ */ external_react_default().createElement(SpinnerIcon, {
    className: "nx-h-5 nx-w-5 nx-animate-spin"
  }), renderString(config.search.loading)) : results.length > 0 ? results.map(({ route, prefix, children, id }, i) => /* @__PURE__ */ external_react_default().createElement(external_react_.Fragment, {
    key: id
  }, prefix, /* @__PURE__ */ external_react_default().createElement("li", {
    className: external_clsx_default()(
      "nx-mx-2.5 nx-break-words nx-rounded-md",
      "contrast-more:nx-border",
      i === active ? "nx-bg-primary-500/10 nx-text-primary-600 contrast-more:nx-border-primary-500" : "nx-text-gray-800 contrast-more:nx-border-transparent dark:nx-text-gray-300"
    )
  }, /* @__PURE__ */ external_react_default().createElement(Anchor, {
    className: "nx-block nx-scroll-m-12 nx-px-2.5 nx-py-2",
    href: route,
    "data-index": i,
    onFocus: handleActive,
    onMouseMove: handleActive,
    onClick: finishSearch,
    onKeyDown: handleKeyDown
  }, children)))) : renderComponent(config.search.emptyResult))));
}

// src/components/highlight-matches.tsx

var HighlightMatches = (0,external_react_.memo)(function HighlightMatches2({
  value,
  match
}) {
  const splitText = value ? value.split("") : [];
  const escapedSearch = match.trim().replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  const regexp = RegExp("(" + escapedSearch.replaceAll(" ", "|") + ")", "ig");
  let result;
  let id = 0;
  let index = 0;
  const res = [];
  if (value) {
    while ((result = regexp.exec(value)) !== null) {
      res.push(
        /* @__PURE__ */ external_react_default().createElement(external_react_.Fragment, {
          key: id++
        }, splitText.splice(0, result.index - index).join(""), /* @__PURE__ */ external_react_default().createElement("span", {
          className: "nx-text-primary-600"
        }, splitText.splice(0, regexp.lastIndex - result.index).join("")))
      );
      index = regexp.lastIndex;
    }
  }
  return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, res, splitText.join(""));
});

// src/components/flexsearch.tsx
var indexes = {};
var loadIndexesPromises = /* @__PURE__ */ new Map();
var loadIndexes = (basePath, locale) => {
  const key = basePath + "@" + locale;
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key);
  }
  const promise = loadIndexesImpl(basePath, locale);
  loadIndexesPromises.set(key, promise);
  return promise;
};
var loadIndexesImpl = (basePath, locale) => __async(void 0, null, function* () {
  const response = yield fetch(
    `${basePath}/_next/static/chunks/nextra-data-${locale}.json`
  );
  const data = yield response.json();
  const pageIndex = new (flexsearch_bundle_default()).Document({
    cache: 100,
    tokenize: "full",
    document: {
      id: "id",
      index: "content",
      store: ["title"]
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });
  const sectionIndex = new (flexsearch_bundle_default()).Document({
    cache: 100,
    tokenize: "full",
    document: {
      id: "id",
      index: "content",
      tag: "pageId",
      store: ["title", "content", "url", "display"]
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });
  let pageId = 0;
  for (const route in data) {
    let pageContent = "";
    ++pageId;
    for (const heading in data[route].data) {
      const [hash, text] = heading.split("#");
      const url = route + (hash ? "#" + hash : "");
      const title = text || data[route].title;
      const content = data[route].data[heading] || "";
      const paragraphs = content.split("\n").filter(Boolean);
      sectionIndex.add(__spreadValues({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title
      }, paragraphs[0] && { display: paragraphs[0] }));
      for (let i = 0; i < paragraphs.length; i++) {
        sectionIndex.add({
          id: `${url}_${i}`,
          url,
          title,
          pageId: `page_${pageId}`,
          content: paragraphs[i]
        });
      }
      pageContent += ` ${title} ${content}`;
    }
    pageIndex.add({
      id: pageId,
      title: data[route].title,
      content: pageContent
    });
  }
  indexes[locale] = [pageIndex, sectionIndex];
});
function Flexsearch({
  className
}) {
  const { locale = DEFAULT_LOCALE, basePath } = (0,router_.useRouter)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [results, setResults] = (0,external_react_.useState)([]);
  const [search, setSearch] = (0,external_react_.useState)("");
  const doSearch = (search2) => {
    var _a, _b;
    if (!search2)
      return;
    const [pageIndex, sectionIndex] = indexes[locale];
    const pageResults = ((_a = pageIndex.search(search2, 5, {
      enrich: true,
      suggest: true
    })[0]) == null ? void 0 : _a.result) || [];
    const results2 = [];
    const pageTitleMatches = {};
    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;
      const sectionResults = ((_b = sectionIndex.search(search2, 5, {
        enrich: true,
        suggest: true,
        tag: "page_" + result.id
      })[0]) == null ? void 0 : _b.result) || [];
      let isFirstItemOfPage = true;
      const occurred = {};
      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== void 0;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;
        if (occurred[url + "@" + content])
          continue;
        occurred[url + "@" + content] = true;
        results2.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          prefix: isFirstItemOfPage && /* @__PURE__ */ external_react_default().createElement("div", {
            className: external_clsx_default()(
              "nx-mx-2.5 nx-mb-2 nx-mt-6 nx-select-none nx-border-b nx-border-black/10 nx-px-2.5 nx-pb-1.5 nx-text-xs nx-font-semibold nx-uppercase nx-text-gray-500 first:nx-mt-0 dark:nx-border-white/20 dark:nx-text-gray-300",
              "contrast-more:nx-border-gray-600 contrast-more:nx-text-gray-900 contrast-more:dark:nx-border-gray-50 contrast-more:dark:nx-text-gray-50"
            )
          }, result.doc.title),
          children: /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("div", {
            className: "nx-text-base nx-font-semibold nx-leading-5"
          }, /* @__PURE__ */ external_react_default().createElement(HighlightMatches, {
            match: search2,
            value: title
          })), content && /* @__PURE__ */ external_react_default().createElement("div", {
            className: "excerpt nx-mt-1 nx-text-sm nx-leading-[1.35rem] nx-text-gray-600 dark:nx-text-gray-400 contrast-more:dark:nx-text-gray-50"
          }, /* @__PURE__ */ external_react_default().createElement(HighlightMatches, {
            match: search2,
            value: content
          })))
        });
        isFirstItemOfPage = false;
      }
    }
    setResults(
      results2.sort((a, b) => {
        if (a._page_rk === b._page_rk) {
          return a._section_rk - b._section_rk;
        }
        if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
          return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
        }
        return a._page_rk - b._page_rk;
      }).map((res) => ({
        id: `${res._page_rk}_${res._section_rk}`,
        route: res.route,
        prefix: res.prefix,
        children: res.children
      }))
    );
  };
  const preload = (0,external_react_.useCallback)(
    (active) => __async(this, null, function* () {
      if (active && !indexes[locale]) {
        setLoading(true);
        yield loadIndexes(basePath, locale);
        setLoading(false);
      }
    }),
    [locale]
  );
  const handleChange = (value) => __async(this, null, function* () {
    setSearch(value);
    if (loading) {
      return;
    }
    if (!indexes[locale]) {
      setLoading(true);
      yield loadIndexes(basePath, locale);
      setLoading(false);
    }
    doSearch(value);
  });
  return /* @__PURE__ */ external_react_default().createElement(Search, {
    loading,
    value: search,
    onChange: handleChange,
    onActive: preload,
    className,
    overlayClassName: "nx-w-screen nx-min-h-[100px] nx-max-w-[min(calc(100vw-2rem),calc(100%+20rem))]",
    results
  });
}

// src/components/footer.tsx



// src/components/locale-switch.tsx



// src/components/select.tsx




function Select({
  options,
  selected,
  onChange,
  title,
  className
}) {
  const [trigger, container] = usePopper({
    strategy: "fixed",
    placement: "top-start",
    modifiers: [
      { name: "offset", options: { offset: [0, 10] } },
      {
        name: "sameWidth",
        enabled: true,
        fn({ state }) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`;
        },
        phase: "beforeWrite",
        requires: ["computeStyles"]
      }
    ]
  });
  return /* @__PURE__ */ external_react_default().createElement(pt, {
    value: selected,
    onChange
  }, ({ open }) => /* @__PURE__ */ external_react_default().createElement(pt.Button, {
    ref: trigger,
    title,
    className: external_clsx_default()(
      "nx-h-7 nx-rounded-md nx-px-2 nx-text-left nx-text-xs nx-font-medium nx-text-gray-600 nx-transition-colors dark:nx-text-gray-400",
      open ? "nx-bg-gray-200 nx-text-gray-900 dark:nx-bg-primary-100/10 dark:nx-text-gray-50" : "hover:nx-bg-gray-100 hover:nx-text-gray-900 dark:hover:nx-bg-primary-100/5 dark:hover:nx-text-gray-50",
      className
    )
  }, selected.name, /* @__PURE__ */ external_react_default().createElement(Portal, null, /* @__PURE__ */ external_react_default().createElement(We, {
    ref: container,
    show: open,
    as: pt.Options,
    className: "nx-z-20 nx-max-h-64 nx-overflow-auto nx-rounded-md nx-border nx-border-black/5 nx-bg-white nx-py-1 nx-text-sm nx-shadow-lg dark:nx-border-white/10 dark:nx-bg-neutral-800",
    leave: "nx-transition-opacity",
    leaveFrom: "nx-opacity-100",
    leaveTo: "nx-opacity-0"
  }, options.map((option) => /* @__PURE__ */ external_react_default().createElement(pt.Option, {
    key: option.key,
    value: option,
    className: ({ active }) => external_clsx_default()(
      active ? "nx-bg-primary-50 nx-text-primary-600 dark:nx-bg-primary-500/10" : "nx-text-gray-800 dark:nx-text-gray-100",
      "nx-relative nx-cursor-pointer nx-whitespace-nowrap nx-py-1.5",
      "nx-transition-colors ltr:nx-pl-3 ltr:nx-pr-9 rtl:nx-pr-3 rtl:nx-pl-9"
    )
  }, option.name, option.key === selected.key && /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-absolute nx-inset-y-0 nx-flex nx-items-center ltr:nx-right-3 rtl:nx-left-3"
  }, /* @__PURE__ */ external_react_default().createElement(CheckIcon, null))))))));
}
function Portal(props) {
  const mounted = useMounted();
  if (!mounted)
    return null;
  return (0,external_react_dom_.createPortal)(props.children, document.body);
}

// src/components/locale-switch.tsx
function LocaleSwitch({
  options,
  lite,
  className
}) {
  const { locale, asPath } = (0,router_.useRouter)();
  const selected = options.find((l) => locale === l.locale);
  return /* @__PURE__ */ external_react_default().createElement(Select, {
    title: "Change language",
    className,
    onChange: (option) => {
      const date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3);
      document.cookie = `NEXT_LOCALE=${option.key}; expires=${date.toUTCString()}; path=/`;
      location.href = asPath;
    },
    selected: {
      key: (selected == null ? void 0 : selected.locale) || "",
      name: /* @__PURE__ */ external_react_default().createElement("div", {
        className: "nx-flex nx-items-center nx-gap-2"
      }, /* @__PURE__ */ external_react_default().createElement(GlobeIcon, null), /* @__PURE__ */ external_react_default().createElement("span", {
        className: lite ? "nx-hidden" : ""
      }, selected == null ? void 0 : selected.text))
    },
    options: options.map((l) => ({
      key: l.locale,
      name: l.text
    }))
  });
}

// src/components/theme-switch.tsx


var OPTIONS = [
  { key: "light", name: "Light" },
  { key: "dark", name: "Dark" },
  { key: "system", name: "System" }
];
function ThemeSwitch({ lite }) {
  const { setTheme, resolvedTheme, theme = "" } = (0,dist/* useTheme */.F)();
  const mounted = useMounted();
  const IconToUse = mounted && resolvedTheme === "dark" ? MoonIcon : SunIcon;
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-relative"
  }, /* @__PURE__ */ external_react_default().createElement(Select, {
    title: "Change theme",
    options: OPTIONS,
    onChange: (option) => {
      setTheme(option.key);
    },
    selected: {
      key: theme,
      name: /* @__PURE__ */ external_react_default().createElement("div", {
        className: "nx-flex nx-items-center nx-gap-2 nx-capitalize"
      }, /* @__PURE__ */ external_react_default().createElement(IconToUse, null), /* @__PURE__ */ external_react_default().createElement("span", {
        className: lite ? "md:nx-hidden" : ""
      }, mounted ? theme : "light"))
    }
  }));
}

// src/components/footer.tsx
function Footer({ menu }) {
  const config = useConfig();
  return /* @__PURE__ */ external_react_default().createElement("footer", {
    className: "nx-bg-gray-100 nx-pb-[env(safe-area-inset-bottom)] dark:nx-bg-neutral-900"
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-mx-auto nx-flex nx-max-w-[90rem] nx-gap-2 nx-py-2 nx-px-4",
      menu ? "nx-flex" : "nx-hidden"
    )
  }, config.i18n.length > 0 && /* @__PURE__ */ external_react_default().createElement(LocaleSwitch, {
    options: config.i18n
  }), config.darkMode && /* @__PURE__ */ external_react_default().createElement(ThemeSwitch, null)), /* @__PURE__ */ external_react_default().createElement("hr", {
    className: "dark:nx-border-neutral-800"
  }), /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-py-12 nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start",
      "nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]"
    )
  }, renderComponent(config.footer.text)));
}

// src/components/head.tsx




function Head() {
  var _a;
  const config = useConfig();
  const { resolvedTheme } = (0,dist/* useTheme */.F)();
  const mounted = useMounted();
  const head = typeof config.head === "function" ? config.head({}) : config.head;
  const hue = config.primaryHue;
  const { dark: darkHue, light: lightHue } = typeof hue === "number" ? { dark: hue, light: hue } : hue;
  const frontMatter = config.frontMatter;
  return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement(next_seo/* NextSeo */.PB, __spreadValues({
    title: config.title,
    description: frontMatter.description,
    canonical: frontMatter.canonical,
    openGraph: frontMatter.openGraph
  }, (_a = config.useNextSeoProps) == null ? void 0 : _a.call(config))), /* @__PURE__ */ external_react_default().createElement((head_default()), null, config.faviconGlyph ? /* @__PURE__ */ external_react_default().createElement("link", {
    rel: "icon",
    href: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='.9em' font-size='90' text-anchor='middle'>${config.faviconGlyph}</text><style>text{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";fill:black}@media(prefers-color-scheme:dark){text{fill:white}}</style></svg>`
  }) : null, mounted ? /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "theme-color",
    content: resolvedTheme === "dark" ? "#111" : "#fff"
  }) : /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "theme-color",
    content: "#ffffff",
    media: "(prefers-color-scheme: light)"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "theme-color",
    content: "#111111",
    media: "(prefers-color-scheme: dark)"
  })), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, viewport-fit=cover"
  }), /* @__PURE__ */ external_react_default().createElement("style", null, `
        :root {
          --nextra-primary-hue: ${lightHue}deg;
          --nextra-navbar-height: 4rem;
          --nextra-menu-height: 3.75rem;
          --nextra-banner-height: 2.5rem;
        }
        
        .dark {
          --nextra-primary-hue: ${darkHue}deg;
        }
      `), head));
}

// src/components/nav-links.tsx


var classes2 = {
  link: external_clsx_default()(
    "nx-flex nx-max-w-[50%] nx-items-center nx-gap-1 nx-py-4 nx-text-base nx-font-medium nx-text-gray-600 nx-transition-colors [word-break:break-word] hover:nx-text-primary-600 dark:nx-text-gray-300 md:nx-text-lg"
  ),
  icon: external_clsx_default()("nx-inline nx-h-5 nx-shrink-0")
};
var NavLinks = ({
  flatDirectories,
  currentIndex
}) => {
  const config = useConfig();
  const nav = config.navigation;
  const navigation = typeof nav === "boolean" ? { prev: nav, next: nav } : nav;
  const prev = navigation.prev && flatDirectories[currentIndex - 1];
  const next2 = navigation.next && flatDirectories[currentIndex + 1];
  if (!prev && !next2)
    return null;
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-mb-8 nx-flex nx-items-center nx-border-t nx-pt-8 dark:nx-border-neutral-800",
      "contrast-more:nx-border-neutral-400 dark:contrast-more:nx-border-neutral-400"
    )
  }, prev && /* @__PURE__ */ external_react_default().createElement(Anchor, {
    href: prev.route,
    title: prev.title,
    className: external_clsx_default()(classes2.link, "ltr:nx-pr-4 rtl:nx-pl-4")
  }, /* @__PURE__ */ external_react_default().createElement(ArrowRightIcon, {
    className: external_clsx_default()(classes2.icon, "ltr:nx-rotate-180")
  }), prev.title), next2 && /* @__PURE__ */ external_react_default().createElement(Anchor, {
    href: next2.route,
    title: next2.title,
    className: external_clsx_default()(
      classes2.link,
      "ltr:nx-ml-auto ltr:nx-pl-4 ltr:nx-text-right rtl:nx-mr-auto rtl:nx-pr-4 rtl:nx-text-left"
    )
  }, next2.title, /* @__PURE__ */ external_react_default().createElement(ArrowRightIcon, {
    className: external_clsx_default()(classes2.icon, "rtl:nx-rotate-180")
  })));
};

// src/components/navbar.tsx




var classes3 = {
  link: external_clsx_default()(
    "nx-text-sm contrast-more:nx-text-gray-700 contrast-more:dark:nx-text-gray-100"
  ),
  active: external_clsx_default()("nx-subpixel-antialiased nx-font-medium"),
  inactive: external_clsx_default()(
    "nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200"
  )
};
function NavbarMenu({
  className,
  menu,
  children
}) {
  const { items } = menu;
  const routes = Object.fromEntries(
    (menu.children || []).map((route) => [route.name, route])
  );
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-relative nx-inline-block"
  }, /* @__PURE__ */ external_react_default().createElement(qe, null, /* @__PURE__ */ external_react_default().createElement(qe.Button, {
    className: external_clsx_default()(
      className,
      "-nx-ml-2 nx-hidden nx-items-center nx-whitespace-nowrap nx-rounded nx-p-2 md:nx-inline-flex",
      classes3.inactive
    )
  }, children), /* @__PURE__ */ external_react_default().createElement(We, {
    leave: "nx-transition-opacity",
    leaveFrom: "nx-opacity-100",
    leaveTo: "nx-opacity-0"
  }, /* @__PURE__ */ external_react_default().createElement(qe.Items, {
    className: "nx-absolute nx-right-0 nx-z-20 nx-mt-1 nx-max-h-64 nx-min-w-full nx-overflow-auto nx-rounded-md nx-border nx-border-black/5 nx-bg-white nx-py-1 nx-text-sm nx-shadow-lg dark:nx-border-white/10 dark:nx-bg-neutral-800",
    tabIndex: 0
  }, Object.entries(items || {}).map(([key, item]) => {
    var _a;
    return /* @__PURE__ */ external_react_default().createElement(qe.Item, {
      key
    }, /* @__PURE__ */ external_react_default().createElement(Anchor, {
      href: item.href || ((_a = routes[key]) == null ? void 0 : _a.route) || menu.route + "/" + key,
      className: external_clsx_default()(
        "nx-relative nx-hidden nx-w-full nx-select-none nx-whitespace-nowrap nx-text-gray-600 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100 md:nx-inline-block",
        "nx-py-1.5 nx-transition-colors ltr:nx-pl-3 ltr:nx-pr-9 rtl:nx-pr-3 rtl:nx-pl-9"
      ),
      newWindow: item.newWindow
    }, item.title || key));
  })))));
}
function Navbar({ flatDirectories, items }) {
  const config = useConfig();
  const { locale = DEFAULT_LOCALE, asPath } = (0,router_.useRouter)();
  const activeRoute = getFSRoute(asPath, locale);
  const { menu, setMenu } = useMenu();
  return /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nextra-nav-container nx-sticky nx-top-0 nx-z-20 nx-w-full nx-bg-transparent"
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nextra-nav-container-blur",
      "nx-pointer-events-none nx-absolute nx-z-[-1] nx-h-full nx-w-full nx-bg-white dark:nx-bg-dark",
      "nx-shadow-[0_2px_4px_rgba(0,0,0,.02),0_-1px_0_rgba(0,0,0,.06)_inset] dark:nx-shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]",
      "contrast-more:nx-shadow-[0_0_0_1px_#000] contrast-more:dark:nx-shadow-[0_0_0_1px_#fff]"
    )
  }), /* @__PURE__ */ external_react_default().createElement("nav", {
    className: "nx-mx-auto nx-flex nx-h-[var(--nextra-navbar-height)] nx-max-w-[90rem] nx-items-center nx-justify-end nx-gap-2 nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]"
  }, config.logoLink ? /* @__PURE__ */ external_react_default().createElement(Anchor, {
    href: typeof config.logoLink === "string" ? config.logoLink : "/",
    className: "nx-flex nx-items-center hover:nx-opacity-75 ltr:nx-mr-auto rtl:nx-ml-auto"
  }, renderComponent(config.logo)) : /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-flex nx-items-center ltr:nx-mr-auto rtl:nx-ml-auto"
  }, renderComponent(config.logo)), items.map((pageOrMenu) => {
    if (pageOrMenu.display === "hidden")
      return null;
    if (pageOrMenu.type === "menu") {
      const menu2 = pageOrMenu;
      const isActive2 = menu2.route === activeRoute || activeRoute.startsWith(menu2.route + "/");
      return /* @__PURE__ */ external_react_default().createElement(NavbarMenu, {
        key: menu2.title,
        className: external_clsx_default()(
          classes3.link,
          "nx-flex nx-gap-1",
          isActive2 ? classes3.active : classes3.inactive
        ),
        menu: menu2
      }, menu2.title, /* @__PURE__ */ external_react_default().createElement(ArrowRightIcon, {
        className: "nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5",
        pathClassName: "nx-origin-center nx-transition-transform nx-rotate-90"
      }));
    }
    const page = pageOrMenu;
    let href = page.href || page.route || "#";
    if (page.children) {
      href = (page.withIndexPage ? page.route : page.firstChildRoute) || href;
    }
    const isActive = page.route === activeRoute || activeRoute.startsWith(page.route + "/");
    return /* @__PURE__ */ external_react_default().createElement(Anchor, {
      href,
      key: page.route,
      className: external_clsx_default()(
        classes3.link,
        "-nx-ml-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block nx-relative",
        !isActive || page.newWindow ? classes3.inactive : classes3.active
      ),
      newWindow: page.newWindow,
      "aria-current": !page.newWindow && isActive
    }, /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-absolute"
    }, page.title), /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-invisible nx-font-medium"
    }, page.title));
  }), renderComponent(config.search.component, {
    directories: flatDirectories,
    className: "nx-hidden md:nx-inline-block mx-min-w-[200px]"
  }), config.project.link ? /* @__PURE__ */ external_react_default().createElement(Anchor, {
    className: "nx-p-2 nx-text-current",
    href: config.project.link,
    newWindow: true
  }, renderComponent(config.project.icon)) : null, config.chat.link ? /* @__PURE__ */ external_react_default().createElement(Anchor, {
    className: "nx-p-2 nx-text-current",
    href: config.chat.link,
    newWindow: true
  }, renderComponent(config.chat.icon)) : null, renderComponent(config.navbar.extraContent), /* @__PURE__ */ external_react_default().createElement("button", {
    type: "button",
    "aria-label": "Menu",
    className: "nextra-hamburger -nx-mr-2 nx-rounded nx-p-2 active:nx-bg-gray-400/20 md:nx-hidden",
    onClick: () => setMenu(!menu)
  }, /* @__PURE__ */ external_react_default().createElement(MenuIcon, {
    className: external_clsx_default()({ open: menu })
  }))));
}

// src/components/not-found.tsx


function NotFoundPage() {
  const config = useConfig();
  const mounted = useMounted();
  const { asPath } = useRouter5();
  const { content, labels } = config.notFound;
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ React33.createElement("p", {
    className: "nx-text-center"
  }, /* @__PURE__ */ React33.createElement(Anchor, {
    href: getGitIssueUrl({
      repository: config.docsRepositoryBase,
      title: `Found broken \`${mounted ? asPath : ""}\` link. Please fix!`,
      labels
    }),
    newWindow: true,
    className: "nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:under]"
  }, renderComponent(content)));
}

// src/components/server-side-error.tsx


function ServerSideErrorPage() {
  const config = useConfig();
  const mounted = useMounted();
  const { asPath } = useRouter6();
  const { content, labels } = config.serverSideError;
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ React34.createElement("p", {
    className: "nx-text-center"
  }, /* @__PURE__ */ React34.createElement(Anchor, {
    href: getGitIssueUrl({
      repository: config.docsRepositoryBase,
      title: `Got server-side error in \`${mounted ? asPath : ""}\` url. Please fix!`,
      labels
    }),
    newWindow: true,
    className: "nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:under]"
  }, renderComponent(content)));
}

// src/components/sidebar.tsx





var TreeState = /* @__PURE__ */ Object.create(null);
var FocusedItemContext = (0,external_react_.createContext)(null);
var OnFocuseItemContext = (0,external_react_.createContext)(null);
var Folder = (0,external_react_.memo)(FolderImpl);
var classes4 = {
  link: external_clsx_default()(
    "nx-flex nx-rounded nx-px-2 nx-py-1.5 nx-text-sm nx-transition-colors [word-break:break-word]",
    "nx-cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:nx-border"
  ),
  inactive: external_clsx_default()(
    "nx-text-gray-500 hover:nx-bg-gray-100 hover:nx-text-gray-900",
    "dark:nx-text-neutral-500 dark:hover:nx-bg-primary-100/5 dark:hover:nx-text-gray-50",
    "contrast-more:nx-text-gray-900 contrast-more:dark:nx-text-gray-50",
    "contrast-more:nx-border-transparent contrast-more:hover:nx-border-gray-900 contrast-more:dark:hover:nx-border-gray-50"
  ),
  active: external_clsx_default()(
    "nx-bg-primary-50 nx-font-bold nx-text-primary-600 dark:nx-bg-primary-500/10",
    "contrast-more:nx-border-primary-500 contrast-more:dark:nx-border-primary-500"
  ),
  list: external_clsx_default()("nx-flex nx-flex-col nx-gap-1"),
  border: external_clsx_default()(
    "nx-relative before:nx-absolute before:nx-inset-y-1.5",
    'before:nx-w-px before:nx-bg-gray-200 before:nx-content-[""] dark:before:nx-bg-neutral-800',
    "ltr:nx-pl-3 ltr:before:nx-left-0 rtl:nx-pr-3 rtl:before:nx-right-0"
  )
};
function FolderImpl({
  item,
  anchors
}) {
  const { asPath, locale = DEFAULT_LOCALE } = (0,router_.useRouter)();
  const routeOriginal = getFSRoute(asPath, locale);
  const [route] = routeOriginal.split("#");
  const active = [route, route + "/"].includes(item.route + "/");
  const activeRouteInside = active || route.startsWith(item.route + "/");
  const focusedRoute = (0,external_react_.useContext)(FocusedItemContext);
  const focusedRouteInside = !!(focusedRoute == null ? void 0 : focusedRoute.startsWith(item.route + "/"));
  const folderLevel = (item.route.match(/\//g) || []).length;
  const { setMenu } = useMenu();
  const config = useConfig();
  const { theme } = item;
  const open = TreeState[item.route] !== void 0 ? TreeState[item.route] || focusedRouteInside : active || activeRouteInside || focusedRouteInside || (theme && "collapsed" in theme ? !theme.collapsed : folderLevel <= config.sidebar.defaultMenuCollapseLevel);
  const rerender = (0,external_react_.useState)({})[1];
  (0,external_react_.useEffect)(() => {
    if (activeRouteInside || focusedRouteInside) {
      TreeState[item.route] = true;
    }
  }, [activeRouteInside || focusedRouteInside]);
  if (item.type === "menu") {
    const menu = item;
    const routes = Object.fromEntries(
      (menu.children || []).map((route2) => [route2.name, route2])
    );
    item.children = Object.entries(menu.items || {}).map(([key, item2]) => {
      const route2 = routes[key] || {
        name: key,
        locale: menu.locale,
        route: menu.route + "/" + key
      };
      return __spreadValues(__spreadValues({}, route2), item2);
    });
  }
  return /* @__PURE__ */ external_react_default().createElement("li", {
    className: external_clsx_default()({ open, active })
  }, /* @__PURE__ */ external_react_default().createElement(Anchor, {
    href: item.withIndexPage ? item.route : "",
    className: external_clsx_default()(
      "nx-items-center nx-justify-between nx-gap-2",
      classes4.link,
      active ? classes4.active : classes4.inactive
    ),
    onClick: (e) => {
      const clickedToggleIcon = ["svg", "path"].includes(
        e.target.tagName.toLowerCase()
      );
      if (clickedToggleIcon) {
        e.preventDefault();
      }
      if (item.withIndexPage) {
        if (active || clickedToggleIcon) {
          TreeState[item.route] = !open;
        } else {
          TreeState[item.route] = true;
          setMenu(false);
        }
        rerender({});
        return;
      }
      if (active)
        return;
      TreeState[item.route] = !open;
      rerender({});
    }
  }, renderComponent(config.sidebar.titleComponent, {
    title: item.title,
    type: item.type
  }), /* @__PURE__ */ external_react_default().createElement(ArrowRightIcon, {
    className: "nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5 hover:nx-bg-gray-800/5 dark:hover:nx-bg-gray-100/5",
    pathClassName: external_clsx_default()(
      "nx-origin-center nx-transition-transform rtl:-nx-rotate-180",
      open && "ltr:nx-rotate-90 rtl:nx-rotate-[-270deg]"
    )
  })), /* @__PURE__ */ external_react_default().createElement(Collapse, {
    className: "ltr:nx-pr-0 rtl:nx-pl-0",
    open
  }, Array.isArray(item.children) ? /* @__PURE__ */ external_react_default().createElement(Menu2, {
    className: external_clsx_default()(classes4.border, "ltr:nx-ml-1 rtl:nx-mr-1"),
    directories: item.children,
    base: item.route,
    anchors
  }) : null));
}
function Separator({ title }) {
  const config = useConfig();
  return /* @__PURE__ */ external_react_default().createElement("li", {
    className: external_clsx_default()(
      "[word-break:break-word]",
      title ? "nx-mt-5 nx-mb-2 nx-px-2 nx-py-1.5 nx-text-sm nx-font-semibold nx-text-gray-900 first:nx-mt-0 dark:nx-text-gray-100" : "nx-my-4"
    )
  }, title ? renderComponent(config.sidebar.titleComponent, {
    title,
    type: "separator"
  }) : /* @__PURE__ */ external_react_default().createElement("hr", {
    className: "nx-mx-2 nx-border-t nx-border-gray-200 dark:nx-border-primary-100/10"
  }));
}
function File({
  item,
  anchors
}) {
  const { asPath, locale = DEFAULT_LOCALE } = (0,router_.useRouter)();
  const route = getFSRoute(asPath, locale);
  const onFocus = (0,external_react_.useContext)(OnFocuseItemContext);
  const active = item.route && [route, route + "/"].includes(item.route + "/");
  const slugger = new (github_slugger_default())();
  const activeAnchor = useActiveAnchor();
  const { setMenu } = useMenu();
  const config = useConfig();
  if (item.type === "separator") {
    return /* @__PURE__ */ external_react_default().createElement(Separator, {
      title: item.title
    });
  }
  return /* @__PURE__ */ external_react_default().createElement("li", {
    className: external_clsx_default()(classes4.list, { active })
  }, /* @__PURE__ */ external_react_default().createElement(Anchor, {
    href: item.href || item.route,
    newWindow: item.newWindow,
    className: external_clsx_default()(classes4.link, active ? classes4.active : classes4.inactive),
    onClick: () => {
      setMenu(false);
    },
    onFocus: () => {
      onFocus == null ? void 0 : onFocus(item.route);
    },
    onBlur: () => {
      onFocus == null ? void 0 : onFocus(null);
    }
  }, renderComponent(config.sidebar.titleComponent, {
    title: item.title,
    type: item.type
  })), active && anchors.length > 0 && /* @__PURE__ */ external_react_default().createElement("ul", {
    className: external_clsx_default()(
      classes4.list,
      classes4.border,
      "ltr:nx-ml-3 rtl:nx-mr-3"
    )
  }, anchors.map((text) => {
    var _a;
    const slug = slugger.slug(text);
    return /* @__PURE__ */ external_react_default().createElement("li", {
      key: slug
    }, /* @__PURE__ */ external_react_default().createElement("a", {
      href: `#${slug}`,
      className: external_clsx_default()(
        classes4.link,
        'nx-flex nx-gap-2 before:nx-opacity-25 before:nx-content-["#"]',
        ((_a = activeAnchor[slug]) == null ? void 0 : _a.isActive) ? classes4.active : classes4.inactive
      ),
      onClick: () => {
        setMenu(false);
      }
    }, text));
  })));
}
function Menu2({
  directories,
  anchors,
  className,
  onlyCurrentDocs
}) {
  return /* @__PURE__ */ external_react_default().createElement("ul", {
    className: external_clsx_default()(classes4.list, className)
  }, directories.map(
    (item) => !onlyCurrentDocs || item.isUnderCurrentDocsTree ? item.type === "menu" || item.children && (item.children.length || !item.withIndexPage) ? /* @__PURE__ */ external_react_default().createElement(Folder, {
      key: item.name,
      item,
      anchors
    }) : /* @__PURE__ */ external_react_default().createElement(File, {
      key: item.name,
      item,
      anchors
    }) : null
  ));
}
var emptyHeading = [];
function Sidebar({
  docsDirectories,
  flatDirectories,
  fullDirectories,
  asPopover = false,
  headings = emptyHeading,
  includePlaceholder
}) {
  const config = useConfig();
  const { menu, setMenu } = useMenu();
  const [focused, setFocused] = (0,external_react_.useState)(null);
  const anchors = (0,external_react_.useMemo)(
    () => headings.filter((v) => v.children && v.depth === 2 && v.type === "heading").map(getHeadingText).filter(Boolean),
    [headings]
  );
  const sidebarRef = (0,external_react_.useRef)(null);
  const containerRef = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    if (menu) {
      document.body.classList.add("nx-overflow-hidden", "md:nx-overflow-auto");
    } else {
      document.body.classList.remove(
        "nx-overflow-hidden",
        "md:nx-overflow-auto"
      );
    }
  }, [menu]);
  (0,external_react_.useEffect)(() => {
    var _a;
    const activeElement = (_a = sidebarRef.current) == null ? void 0 : _a.querySelector("li.active");
    if (activeElement && (window.innerWidth > 767 || menu)) {
      const scroll = () => {
        es(activeElement, {
          block: "center",
          inline: "center",
          scrollMode: "always",
          boundary: containerRef.current
        });
      };
      if (menu) {
        setTimeout(scroll, 300);
      } else {
        scroll();
      }
    }
  }, [menu]);
  const hasMenu = config.i18n.length > 0 || config.darkMode;
  return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, includePlaceholder && asPopover ? /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-hidden nx-h-0 nx-w-64 nx-shrink-0 xl:nx-block"
  }) : null, /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "motion-reduce:nx-transition-none [transition:background-color_1.5s_ease]",
      menu ? "nx-fixed nx-inset-0 nx-z-10 nx-bg-black/80 dark:nx-bg-black/60" : "nx-bg-transparent"
    ),
    onClick: () => setMenu(false)
  }), /* @__PURE__ */ external_react_default().createElement("aside", {
    className: external_clsx_default()(
      "nextra-sidebar-container nx-flex nx-flex-col",
      "md:nx-top-16 md:nx-w-64 md:nx-shrink-0 md:nx-transform-none",
      asPopover ? "md:nx-hidden" : "md:nx-sticky md:nx-self-start",
      menu ? "[transform:translate3d(0,0,0)]" : "[transform:translate3d(0,-100%,0)]"
    ),
    ref: containerRef
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-px-4 nx-pt-4 md:nx-hidden"
  }, renderComponent(config.search.component, {
    directories: flatDirectories
  })), /* @__PURE__ */ external_react_default().createElement(FocusedItemContext.Provider, {
    value: focused
  }, /* @__PURE__ */ external_react_default().createElement(OnFocuseItemContext.Provider, {
    value: (item) => {
      setFocused(item);
    }
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nextra-scrollbar nx-overflow-y-auto nx-p-4",
      "nx-grow md:nx-h-[calc(100vh-var(--nextra-navbar-height)-3.75rem)]"
    ),
    ref: sidebarRef
  }, /* @__PURE__ */ external_react_default().createElement(Menu2, {
    className: "nx-hidden md:nx-flex",
    directories: docsDirectories,
    anchors: config.toc.float ? [] : anchors,
    onlyCurrentDocs: true
  }), /* @__PURE__ */ external_react_default().createElement(Menu2, {
    className: "md:nx-hidden",
    directories: fullDirectories,
    anchors
  })))), hasMenu && /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-relative nx-z-[1]",
      "nx-mx-4 nx-border-t nx-py-4 nx-shadow-[0_-12px_16px_#fff]",
      "nx-flex nx-items-center nx-gap-2",
      "dark:nx-border-neutral-800 dark:nx-shadow-[0_-12px_16px_#111]",
      "contrast-more:nx-border-neutral-400 contrast-more:nx-shadow-none contrast-more:dark:nx-shadow-none"
    )
  }, config.i18n.length > 0 && /* @__PURE__ */ external_react_default().createElement(LocaleSwitch, {
    options: config.i18n,
    className: "nx-grow"
  }), config.darkMode && /* @__PURE__ */ external_react_default().createElement(ThemeSwitch, {
    lite: config.i18n.length > 0
  }))));
}

// src/components/tabs.tsx



function isTabItem(item) {
  if (item && typeof item === "object" && "label" in item)
    return true;
  return false;
}
var renderTab = (item) => {
  if (isTabItem(item)) {
    return item.label;
  }
  return item;
};
function Tabs({
  items,
  selectedIndex,
  defaultIndex,
  onChange,
  children
}) {
  return /* @__PURE__ */ external_react_default().createElement(tabs_qe.Group, {
    selectedIndex,
    defaultIndex,
    onChange
  }, /* @__PURE__ */ external_react_default().createElement("div", {
    className: "no-scrollbar -nx-m-2 nx-overflow-x-auto nx-overflow-y-hidden nx-overscroll-x-contain nx-p-2"
  }, /* @__PURE__ */ external_react_default().createElement(tabs_qe.List, {
    className: "nx-mt-4 nx-flex nx-w-max nx-min-w-full nx-border-b nx-border-gray-200 nx-pb-px dark:nx-border-neutral-800"
  }, items.map((item, index) => {
    const disabled = !!(item && typeof item === "object" && "disabled" in item && item.disabled);
    return /* @__PURE__ */ external_react_default().createElement(tabs_qe, {
      key: index,
      disabled,
      className: ({ selected }) => external_clsx_default()(
        "nx-mr-2 nx-rounded-t nx-p-2 nx-font-medium nx-leading-5 nx-transition-colors",
        "-nx-mb-0.5 nx-select-none nx-border-b-2",
        selected ? "nx-border-primary-500 nx-text-primary-600" : "nx-border-transparent nx-text-gray-600 hover:nx-border-gray-200 hover:nx-text-black dark:nx-text-gray-200 dark:hover:nx-border-neutral-800 dark:hover:nx-text-white",
        disabled && "nx-pointer-events-none nx-text-gray-400 dark:nx-text-neutral-600"
      )
    }, renderTab(item));
  }))), /* @__PURE__ */ external_react_default().createElement(tabs_qe.Panels, null, children));
}
function Tab(_a) {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ external_react_default().createElement(tabs_qe.Panel, __spreadProps(__spreadValues({}, props), {
    className: "nx-rounded nx-pt-6"
  }), children);
}

// src/components/toc.tsx




function TOC({ headings, filePath }) {
  var _a;
  const slugger = new (github_slugger_default())();
  const activeAnchor = useActiveAnchor();
  const config = useConfig();
  const tocRef = (0,external_react_.useRef)(null);
  const items = (0,external_react_.useMemo)(
    () => headings.filter((heading) => heading.type === "heading" && heading.depth > 1).map((heading) => {
      const text = getHeadingText(heading);
      return {
        text,
        slug: slugger.slug(text),
        depth: heading.depth
      };
    }),
    [headings]
  );
  const hasHeadings = items.length > 0;
  const hasMetaInfo = Boolean(
    config.feedback.content || config.editLink.component || config.toc.extraContent
  );
  const activeSlug = (_a = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive
  )) == null ? void 0 : _a[0];
  (0,external_react_.useEffect)(() => {
    var _a2;
    if (!activeSlug)
      return;
    const anchor = (_a2 = tocRef.current) == null ? void 0 : _a2.querySelector(
      `li > a[href="#${activeSlug}"]`
    );
    if (anchor) {
      es(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current
      });
    }
  }, [activeSlug]);
  const linkClassName = external_clsx_default()(
    "nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100",
    "contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50"
  );
  return /* @__PURE__ */ external_react_default().createElement("div", {
    ref: tocRef,
    className: external_clsx_default()(
      "nextra-scrollbar nx-sticky nx-top-16 nx-overflow-y-auto nx-pr-4 nx-pt-8 nx-text-sm [hyphens:auto]",
      "nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] ltr:-nx-mr-4 rtl:-nx-ml-4"
    )
  }, hasHeadings && /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("p", {
    className: "nx-mb-4 nx-font-semibold nx-tracking-tight"
  }, renderComponent(config.toc.title)), /* @__PURE__ */ external_react_default().createElement("ul", null, items.map(({ slug, text, depth }) => {
    var _a2;
    return /* @__PURE__ */ external_react_default().createElement("li", {
      className: "nx-my-2 nx-scroll-my-6 nx-scroll-py-6",
      key: slug
    }, /* @__PURE__ */ external_react_default().createElement("a", {
      href: `#${slug}`,
      className: external_clsx_default()(
        {
          2: "nx-font-semibold",
          3: "ltr:nx-ml-4 rtl:nx-mr-4",
          4: "ltr:nx-ml-8 rtl:nx-mr-8",
          5: "ltr:nx-ml-12 rtl:nx-mr-12",
          6: "ltr:nx-ml-16 rtl:nx-mr-16"
        }[depth],
        "nx-inline-block",
        ((_a2 = activeAnchor[slug]) == null ? void 0 : _a2.isActive) ? "nx-text-primary-600 nx-subpixel-antialiased contrast-more:!nx-text-primary-600" : "nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-300",
        "contrast-more:nx-text-gray-900 contrast-more:nx-underline contrast-more:dark:nx-text-gray-50"
      )
    }, text));
  }))), hasMetaInfo && /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      hasHeadings && "nx-mt-8 nx-border-t nx-bg-white nx-pt-8 nx-shadow-[0_-12px_16px_white] dark:nx-bg-dark dark:nx-shadow-[0_-12px_16px_#111]",
      "nx-sticky nx-bottom-0 nx-flex nx-flex-col nx-items-start nx-gap-2 nx-pb-8 dark:nx-border-neutral-800",
      "contrast-more:nx-border-t contrast-more:nx-border-neutral-400 contrast-more:nx-shadow-none contrast-more:dark:nx-border-neutral-400"
    )
  }, config.feedback.content ? /* @__PURE__ */ external_react_default().createElement(Anchor, {
    className: linkClassName,
    href: getGitIssueUrl({
      repository: config.docsRepositoryBase,
      title: `Feedback for \u201C${config.title}\u201D`,
      labels: config.feedback.labels
    }),
    newWindow: true
  }, renderComponent(config.feedback.content)) : null, renderComponent(config.editLink.component, {
    filePath,
    className: linkClassName,
    children: renderComponent(config.editLink.text)
  }), renderComponent(config.toc.extraContent)));
}

// src/components/match-sorter-search.tsx


function MatchSorterSearch({
  className,
  directories = []
}) {
  const [search, setSearch] = (0,external_react_.useState)("");
  const results = (0,external_react_.useMemo)(
    () => search ? (0,match_sorter_cjs/* matchSorter */.Lu)(directories, search, { keys: ["title"] }).map(
      ({ route, title }) => ({
        id: route + title,
        route,
        children: /* @__PURE__ */ external_react_default().createElement(HighlightMatches, {
          value: title,
          match: search
        })
      })
    ) : [],
    [search]
  );
  return /* @__PURE__ */ external_react_default().createElement(Search, {
    value: search,
    onChange: setSearch,
    className,
    overlayClassName: "nx-w-full",
    results
  });
}

// src/constants.tsx
var DEFAULT_LOCALE = "en-US";
var IS_BROWSER = typeof window !== "undefined";
var DEFAULT_THEME = {
  banner: {
    dismissible: true,
    key: "nextra-banner"
  },
  chat: {
    icon: /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement(DiscordIcon, null), /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-sr-only"
    }, "Discord"))
  },
  darkMode: true,
  direction: "ltr",
  docsRepositoryBase: "https://github.com/shuding/nextra",
  editLink: {
    component({ className, filePath, children }) {
      const editUrl = getGitEditUrl(filePath);
      if (!editUrl) {
        return null;
      }
      return /* @__PURE__ */ external_react_default().createElement(Anchor, {
        className,
        href: editUrl
      }, children);
    },
    text: "Edit this page"
  },
  feedback: {
    content: () => /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, "Question? Give us feedback \u2192"),
    labels: "feedback"
  },
  footer: {
    component: Footer,
    text: `MIT ${new Date().getFullYear()} \xA9 Nextra.`
  },
  gitTimestamp({ timestamp }) {
    const { locale = DEFAULT_LOCALE } = (0,router_.useRouter)();
    return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, "Last updated on", " ", timestamp.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric"
    }));
  },
  head: /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "msapplication-TileColor",
    content: "#fff"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    httpEquiv: "Content-Language",
    content: "en"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "description",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "twitter:site",
    content: "@shuding_"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    property: "og:title",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    property: "og:description",
    content: "Nextra: the next docs builder"
  }), /* @__PURE__ */ external_react_default().createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: "Nextra"
  })),
  i18n: [],
  logo: /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-font-extrabold"
  }, "Nextra"), /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-ml-2 nx-hidden nx-font-normal nx-text-gray-600 md:nx-inline"
  }, "The Next Docs Builder")),
  logoLink: true,
  navbar: {
    component: Navbar
  },
  navigation: true,
  nextThemes: {
    defaultTheme: "system",
    storageKey: "theme"
  },
  notFound: {
    content: "Submit an issue about broken link \u2192",
    labels: "bug"
  },
  primaryHue: {
    dark: 204,
    light: 212
  },
  project: {
    icon: /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, /* @__PURE__ */ external_react_default().createElement(GitHubIcon, null), /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-sr-only"
    }, "GitHub"))
  },
  search: {
    component({ className, directories }) {
      const config = useConfig();
      return config.flexsearch ? /* @__PURE__ */ external_react_default().createElement(Flexsearch, {
        className
      }) : /* @__PURE__ */ external_react_default().createElement(MatchSorterSearch, {
        className,
        directories
      });
    },
    emptyResult: /* @__PURE__ */ external_react_default().createElement("span", {
      className: "nx-block nx-select-none nx-p-8 nx-text-center nx-text-sm nx-text-gray-400"
    }, "No results found."),
    loading() {
      const { locale } = (0,router_.useRouter)();
      if (locale === "zh-CN")
        return "\u6B63\u5728\u52A0\u8F7D\u2026";
      if (locale === "ru")
        return "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026";
      if (locale === "fr")
        return "\u0421hargement\u2026";
      return "Loading\u2026";
    },
    placeholder() {
      const { locale } = (0,router_.useRouter)();
      if (locale === "zh-CN")
        return "\u641C\u7D22\u6587\u6863\u2026";
      if (locale === "ru")
        return "\u041F\u043E\u0438\u0441\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438\u2026";
      if (locale === "fr")
        return "Rechercher de la documentation\u2026";
      return "Search documentation\u2026";
    }
  },
  serverSideError: {
    content: "Submit an issue about error in url \u2192",
    labels: "bug"
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
    titleComponent: ({ title }) => /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, title)
  },
  toc: {
    component: TOC,
    float: true,
    title: "On This Page"
  },
  useNextSeoProps: () => ({ titleTemplate: "%s \u2013 Nextra" })
};
var DEEP_OBJECT_KEYS = Object.entries(DEFAULT_THEME).map(([key, value]) => {
  const isObject = value && typeof value === "object" && !Array.isArray(value) && !(0,external_react_.isValidElement)(value);
  if (isObject) {
    return key;
  }
}).filter(Boolean);
var LEGACY_CONFIG_OPTIONS = {
  bannerKey: "banner.key",
  bodyExtraContent: "main",
  customSearch: "search.component",
  defaultMenuCollapsed: "sidebar.defaultMenuCollapseLevel",
  feedbackLabels: "feedback.labels",
  feedbackLink: "feedback.content",
  floatTOC: "toc.float",
  footerEditLink: "editLink.text",
  footerText: "footer.text",
  github: "project.link",
  nextLinks: "navigation.next",
  notFoundLabels: "notFound.labels",
  notFoundLink: "notFound.content",
  prevLinks: "navigation.prev",
  projectChat: "chat",
  projectChatLink: "chat.link",
  projectChatLinkIcon: "chat.icon",
  projectLink: "project.link",
  projectLinkIcon: "project.icon",
  searchPlaceholder: "search.placeholder",
  serverSideErrorLabels: "serverSideError.labels",
  serverSideErrorLink: "serverSideError.content",
  sidebarSubtitle: "sidebar.titleComponent",
  tocExtraContent: "toc.extraContent",
  unstable_searchResultEmpty: "search.emptyResult"
};
var DEFAULT_PAGE_THEME = {
  breadcrumb: true,
  collapsed: false,
  footer: true,
  layout: "default",
  navbar: true,
  pagination: true,
  sidebar: true,
  timestamp: true,
  toc: true,
  typesetting: "default"
};

// src/polyfill.ts
if (IS_BROWSER) {
  let resizeTimer;
  const addResizingClass = () => {
    document.body.classList.add("resizing");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resizing");
    }, 200);
  };
  window.addEventListener("resize", addResizingClass);
}

// src/mdx-components.tsx




// ../nextra/dist/components/index.mjs








var Button = (_a) => {
  var _b = _a, {
    children,
    className = ""
  } = _b, props = __objRest2(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ external_react_default().createElement("button", __spreadValues2({
    className: [
      "nextra-button nx-transition-all active:nx-opacity-50",
      "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
      "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
      className
    ].join(" ")
  }, props), children);
};
var CopyToClipboard = (_a) => {
  var _b = _a, {
    value
  } = _b, props = __objRest2(_b, [
    "value"
  ]);
  const [isCopied, setCopied] = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    if (!isCopied)
      return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2e3);
    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);
  const handleClick = (0,external_react_.useCallback)(() => __async2(void 0, null, function* () {
    setCopied(true);
    if (!(navigator == null ? void 0 : navigator.clipboard)) {
      console.error("Access to clipboard rejected!");
    }
    try {
      yield navigator.clipboard.writeText(JSON.parse(value));
    } catch (e) {
      console.error("Failed to copy!");
    }
  }), [value]);
  const IconToUse = isCopied ? CheckIcon : CopyIcon;
  return /* @__PURE__ */ external_react_default().createElement(Button, __spreadValues2({
    onClick: handleClick,
    title: "Copy code",
    tabIndex: 0
  }, props), /* @__PURE__ */ external_react_default().createElement(IconToUse, {
    className: "nx-pointer-events-none nx-h-4 nx-w-4"
  }));
};
var Code = (_a) => {
  var _b = _a, {
    children,
    className = ""
  } = _b, props = __objRest2(_b, [
    "children",
    "className"
  ]);
  const hasLineNumbers = "data-line-numbers" in props;
  return /* @__PURE__ */ external_react_default().createElement("code", __spreadValues2({
    className: [
      "nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em]",
      "dark:nx-border-white/10 dark:nx-bg-white/10",
      hasLineNumbers ? "[counter-reset:line]" : "",
      className
    ].join(" "),
    dir: "ltr"
  }, props), children);
};
var Pre = (_a) => {
  var _b = _a, {
    children,
    className = "",
    value,
    filename
  } = _b, props = __objRest2(_b, [
    "children",
    "className",
    "value",
    "filename"
  ]);
  const toggleWordWrap = (0,external_react_.useCallback)(() => {
    const htmlDataset = document.documentElement.dataset;
    const hasWordWrap = "nextraWordWrap" in htmlDataset;
    if (hasWordWrap) {
      delete htmlDataset.nextraWordWrap;
    } else {
      htmlDataset.nextraWordWrap = "";
    }
  }, []);
  return /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, filename && /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-absolute nx-top-0 nx-z-[1] nx-w-full nx-truncate nx-rounded-t-xl nx-bg-primary-700/5 nx-py-2 nx-px-4 nx-text-xs nx-text-gray-700 dark:nx-bg-primary-300/10 dark:nx-text-gray-200"
  }, filename), /* @__PURE__ */ external_react_default().createElement("pre", __spreadValues2({
    className: [
      "nx-bg-primary-700/5 nx-mb-4 nx-overflow-x-auto nx-rounded-xl nx-font-medium nx-subpixel-antialiased dark:nx-bg-primary-300/10 nx-text-[.9em]",
      "contrast-more:nx-border contrast-more:nx-border-primary-900/20 contrast-more:nx-contrast-150 contrast-more:dark:nx-border-primary-100/40",
      filename ? "nx-pt-12 nx-pb-4" : "nx-py-4",
      className
    ].join(" ")
  }, props), children), /* @__PURE__ */ external_react_default().createElement("div", {
    className: [
      "nx-opacity-0 nx-transition [div:hover>&]:nx-opacity-100 focus-within:nx-opacity-100",
      "nx-flex nx-gap-1 nx-absolute nx-m-[11px] nx-right-0",
      filename ? "nx-top-8" : "nx-top-0"
    ].join(" ")
  }, /* @__PURE__ */ external_react_default().createElement(Button, {
    onClick: toggleWordWrap,
    className: "md:nx-hidden",
    title: "Toggle word wrap"
  }, /* @__PURE__ */ external_react_default().createElement(WordWrapIcon, {
    className: "nx-pointer-events-none nx-h-4 nx-w-4"
  })), value && /* @__PURE__ */ external_react_default().createElement(CopyToClipboard, {
    value
  })));
};
var Td = (props) => /* @__PURE__ */ external_react_default().createElement("td", __spreadValues2({
  className: "nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 dark:nx-border-gray-600"
}, props));
var Table = (_a) => {
  var _b = _a, {
    className = ""
  } = _b, props = __objRest2(_b, [
    "className"
  ]);
  return /* @__PURE__ */ external_react_default().createElement("table", __spreadValues2({
    className: "nx-block nx-overflow-x-scroll " + className
  }, props));
};
var Th = (props) => /* @__PURE__ */ external_react_default().createElement("th", __spreadValues2({
  className: "nx-m-0 nx-border nx-border-gray-300 nx-px-4 nx-py-2 nx-font-semibold dark:nx-border-gray-600"
}, props));
var Tr = (props) => /* @__PURE__ */ external_react_default().createElement("tr", __spreadValues2({
  className: "nx-m-0 nx-border-t nx-border-gray-300 nx-p-0 dark:nx-border-gray-600 even:nx-bg-gray-100 even:dark:nx-bg-gray-600/20"
}, props));

// src/mdx-components.tsx
var observer;
var setActiveAnchor;
var slugs = /* @__PURE__ */ new WeakMap();
if (IS_BROWSER) {
  observer || (observer = new IntersectionObserver(
    (entries) => {
      setActiveAnchor((f) => {
        const ret = __spreadValues({}, f);
        for (const entry of entries) {
          if ((entry == null ? void 0 : entry.rootBounds) && slugs.has(entry.target)) {
            const [slug, index] = slugs.get(entry.target);
            const aboveHalfViewport = entry.boundingClientRect.y + entry.boundingClientRect.height <= entry.rootBounds.y + entry.rootBounds.height;
            const insideHalfViewport = entry.intersectionRatio > 0;
            ret[slug] = {
              index,
              aboveHalfViewport,
              insideHalfViewport
            };
          }
        }
        let activeSlug = "";
        let smallestIndexInViewport = Infinity;
        let largestIndexAboveViewport = -1;
        for (let s in ret) {
          ret[s].isActive = false;
          if (ret[s].insideHalfViewport && ret[s].index < smallestIndexInViewport) {
            smallestIndexInViewport = ret[s].index;
            activeSlug = s;
          }
          if (smallestIndexInViewport === Infinity && ret[s].aboveHalfViewport && ret[s].index > largestIndexAboveViewport) {
            largestIndexAboveViewport = ret[s].index;
            activeSlug = s;
          }
        }
        if (ret[activeSlug])
          ret[activeSlug].isActive = true;
        return ret;
      });
    },
    {
      rootMargin: "0px 0px -50%",
      threshold: [0, 1]
    }
  ));
}
var createHeaderLink = (Tag, context) => function HeaderLink(_a) {
  var _b = _a, {
    children,
    id
  } = _b, props = __objRest(_b, [
    "children",
    "id"
  ]);
  setActiveAnchor != null ? setActiveAnchor : setActiveAnchor = useSetActiveAnchor();
  const obRef = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    const heading = obRef.current;
    if (!heading)
      return;
    slugs.set(heading, [id, context.index += 1]);
    observer.observe(heading);
    return () => {
      observer.disconnect();
      slugs.delete(heading);
      setActiveAnchor((f) => {
        const ret = __spreadValues({}, f);
        delete ret[id];
        return ret;
      });
    };
  }, []);
  return /* @__PURE__ */ external_react_default().createElement(Tag, __spreadValues({
    className: external_clsx_default()(
      "nx-font-semibold nx-tracking-tight",
      {
        h2: "nx-mt-10 nx-border-b nx-pb-1 nx-text-3xl contrast-more:nx-border-neutral-400 dark:nx-border-primary-100/10 contrast-more:dark:nx-border-neutral-400",
        h3: "nx-mt-8 nx-text-2xl",
        h4: "nx-mt-8 nx-text-xl",
        h5: "nx-mt-8 nx-text-lg",
        h6: "nx-mt-8 nx-text-base"
      }[Tag]
    )
  }, props), children, /* @__PURE__ */ external_react_default().createElement("span", {
    className: "nx-absolute -nx-mt-20",
    id,
    ref: obRef
  }), /* @__PURE__ */ external_react_default().createElement("a", {
    href: `#${id}`,
    className: "subheading-anchor",
    "aria-label": "Permalink for this section"
  }));
};
var findSummary = (children) => {
  let summary = null;
  const restChildren = [];
  external_react_.Children.forEach(children, (child, index) => {
    var _a;
    if (child && child.type === Summary) {
      summary || (summary = child);
      return;
    }
    let c = child;
    if (!summary && child && typeof child === "object" && child.type !== Details && "props" in child && child.props) {
      const result = findSummary(child.props.children);
      summary = result[0];
      c = (0,external_react_.cloneElement)(child, __spreadProps(__spreadValues({}, child.props), {
        children: ((_a = result[1]) == null ? void 0 : _a.length) ? result[1] : void 0,
        key: index
      }));
    }
    restChildren.push(c);
  });
  return [summary, restChildren];
};
var Details = (_a) => {
  var _b = _a, {
    children,
    open
  } = _b, props = __objRest(_b, [
    "children",
    "open"
  ]);
  const [openState, setOpen] = (0,external_react_.useState)(!!open);
  const [summary, restChildren] = findSummary(children);
  const [delayedOpenState, setDelayedOpenState] = (0,external_react_.useState)(openState);
  (0,external_react_.useEffect)(() => {
    if (openState) {
      setDelayedOpenState(true);
    } else {
      const timeout = setTimeout(() => setDelayedOpenState(openState), 500);
      return () => clearTimeout(timeout);
    }
  }, [openState]);
  return /* @__PURE__ */ external_react_default().createElement("details", __spreadValues(__spreadProps(__spreadValues({
    className: "nx-my-4 nx-rounded nx-border nx-border-gray-200 nx-bg-white nx-p-2 nx-shadow-sm first:nx-mt-0 dark:nx-border-neutral-800 dark:nx-bg-neutral-900"
  }, props), {
    open: delayedOpenState
  }), openState && { "data-expanded": true }), /* @__PURE__ */ external_react_default().createElement(DetailsProvider, {
    value: setOpen
  }, summary), /* @__PURE__ */ external_react_default().createElement(Collapse, {
    open: openState
  }, restChildren));
};
var Summary = (props) => {
  const setOpen = useDetails();
  return /* @__PURE__ */ external_react_default().createElement("summary", __spreadProps(__spreadValues({
    className: external_clsx_default()(
      "nx-cursor-pointer nx-list-none nx-p-1 nx-transition-colors hover:nx-bg-gray-100 dark:hover:nx-bg-neutral-800",
      "before:nx-mr-1 before:nx-inline-block before:nx-transition-transform before:nx-content-[''] dark:before:nx-invert",
      "rtl:before:nx-rotate-180 [[data-expanded]>&]:before:nx-rotate-90"
    )
  }, props), {
    onClick: (e) => {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }));
};
var A = (_a) => {
  var _b = _a, { href = "" } = _b, props = __objRest(_b, ["href"]);
  return /* @__PURE__ */ external_react_default().createElement(Anchor, __spreadValues({
    href,
    newWindow: href.startsWith("https://")
  }, props));
};
var getComponents = ({
  isRawLayout,
  components
}) => {
  if (isRawLayout) {
    return { a: A };
  }
  const context = { index: 0 };
  return __spreadValues({
    h1: (props) => /* @__PURE__ */ external_react_default().createElement("h1", __spreadValues({
      className: "nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight"
    }, props)),
    h2: createHeaderLink("h2", context),
    h3: createHeaderLink("h3", context),
    h4: createHeaderLink("h4", context),
    h5: createHeaderLink("h5", context),
    h6: createHeaderLink("h6", context),
    ul: (props) => /* @__PURE__ */ external_react_default().createElement("ul", __spreadValues({
      className: "nx-mt-6 nx-list-disc first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6"
    }, props)),
    ol: (props) => /* @__PURE__ */ external_react_default().createElement("ol", __spreadValues({
      className: "nx-mt-6 nx-list-decimal first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6"
    }, props)),
    li: (props) => /* @__PURE__ */ external_react_default().createElement("li", __spreadValues({
      className: "nx-my-2"
    }, props)),
    blockquote: (props) => /* @__PURE__ */ external_react_default().createElement("blockquote", __spreadValues({
      className: external_clsx_default()(
        "nx-mt-6 nx-border-gray-300 nx-italic nx-text-gray-700 dark:nx-border-gray-700 dark:nx-text-gray-400",
        "first:nx-mt-0 ltr:nx-border-l-2 ltr:nx-pl-6 rtl:nx-border-r-2 rtl:nx-pr-6"
      )
    }, props)),
    hr: (props) => /* @__PURE__ */ external_react_default().createElement("hr", __spreadValues({
      className: "nx-my-8 dark:nx-border-gray-900"
    }, props)),
    a: (props) => /* @__PURE__ */ external_react_default().createElement(A, __spreadProps(__spreadValues({}, props), {
      className: "nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:under]"
    })),
    table: (props) => /* @__PURE__ */ external_react_default().createElement(Table, __spreadValues({
      className: "nextra-scrollbar nx-mt-6 nx-p-0 first:nx-mt-0"
    }, props)),
    p: (props) => /* @__PURE__ */ external_react_default().createElement("p", __spreadValues({
      className: "nx-mt-6 nx-leading-7 first:nx-mt-0"
    }, props)),
    tr: Tr,
    th: Th,
    td: Td,
    details: Details,
    summary: Summary,
    pre: Pre,
    code: Code
  }, components);
};

// src/index.tsx


function useDirectoryInfo(pageMap) {
  const { locale = DEFAULT_LOCALE, defaultLocale, route } = (0,router_.useRouter)();
  return (0,external_react_.useMemo)(() => {
    const fsPath = getFSRoute(route, locale);
    return normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route: fsPath
    });
  }, [pageMap, locale, defaultLocale, route]);
}
var Body = ({
  themeContext,
  breadcrumb,
  timestamp,
  navigation,
  children
}) => {
  var _a;
  const config = useConfig();
  if (themeContext.layout === "raw") {
    return /* @__PURE__ */ external_react_default().createElement("div", {
      className: "nx-w-full nx-overflow-x-hidden"
    }, children);
  }
  const date = themeContext.timestamp && config.gitTimestamp && timestamp ? new Date(timestamp) : null;
  const gitTimestampEl = date ? /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-mt-12 nx-mb-8 nx-block nx-text-xs nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400"
  }, renderComponent(config.gitTimestamp, { timestamp: date })) : /* @__PURE__ */ external_react_default().createElement("div", {
    className: "nx-mt-16"
  });
  const content = /* @__PURE__ */ external_react_default().createElement((external_react_default()).Fragment, null, children, gitTimestampEl, navigation);
  const body = ((_a = config.main) == null ? void 0 : _a.call(config, { children: content })) || content;
  if (themeContext.layout === "full") {
    return /* @__PURE__ */ external_react_default().createElement("article", {
      className: "nx-min-h-[calc(100vh-4rem)] nx-w-full nx-overflow-x-hidden nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]"
    }, body);
  }
  return /* @__PURE__ */ external_react_default().createElement("article", {
    className: external_clsx_default()(
      "nx-flex nx-min-h-[calc(100vh-4rem)] nx-w-full nx-min-w-0 nx-max-w-full nx-justify-center nx-pb-8 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]",
      themeContext.typesetting === "article" && "nextra-body-typesetting-article"
    )
  }, /* @__PURE__ */ external_react_default().createElement("main", {
    className: "nx-w-full nx-min-w-0 nx-max-w-4xl nx-px-6 nx-pt-4 md:nx-px-8"
  }, breadcrumb, body));
};
var InnerLayout = ({
  filePath,
  pageMap,
  frontMatter,
  headings,
  timestamp,
  children
}) => {
  const config = useConfig();
  const {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    topLevelNavbarItems,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories
  } = useDirectoryInfo(pageMap);
  const themeContext = __spreadValues(__spreadValues({}, activeThemeContext), frontMatter);
  const hideSidebar = !themeContext.sidebar || themeContext.layout === "raw" || activeType === "page";
  const tocClassName = "nextra-toc nx-order-last nx-hidden nx-w-64 nx-shrink-0 xl:nx-block";
  const tocEl = activeType === "page" || !themeContext.toc || themeContext.layout !== "default" ? themeContext.layout !== "full" && themeContext.layout !== "raw" && /* @__PURE__ */ external_react_default().createElement("nav", {
    className: tocClassName,
    "aria-label": "table of contents"
  }) : /* @__PURE__ */ external_react_default().createElement("nav", {
    className: external_clsx_default()(tocClassName, "nx-px-4"),
    "aria-label": "table of contents"
  }, renderComponent(config.toc.component, {
    headings: config.toc.float ? headings : [],
    filePath
  }));
  const { locale = DEFAULT_LOCALE } = (0,router_.useRouter)();
  const localeConfig = config.i18n.find((l) => l.locale === locale);
  const isRTL = localeConfig ? localeConfig.direction === "rtl" : config.direction === "rtl";
  const direction = isRTL ? "rtl" : "ltr";
  return /* @__PURE__ */ external_react_default().createElement("div", {
    dir: direction
  }, /* @__PURE__ */ external_react_default().createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `document.documentElement.setAttribute('dir','${direction}')`
    }
  }), /* @__PURE__ */ external_react_default().createElement(Head, null), /* @__PURE__ */ external_react_default().createElement(Banner, null), themeContext.navbar && renderComponent(config.navbar.component, {
    flatDirectories,
    items: topLevelNavbarItems
  }), /* @__PURE__ */ external_react_default().createElement("div", {
    className: external_clsx_default()(
      "nx-mx-auto nx-flex",
      themeContext.layout !== "raw" && "nx-max-w-[90rem]"
    )
  }, /* @__PURE__ */ external_react_default().createElement(ActiveAnchorProvider, null, /* @__PURE__ */ external_react_default().createElement(Sidebar, {
    docsDirectories,
    flatDirectories,
    fullDirectories: directories,
    headings,
    asPopover: hideSidebar,
    includePlaceholder: themeContext.layout === "default"
  }), tocEl, /* @__PURE__ */ external_react_default().createElement(reach_skip_nav_cjs_prod/* SkipNavContent */.fN, null), /* @__PURE__ */ external_react_default().createElement(Body, {
    themeContext,
    breadcrumb: activeType !== "page" && themeContext.breadcrumb ? /* @__PURE__ */ external_react_default().createElement(Breadcrumb, {
      activePath
    }) : null,
    timestamp,
    navigation: activeType !== "page" && themeContext.pagination ? /* @__PURE__ */ external_react_default().createElement(NavLinks, {
      flatDirectories: flatDocsDirectories,
      currentIndex: activeIndex
    }) : null
  }, /* @__PURE__ */ external_react_default().createElement(lib/* MDXProvider */.Zo, {
    components: getComponents({
      isRawLayout: themeContext.layout === "raw",
      components: config.components
    })
  }, children)))), themeContext.footer && renderComponent(config.footer.component, { menu: hideSidebar }));
};
function Layout(props) {
  const { route } = (0,router_.useRouter)();
  const context = globalThis.__nextra_pageContext__[route];
  if (!context)
    throw new Error(`No content found for ${route}.`);
  const { pageOpts, Content } = context;
  return /* @__PURE__ */ external_react_default().createElement(ConfigProvider, {
    value: context
  }, /* @__PURE__ */ external_react_default().createElement(InnerLayout, __spreadValues({}, pageOpts), /* @__PURE__ */ external_react_default().createElement(Content, __spreadValues({}, props))));
}



/***/ }),

/***/ 5182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var protocols = __webpack_require__(6097);

/**
 * parsePath
 * Parses the input url.
 *
 * @name parsePath
 * @function
 * @param {String} url The input url.
 * @return {Object} An object containing the following fields:
 *
 *    - `protocols` (Array): An array with the url protocols (usually it has one element).
 *    - `protocol` (String): The first protocol or `"file"`.
 *    - `port` (String): The domain port (default: `""`).
 *    - `resource` (String): The url domain/hostname.
 *    - `host` (String): The url domain (including subdomain and port).
 *    - `user` (String): The authentication user (default: `""`).
 *    - `password` (String): The authentication password (default: `""`).
 *    - `pathname` (String): The url pathname.
 *    - `hash` (String): The url hash.
 *    - `search` (String): The url querystring value (excluding `?`).
 *    - `href` (String): The normalized input url.
 *    - `query` (Object): The url querystring, parsed as object.
 *    - `parse_failed` (Boolean): Whether the parsing failed or not.
 */
function parsePath(url) {

    var output = {
        protocols: [],
        protocol: null,
        port: null,
        resource: "",
        host: "",
        user: "",
        password: "",
        pathname: "",
        hash: "",
        search: "",
        href: url,
        query: {},
        parse_failed: false
    };

    try {
        var parsed = new URL(url);
        output.protocols = protocols(parsed);
        output.protocol = output.protocols[0];
        output.port = parsed.port;
        output.resource = parsed.hostname;
        output.host = parsed.host;
        output.user = parsed.username || "";
        output.password = parsed.password || "";
        output.pathname = parsed.pathname;
        output.hash = parsed.hash.slice(1);
        output.search = parsed.search.slice(1);
        output.href = parsed.href;
        output.query = Object.fromEntries(parsed.searchParams);
    } catch (e) {
        // TODO Maybe check if it is a valid local file path
        //      In any case, these will be parsed by higher
        //      level parsers such as parse-url, git-url-parse, git-up
        output.protocols = ["file"];
        output.protocol = output.protocols[0];
        output.port = "";
        output.resource = "";
        output.user = "";
        output.pathname = "";
        output.hash = "";
        output.search = "";
        output.href = url;
        output.query = {};
        output.parse_failed = true;
    }

    return output;
}

module.exports = parsePath;

/***/ }),

/***/ 8593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var parsePath = __webpack_require__(5182);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var parsePath__default = /*#__PURE__*/_interopDefaultLegacy(parsePath);

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

const testParameter = (name, filters) => filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);

const normalizeDataURL = (urlString, {stripHash}) => {
	const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);

	if (!match) {
		throw new Error(`Invalid URL: ${urlString}`);
	}

	let {type, data, hash} = match.groups;
	const mediaType = type.split(';');
	hash = stripHash ? '' : hash;

	let isBase64 = false;
	if (mediaType[mediaType.length - 1] === 'base64') {
		mediaType.pop();
		isBase64 = true;
	}

	// Lowercase MIME type
	const mimeType = (mediaType.shift() || '').toLowerCase();
	const attributes = mediaType
		.map(attribute => {
			let [key, value = ''] = attribute.split('=').map(string => string.trim());

			// Lowercase `charset`
			if (key === 'charset') {
				value = value.toLowerCase();

				if (value === DATA_URL_DEFAULT_CHARSET) {
					return '';
				}
			}

			return `${key}${value ? `=${value}` : ''}`;
		})
		.filter(Boolean);

	const normalizedMediaType = [
		...attributes,
	];

	if (isBase64) {
		normalizedMediaType.push('base64');
	}

	if (normalizedMediaType.length > 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)) {
		normalizedMediaType.unshift(mimeType);
	}

	return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`;
};

function normalizeUrl(urlString, options) {
	options = {
		defaultProtocol: 'http:',
		normalizeProtocol: true,
		forceHttp: false,
		forceHttps: false,
		stripAuthentication: true,
		stripHash: false,
		stripTextFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeSingleSlash: true,
		removeDirectoryIndex: false,
		sortQueryParameters: true,
		...options,
	};

	urlString = urlString.trim();

	// Data URL
	if (/^data:/i.test(urlString)) {
		return normalizeDataURL(urlString, options);
	}

	if (/^view-source:/i.test(urlString)) {
		throw new Error('`view-source:` is not supported as it is a non-standard protocol');
	}

	const hasRelativeProtocol = urlString.startsWith('//');
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

	// Prepend protocol
	if (!isRelativeUrl) {
		urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
	}

	const urlObject = new URL(urlString);

	if (options.forceHttp && options.forceHttps) {
		throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
	}

	if (options.forceHttp && urlObject.protocol === 'https:') {
		urlObject.protocol = 'http:';
	}

	if (options.forceHttps && urlObject.protocol === 'http:') {
		urlObject.protocol = 'https:';
	}

	// Remove auth
	if (options.stripAuthentication) {
		urlObject.username = '';
		urlObject.password = '';
	}

	// Remove hash
	if (options.stripHash) {
		urlObject.hash = '';
	} else if (options.stripTextFragment) {
		urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, '');
	}

	// Remove duplicate slashes if not preceded by a protocol
	// NOTE: This could be implemented using a single negative lookbehind
	// regex, but we avoid that to maintain compatibility with older js engines
	// which do not have support for that feature.
	if (urlObject.pathname) {
		// TODO: Replace everything below with `urlObject.pathname = urlObject.pathname.replace(/(?<!\b[a-z][a-z\d+\-.]{1,50}:)\/{2,}/g, '/');` when Safari supports negative lookbehind.

		// Split the string by occurrences of this protocol regex, and perform
		// duplicate-slash replacement on the strings between those occurrences
		// (if any).
		const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;

		let lastIndex = 0;
		let result = '';
		for (;;) {
			const match = protocolRegex.exec(urlObject.pathname);
			if (!match) {
				break;
			}

			const protocol = match[0];
			const protocolAtIndex = match.index;
			const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex);

			result += intermediate.replace(/\/{2,}/g, '/');
			result += protocol;
			lastIndex = protocolAtIndex + protocol.length;
		}

		const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length);
		result += remnant.replace(/\/{2,}/g, '/');

		urlObject.pathname = result;
	}

	// Decode URI octets
	if (urlObject.pathname) {
		try {
			urlObject.pathname = decodeURI(urlObject.pathname);
		} catch {}
	}

	// Remove directory index
	if (options.removeDirectoryIndex === true) {
		options.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
		let pathComponents = urlObject.pathname.split('/');
		const lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, options.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, -1);
			urlObject.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	if (urlObject.hostname) {
		// Remove trailing dot
		urlObject.hostname = urlObject.hostname.replace(/\.$/, '');

		// Remove `www.`
		if (options.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(urlObject.hostname)) {
			// Each label should be max 63 at length (min: 1).
			// Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
			// Each TLD should be up to 63 characters long (min: 2).
			// It is technically possible to have a single character TLD, but none currently exist.
			urlObject.hostname = urlObject.hostname.replace(/^www\./, '');
		}
	}

	// Remove query unwanted parameters
	if (Array.isArray(options.removeQueryParameters)) {
		// eslint-disable-next-line unicorn/no-useless-spread -- We are intentionally spreading to get a copy.
		for (const key of [...urlObject.searchParams.keys()]) {
			if (testParameter(key, options.removeQueryParameters)) {
				urlObject.searchParams.delete(key);
			}
		}
	}

	if (options.removeQueryParameters === true) {
		urlObject.search = '';
	}

	// Sort query parameters
	if (options.sortQueryParameters) {
		urlObject.searchParams.sort();

		// Calling `.sort()` encodes the search parameters, so we need to decode them again.
		try {
			urlObject.search = decodeURIComponent(urlObject.search);
		} catch {}
	}

	if (options.removeTrailingSlash) {
		urlObject.pathname = urlObject.pathname.replace(/\/$/, '');
	}

	const oldUrlString = urlString;

	// Take advantage of many of the Node `url` normalizations
	urlString = urlObject.toString();

	if (!options.removeSingleSlash && urlObject.pathname === '/' && !oldUrlString.endsWith('/') && urlObject.hash === '') {
		urlString = urlString.replace(/\/$/, '');
	}

	// Remove ending `/` unless removeSingleSlash is false
	if ((options.removeTrailingSlash || urlObject.pathname === '/') && urlObject.hash === '' && options.removeSingleSlash) {
		urlString = urlString.replace(/\/$/, '');
	}

	// Restore relative protocol, if applicable
	if (hasRelativeProtocol && !options.normalizeProtocol) {
		urlString = urlString.replace(/^http:\/\//, '//');
	}

	// Remove http/https
	if (options.stripProtocol) {
		urlString = urlString.replace(/^(?:https?:)?\/\//, '');
	}

	return urlString;
}

// Dependencies

/**
 * parseUrl
 * Parses the input url.
 *
 * **Note**: This *throws* if invalid urls are provided.
 *
 * @name parseUrl
 * @function
 * @param {String} url The input url.
 * @param {Boolean|Object} normalize Whether to normalize the url or not.
 *                         Default is `false`. If `true`, the url will
 *                         be normalized. If an object, it will be the
 *                         options object sent to [`normalize-url`](https://github.com/sindresorhus/normalize-url).
 *
 *                         For SSH urls, normalize won't work.
 *
 * @return {Object} An object containing the following fields:
 *
 *    - `protocols` (Array): An array with the url protocols (usually it has one element).
 *    - `protocol` (String): The first protocol, `"ssh"` (if the url is a ssh url) or `"file"`.
 *    - `port` (null|Number): The domain port.
 *    - `resource` (String): The url domain (including subdomains).
 *    - `user` (String): The authentication user (usually for ssh urls).
 *    - `pathname` (String): The url pathname.
 *    - `hash` (String): The url hash.
 *    - `search` (String): The url querystring value.
 *    - `href` (String): The input url.
 *    - `query` (Object): The url querystring, parsed as object.
 *    - `parse_failed` (Boolean): Whether the parsing failed or not.
 */
const parseUrl = (url, normalize = false) => {

    // Constants
    const GIT_RE = /^(?:([a-z_][a-z0-9_-]{0,31})@|https?:\/\/)([\w\.\-@]+)[\/:]([\~,\.\w,\-,\_,\/]+?(?:\.git|\/)?)$/;

    const throwErr = msg => {
        const err = new Error(msg);
        err.subject_url = url;
        throw err
    };

    if (typeof url !== "string" || !url.trim()) {
        throwErr("Invalid url.");
    }

    if (url.length > parseUrl.MAX_INPUT_LENGTH) {
        throwErr("Input exceeds maximum length. If needed, change the value of parseUrl.MAX_INPUT_LENGTH.");
    }

    if (normalize) {
        if (typeof normalize !== "object") {
            normalize = {
                stripHash: false
            };
        }
        url = normalizeUrl(url, normalize);
    }

    const parsed = parsePath__default["default"](url);

    // Potential git-ssh urls
    if (parsed.parse_failed) {
        const matched = parsed.href.match(GIT_RE);

        if (matched) {
            parsed.protocols = ["ssh"];
            parsed.protocol = "ssh";
            parsed.resource = matched[2];
            parsed.host = matched[2];
            parsed.user = matched[1];
            parsed.pathname = `/${matched[3]}`;
            parsed.parse_failed = false;
        } else {
            throwErr("URL parsing failed.");
        }
    }

    return parsed;
};

parseUrl.MAX_INPUT_LENGTH = 2048;

module.exports = parseUrl;


/***/ }),

/***/ 6097:
/***/ ((module) => {

"use strict";


/**
 * protocols
 * Returns the protocols of an input url.
 *
 * @name protocols
 * @function
 * @param {String|URL} input The input url (string or `URL` instance)
 * @param {Boolean|Number} first If `true`, the first protocol will be returned. If number, it will represent the zero-based index of the protocols array.
 * @return {Array|String} The array of protocols or the specified protocol.
 */
module.exports = function protocols(input, first) {

    if (first === true) {
        first = 0;
    }

    var prots = "";
    if (typeof input === "string") {
        try {
            prots = new URL(input).protocol;
        } catch (e) {}
    } else if (input && input.constructor === URL) {
        prots = input.protocol;
    }

    var splits = prots.split(/\:|\+/).filter(Boolean);

    if (typeof first === "number") {
        return splits[first];
    }

    return splits;
};

/***/ }),

/***/ 6593:
/***/ ((module) => {

var characterMap = {
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"Ấ": "A",
	"Ắ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ặ": "A",
	"Æ": "AE",
	"Ầ": "A",
	"Ằ": "A",
	"Ȃ": "A",
	"Ç": "C",
	"Ḉ": "C",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"Ế": "E",
	"Ḗ": "E",
	"Ề": "E",
	"Ḕ": "E",
	"Ḝ": "E",
	"Ȇ": "E",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"Ȋ": "I",
	"Ð": "D",
	"Ñ": "N",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"Ố": "O",
	"Ṍ": "O",
	"Ṓ": "O",
	"Ȏ": "O",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"Ý": "Y",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"ấ": "a",
	"ắ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ặ": "a",
	"æ": "ae",
	"ầ": "a",
	"ằ": "a",
	"ȃ": "a",
	"ç": "c",
	"ḉ": "c",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"ế": "e",
	"ḗ": "e",
	"ề": "e",
	"ḕ": "e",
	"ḝ": "e",
	"ȇ": "e",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ȋ": "i",
	"ð": "d",
	"ñ": "n",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"ố": "o",
	"ṍ": "o",
	"ṓ": "o",
	"ȏ": "o",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"ý": "y",
	"ÿ": "y",
	"Ā": "A",
	"ā": "a",
	"Ă": "A",
	"ă": "a",
	"Ą": "A",
	"ą": "a",
	"Ć": "C",
	"ć": "c",
	"Ĉ": "C",
	"ĉ": "c",
	"Ċ": "C",
	"ċ": "c",
	"Č": "C",
	"č": "c",
	"C̆": "C",
	"c̆": "c",
	"Ď": "D",
	"ď": "d",
	"Đ": "D",
	"đ": "d",
	"Ē": "E",
	"ē": "e",
	"Ĕ": "E",
	"ĕ": "e",
	"Ė": "E",
	"ė": "e",
	"Ę": "E",
	"ę": "e",
	"Ě": "E",
	"ě": "e",
	"Ĝ": "G",
	"Ǵ": "G",
	"ĝ": "g",
	"ǵ": "g",
	"Ğ": "G",
	"ğ": "g",
	"Ġ": "G",
	"ġ": "g",
	"Ģ": "G",
	"ģ": "g",
	"Ĥ": "H",
	"ĥ": "h",
	"Ħ": "H",
	"ħ": "h",
	"Ḫ": "H",
	"ḫ": "h",
	"Ĩ": "I",
	"ĩ": "i",
	"Ī": "I",
	"ī": "i",
	"Ĭ": "I",
	"ĭ": "i",
	"Į": "I",
	"į": "i",
	"İ": "I",
	"ı": "i",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"Ḱ": "K",
	"ḱ": "k",
	"K̆": "K",
	"k̆": "k",
	"Ĺ": "L",
	"ĺ": "l",
	"Ļ": "L",
	"ļ": "l",
	"Ľ": "L",
	"ľ": "l",
	"Ŀ": "L",
	"ŀ": "l",
	"Ł": "l",
	"ł": "l",
	"Ḿ": "M",
	"ḿ": "m",
	"M̆": "M",
	"m̆": "m",
	"Ń": "N",
	"ń": "n",
	"Ņ": "N",
	"ņ": "n",
	"Ň": "N",
	"ň": "n",
	"ŉ": "n",
	"N̆": "N",
	"n̆": "n",
	"Ō": "O",
	"ō": "o",
	"Ŏ": "O",
	"ŏ": "o",
	"Ő": "O",
	"ő": "o",
	"Œ": "OE",
	"œ": "oe",
	"P̆": "P",
	"p̆": "p",
	"Ŕ": "R",
	"ŕ": "r",
	"Ŗ": "R",
	"ŗ": "r",
	"Ř": "R",
	"ř": "r",
	"R̆": "R",
	"r̆": "r",
	"Ȓ": "R",
	"ȓ": "r",
	"Ś": "S",
	"ś": "s",
	"Ŝ": "S",
	"ŝ": "s",
	"Ş": "S",
	"Ș": "S",
	"ș": "s",
	"ş": "s",
	"Š": "S",
	"š": "s",
	"Ţ": "T",
	"ţ": "t",
	"ț": "t",
	"Ț": "T",
	"Ť": "T",
	"ť": "t",
	"Ŧ": "T",
	"ŧ": "t",
	"T̆": "T",
	"t̆": "t",
	"Ũ": "U",
	"ũ": "u",
	"Ū": "U",
	"ū": "u",
	"Ŭ": "U",
	"ŭ": "u",
	"Ů": "U",
	"ů": "u",
	"Ű": "U",
	"ű": "u",
	"Ų": "U",
	"ų": "u",
	"Ȗ": "U",
	"ȗ": "u",
	"V̆": "V",
	"v̆": "v",
	"Ŵ": "W",
	"ŵ": "w",
	"Ẃ": "W",
	"ẃ": "w",
	"X̆": "X",
	"x̆": "x",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Y̆": "Y",
	"y̆": "y",
	"Ź": "Z",
	"ź": "z",
	"Ż": "Z",
	"ż": "z",
	"Ž": "Z",
	"ž": "z",
	"ſ": "s",
	"ƒ": "f",
	"Ơ": "O",
	"ơ": "o",
	"Ư": "U",
	"ư": "u",
	"Ǎ": "A",
	"ǎ": "a",
	"Ǐ": "I",
	"ǐ": "i",
	"Ǒ": "O",
	"ǒ": "o",
	"Ǔ": "U",
	"ǔ": "u",
	"Ǖ": "U",
	"ǖ": "u",
	"Ǘ": "U",
	"ǘ": "u",
	"Ǚ": "U",
	"ǚ": "u",
	"Ǜ": "U",
	"ǜ": "u",
	"Ứ": "U",
	"ứ": "u",
	"Ṹ": "U",
	"ṹ": "u",
	"Ǻ": "A",
	"ǻ": "a",
	"Ǽ": "AE",
	"ǽ": "ae",
	"Ǿ": "O",
	"ǿ": "o",
	"Þ": "TH",
	"þ": "th",
	"Ṕ": "P",
	"ṕ": "p",
	"Ṥ": "S",
	"ṥ": "s",
	"X́": "X",
	"x́": "x",
	"Ѓ": "Г",
	"ѓ": "г",
	"Ќ": "К",
	"ќ": "к",
	"A̋": "A",
	"a̋": "a",
	"E̋": "E",
	"e̋": "e",
	"I̋": "I",
	"i̋": "i",
	"Ǹ": "N",
	"ǹ": "n",
	"Ồ": "O",
	"ồ": "o",
	"Ṑ": "O",
	"ṑ": "o",
	"Ừ": "U",
	"ừ": "u",
	"Ẁ": "W",
	"ẁ": "w",
	"Ỳ": "Y",
	"ỳ": "y",
	"Ȁ": "A",
	"ȁ": "a",
	"Ȅ": "E",
	"ȅ": "e",
	"Ȉ": "I",
	"ȉ": "i",
	"Ȍ": "O",
	"ȍ": "o",
	"Ȑ": "R",
	"ȑ": "r",
	"Ȕ": "U",
	"ȕ": "u",
	"B̌": "B",
	"b̌": "b",
	"Č̣": "C",
	"č̣": "c",
	"Ê̌": "E",
	"ê̌": "e",
	"F̌": "F",
	"f̌": "f",
	"Ǧ": "G",
	"ǧ": "g",
	"Ȟ": "H",
	"ȟ": "h",
	"J̌": "J",
	"ǰ": "j",
	"Ǩ": "K",
	"ǩ": "k",
	"M̌": "M",
	"m̌": "m",
	"P̌": "P",
	"p̌": "p",
	"Q̌": "Q",
	"q̌": "q",
	"Ř̩": "R",
	"ř̩": "r",
	"Ṧ": "S",
	"ṧ": "s",
	"V̌": "V",
	"v̌": "v",
	"W̌": "W",
	"w̌": "w",
	"X̌": "X",
	"x̌": "x",
	"Y̌": "Y",
	"y̌": "y",
	"A̧": "A",
	"a̧": "a",
	"B̧": "B",
	"b̧": "b",
	"Ḑ": "D",
	"ḑ": "d",
	"Ȩ": "E",
	"ȩ": "e",
	"Ɛ̧": "E",
	"ɛ̧": "e",
	"Ḩ": "H",
	"ḩ": "h",
	"I̧": "I",
	"i̧": "i",
	"Ɨ̧": "I",
	"ɨ̧": "i",
	"M̧": "M",
	"m̧": "m",
	"O̧": "O",
	"o̧": "o",
	"Q̧": "Q",
	"q̧": "q",
	"U̧": "U",
	"u̧": "u",
	"X̧": "X",
	"x̧": "x",
	"Z̧": "Z",
	"z̧": "z",
};

var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');

var removeAccents = function(string) {	
	return string.replace(allAccents, function(match) {
		return characterMap[match];
	});
};

var hasAccents = function(string) {
	return !!string.match(firstAccent);
};

module.exports = removeAccents;
module.exports.has = hasAccents;
module.exports.remove = removeAccents;


/***/ }),

/***/ 9222:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8631:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Zo": () => (/* binding */ MDXProvider),
/* harmony export */   "ah": () => (/* binding */ useMDXComponents)
/* harmony export */ });
/* unused harmony exports MDXContext, withMDXComponents */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/**
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('mdx/types').MDXComponents} Components
 *
 * @typedef Props
 *   Configuration.
 * @property {Components} [components]
 *   Mapping of names for JSX components to React components.
 * @property {boolean} [disableParentContext=false]
 *   Turn off outer component context.
 * @property {ReactNode} [children]
 *   Children.
 *
 * @callback MergeComponents
 * @param {Components} currentComponents
 *   Current components from the context.
 * @returns {Components}
 *   Merged components.
 */



/**
 * @type {import('react').Context<Components>}
 * @deprecated
 *   This export is marked as a legacy feature.
 *   That means it’s no longer recommended for use as it might be removed
 *   in a future major release.
 *
 *   Please use `useMDXComponents` to get context based components and
 *   `MDXProvider` to set context based components instead.
 */
const MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({})

/**
 * @param {import('react').ComponentType<any>} Component
 * @deprecated
 *   This export is marked as a legacy feature.
 *   That means it’s no longer recommended for use as it might be removed
 *   in a future major release.
 *
 *   Please use `useMDXComponents` to get context based components instead.
 */
function withMDXComponents(Component) {
  return boundMDXComponent

  /**
   * @param {Record<string, unknown> & {components?: Components}} props
   * @returns {JSX.Element}
   */
  function boundMDXComponent(props) {
    const allComponents = useMDXComponents(props.components)
    return React.createElement(Component, {...props, allComponents})
  }
}

/**
 * Get current components from the MDX Context.
 *
 * @param {Components|MergeComponents} [components]
 *   Additional components to use or a function that takes the current
 *   components and filters/merges/changes them.
 * @returns {Components}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext)
  // Memoize to avoid unnecessary top-level context changes
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    // Custom merge via a function prop
    if (typeof components === 'function') {
      return components(contextComponents)
    }

    return {...contextComponents, ...components}
  }, [contextComponents, components])
}

/** @type {Components} */
const emptyObject = {}

/**
 * Provider for MDX context
 *
 * @param {Props} props
 * @returns {JSX.Element}
 */
function MDXProvider({components, children, disableParentContext}) {
  let allComponents = useMDXComponents(components)

  if (disableParentContext) {
    allComponents = components || emptyObject
  }

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    MDXContext.Provider,
    {value: allComponents},
    children
  )
}


/***/ })

};
;