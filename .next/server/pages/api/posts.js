"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/posts";
exports.ids = ["pages/api/posts"];
exports.modules = {

/***/ "(api)/./middlewares/auth-middleware.ts":
/*!****************************************!*\
  !*** ./middlewares/auth-middleware.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authMiddleware\": () => (/* binding */ authMiddleware)\n/* harmony export */ });\n// middleware.ts\nconst authMiddleware = async (req, res, next)=>{\n    // look for access token inside cookies\n    const token = req.cookies && req.cookies.token ? req.cookies.token.split(\" \")[0] : null;\n    if (!token) {\n        return res.status(401).json({\n            success: false,\n            message: \"Missing token\"\n        });\n    }\n    if (next) await next(req, res, undefined);\n    // Else, return\n    return res.status(200);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9taWRkbGV3YXJlcy9hdXRoLW1pZGRsZXdhcmUudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQVNBLGdCQUFnQjtBQUNULE1BQU1BLGlCQUE2QixPQUN4Q0MsS0FDQUMsS0FDQUMsT0FDRztJQUNILHVDQUF1QztJQUN2QyxNQUFNQyxRQUNKSCxJQUFJSSxPQUFPLElBQUlKLElBQUlJLE9BQU8sQ0FBQ0QsS0FBSyxHQUFHSCxJQUFJSSxPQUFPLENBQUNELEtBQUssQ0FBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSTtJQUMzRSxJQUFJLENBQUNGLE9BQU87UUFDVixPQUFPRixJQUFJSyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQzFCQyxTQUFTLEtBQUs7WUFDZEMsU0FBUztRQUNYO0lBQ0YsQ0FBQztJQUVELElBQUlQLE1BQU0sTUFBTUEsS0FBS0YsS0FBS0MsS0FBS1M7SUFFL0IsZUFBZTtJQUNmLE9BQU9ULElBQUlLLE1BQU0sQ0FBQztBQUNwQixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1qd3QtYXV0aC1ib2lsZXJwbGF0ZS8uL21pZGRsZXdhcmVzL2F1dGgtbWlkZGxld2FyZS50cz8yZDA5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xyXG5pbXBvcnQgeyBBcGlSZXNwb25zZSB9IGZyb20gJy4uL2xpYi90eXBlcy9hcGknXHJcbmltcG9ydCB7IFVzZXJTZXNzaW9uIH0gZnJvbSAnLi4vbGliL3R5cGVzL2F1dGgnXHJcbmltcG9ydCB7IE1pZGRsZXdhcmUgfSBmcm9tICcuLi9saWIvdHlwZXMvbWlkZGxld2FyZSdcclxuXHJcbmV4cG9ydCB0eXBlIE5leHRBcGlSZXF1ZXN0V2l0aFVzZXIgPSBOZXh0QXBpUmVxdWVzdCAmIHtcclxuICB1c2VyOiBVc2VyU2Vzc2lvblxyXG59XHJcblxyXG4vLyBtaWRkbGV3YXJlLnRzXHJcbmV4cG9ydCBjb25zdCBhdXRoTWlkZGxld2FyZTogTWlkZGxld2FyZSA9IGFzeW5jIDxUIGV4dGVuZHMgQXBpUmVzcG9uc2U8VD4+KFxyXG4gIHJlcTogTmV4dEFwaVJlcXVlc3RXaXRoVXNlcixcclxuICByZXM6IE5leHRBcGlSZXNwb25zZTxUPixcclxuICBuZXh0PzogTWlkZGxld2FyZVxyXG4pID0+IHtcclxuICAvLyBsb29rIGZvciBhY2Nlc3MgdG9rZW4gaW5zaWRlIGNvb2tpZXNcclxuICBjb25zdCB0b2tlbiA9XHJcbiAgICByZXEuY29va2llcyAmJiByZXEuY29va2llcy50b2tlbiA/IHJlcS5jb29raWVzLnRva2VuLnNwbGl0KCcgJylbMF0gOiBudWxsXHJcbiAgaWYgKCF0b2tlbikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6ICdNaXNzaW5nIHRva2VuJyxcclxuICAgIH0gYXMgVClcclxuICB9XHJcblxyXG4gIGlmIChuZXh0KSBhd2FpdCBuZXh0KHJlcSwgcmVzLCB1bmRlZmluZWQpXHJcblxyXG4gIC8vIEVsc2UsIHJldHVyblxyXG4gIHJldHVybiByZXMuc3RhdHVzKDIwMClcclxufSJdLCJuYW1lcyI6WyJhdXRoTWlkZGxld2FyZSIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImNvb2tpZXMiLCJzcGxpdCIsInN0YXR1cyIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./middlewares/auth-middleware.ts\n");

