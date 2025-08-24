// src/App.tsx
import { useState } from "react"
import PowerBIReport from "./PowerBIReport"

export default function App() {
  const [hoursStudied, setHoursStudied] = useState(0)
  const [sleepHours, setSleepHours] = useState(0)
  const [output, setOutput] = useState<any>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form).entries())

    const hours = Number(data.hours_studied)
    const sleep = Number(data.sleep_hours)

    setHoursStudied(hours)
    setSleepHours(sleep)

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hours_studied: hours, sleep_hours: sleep }),
    })
    setOutput(await res.json())
  }

   return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Student Performance Insights</h1>

      <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
        <input name="hours_studied" placeholder="Hours Studied" />
        <input name="sleep_hours" placeholder="Sleep Hours" />
        <button type="submit">Predict</button>
      </form>

      {output && <p>Predicted Exam Score: {output.predicted_exam_score}</p>}

      <h2>Power BI Dashboard</h2>

      {/* Static power BI dashboard at this moment*/}
      <iframe
        title="Student Performance Insight Dashboard"
        width="1140"
        height="541"
        src="https://app.powerbi.com/reportEmbed?reportId=57d37989-5615-4ee4-b224-d12770e334b3&autoAuth=true&ctid=1f551aeb-7ea1-472c-9ac0-09de9bf33051"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  )
}
