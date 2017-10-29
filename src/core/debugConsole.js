'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debugConsole = exports.debugConsole = function () {
    function debugConsole() {
        _classCallCheck(this, debugConsole);

        this.masterElement = document.createElement('div');
        this.masterElement.classList.add("debugConsole");
        document.body.appendChild(this.masterElement);
    }

    _createClass(debugConsole, [{
        key: 'addNumber',
        value: function addNumber(title, value, callback) {
            var container = document.createElement('div');
            var label = document.createElement('label');
            var number = document.createElement('input');
            label.innerText = title;
            number.type = "number";
            number.value = value + "";
            number.addEventListener('change', function () {
                callback(parseFloat(number.value));
            });
            container.appendChild(label);
            container.appendChild(number);
            this.masterElement.appendChild(container);
        }
    }, {
        key: 'addCheckbox',
        value: function addCheckbox(title, value, callback) {
            var container = document.createElement('div');
            var label = document.createElement('label');
            var checkbox = document.createElement('input');
            label.innerText = title;
            checkbox.type = "checkbox";
            checkbox.checked = value;
            checkbox.addEventListener('change', function () {
                callback(checkbox.checked);
            });
            container.appendChild(label);
            container.appendChild(checkbox);
            this.masterElement.appendChild(container);
        }
    }]);

    return debugConsole;
}();
//# sourceMappingURL=debugConsole.js.map