module Jekyll
  class EmbedDemos < Converter
    safe true
    priority :high

    def matches(ext)
      ext =~ /^\.md$/i
    end

    def output_ext(ext)
      ".md"
    end

    def convert(content)
      content.gsub(/\[DEMO\]\(([^\s]*)\)/) { | match |
        path = $1.gsub(/\/demos\//, '/embedded-demo/')
        "<p>
          <div class=\"dropdown template-chooser\">
            <a class=\"dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\">
              <span class=\"caption\">Bootstrap 3</span>
              <span class=\"caret\"></span>
            </a>
            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">
              <li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" data-value=\"bootstrap3\">Bootstrap 3</a></li>
              <li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" data-value=\"material-ui\">Material UI</a></li>
            </ul>
          </div>
          <iframe class=\"embedded-demo\" scrolling=\"no\" src=\"#{path}\"></iframe>
        </p>"
      }
    end
  end
end