/***/ }),

/***/ "(api)/./middlewares/index.ts":
/*!******************************!*\
  !*** ./middlewares/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"withMiddlewares\": () => (/* binding */ withMiddlewares)\n/* harmony export */ });\nconst withMiddlewares = (...middlewares)=>{\n    // Create chain of middlewares\n    const chain = middlewares.reduceRight((next, middleware)=>(req, res)=>middleware(req, res, next), (_req, res)=>res.status(200).json({\n            success: true\n        }));\n    // Return chain of middlewares\n    return chain;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9taWRkbGV3YXJlcy9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBRU8sTUFBTUEsa0JBQWtCLENBQUMsR0FBR0MsY0FBMEM7SUFDM0UsOEJBQThCO0lBQzlCLE1BQU1DLFFBQVFELFlBQVlFLFdBQVcsQ0FDbkMsQ0FBQ0MsTUFBTUMsYUFBZSxDQUFDQyxLQUFLQyxNQUFRRixXQUFXQyxLQUFLQyxLQUFLSCxPQUN6RCxDQUFDSSxNQUFNRCxNQUFRQSxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFNBQVMsSUFBSTtRQUFDO0lBR3RELDhCQUE4QjtJQUM5QixPQUFPVDtBQUNULEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LWp3dC1hdXRoLWJvaWxlcnBsYXRlLy4vbWlkZGxld2FyZXMvaW5kZXgudHM/MWM1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNaWRkbGV3YXJlIH0gZnJvbSAnLi4vbGliL3R5cGVzL21pZGRsZXdhcmUnXHJcblxyXG5leHBvcnQgY29uc3Qgd2l0aE1pZGRsZXdhcmVzID0gKC4uLm1pZGRsZXdhcmVzOiBNaWRkbGV3YXJlW10pOiBNaWRkbGV3YXJlID0+IHtcclxuICAvLyBDcmVhdGUgY2hhaW4gb2YgbWlkZGxld2FyZXNcclxuICBjb25zdCBjaGFpbiA9IG1pZGRsZXdhcmVzLnJlZHVjZVJpZ2h0KFxyXG4gICAgKG5leHQsIG1pZGRsZXdhcmUpID0+IChyZXEsIHJlcykgPT4gbWlkZGxld2FyZShyZXEsIHJlcywgbmV4dCksXHJcbiAgICAoX3JlcSwgcmVzKSA9PiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSlcclxuICApXHJcblxyXG4gIC8vIFJldHVybiBjaGFpbiBvZiBtaWRkbGV3YXJlc1xyXG4gIHJldHVybiBjaGFpblxyXG59XHJcbiJdLCJuYW1lcyI6WyJ3aXRoTWlkZGxld2FyZXMiLCJtaWRkbGV3YXJlcyIsImNoYWluIiwicmVkdWNlUmlnaHQiLCJuZXh0IiwibWlkZGxld2FyZSIsInJlcSIsInJlcyIsIl9yZXEiLCJzdGF0dXMiLCJqc29uIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./middlewares/index.ts\n");

/***/ }),

