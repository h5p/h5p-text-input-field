var H5P = H5P || {};

/**
 * Text Input Field module
 * @external {jQuery} $ H5P.jQuery
 */
H5P.TextInputField = (function ($) {
  // CSS Classes:
  var MAIN_CONTAINER = 'h5p-text-input-field';
  var INPUT_LABEL = 'h5p-text-input-field-label';
  var INPUT_FIELD = 'h5p-text-input-field-textfield';
  var CHAR_MESSAGE = 'h5p-text-input-field-message';

  var ariaId = 0;

  /**
   * Initialize module.
   * @param {Object} params Behavior settings
   * @param {Number} id Content identification
   * @returns {Object} TextInputField TextInputField instance
   */
  function TextInputField(params, id) {
    this.$ = $(this);
    this.id = id;

    // Set default behavior.
    this.params = $.extend({}, {
      taskDescription: 'Input field',
      placeholderText: '',
      inputFieldSize: '1',
      requiredField: false
    }, params);

    // Set the maximum length for the textarea
    this.maxTextLength = (typeof this.params.maximumLength === 'undefined') ? '' : parseInt(this.params.maximumLength, 10);

    ariaId++;
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  TextInputField.prototype.attach = function ($container) {
    var self = this;
    this.$inner = $container.addClass(MAIN_CONTAINER);

    this.$taskDescription = $('<div>', {
      id: ariaId,
      'class': INPUT_LABEL + (this.params.requiredField ? ' required' : ''),
      'html': self.params.taskDescription
    }).appendTo(self.$inner);

    this.$inputField = $('<textarea>', {
      'class': INPUT_FIELD,
      'rows': parseInt(self.params.inputFieldSize, 10),
      'maxlength': self.maxTextLength,
      'placeholder': self.params.placeholderText,
      'tabindex': '0',
      'aria-required': this.params.requiredField,
      'aria-labelledby': ariaId
    }).appendTo(self.$inner);

    if (self.maxTextLength !== '') {
      this.$spaceMessage = $('<div>', {
        'class': CHAR_MESSAGE
      }).appendTo(self.$inner);

      this.$inputField.on('change keyup paste', function() {
        self.$spaceMessage.html(
          self.params.remainingChars.replace(/@chars/g, self.computeRemainingChars()));
        });

        this.$inputField.trigger('change');
      }
  };

  /**
   * Returns true if input field is not required or non-empty
   * @returns {boolean} True if input field is filled or not required
   */
  TextInputField.prototype.isRequiredInputFilled = function () {
    if (!this.params.requiredField) {
      return true;
    }

    if (this.params.requiredField && this.$inputField.val().length) {
      return true;
    }

    return false;
  };

  /**
   * Retrieves the text input field
   * @returns {description:string, value:string} Returns input field
   */
  TextInputField.prototype.getInput = function () {
    // Remove trailing newlines
    return {
      description: this.params.taskDescription.replace(/^\s+|\s+$/g, '').replace(/(<p>|<\/p>)/img, ""),
      value: this.$inputField.val()
    };
  };

  /**
   * Compute the remaining number of characters
   * @returns {number} Returns number of characters left
   */
  TextInputField.prototype.computeRemainingChars = function() {
    return this.maxTextLength - this.$inputField.val().length;
  };

  return TextInputField;
}(H5P.jQuery));
