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
      inputFieldSize: '1'
    }, params);
  }

  /**
   * Attach function called by H5P framework to insert H5P content into page.
   *
   * @param {jQuery} $container The container which will be appended to.
   */
  TextInputField.prototype.attach = function ($container) {
    var self = this;
    this.$inner = $container.addClass(MAIN_CONTAINER);

    $('<div>', {
      'class': INPUT_LABEL,
      'html': self.params.taskDescription
    }).appendTo(self.$inner);

    this.$inputField = $('<textarea>', {
      'class': INPUT_FIELD,
      'rows': parseInt(self.params.inputFieldSize, 10),
      'placeholder': self.params.placeholderText,
      'tabindex': '1'
    }).appendTo(self.$inner);
  };


  /**
   * Retrieves the text input field
   * @returns {String} * Returns input field
   */
  TextInputField.prototype.getInput = function () {
    return this.$inputField.val();
  };

  return TextInputField;
}(H5P.jQuery));
