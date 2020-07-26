import * as React from 'react';
import styled from 'styled-components';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import * as vars from '~/vars';

const EditorCaptionEditor = () => {
  const { state, dispatch } = useRootContext();
  const { file } = EditorDuck.selectors.getImage(state);
  const { exifText } = EditorDuck.selectors.getText(state);

  const editorRef = React.useRef<HTMLTextAreaElement>();
  const previewRef = React.useRef<HTMLButtonElement>();

  const [text, setText] = React.useState(exifText);
  const [isEditMode, setEditMode] = React.useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(EditorDuck.actions.setExifText({ text }));
    setEditMode(false);
  };

  React.useEffect(() => {
    setText(exifText);
  }, [exifText]);

  // manage focus
  React.useEffect(() => {
    const { current } = isEditMode ? editorRef : previewRef;
    current?.focus();
  }, [isEditMode, editorRef, previewRef]);

  // render nothing when image file is not present
  if (file === null) return null;

  return (
    <div>
      {/* edit mode */}
      {isEditMode && (
        <form onSubmit={handleSubmit}>
          <TextArea
            ref={editorRef as any}
            value={text}
            onChange={handleTextChange}
          ></TextArea>
          <button type="submit">submit</button>
        </form>
      )}

      {/* preview Mode */}
      {!isEditMode && (
        <EditButton
          ref={previewRef as any}
          type="button"
          onClick={() => setEditMode(true)}
        >
          {text}
        </EditButton>
      )}
    </div>
  );
};

const TextArea = styled.textarea({
  height: 150,
  width: '100%',
  boxSizing: 'border-box',
  fontSize: vars.fontSize.xxs,
  padding: vars.spacing.normal,
  border: `1px solid ${vars.colors.lightgray}`,
  borderRadius: vars.radius.double,
  fontFamily: vars.fontFamily.default,
});

const EditButton = styled.button({
  width: '100%',
  padding: 0,
  textAlign: 'left',
  whiteSpace: 'pre',
  background: 'none',
  border: 'none',
  fontSize: vars.fontSize.xxs,
});

export default EditorCaptionEditor;
