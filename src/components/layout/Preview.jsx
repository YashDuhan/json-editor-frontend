import { Card, CardContent } from "../ui/card";

const Preview = ({ jsonData }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="preview-content min-h-[200px] bg-gray-50 rounded p-4">
          {jsonData.template.sections.map(({ id, style, content }) => (
            <div
              key={id}
              style={{ ...style, fontFamily: style.font, fontSize: style.size }}
              className="mb-4"
            >
              {content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Preview;
