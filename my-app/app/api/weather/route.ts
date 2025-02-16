export async function GET() {
  try {
    // San Francisco coordinates
    const lat = 37.7749
    const lon = -122.4194

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=1`,
    )

    if (!response.ok) {
      throw new Error("Weather API request failed")
    }

    const data = await response.json()

    // Calculate weather forecast message based on conditions
    let forecast = "Clear conditions expected"
    const nextFewHours = data.hourly.temperature_2m.slice(0, 4)
    const avgTemp = nextFewHours.reduce((a: number, b: number) => a + b, 0) / nextFewHours.length
    const currentTemp = data.current.temperature_2m

    if (Math.abs(avgTemp - currentTemp) > 5) {
      forecast = `Temperature change of ${Math.abs(avgTemp - currentTemp).toFixed(1)}°C expected in next few hours`
    }

    if (data.current.wind_speed_10m > 20) {
      forecast = "Strong winds detected. Exercise caution."
    }

    return Response.json({
      temperature: Math.round(data.current.temperature_2m),
      humidity: Math.round(data.current.relative_humidity_2m),
      windSpeed: Math.round(data.current.wind_speed_10m),
      forecast,
    })
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return Response.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

