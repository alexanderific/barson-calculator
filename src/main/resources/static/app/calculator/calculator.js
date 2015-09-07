/**
 * Primary calculator engine.
 * - controls the user input from the calculator view
 * - interprets valid inputs
 * - performs applicable calculations
 * - updates view accordingly
 *
 * @author Alex Barson
 */
(function () {
    'use strict';

    angular
        .module('barson.calculator')
        .controller('Calculator', Calculator);

    /**
     * Calculator controller.
     */
    function Calculator() {
        var calc = this;

        /* ------------- calculator properties -------------- */

        calc.inputWindow = "";
        calc.history = "";
        calc.midOperation = false;
        calc.newOperation = false;
        calc.operationCompleted = false;
        calc.leftOperand = 0;
        calc.rightOperand = 0;
        calc.currentOperation = null;

        calc.operands = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        calc.operators = ["/", "-", "*", "+"];
        calc.specialCharacters = ["=", "C", ".", "N", "B"];


        /* ------------- public controller functions -------------- */

        /**
         * event handler for buttons on screen.
         * @param $event the press event.
         */
        calc.press = function ($event) {
            perform($event.target.value);
        };

        /**
         * event handler for keying data.
         * @param $event the keyed event.
         */
        calc.key = function ($event) {
            var key = $event.which || $event.keyCode;
            $event.preventDefault();
            var input = "";

            if (key === 13) {
                input = "=";
            } else {
                input = String.fromCharCode(key);
            }

            if (validate(input)) {
                perform(input);
            }

        };

        /**
         * Special handler for handling del key input since onkeypress events do not fire for deletes
         * ...but onkeypress makes every other event easier to handle.
         * @param $event the delete key, or else.
         */
        calc.delete = function ($event) {
            var key = $event.which || $event.keyCode;

            if (key === 46) {
                perform("C");
            }
        };

        /**
         * Prevents 'accidental' pasting of input.
         * Don't want those sneaky QAs thinking they can break this by paste injection...
         * :)
         * @param $event the paste event.
         */
        calc.preventPaste = function ($event) {
            $event.preventDefault();
        };


        /* ------------- Internal functions -------------- */

        /**
         * validates incoming input.
         * @param input the input value.
         * @returns {boolean} true if input is an allowed calcular input value, otherwise false.
         */
        function validate(input) {
            return calc.operands.indexOf(input) > -1
                || calc.operators.indexOf(input) > -1
                || calc.specialCharacters.indexOf(input) > -1
        }

        /**
         * performs tasks based on user input values.
         * @param input the input value.
         */
        function perform(input) {
            if (calc.operands.indexOf(input) > -1) {
                handleOperands(input);
            } else if (calc.operators.indexOf(input) > -1) {
                handleOperators(input);
            } else if (calc.specialCharacters.indexOf(input) > -1) {
                handleSpecials(input);
            }
        }

        /**
         * evaluates an expression based on available data.
         */
        function evaluate() {
            switch (calc.currentOperation) {
                case "/":
                    calc.leftOperand = calc.leftOperand / calc.rightOperand;
                    break;
                case "*":
                    calc.leftOperand = calc.leftOperand * calc.rightOperand;
                    break;
                case "+":
                    calc.leftOperand = calc.leftOperand + calc.rightOperand;
                    break;
                case "-":
                    calc.leftOperand = calc.leftOperand - calc.rightOperand;
                    break;
            }

        }

        /**
         * handles operand input.
         * @param input an operand value.
         */
        function handleOperands(input) {
            if (calc.newOperation || calc.operationCompleted) {
                calc.inputWindow = input;
                calc.rightOperand = parseFloat(calc.inputWindow);
                calc.newOperation = false;
                calc.operationCompleted = false;

            } else if (calc.midOperation) {
                calc.inputWindow += input;
                calc.rightOperand = parseFloat(calc.inputWindow);
            } else {
                calc.inputWindow += input;
                calc.leftOperand = parseFloat(calc.inputWindow);
            }
        }

        /**
         * handles operator input.
         * @param input an operator value.
         */
        function handleOperators(input) {
            if (calc.midOperation) {
                evaluate();
                calc.inputWindow = calc.leftOperand;
            }
            calc.history += " " + calc.inputWindow + " " + input;

            calc.newOperation = true;
            calc.midOperation = true;
            calc.currentOperation = input;
        }

        /**
         * handles special characters denoting unique functionality.
         * @param input a special input.
         */
        function handleSpecials(input) {
            switch (input) {
                case ".":
                    if (calc.inputWindow.slice(-1) != "." && calc.inputWindow.indexOf(".") === -1) {
                        calc.inputWindow += ".";
                    }
                    break;
                case "C":
                    clear();
                    break;
                case "N":
                    reverseSign();
                    break;
                case "B":
                    backspace();
                    break;
                case "=":
                    evaluate();
                    calc.inputWindow = calc.leftOperand + "";
                    calc.history = "";
                    calc.midOperation = false;
                    calc.operationCompleted = true;
                    break;
            }
        }

        /**
         * Removes the last character entered.
         */
        function backspace() {
            calc.inputWindow = calc.inputWindow.slice(0, -1);
            if (calc.midOperation) {
                calc.rightOperand = parseFloat(calc.inputWindow);
            } else {
                calc.leftOperand = parseFloat(calc.inputWindow);
            }
        }

        /**
         * Reverses the sign of the current input value.
         */
        function reverseSign() {
            if (calc.inputWindow.indexOf("-") === -1) {
                calc.inputWindow = "-" + calc.inputWindow;

                if (calc.midOperation) {
                    calc.rightOperand = parseFloat(calc.inputWindow);
                } else {
                    calc.leftOperand = parseFloat(calc.inputWindow);
                }

            } else {
                calc.inputWindow = calc.inputWindow.replace("-", "");
            }
        }

        /**
         * resets the calculator's state.
         */
        function clear() {
            calc.inputWindow = "";
            calc.history = "";
            calc.midOperation = false;
            calc.leftOperand = 0;
            calc.rightOperand = 0;
            calc.currentOperation = null;
            calc.operationCompleted = false;
        }

    }

})();