import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import ini from 'highlight.js/lib/languages/ini';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import protobuf from 'highlight.js/lib/languages/protobuf';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('toml', ini);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('protobuf', protobuf);
hljs.registerLanguage('url', function() {
  return {
    case_insensitive: true,
    contains: [
        hljs.HASH_COMMENT_MODE,
        {
            className: "code", // (protocol: http) color #397300
            begin: /(https?|ftp|file)(?=(:\/\/))/,
        },
        {
            className: "meta hljs-emphasis", // (hostname: api.someservice.io) color #1f7199 italic
            begin: /(?<=((https?|ftp|file):\/\/))[^@:\/\?\n\r]+/,
        },
        {
            className: "comment", // (authority: @www.example.com) color #697070
            begin: /(?<=((https?|ftp|file):\/\/[^:\/@\n\r]+)@)[^:\/\n\r]+/,
        },
        {
            className: "tag hljs-emphasis", // (port: 8000) color #444a italic
            begin: /(?<=((https?|ftp|file):\/\/[^:\/\n\r]+):)[0-9]+/,
        },
        {
            className: "symbol", // (pathname: path1/path2/dothis) color #ab5656
            begin: /(?<=((https?|ftp|file):\/\/[^\/\n\r]+)\/)[^?\n\r]+/,
        },
        {
            className: "literal", // (attribute) color #695
            begin: /(?<=[?&])[^=?&\n\r]+/,
        },
        {
            className: "meta", // (value) color #1f7199
            begin: /(?<=\=)[^=?&\n\r]+/,
        }
    ],
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
    hljs.highlightElement(block);
  });
});
