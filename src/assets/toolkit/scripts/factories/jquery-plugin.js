import $ from 'jquery';

/**
 * Generate a jQuery plugin
 *
 * @param pluginName {!string} Plugin name
 * @param className {!Object} Class of the plugin
 * @param shortHand {boolean} Generate a shorthand as $.pluginName
 *
 * @example
 * import plugin from 'plugin';
 *
 * class MyPlugin {
 *   constructor(element, options) {
 *     // ...
 *   }
 * }
 *
 * MyPlugin.DEFAULTS = {};
 *
 * plugin('myPlugin', MyPlugin);
 */
export default function plugin(pluginName, className, shortHand = false) {

  const dataName = `__${pluginName}`;
  const old = $.fn[pluginName];

  $.fn[pluginName] = function (option) {
    return this.each(function () {
      const $this = $(this);
      let data = $this.data(dataName);
      const options = $.extend({}, className.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data(dataName, (data = new className(this, options)));
      }

      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  // - Short hand
  if (shortHand) {
    $[pluginName] = (options) => $({})[pluginName](options);
  }

  // - No conflict
  $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;

}
