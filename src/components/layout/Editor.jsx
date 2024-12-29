import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Save as SaveIcon, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { pushLogsToDB } from "../../utils/pushLogs";
import { fetchLogs } from "../../utils/FetchLogs";

const Editor = ({ jsonData, setJsonData }) => {
  // Prettify JSON
  const [jsonText, setJsonText] = useState(JSON.stringify(jsonData, null, 2));

  useEffect(() => {
    // Update text from websocket
    setJsonText(JSON.stringify(jsonData, null, 2));
  }, [jsonData]);

  // broadcast when we start typing(globally)
  const JsonChange = (e) => {
    const data = e.target.value;
    setJsonText(data);

    const parsed = JSON.parse(data);
    setJsonData(parsed);
  };

  const Save = async () => {
    const result = await pushLogsToDB(jsonData); // Push to DataBase
    if (result.success) {
      alert("Logs saved successfully!");
    } else {
      alert(result.message);
    }
  };

  const RetrieveLastCommit = async () => {
    // Fetching logs from the server
    const result = await fetchLogs();
    if (result.success !== false) {
      // Extract file_content
      const { file_content } = result;
      // Parse the JSON string
      const parsedContent = JSON.parse(file_content);
      // update JsonData state
      setJsonData(parsedContent);
      // Update the editor text
      setJsonText(JSON.stringify(parsedContent, null, 2));
      alert("Last commit retrieved successfully!");
    } else {
      alert("Failed to retrieve last commit: " + result.message);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg">JSON Editor</h2>
        {/* Editor Button */}
        <div className="flex">
          {/* Save Button */}
          <Button onClick={Save} className="bg-green-500">
            <SaveIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
          {/* Retrieve Last Commit Button */}
          <Button onClick={RetrieveLastCommit} className="bg-blue-500 ml-3">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retrieve Last Commit
          </Button>
        </div>
        {/* Editor with prefetched value */}
        <Textarea
          value={jsonText}
          onChange={JsonChange}
          className="font-mono h-96 w-full p-2"
          placeholder="Enter json here.."
        />
      </CardContent>
    </Card>
  );
};

export default Editor;
