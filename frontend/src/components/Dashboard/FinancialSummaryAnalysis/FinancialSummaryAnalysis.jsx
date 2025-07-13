import React, { useState, useEffect, useRef } from "react";
import { chatSession } from "../../../../utils/AiModel";
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { Editor } from "@toast-ui/react-editor"; // Import Editor
import "@toast-ui/editor/dist/toastui-editor.css"; // Import Editor styles

const FinancialSummaryAnalysis = ({
  restaurantId,
  sale,
  expenditure,
  usage,
  from,
  to,
}) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (
      restaurantId &&
      (sale?.length || expenditure?.length || usage?.length)
    ) {
      generateSummary();
    }
  }, [restaurantId, sale, expenditure, usage, from, to]);

  const generateSummary = async () => {
    setLoading(true);
    setSummary("");
    setError(null);

    const prompt = `
📊 Please analyze the financial data below for the restaurant with ID: ${restaurantId} within the date range ${
      from || "N/A"
    } to ${to || "N/A"}.

🔺 **Sales Data**:
${JSON.stringify(sale, null, 2)}

🔻 **Expenditure Data**:
${JSON.stringify(expenditure, null, 2)}

📦 **Usage Data** (inventory consumption):
${JSON.stringify(usage, null, 2)}

🔍 Generate a detailed **financial analysis** that includes:
- Total sales, total expenses, and usage cost summary
- Net profit or loss
- Expense-to-income ratio
- Inventory efficiency observations
- Any irregular patterns or suggestions
- Recommendations for better financial performance

Use clear language, bullet points, and if possible, categorize the feedback for easy understanding.
`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const text = await result.response.text();
      setSummary(text);
    } catch (err) {
      console.error("Gemini error:", err);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const content = editorRef.current?.getInstance().getMarkdown();
      await navigator.clipboard.writeText(content);
      toast.success("Summary copied to clipboard");
    } catch {
      toast.error("Failed to copy summary");
    }
  };

  return (
    <div className="w-full p-4 rounded-xl border bg-white text-black shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📈 Financial Summary Analysis</h2>
        {summary && (
          <button
            onClick={handleCopy}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="animate-spin w-5 h-5" />
          <span>Generating analysis...</span>
        </div>
      )}

      {error && <div className="text-red-600 font-medium">{error}</div>}

      {summary && !loading && (
        <Editor
          ref={editorRef}
          initialValue={summary}
          previewStyle="vertical"
          height="500px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      )}

      {!summary && !loading && !error && (
        <p className="text-gray-500 text-sm">
          No data analyzed yet. Please provide data to generate a summary.
        </p>
      )}
    </div>
  );
};

export default FinancialSummaryAnalysis;
