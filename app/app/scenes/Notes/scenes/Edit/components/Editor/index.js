import React from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/monokai';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import { languages } from '../../constants';

languages.forEach((language) => import(`brace/snippets/${language}`));

export default function Editor({ input: { onChange, value }, language, ...rest }) {
  return (
    <AceEditor
      width="100%"
      height="100%"
      value={value}
      onChange={onChange}
      mode={language}
      theme="monokai"
      setOptions={{
        enableSnippets: true,
        enableBasicAutocompletion: true,
        tabSize: 2,
        enableLiveAutocompletion: true,
      }}
      editorProps={{ $blockScrolling: Infinity }}
      {...rest}
    />
  );
}
