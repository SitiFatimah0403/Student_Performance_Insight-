import { PowerBIEmbed } from "powerbi-client-react"
import type { IReportEmbedConfiguration, Report, Embed } from "powerbi-client"
import { models } from "powerbi-client"

interface PowerBIReportProps {
  hoursStudied: number
  sleepHours: number
}


export default function PowerBIReport({ hoursStudied, sleepHours }: PowerBIReportProps) {
  //defines the filters to apply on your Power BI report.
  const filters = [
    {
      $schema: "http://powerbi.com/product/schema#basic",
      target: { table: "StudentData", column: "HoursStudied" },
      operator: "GreaterThanOrEqual",
      values: [hoursStudied],
    },
    {
      $schema: "http://powerbi.com/product/schema#basic",
      target: { table: "StudentData", column: "SleepHours" },
      operator: "GreaterThanOrEqual",
      values: [sleepHours],
    }
  ]

  const embedConfig: IReportEmbedConfiguration = {
    type: "report",
    id: "57d37989-5615-4ee4-b224-d12770e334b3",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=57d37989-5615-4ee4-b224-d12770e334b3&autoAuth=true&ctid=1f551aeb-7ea1-472c-9ac0-09de9bf33051",
    tokenType: models.TokenType.Embed,
    settings: { filterPaneEnabled: false }
  }

  return (
    <PowerBIEmbed
      embedConfig={embedConfig}
      eventHandlers={new Map()}
      cssClassName="powerbi-frame"
      getEmbeddedComponent={(embeddedComponent: Embed) => {
        // Cast to Report to access report-specific methods
        const report = embeddedComponent as Report
        report.setFilters(filters as any).catch(err => console.error(err))
      }}
    />
  )
}
