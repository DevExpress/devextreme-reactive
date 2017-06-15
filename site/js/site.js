$(function () {
    function updateTemplateChooserText(chooser, text) {
      var toggleCaption = chooser.find('.dropdown-toggle .caption');
      toggleCaption.text(text);
    }

    function updateTemplateChoosers(text) {
      $('.template-chooser').each(function() {
        updateTemplateChooserText($(this), text);
      });
    }

    function urlWithActiveTemplates(url, templateName) {
      var matches = /(.+#\/)[^/]+(\/.*)/.exec(url);

      if (matches) {
        var demoPageUrl = matches[1];
        var demoLocalUrl = matches[2];

        return demoPageUrl + templateName + demoLocalUrl;
      }
      else {
        debugger
      }

      return url;
    }

    function updateDemos(templateName) {
      $('.embedded-demo').each(function() {
        var iframe = $(this);
        var url = iframe.contents().get(0).location.href;
        iframe.attr('src', urlWithActiveTemplates(url, templateName))
      });
    }

    $('.dropdown-menu').on('click', 'li a', function() {
      var link = $(this);
      var text = link.text();
      var templateName = link.data('value');

      updateTemplateChoosers(text);
      updateDemos(templateName);
      event.preventDefault();
   });
});
