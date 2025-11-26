import { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = 'Start writing...' }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHeading = (level) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const handleInput = () => {
    const content = editorRef.current?.innerHTML || '';
    onChange(content);
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertHeading(1), label: 'Heading 1' },
    { icon: Heading2, action: () => insertHeading(2), label: 'Heading 2' },
    { icon: Heading3, action: () => insertHeading(3), label: 'Heading 3' },
    { icon: Bold, action: () => execCommand('bold'), label: 'Bold' },
    { icon: Italic, action: () => execCommand('italic'), label: 'Italic' },
    { icon: List, action: () => execCommand('insertUnorderedList'), label: 'Bullet List' },
    { icon: ListOrdered, action: () => execCommand('insertOrderedList'), label: 'Numbered List' },
    { icon: LinkIcon, action: insertLink, label: 'Insert Link' },
    { icon: ImageIcon, action: insertImage, label: 'Insert Image' },
    { icon: Code, action: () => execCommand('formatBlock', '<pre>'), label: 'Code Block' }
  ];

  return (
    <div className={`border rounded-lg ${isFocused ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-20' : 'border-gray-300'}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="p-2 hover:bg-gray-200 rounded transition-colors duration-200"
            title={button.label}
            aria-label={button.label}
          >
            <button.icon size={18} />
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[200px] p-4 outline-none prose max-w-none"
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;