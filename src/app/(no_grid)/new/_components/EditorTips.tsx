"use client";

type FocusedSection = "title" | "tags" | "editor" | null;

interface EditorTipsProps {
  focusedSection: FocusedSection;
}

export const EditorTips = ({ focusedSection }: EditorTipsProps) => {
  if (!focusedSection) return null;

  const renderTitleTips = () => (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Writing a Great Post Title
      </h3>
      <ul className="list-disc space-y-3 pl-5 text-gray-600">
        <li>
          Think of your post title as a super short (but compelling!)
          description — like an overview of the actual post in one short
          sentence.
        </li>
        <li>
          Use keywords where appropriate to help ensure people can find your
          post by search.
        </li>
      </ul>
    </div>
  );

  const renderTagsTips = () => (
    <div className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Tagging Guidelines
      </h3>
      <ul className="list-disc space-y-3 pl-5 text-gray-600">
        <li>
          Tags help people find your post - think of them as the topics or
          categories that best describe your post.
        </li>
        <li>
          Add up to four comma-separated tags per post. Use existing tags
          whenever possible.
        </li>
        <li>
          Some tags have special posting guidelines - double check to make sure
          your post complies with them.
        </li>
      </ul>
    </div>
  );

  const renderEditorTips = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Editor Basics
        </h3>
        <ul className="list-disc space-y-3 pl-5 text-gray-600">
          <li>Use Markdown to write and format posts.</li>
          <li>
            Embed rich content such as Tweets, YouTube videos, etc. Use the
            complete URL: {`{% embed https://... %}`}
          </li>
          <li>
            In addition to images for the post&apos;s content, you can also drag
            and drop a cover image.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-base font-medium text-gray-900">
          Markdown Syntax Guide
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p># Header &nbsp; → &nbsp; H1 Header</p>
          <p>
            *italics* or _italics_ &nbsp; → &nbsp; <i>italics</i>
          </p>
          <p>
            **bold** &nbsp; → &nbsp; <strong>bold</strong>
          </p>
          <p>
            [Link](https://...) &nbsp; → &nbsp;{" "}
            <span className="text-blue-600">Link</span>
          </p>
          <p>* item &nbsp; → &nbsp; • bullet point</p>
          <p>1. item &nbsp; → &nbsp; 1. numbered list</p>
          <p>&gt; quote &nbsp; → &nbsp; blockquote</p>
          <p>
            `code` &nbsp; → &nbsp;{" "}
            <code className="rounded bg-gray-100 px-1">code</code>
          </p>
        </div>
      </div>
    </div>
  );

  const getTipsContent = () => {
    switch (focusedSection) {
      case "title":
        return renderTitleTips();
      case "tags":
        return renderTagsTips();
      case "editor":
        return renderEditorTips();
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-4 space-y-6 text-gray-800">
      <h2 className="text-xl font-bold">Publishing Tips</h2>
      {getTipsContent()}
    </div>
  );
};
