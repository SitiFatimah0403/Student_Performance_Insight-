// src/App.tsx
import { useState } from "react"

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

function FakePowerBI() {
  return (
    <iframe
      title="Dummy Power BI Report"
      width="600"
      height="400"
      src="https://app.powerbi.com/view?r=your_fake_report_id"
    />
  )
}

export default function App() {
  return (
    <div>
      <h1>📊 Student Performance Insights</h1>
      <PredictForm />
      <h2>Power BI Report (Dummy)</h2>
      <FakePowerBI />
    </div>
  )
}
