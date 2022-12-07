"use strict";
(() => {
var exports = {};
exports.id = 885;
exports.ids = [885];
exports.modules = {

/***/ 9997:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stars": () => (/* binding */ Stars),
/* harmony export */   "default": () => (/* reexport safe */ nextra_theme_docs__WEBPACK_IMPORTED_MODULE_6__.ZP),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nextra_ssg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2208);
/* harmony import */ var _Users_thor3_Documents_nextra_docs2_docs_theme_config_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1540);
/* harmony import */ var nextra_theme_docs_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(599);
/* harmony import */ var nextra_theme_docs_style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nextra_theme_docs_style_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8631);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7113);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nextra_theme_docs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1314);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([nextra_ssg__WEBPACK_IMPORTED_MODULE_1__]);
nextra_ssg__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const __nextra_pageOpts__ = {
    "filePath": "pages/docs/guide/ssg.mdx",
    "route": "/docs/guide/ssg",
    "frontMatter": {},
    "pageMap": [
        {
            "kind": "Meta",
            "data": {
                "index": {
                    "title": "Nextra",
                    "type": "page",
                    "display": "hidden",
                    "theme": {
                        "layout": "raw"
                    }
                },
                "docs": {
                    "title": "Documentation",
                    "type": "page"
                },
                "showcase": {
                    "title": "Showcase",
                    "type": "page",
                    "theme": {
                        "typesetting": "article",
                        "layout": "full"
                    }
                },
                "about": {
                    "title": "About",
                    "type": "page",
                    "theme": {
                        "typesetting": "article"
                    }
                }
            }
        },
        {
            "kind": "MdxPage",
            "name": "about",
            "route": "/about"
        },
        {
            "kind": "Folder",
            "name": "docs",
            "route": "/docs",
            "children": [
                {
                    "kind": "Meta",
                    "data": {
                        "index": "Introduction",
                        "guide": "Guide",
                        "-- Themes --": {
                            "type": "separator",
                            "title": "Themes"
                        },
                        "docs-theme": "Docs Theme",
                        "blog-theme": "Blog Theme",
                        "custom-theme": "Custom Theme",
                        "-- About --": {
                            "type": "separator",
                            "title": "More"
                        },
                        "about link": {
                            "title": "About Nextra",
                            "href": "/about"
                        },
                        "Next.js link": {
                            "title": "Next.js Docs ↗",
                            "href": "https://nextjs.org?utm_source=nextra.site&utm_medium=referral&utm_campaign=sidebar",
                            "newWindow": true
                        }
                    }
                },
                {
                    "kind": "Folder",
                    "name": "blog-theme",
                    "route": "/docs/blog-theme",
                    "children": [
                        {
                            "kind": "Meta",
                            "data": {
                                "start": "Get Started"
                            }
                        },
                        {
                            "kind": "MdxPage",
                            "name": "start",
                            "route": "/docs/blog-theme/start"
                        }
                    ]
                },
                {
                    "kind": "MdxPage",
                    "name": "blog-theme",
                    "route": "/docs/blog-theme"
                },
                {
                    "kind": "MdxPage",
                    "name": "custom-theme",
                    "route": "/docs/custom-theme"
                },
                {
                    "kind": "Folder",
                    "name": "docs-theme",
                    "route": "/docs/docs-theme",
                    "children": [
                        {
                            "kind": "Meta",
                            "data": {
                                "start": "Get Started",
                                "page-configuration": {
                                    "title": "Page Configuration"
                                },
                                "theme-configuration": "Theme Configuration",
                                "built-ins": "Built-ins"
                            }
                        },
                        {
                            "kind": "Folder",
                            "name": "built-ins",
                            "route": "/docs/docs-theme/built-ins",
                            "children": [
                                {
                                    "kind": "MdxPage",
                                    "name": "callout",
                                    "route": "/docs/docs-theme/built-ins/callout"
                                },
                                {
                                    "kind": "MdxPage",
                                    "name": "tabs",
                                    "route": "/docs/docs-theme/built-ins/tabs"
                                },
                                {
                                    "kind": "Meta",
                                    "data": {
                                        "callout": "Callout",
                                        "tabs": "Tabs"
                                    }
                                }
                            ]
                        },
                        {
                            "kind": "MdxPage",
                            "name": "built-ins",
                            "route": "/docs/docs-theme/built-ins"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "page-configuration",
                            "route": "/docs/docs-theme/page-configuration"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "start",
                            "route": "/docs/docs-theme/start"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "theme-configuration",
                            "route": "/docs/docs-theme/theme-configuration"
                        }
                    ]
                },
                {
                    "kind": "MdxPage",
                    "name": "docs-theme",
                    "route": "/docs/docs-theme"
                },
                {
                    "kind": "Folder",
                    "name": "guide",
                    "route": "/docs/guide",
                    "children": [
                        {
                            "kind": "Meta",
                            "data": {
                                "organize-files": "Organize Files",
                                "markdown": "Markdown",
                                "syntax-highlighting": "Syntax Highlighting",
                                "ssg": "Next.js SSG",
                                "i18n": "Next.js I18n",
                                "image": "Next.js Image",
                                "link": "Next.js Link",
                                "typescript": "TypeScript",
                                "advanced": "Advanced"
                            }
                        },
                        {
                            "kind": "Folder",
                            "name": "advanced",
                            "route": "/docs/guide/advanced",
                            "children": [
                                {
                                    "kind": "Meta",
                                    "data": {
                                        "table": "Rendering Tables",
                                        "remote": "Remote Content"
                                    }
                                },
                                {
                                    "kind": "MdxPage",
                                    "name": "remote",
                                    "route": "/docs/guide/advanced/remote"
                                },
                                {
                                    "kind": "MdxPage",
                                    "name": "table",
                                    "route": "/docs/guide/advanced/table"
                                }
                            ]
                        },
                        {
                            "kind": "MdxPage",
                            "name": "advanced",
                            "route": "/docs/guide/advanced"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "i18n",
                            "route": "/docs/guide/i18n"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "image",
                            "route": "/docs/guide/image"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "link",
                            "route": "/docs/guide/link"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "markdown",
                            "route": "/docs/guide/markdown"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "organize-files",
                            "route": "/docs/guide/organize-files"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "ssg",
                            "route": "/docs/guide/ssg"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "syntax-highlighting",
                            "route": "/docs/guide/syntax-highlighting"
                        },
                        {
                            "kind": "MdxPage",
                            "name": "typescript",
                            "route": "/docs/guide/typescript"
                        }
                    ]
                },
                {
                    "kind": "MdxPage",
                    "name": "guide",
                    "route": "/docs/guide"
                },
                {
                    "kind": "MdxPage",
                    "name": "index",
                    "route": "/docs"
                }
            ]
        },
        {
            "kind": "MdxPage",
            "name": "index",
            "route": "/",
            "frontMatter": {
                "title": "Nextra – Next.js Static Site Generator"
            }
        },
        {
            "kind": "MdxPage",
            "name": "showcase",
            "route": "/showcase"
        }
    ],
    "headings": [
        {
            "type": "heading",
            "depth": 1,
            "children": [
                {
                    "type": "text",
                    "value": "Next.js SSG",
                    "position": {
                        "start": {
                            "line": 1,
                            "column": 3,
                            "offset": 2
                        },
                        "end": {
                            "line": 1,
                            "column": 14,
                            "offset": 13
                        }
                    }
                }
            ],
            "position": {
                "start": {
                    "line": 1,
                    "column": 1,
                    "offset": 0
                },
                "end": {
                    "line": 1,
                    "column": 14,
                    "offset": 13
                }
            },
            "value": "Next.js SSG"
        }
    ],
    "timestamp": 1661103253000,
    "flexsearch": {
        "codeblocks": false
    }
};
globalThis.__nextra_internal__ = {
    pageMap: __nextra_pageOpts__.pageMap,
    route: __nextra_pageOpts__.route
};
/*@jsxRuntime automatic @jsxImportSource react*/ // We add an `ssg` field to the page props,
// which will be provided to the Nextra `useSSG` hook.
// The page will be considered as stale and regenerated every 60 seconds.
// Get the data from SSG, and render it as a component.

