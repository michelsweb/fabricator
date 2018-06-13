import $ from 'jquery';
import plugin from '../factories/jquery-plugin';


const clickHandler = (e) => {
  // const self = e.data;
  e.preventDefault();
};


const Plugin = function Plugin(el, opt) {
  this.el = el;
  this.$el = $(el);
  this.opt = $.extend({
    text: '',
  }, opt);

  this.init();
};

// init handlers
Plugin.prototype.init = function init() {
  this.$el
    .on('click', this, clickHandler)
    .text(this.opt.text);
};

// updating text option
Plugin.prototype.update = function update(opt) {
  $.extend(this.opt, opt);
  this.$el.text(this.opt.text);
};

// destroy method
Plugin.prototype.destroy = function destroy() {
  this.$el
    .off('click', clickHandler)
    .removeData('plugin');
};

// custom method
Plugin.prototype.smartMove = function smartMove() {
  this.$el
    .toggleClass('smart-class');
};


plugin('plugin', Plugin);
