const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border border-gray-300 border-b-0 rounded-t-lg p-2 bg-gray-50 flex gap-2 flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("bold")
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("italic")
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("bulletList")
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("orderedList")
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Ordered List
      </button>
    </div>
  );
};

export default MenuBar;