const __nextra_title__ = "Next.js SSG";


const getStaticProps = ({ params  })=>{
    return fetch(`https://api.github.com/repos/shuding/nextra`).then((res)=>res.json()).then((repo)=>({
            props: {
                // We add an `ssg` field to the page props,
                // which will be provided to the Nextra `useSSG` hook.
                ssg: {
                    stars: repo.stargazers_count
                }
            },
            // The page will be considered as stale and regenerated every 60 seconds.
            revalidate: 60
        }));
};
const Stars = ()=>{
    const _components = Object.assign({
        strong: "strong"
    }, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__/* .useMDXComponents */ .ah)());
    // Get the data from SSG, and render it as a component.
    const { stars  } = (0,nextra_ssg__WEBPACK_IMPORTED_MODULE_1__.useSSG)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.strong, {
        children: stars
    });
};
function _createMdxContent(props) {
    const _components = Object.assign({
        h1: "h1",
        p: "p",
        a: "a",
        code: "code",
        hr: "hr",
        div: "div",
        pre: "pre",
        span: "span"
    }, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__/* .useMDXComponents */ .ah)(), props.components);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.h1, {
                children: "Next.js SSG"
            }),
            "\n",
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                children: [
                    "With Next.js, you can pre-render your page using ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.a, {
                        href: "https://nextjs.org/docs/basic-features/pages#static-generation-recommended",
                        children: "Static Generation (SSG)"
                    }),
                    ". Your pages will be generated at build time and statically served to visitors. It can also be cached by a CDN to maximize the performance."
                ]
            }),
            "\n",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "This is supported by Nextra too. Here's an example:"
            }),
            "\n",
            "\n",
            "\n",
            "\n",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "p-4 border border-gray-200 dark:border-gray-900 rounded mt-6",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                    children: [
                        "Nextra has ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Stars, {}),
                        " stars on GitHub!"
                    ]
                })
            }),
            "\n",
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {
                children: [
                    "The number above was generated at build time via ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.code, {
                        children: "getStaticProps"
                    }),
                    ". With ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.a, {
                        href: "https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration",
                        children: "Incremental Static Regeneration"
                    }),
                    " enabled, it will be kept up to date."
                ]
            }),
            "\n",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.hr, {}),
            "\n",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.p, {
                children: "Here's the MDX code for the example above:"
            }),
            "\n",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.div, {
                "data-rehype-pretty-code-fragment": "",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.pre, {
                    value: "\"import { useSSG } from 'nextra/ssg'\\n\\nexport const getStaticProps = ({ params }) => {\\n return fetch(`https://api.github.com/repos/shuding/nextra`)\\n .then(res => res.json())\\n .then(repo => ({\\n props: {\\n // We add an `ssg` field to the page props,\\n // which will be provided to the Nextra `useSSG` hook.\\n ssg: {\\n stars: repo.stargazers_count\\n }\\n },\\n // The page will be considered as stale and regenerated every 60 seconds.\\n revalidate: 60\\n }))\\n}\\n\\nexport const Stars = () => {\\n // Get the data from SSG, and render it as a component.\\n const { stars } = useSSG()\\n return <strong>{stars}</strong>\\n}\\n\\nNextra has <Stars /> stars on GitHub!\\n\"",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.code, {
                        "data-language": "mdx",
                        "data-theme": "default",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "import"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " { useSSG } "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "from"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "'nextra/ssg'"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: " "
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "export"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "const"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "getStaticProps"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "="
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " ({ params }) "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "=>"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " {"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "  "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "return"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "fetch"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "("
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "`https://api.github.com/repos/shuding/nextra`"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: ")"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "    "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: ".then"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "(res "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "=>"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: "res"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: ".json"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "())"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "    "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: ".then"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "(repo "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "=>"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " ({"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "      props"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " {"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "        "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "// We add an `ssg` field to the page props,"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "        "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "// which will be provided to the Nextra `useSSG` hook."
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "        ssg"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " {"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "          stars"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: "repo"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: ".stargazers_count"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                    style: {
                                        color: "var(--shiki-color-text)"
                                    },
                                    children: "        }"
                                })
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "      }"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "      "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "// The page will be considered as stale and regenerated every 60 seconds."
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "      revalidate"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: "60"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                    style: {
                                        color: "var(--shiki-color-text)"
                                    },
                                    children: "    }))"
                                })
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                    style: {
                                        color: "var(--shiki-color-text)"
                                    },
                                    children: "}"
                                })
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: " "
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "export"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "const"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "Stars"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "="
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " () "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "=>"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " {"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "  "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "// Get the data from SSG, and render it as a component."
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "  "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "const"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " { "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: "stars"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " } "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "="
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "useSSG"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "()"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "  "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "return"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " <"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "strong"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: ">{stars}</"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "strong"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: ">"
                                    })
                                ]
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                    style: {
                                        color: "var(--shiki-color-text)"
                                    },
                                    children: "}"
                                })
                            }),
                            "\n",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                className: "line",
                                children: " "
                            }),
                            "\n",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "Nextra has "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "<"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: "Stars "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "/>"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-color-text)"
                                        },
                                        children: " stars on GitHub"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "!"
                                    })
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
function MDXContent(props = {}) {
    const { wrapper: MDXLayout  } = Object.assign({}, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_5__/* .useMDXComponents */ .ah)(), props.components);
    return MDXLayout ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MDXLayout, {
        ...props,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_createMdxContent, {
            ...props
        })
    }) : _createMdxContent(props);
}
__nextra_pageOpts__.title =  false || typeof __nextra_title__ === "string" && __nextra_title__ || "Next.js SSG";
const Content = (props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(nextra_ssg__WEBPACK_IMPORTED_MODULE_1__.SSGContext.Provider, {
        value: props,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MDXContent, {})
    });
globalThis.__nextra_pageContext__ ||= Object.create(null);
// Make sure the same component is always returned so Next.js will render the
// stable layout. We then put the actual content into a global store and use
// the route to identify it.
globalThis.__nextra_pageContext__["/docs/guide/ssg"] = {
    Content,
    pageOpts: __nextra_pageOpts__,
    themeConfig: _Users_thor3_Documents_nextra_docs2_docs_theme_config_tsx__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8103:
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9816:
/***/ ((module) => {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ 2208:
/***/ ((module) => {

module.exports = import("nextra/ssg");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [67,856,540], () => (__webpack_exec__(9997)));
module.exports = __webpack_exports__;

})();