/***/ "(api)/./pages/api/posts/index.ts":
/*!**********************************!*\
  !*** ./pages/api/posts/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../middlewares */ \"(api)/./middlewares/index.ts\");\n/* harmony import */ var _middlewares_auth_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../middlewares/auth-middleware */ \"(api)/./middlewares/auth-middleware.ts\");\n\n\nconst getCurrentUserRoute = async (req, res)=>{\n    // Fetch list of posts from database\n    const posts = [];\n    // Return list of posts\n    res.status(200).json({\n        success: true,\n        data: {\n            posts\n        }\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewares__WEBPACK_IMPORTED_MODULE_0__.withMiddlewares)(_middlewares_auth_middleware__WEBPACK_IMPORTED_MODULE_1__.authMiddleware, getCurrentUserRoute));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcG9zdHMvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR3NEO0FBSVQ7QUFVN0MsTUFBTUUsc0JBQXNCLE9BQzFCQyxLQUNBQyxNQUNHO0lBQ0gsb0NBQW9DO0lBQ3BDLE1BQU1DLFFBQVEsRUFBRTtJQUVoQix1QkFBdUI7SUFDdkJELElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFDbkJDLFNBQVMsSUFBSTtRQUNiQyxNQUFNO1lBQ0pKO1FBQ0Y7SUFDRjtBQUNGO0FBRUEsaUVBQWVMLDZEQUFlQSxDQUFDQyx3RUFBY0EsRUFBRUMsb0JBQW9CQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1qd3QtYXV0aC1ib2lsZXJwbGF0ZS8uL3BhZ2VzL2FwaS9wb3N0cy9pbmRleC50cz9kMjQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvc3QsIFZvdGUgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCdcclxuaW1wb3J0IHsgQXBpUmVzcG9uc2UgfSBmcm9tICcuLi8uLi8uLi9saWIvdHlwZXMvYXBpJ1xyXG5pbXBvcnQgeyB3aXRoTWlkZGxld2FyZXMgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlcydcclxuaW1wb3J0IHtcclxuICBhdXRoTWlkZGxld2FyZSxcclxuICBOZXh0QXBpUmVxdWVzdFdpdGhVc2VyLFxyXG59IGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmVzL2F1dGgtbWlkZGxld2FyZSdcclxuXHJcbmV4cG9ydCB0eXBlIFBvc3RXaXRoVm90ZSA9IFBvc3QgJiB7XHJcbiAgdm90ZXM6IFZvdGVbXVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQb3N0c0FwaVJlc3BvbnNlID0gQXBpUmVzcG9uc2U8e1xyXG4gIHBvc3RzOiBQb3N0V2l0aFZvdGVbXVxyXG59PlxyXG5cclxuY29uc3QgZ2V0Q3VycmVudFVzZXJSb3V0ZSA9IGFzeW5jIChcclxuICByZXE6IE5leHRBcGlSZXF1ZXN0V2l0aFVzZXIsXHJcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8UG9zdHNBcGlSZXNwb25zZT5cclxuKSA9PiB7XHJcbiAgLy8gRmV0Y2ggbGlzdCBvZiBwb3N0cyBmcm9tIGRhdGFiYXNlXHJcbiAgY29uc3QgcG9zdHMgPSBbXTtcclxuXHJcbiAgLy8gUmV0dXJuIGxpc3Qgb2YgcG9zdHNcclxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBwb3N0cyxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aE1pZGRsZXdhcmVzKGF1dGhNaWRkbGV3YXJlLCBnZXRDdXJyZW50VXNlclJvdXRlKVxyXG4iXSwibmFtZXMiOlsid2l0aE1pZGRsZXdhcmVzIiwiYXV0aE1pZGRsZXdhcmUiLCJnZXRDdXJyZW50VXNlclJvdXRlIiwicmVxIiwicmVzIiwicG9zdHMiLCJzdGF0dXMiLCJqc29uIiwic3VjY2VzcyIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/posts/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/posts/index.ts"));
module.exports = __webpack_exports__;

})();