exports.id = 590;
exports.ids = [590];
exports.modules = {

/***/ 6530:
/***/ ((module) => {

// Exports
module.exports = {
	"cards": "style_cards__8_saI",
	"card": "style_card__ybhTU",
	"title": "style_title__DheUr"
};


/***/ }),

/***/ 4590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Card),
/* harmony export */   "o": () => (/* binding */ Cards)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5024);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6530);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_module_css__WEBPACK_IMPORTED_MODULE_3__);




function Card({ children , title , icon , image , arrow , demo , href , ...props }) {
    const animatedArrow = arrow ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("transition-transform duration-75", "group-hover:translate-x-[2px]"),
        children: "→"
    }) : null;
    if (image) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
            href: href,
            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card), "group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-current no-underline shadow shadow-gray-100 transition-all duration-200 dark:border-neutral-800 dark:shadow-none", "hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100 dark:hover:border-neutral-500 dark:hover:bg-gray-200 dark:hover:shadow-none"),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().title), "gap-2 p-4 text-gray-700", "hover:text-gray-900"),
                    children: [
                        icon,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "flex gap-1",
                            children: [
                                title,
                                animatedArrow
                            ]
                        })
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: href,
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().card), "group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-transparent text-current no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-800 dark:shadow-none", "hover:border-gray-300 hover:bg-slate-50 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:shadow-none"),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().title), "gap-2 p-4 text-gray-700 dark:text-neutral-200", "hover:text-gray-900 dark:hover:text-neutral-50"),
            children: [
                icon,
                title,
                animatedArrow
            ]
        })
    });
}
function Cards({ children , num , ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_style_module_css__WEBPACK_IMPORTED_MODULE_3___default().cards), "mt-4 gap-4"),
        ...props,
        style: {
            "--rows": num || 3,
            ...props.style
        },
        children: children
    });
}


/***/ })

};
;