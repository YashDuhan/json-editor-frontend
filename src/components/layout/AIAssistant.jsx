import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import { askAi } from "../../utils/askai";

const AIAssistant = ({ selectedText, jsonData, setJsonData }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAskAi = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const result = await askAi(question, selectedText, jsonData);
      setResponse(result);
      // update jsonData if the response modifies
      if (result.updatedData) {
        setJsonData(result.updatedData);
      }
    } catch {
      setResponse({ error: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">AI Assistant</h2>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your query..."
              className="flex-grow"
            />
            <Button
              onClick={handleAskAi}
              className="bg-blue-500"
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Ask AI
                </>
              )}
            </Button>
          </div>
          {selectedText && (
            <div className="p-2 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Selected text:</p>
              <p className="text-sm">{selectedText}</p>
            </div>
          )}
          {response && (
            <div className="p-4 bg-gray-50 rounded mt-2">
              <h3 className="text-sm font-semibold mb-2">AI Response:</h3>
              <div className="max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap break-words text-sm">
                  {response.answer}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
