import { useState } from "react"

// Prediction form component
function PredictForm() {
  const [output, setOutput] = useState<any>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form).entries())
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hours_studied: Number(data.hours_studied),
        sleep_hours: Number(data.sleep_hours),
      }),
    })
    setOutput(await res.json())
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-2">
        <input name="hours_studied" placeholder="Hours Studied" />
        <input name="sleep_hours" placeholder="Sleep Hours" />
        <button>Predict</button>
      </form>
      {output && <p>Predicted Exam Score: {output.predicted_exam_score}</p>}
    </div>
  )
}

// Real Power BI dashboard
function PowerBIReport() {
  return (
    <iframe
      title="Student Performance Insight Dashboard"
      width="1140"
      height="541.25"
      src="https://app.powerbi.com/reportEmbed?reportId=57d37989-5615-4ee4-b224-d12770e334b3&autoAuth=true&ctid=1f551aeb-7ea1-472c-9ac0-09de9bf33051&actionBarEnabled=true"
      frameBorder="0"
      allowFullScreen={true}
    />
  )
}

// Main App component
export default function App() {
  return (
    <div>
      <h1>📊 Student Performance Insights</h1>
      <PredictForm />
      <h2>Power BI Report</h2>
      <PowerBIReport />
    </div>
  )
}
