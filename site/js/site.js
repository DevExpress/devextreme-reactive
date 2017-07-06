(function () {
  var ACTIVE_TEMPLATES_KEY = 'ACTIVE_TEMPLATES';

  function saveActiveTemplatesName(name) {
    if (localStorage) {
      localStorage.setItem(ACTIVE_TEMPLATES_KEY, name);
    }
  }

  function getActiveTemplatesName() {
    if (localStorage) {
      return localStorage.getItem(ACTIVE_TEMPLATES_KEY);
    }
  }

  function setDemoTemplates(root, activeItem, save) {
    var chooser = root.children('.template-chooser');
    var iframe = root.children('.embedded-demo');
    var sourceLink = root.children('.source-code-link');

    if(chooser.length) {
      chooser.find('.caption').text(activeItem.title);
    }
    iframe.attr('src', activeItem.url);
    iFrameResize({ warningTimeout: 0 }, iframe[0]);
    sourceLink.attr('href', activeItem.demoSrc);
    if (save) {
      saveActiveTemplatesName(activeItem.templatesName);
    }
  }

  function createEmbeddedDemo(root, items) {
    var activeTemplatesName = getActiveTemplatesName();
    var iframe = $('<iframe class="embedded-demo" scrolling="no">').appendTo(root);
    var sourceLink = $('<a class="source-code-link" href="#">Source Code</a>').appendTo(root);

    if (items.length === 1) {
      setDemoTemplates(root, items[0]);
    }
    else {
      var chooser = $(`
        <div class="dropdown template-chooser">
          <a class="dropdown-toggle" type="button" data-toggle="dropdown">
            <span class="caption"></span>
            <span class="caret"></span>
          </a>
        </div>
      `).insertBefore(iframe);

      var menu = $('<ul class="dropdown-menu"></ul>').appendTo(chooser);
      var activeItem = items[0];

      items.forEach(function(item) {
        var link = $('<a tabindex="-1"/>').appendTo(menu);

        link.text(item.title);
        link.wrap('<li>');
        link.on('click', function() {
          setDemoTemplates(root, item, true);
          event.preventDefault();
        });

        if (item.templatesName === activeTemplatesName) {
          activeItem = item;
        }
      });

      setDemoTemplates(root, activeItem);
    }
  }

  function initEmbeddedDemos() {
    $('.embedded-demo-root').each(function() {
      var root = $(this).addClass('clearfix');
      var items = JSON.parse(root.children('script').text());
      createEmbeddedDemo(root, items);
    });
  }

  $(function () {
      initEmbeddedDemos();
  });

})();
