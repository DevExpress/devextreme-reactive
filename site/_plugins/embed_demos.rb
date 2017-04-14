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
        "<iframe class=\"embedded-demo\" scrolling=\"no\" src=\"#{path}\"></iframe>"
      }
    end
  end
end
