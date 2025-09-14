"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = Record<string, {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )>

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => Boolean(cfg.theme ?? cfg.color))

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
                  return `
      ${prefix} [data-chart=${id}] {
      ${colorConfig
        .map(([key, itemConfig]) => {
          const color = itemConfig.theme?.[theme as keyof typeof THEMES] ?? itemConfig.color
          return color ? `  --color-${key}: ${color};` : null
        })
        .join("\n")}
      }
      `
                })
          .join("\n"),
      }}
    />
  )
}

// Small runtime type-helpers to safely operate on unknown payloads from Recharts.
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null
}

function safeValueToString(v: unknown) {
  if (typeof v === "number") return v.toLocaleString()
  if (typeof v === "string") return v
  try {
    return JSON.stringify(v) || ""
  } catch {
    return ""
  }
}

function resolveKeyFromItem(item: unknown, nameKey?: string, labelKey?: string) {
  if (!isRecord(item)) return "value"
  const rec = item

  if (labelKey) {
    const v = rec[labelKey]
    if (typeof v === "string" || typeof v === "number") return String(v)
  }

  if (nameKey) {
    const v = rec[nameKey]
    if (typeof v === "string" || typeof v === "number") return String(v)
  }

  const name = rec.name
  if (typeof name === "string" || typeof name === "number") return String(name)

  const dataKey = rec.dataKey
  if (typeof dataKey === "string" || typeof dataKey === "number") return String(dataKey)

  return "value"
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    interface ChartPayloadItem {
      dataKey?: string | number
      name?: string
      value?: unknown
      payload?: Record<string, unknown>
      color?: string
    }

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

  const first = payload[0]
  const item = isRecord(first) ? first : undefined
  const key = labelKey ?? resolveKeyFromItem(item, nameKey, labelKey)
  const itemConfig = getPayloadConfigFromPayload(config, item, key)

      let value: React.ReactNode | undefined
      if (!labelKey && typeof label === "string") {
        value = config[String(label)]?.label ?? label
      } else {
        value = itemConfig?.label
      }

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
      nameKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-zinc-200 border-zinc-200/50 bg-white px-2.5 py-1.5 text-xs shadow-xl dark:border-zinc-800 dark:border-zinc-800/50 dark:bg-zinc-950",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((rawItem, index) => {
              const item = isRecord(rawItem) ? (rawItem as ChartPayloadItem) : ({} as ChartPayloadItem)
              const key = `${nameKey ?? (item.name ?? item.dataKey ?? "value")}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
              const indicatorColor = color ?? (isRecord(item.payload) ? item.payload.fill : undefined) ?? item.color

        let formattedEl: React.ReactNode | null = null
            if (typeof formatter === "function" && item?.value !== undefined && item.name) {
              try {
                const anyFormatter = formatter as unknown as (...args: any[]) => any
                formattedEl = anyFormatter(item.value, item.name, item as any, index, item.payload) as React.ReactNode
              } catch {
                formattedEl = null
              }
            }

            return (
              <div
                key={String(item.dataKey ?? index)}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-zinc-500 dark:[&>svg]:text-zinc-400",
                  indicator === "dot" && "items-center"
                )}
              >
                {formattedEl ?? (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={{
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties}
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-zinc-500 dark:text-zinc-400">
                            {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                        {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-zinc-950 dark:text-zinc-50">
                          {safeValueToString(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((rawItem, idx) => {
          const item = isRecord(rawItem) ? (rawItem as Record<string, unknown>) : ({} as Record<string, unknown>)
          const key = resolveKeyFromItem(item, nameKey)
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={
                typeof item.value === "string" || typeof item.value === "number"
                  ? String(item.value)
                  : String(idx)
              }
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-zinc-500 dark:[&>svg]:text-zinc-400"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: typeof item.color === "string" ? item.color : undefined,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (!isRecord(payload)) return undefined

  const payloadRecord = payload
  const payloadPayload = isRecord(payloadRecord.payload) ? payloadRecord.payload : undefined

  let configLabelKey = key

  const v1 = payloadRecord[key]
  if (typeof v1 === "string" || typeof v1 === "number") {
    configLabelKey = String(v1)
  } else if (payloadPayload) {
    const v2 = payloadPayload[key]
    if (typeof v2 === "string" || typeof v2 === "number") {
      configLabelKey = String(v2)
    }
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
