import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, FileText, User, Image as ImageIcon } from "lucide-react";
import * as z from "zod";
import MenuBar from "./components/menubar";

// MenuBar component for the rich text editor

const extensions = [TextStyleKit, StarterKit];

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),
  expert: z
    .string()
    .min(2, "Expert name must be at least 2 characters")
    .max(100, "Expert name must be less than 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Please select a valid image file"
    )
    .refine(
      (file) => !file || file?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => !file || file?.type?.startsWith("image/"),
      "File must be an image"
    )
    .optional(),
});

const CreateBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      expert: "",
      content: "",
      image: null,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = form;

  const editor = useEditor({
    extensions: extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
      if (editor.getHTML().length >= 10) {
        clearErrors("content");
      }
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editor) {
        data.content = editor.getHTML();
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Blog data:", data);
      alert("Blog created successfully!");

      form.reset();
      if (editor) {
        editor.commands.setContent("");
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", file);
    clearErrors("image");

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setValue("image", null);

    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const currentImage = watch("image");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Blog Post
            </h1>
            <p className="text-gray-600">Share your expertise with the world</p>
          </div>

          <form
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FileText className="h-4 w-4" />
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter an engaging title for your blog post"
                className="border border-gray-300 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Expert */}
            <div className="space-y-2">
              <label
                htmlFor="expert"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User className="h-4 w-4" />
                Author Name
              </label>
              <input
                type="text"
                name="expert"
                id="expert"
                placeholder="Your name or expert's name"
                className="border border-gray-300 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("expert")}
              />
              {errors.expert && (
                <p className="text-red-500 text-sm">{errors.expert.message}</p>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <ImageIcon className="h-4 w-4" />
                Featured Image (Optional)
              </label>

              <div>
                {!currentImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="mb-4">
                      <span className="block text-sm font-medium text-gray-900 mb-1">
                        Upload a featured image
                      </span>
                      <span className="block text-sm text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </div>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("image")?.click()}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Select Image
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 text-sm rounded">
                      {currentImage?.name}
                    </div>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? "Creating Blog Post..." : "Create Blog Post"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateBlog;
