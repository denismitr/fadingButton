/**
 * Developed by Denis Mitrofanov under MIT License in 2016
 *
 * Version 1.0
 *
 * @type {{isTrue, equals, hasProperty, isGreaterThan, isFunction, isArray, isObject, isUndefined, isString}}
 */

var assert = (function(LOGGING) {

    var _assertCount = 0;

    function isTrue(expression, message) {

        message = message || "isTrue";

        _assertCount++;

        return _log(!! expression, message);
    }


    function equals(a, b, message, strict) {

        message = message || "AssertEquals";
        strict = strict || false;

        _assertCount++;

        if ( (strict && a !== b) || ( ! strict && a != b ) ) {

                return _log(false, message, 'Failed asserting that ' + a + ' = ' + b);

        }

        return _log(true, message);

    }


    function isNumber(value, message) {

        message = message || "AssertIsNumber";
        _assertCount++;

        if ( ! isNaN(value)) {
            return _log(true, message);
        }

       return _log(false, message, 'Failed asserting that ' + value + ' is a number');
    }


   function hasProperty(obj, prop, message, strict) {

        message = message || "AssertHasPropery";
        strict = strict || false;

        _assertCount++;

        if (strict) {
            if ( ! obj[prop] || ( obj[prop] && ! obj.hasOwnProperty(prop) )) {
               return _log(false, message, 'Failed asserting that ' + obj + ' has own property of ' + prop);
            }
        } else {
            if ( !obj[prop] ) {
               return log(false, message, 'Failed asserting that ' + obj + ' has property of ' + prop);
            }
        }

        return _log(true, message);
   }


    function greaterThan(number, value, message) {

        message = message || "AssertGreaterThan";
        _assertCount++;

        if (value > number) {
            return _log(true, message);
        }

       return _log(false, message, 'Failed asserting that ' + value + ' is greater than ' + number);
    }


    function lessThan(number, value, message) {

        message = message || "AssertLessThan";
        _assertCount++;

        if (value < number) {
            return _log(true, message);
        }

       return _log(false, message, 'Failed asserting that ' + value + ' is less than ' + number);
    }


    function isFunction(fn, message) {

        message = message || "AssertIsFunction";
        _assertCount++;

        if ( Object.prototype.toString.call(fn) !== "[object Fuction]") {
            return _log(false, message, "Failed asserting that " + fn + " is a function!");
        }

        return _log(true, message);
    }


    function isArray(arr, message) {

        message = message || "AssertIsArray";
        _assertCount++;

        if ( Object.prototype.toString.call(arr) !== "[object Array]") {
            return _log(false, message, "Failed asserting that " + arr + " is an Array!");
        }

        return _log(true, message);
    }


    function isObject(obj, message) {

        message = message || "AssertIsArray";
        _assertCount++;

        if ( Object.prototype.toString.call(obj) !== "[object Object]") {
            return _log(false, message, "Failed asserting that " + obj + " is an Object!");
        }

        return _log(true, message);
    }

    function isJQueryObject(obj, message) {

        message = message || "AssertIsArray";
        _assertCount++;

        if ( ! obj instanceof jQuery) {
            return _log(false, message, "Failed asserting that " + obj + " is an Object!");
        }

        return _log(true, message);
    }

    function isString(str, message) {

        message = message || "AssertIsString";
        _assertCount++;

        if ( Object.prototype.toString.call(str) !== "[object String]") {
            return _log(false, message, "Failed asserting that " + str + " is a String!");
        }

        return _log(true, message);
    }


    function isUndefined(variable, message) {

        message = message || "AssertIsUndefined";
        _assertCount++;

        if (variable !== undefined) {
            return _log(false, message, "Failed asserting that " + variable + " is undefined");
        }

        return _log(true, message);
    }


    function _log(passed, message, explanation) {

        if (LOGGING) {

            var conclusion = passed ? 'OK!' : '!!!FAILURE!!!';

            explanation = explanation || '';

            console.log(_assertCount + '. ' + message + ': ' + conclusion + ' ' + explanation);

        }

        return passed;
    }


    return {
        isTrue: isTrue,
        equals: equals,
        hasProperty: hasProperty,
        greaterThan: greaterThan,
        lessThan: lessThan,
        isFunction: isFunction,
        isNumber: isNumber,
        isJQueryObject: isJQueryObject,
        isArray: isArray,
        isObject: isObject,
        isUndefined: isUndefined,
        isString: isString
    };

}(window.LOGGING || true));
